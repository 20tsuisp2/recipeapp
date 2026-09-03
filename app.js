const STORAGE_KEY = 'customRecipes';
const DELETED_KEY = 'deletedRecipeIds';
const SHOPPING_KEY = 'shoppingList';
const FRIDGE_KEY = 'fridgeItems';
const EDITED_KEY = 'recipeEdits';


const sectionNames = { quick: 'Quick Meals', prep: 'Meal Prep', baking: 'Baking' };
const tabNames = { ...sectionNames, fridge: 'Fridge', list: 'List' };
let state = { section: 'quick', view: 'list', openId: null, multiplier: 1, query: '', selectMode: false, selected: [], cookRecipeId: null, cookStep: 0, cookTimerRemaining: null, cookTimerRunning: false, fridgeResults: null };
let cookIntervalId = null;

function escapeAttr(str) { return String(str).replace(/"/g, '&quot;'); }
function getStepData(step) {
  if (typeof step === 'string') return { text: step, timerMinutes: 0 };
  return { text: step.text || '', timerMinutes: Number(step.timerMinutes) || 0 };
}
function formatCookTimer(totalSeconds) {
  totalSeconds = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
function playTimerBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.3, 0.6].forEach(delay => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime + delay);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.2);
    });
  } catch (e) { /* audio not available, ignore */ }
}

const UNIT_WORD_MAP = {
  g: 'g', gram: 'g', grams: 'g',
  kg: 'kg', kilogram: 'kg', kilograms: 'kg',
  ml: 'ml', milliliter: 'ml', milliliters: 'ml', millilitre: 'ml', millilitres: 'ml',
  l: 'l', liter: 'l', liters: 'l', litre: 'l', litres: 'l',
  tsp: 'tsp', teaspoon: 'tsp', teaspoons: 'tsp',
  tbsp: 'tbsp', tablespoon: 'tbsp', tablespoons: 'tbsp',
  cup: 'cup', cups: 'cup',
  oz: 'oz', ounce: 'oz', ounces: 'oz',
  lb: 'lb', lbs: 'lb', pound: 'lb', pounds: 'lb'
};
const UNICODE_FRACTIONS = { '¼': 0.25, '½': 0.5, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875 };

function parseIngredientLine(rawLine) {
  let line = rawLine.trim();
  if (!line) return null;
  line = line.replace(/^[-•*]\s*/, '');
  let rest = line;
  let amount = null;

  const mixedMatch = rest.match(/^(\d+)\s+(\d+)\/(\d+)\s*/);
  const unicodeFracMatch = rest.match(/^(\d*)([¼½¾⅓⅔⅛⅜⅝⅞])\s*/);
  const simpleFracMatch = rest.match(/^(\d+)\/(\d+)\s*/);
  const decimalMatch = rest.match(/^(\d+(?:\.\d+)?)\s*/);

  if (mixedMatch) {
    amount = Number(mixedMatch[1]) + Number(mixedMatch[2]) / Number(mixedMatch[3]);
    rest = rest.slice(mixedMatch[0].length);
  } else if (unicodeFracMatch && (unicodeFracMatch[1] || unicodeFracMatch[2])) {
    amount = (unicodeFracMatch[1] ? Number(unicodeFracMatch[1]) : 0) + UNICODE_FRACTIONS[unicodeFracMatch[2]];
    rest = rest.slice(unicodeFracMatch[0].length);
  } else if (simpleFracMatch) {
    amount = Number(simpleFracMatch[1]) / Number(simpleFracMatch[2]);
    rest = rest.slice(simpleFracMatch[0].length);
  } else if (decimalMatch) {
    amount = Number(decimalMatch[1]);
    rest = rest.slice(decimalMatch[0].length);
  }

  if (amount === null) return { amount: 1, unit: '', name: line };

  rest = rest.trim();
  let unit = '';
  const unitMatch = rest.match(/^([a-zA-Z]+)\.?\s+/);
  if (unitMatch && UNIT_WORD_MAP[unitMatch[1].toLowerCase()]) {
    unit = UNIT_WORD_MAP[unitMatch[1].toLowerCase()];
    rest = rest.slice(unitMatch[0].length);
  }
  rest = rest.replace(/^of\s+/i, '').trim();

  return { amount: Math.round(amount * 100) / 100, unit, name: rest || line };
}

function parseIngredientsBlock(text) {
  return text.split('\n').map(parseIngredientLine).filter(Boolean);
}

function parseInstructionsBlock(text) {
  return text.split('\n')
    .map(line => line.trim().replace(/^(?:step\s*)?\d+[.):]\s*/i, '').replace(/^[-•*]\s*/, ''))
    .filter(Boolean)
    .map(line => {
      const timeMatch = line.match(/(\d+)(?:\s*[-–to]+\s*(\d+))?\s*(hour|hr|minute|min)s?\b/i);
      if (!timeMatch) return line;
      const high = timeMatch[2] ? Number(timeMatch[2]) : Number(timeMatch[1]);
      const timerMinutes = timeMatch[3].toLowerCase().startsWith('h') ? high * 60 : high;
      return { text: line, timerMinutes };
    });
}
function formatDuration(hours, minutes) {
  hours = Number(hours) || 0; minutes = Number(minutes) || 0;
  if (!hours && !minutes) return null;
  const parts = [];
  if (hours) parts.push(`${hours} hr`);
  if (minutes) parts.push(`${minutes} min`);
  return parts.join(' ');
}
function tabsHTML() {
  return Object.keys(tabNames).map(key =>
    `<div class="tab ${key === state.section ? 'active' : ''}" data-section="${key}">${tabNames[key]}</div>`
  ).join('');
}
function recipeCardHTML(r, opts = {}) {
  const thumb = r.photo ? `<img src="${r.photo}" class="card-thumb">` : '';
  const checkbox = opts.selectMode ? `<span class="select-checkbox">${opts.selected ? '✓' : ''}</span>` : '';
  const badge = opts.badgeText ? `<span class="badge">${opts.badgeText}</span>` : '';
  return `<div class="recipe-card ${opts.selected ? 'card-selected' : ''}" data-id="${r.id}">${checkbox}${thumb}<div class="card-body">${badge}<h3>${r.title}</h3><p>${r.desc || ''}</p></div></div>`;
}
function emptyFormData() {
  return { title: '', desc: '', prepHours: '', prepMinutes: '', cookHours: '', cookMinutes: '', servings: '', notes: '', calories: '', protein: '', carbs: '', fat: '', photo: null };
}
function resizeImage(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 800;
      let width = img.width, height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) { height = Math.round(height * (maxDim / width)); width = maxDim; }
        else { width = Math.round(width * (maxDim / height)); height = maxDim; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width; canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function getCustomRecipes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : { quick: [], prep: [], baking: [] };
}
function saveCustomRecipes(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function getDeletedIds() {
  const stored = localStorage.getItem(DELETED_KEY);
  return stored ? JSON.parse(stored) : [];
}
function deleteRecipeById(id) {
  const deleted = getDeletedIds();
  deleted.push(id);
  localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
}
function getAllRecipes(section) {
  const custom = getCustomRecipes();
  const deleted = getDeletedIds();
  const edits = getRecipeEdits();
  return [...starterRecipes[section], ...(custom[section] || [])]
    .filter(r => !deleted.includes(r.id))
    .map(r => edits[r.id] ? { ...r, ...edits[r.id] } : r);
}
function getRecipeEdits() {
  const stored = localStorage.getItem(EDITED_KEY);
  return stored ? JSON.parse(stored) : {};
}
function saveRecipeEdits(edits) { localStorage.setItem(EDITED_KEY, JSON.stringify(edits)); }
function exportRecipeData() {
  const data = {
    exportedAt: new Date().toISOString(),
    customRecipes: getCustomRecipes(),
    recipeEdits: getRecipeEdits(),
    deletedRecipeIds: getDeletedIds()
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `recipe-book-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function findRecipeById(id) {
  for (const section of Object.keys(sectionNames)) {
    const found = getAllRecipes(section).find(r => r.id === id);
    if (found) return found;
  }
  return null;
}
function searchRecipes(query) {
  const q = query.toLowerCase();
  let results = [];
  Object.keys(sectionNames).forEach(section => {
    getAllRecipes(section).forEach(r => {
      if (r.title.toLowerCase().includes(q)) results.push({ ...r, section });
    });
  });
  return results;
}
function getShoppingList() {
  const stored = localStorage.getItem(SHOPPING_KEY);
  return stored ? JSON.parse(stored) : [];
}
function saveShoppingList(items) { localStorage.setItem(SHOPPING_KEY, JSON.stringify(items)); }
function getFridgeItems() {
  const stored = localStorage.getItem(FRIDGE_KEY);
  return stored ? JSON.parse(stored) : [];
}
function saveFridgeItems(items) { localStorage.setItem(FRIDGE_KEY, JSON.stringify(items)); }
function findMatchingRecipes(selectedTexts) {
  const lowerSelected = selectedTexts.map(t => t.toLowerCase().trim()).filter(Boolean);
  const results = [];
  Object.keys(sectionNames).forEach(section => {
    getAllRecipes(section).forEach(r => {
      const ingredientNames = (r.ingredients || []).map(i => i.name.toLowerCase());
      let matchCount = 0;
      lowerSelected.forEach(sel => {
        if (ingredientNames.some(name => name.includes(sel) || sel.includes(name))) matchCount++;
      });
      if (matchCount > 0) results.push({ ...r, section, matchCount, totalIngredients: ingredientNames.length });
    });
  });
  results.sort((a, b) => b.matchCount - a.matchCount);
  return results;
}

function render() {
  const app = document.getElementById('app');
  const addBtn = document.querySelector('.add-btn');
  if (addBtn) addBtn.style.display = (state.view === 'list') ? '' : 'none';
  if (state.view === 'cook') { renderCookMode(app); return; }
  if (state.view === 'detail') { renderDetail(app); return; }
  if (state.view === 'addChoice') { renderAddChoice(app); return; }
  if (state.view === 'paste') { renderPasteForm(app); return; }
  if (state.view === 'add') { renderAddForm(app); return; }
  if (state.section === 'list') { renderShoppingList(app); return; }
  if (state.section === 'fridge') { renderFridgeTab(app); return; }
  renderRecipeTab(app);
}

function renderRecipeTab(app) {
  const searchBarHTML = `<div class="search-bar"><input id="search-input" type="search" placeholder="Search recipes..." value="${escapeAttr(state.query)}"></div>`;
  let bodyHTML;

  if (state.query.trim()) {
    const results = searchRecipes(state.query);
    const cards = results.map(r => recipeCardHTML(r, { badgeText: sectionNames[r.section] })).join('');
    bodyHTML = `<div id="cards">${cards || '<p class="empty">No recipes match your search.</p>'}</div>`;
  } else {
    const controlsHTML = `<div class="list-controls"><button class="export-btn">Export</button><button class="select-toggle">${state.selectMode ? 'Cancel' : 'Select'}</button></div>`;
    const recipes = getAllRecipes(state.section);
    const cards = recipes.map(r =>
      recipeCardHTML(r, { selectMode: state.selectMode, selected: state.selected.includes(r.id) })
    ).join('');
    const selectBarHTML = (state.selectMode && state.selected.length > 0)
      ? `<div class="select-bar"><span>${state.selected.length} selected</span><button class="add-to-list-btn">Add to list</button></div>` : '';
    bodyHTML = `<div class="section-tabs">${tabsHTML()}</div>${controlsHTML}<div id="cards">${cards || '<p class="empty">No recipes here yet.</p>'}</div>${selectBarHTML}`;
  }

  app.innerHTML = searchBarHTML + bodyHTML;

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    state.query = e.target.value;
    render();
    const newInput = document.getElementById('search-input');
    if (newInput) { newInput.focus(); newInput.setSelectionRange(newInput.value.length, newInput.value.length); }
  });

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.section = tab.dataset.section;
      state.query = '';
      state.selectMode = false;
      state.selected = [];
      render();
    });
  });

  const selectToggle = document.querySelector('.select-toggle');
  if (selectToggle) {
    selectToggle.addEventListener('click', () => {
      state.selectMode = !state.selectMode;
      state.selected = [];
      render();
    });
  }
  const exportBtn = document.querySelector('.export-btn');
  if (exportBtn) exportBtn.addEventListener('click', () => exportRecipeData());

  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (state.selectMode) {
        const idx = state.selected.indexOf(id);
        if (idx === -1) state.selected.push(id); else state.selected.splice(idx, 1);
        render();
      } else {
        state.openId = id;
        state.view = 'detail';
        state.multiplier = 1;
        render();
      }
    });
  });

  const addToListBtn = document.querySelector('.add-to-list-btn');
  if (addToListBtn) {
    addToListBtn.addEventListener('click', () => {
      const recipes = getAllRecipes(state.section).filter(r => state.selected.includes(r.id));
      const items = getShoppingList();
      recipes.forEach(r => {
        (r.ingredients || []).forEach(ing => {
          items.push({ id: 'item-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7), text: `${ing.amount}${ing.unit} ${ing.name}`, checked: false });
        });
      });
      saveShoppingList(items);
      state.selectMode = false;
      state.selected = [];
      state.section = 'list';
      render();
    });
  }
}

function renderShoppingList(app) {
  const items = getShoppingList();
  const itemsHTML = items.length ? items.map(item => `
    <div class="list-item ${item.checked ? 'checked' : ''}" data-id="${item.id}">
      <span class="list-check"></span>
      <span class="list-text">${item.text}</span>
      <span class="list-delete">&times;</span>
    </div>`).join('') : '<p class="empty">Your list is empty. Select recipes on another tab and tap "Add to list", or use the + button to add an item.</p>';
  const clearBtn = items.length ? '<button class="clear-list-btn">Clear list</button>' : '';

  app.innerHTML = `<div class="section-tabs">${tabsHTML()}</div><div id="shopping-list">${itemsHTML}</div>${clearBtn}`;

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.section = tab.dataset.section;
      state.query = '';
      render();
    });
  });
  document.querySelectorAll('.list-check').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.closest('.list-item').dataset.id;
      const items = getShoppingList();
      const item = items.find(i => i.id === id);
      if (item) { item.checked = !item.checked; saveShoppingList(items); render(); }
    });
  });
  document.querySelectorAll('.list-text').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.closest('.list-item').dataset.id;
      const items = getShoppingList();
      const item = items.find(i => i.id === id);
      if (!item) return;
      const updated = prompt('Edit item:', item.text);
      if (updated !== null && updated.trim()) { item.text = updated.trim(); saveShoppingList(items); render(); }
    });
  });
  document.querySelectorAll('.list-delete').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.closest('.list-item').dataset.id;
      let items = getShoppingList();
      items = items.filter(i => i.id !== id);
      saveShoppingList(items);
      render();
    });
  });
  const clearListBtn = document.querySelector('.clear-list-btn');
  if (clearListBtn) {
    clearListBtn.addEventListener('click', () => {
      if (confirm('Clear the whole list?')) { saveShoppingList([]); render(); }
    });
  }
}

function addFridgeItem() {
  const text = prompt('Add to your fridge list (e.g. "chicken breast"):');
  if (!text || !text.trim()) return;
  const items = getFridgeItems();
  items.push({ id: 'fridge-' + Date.now(), text: text.trim(), checked: false });
  saveFridgeItems(items);
  render();
}

function renderFridgeTab(app) {
  if (state.fridgeResults) {
    const cards = state.fridgeResults
      .map(r => recipeCardHTML(r, { badgeText: `${sectionNames[r.section]} · ${r.matchCount}/${r.totalIngredients} matched` }))
      .join('');
    app.innerHTML = `
      <button class="back-btn" id="fridge-results-back">&larr; Back to Fridge</button>
      <h2 class="detail-title">Best Matches</h2>
      <div id="cards">${cards || '<p class="empty">No recipes match what you selected. Try selecting a few more items.</p>'}</div>
    `;
    document.getElementById('fridge-results-back').addEventListener('click', () => { state.fridgeResults = null; render(); });
    document.querySelectorAll('.recipe-card').forEach(card => {
      card.addEventListener('click', () => {
        state.openId = card.dataset.id;
        state.view = 'detail';
        state.multiplier = 1;
        render();
      });
    });
    return;
  }

  const items = getFridgeItems();
  const itemsHTML = items.length ? items.map(item => `
    <div class="list-item ${item.checked ? 'checked' : ''}" data-id="${item.id}">
      <span class="list-check"></span>
      <span class="list-text">${item.text}</span>
      <span class="list-delete">&times;</span>
    </div>`).join('') : '<p class="empty">Add what\'s in your fridge, then select what you want to cook with.</p>';

  const selectedCount = items.filter(i => i.checked).length;
  const findBtn = selectedCount > 0 ? `<button class="find-recipes-btn">Find Recipes (${selectedCount} selected)</button>` : '';

  app.innerHTML = `<div class="section-tabs">${tabsHTML()}</div><p class="fridge-subtitle">Tap items to select what you want to cook with.</p><div id="fridge-list">${itemsHTML}</div>${findBtn}`;

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.section = tab.dataset.section;
      state.query = '';
      state.fridgeResults = null;
      render();
    });
  });
  document.querySelectorAll('.list-check').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.closest('.list-item').dataset.id;
      const list = getFridgeItems();
      const item = list.find(i => i.id === id);
      if (item) { item.checked = !item.checked; saveFridgeItems(list); render(); }
    });
  });
  document.querySelectorAll('.list-text').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.closest('.list-item').dataset.id;
      const list = getFridgeItems();
      const item = list.find(i => i.id === id);
      if (!item) return;
      const updated = prompt('Edit item:', item.text);
      if (updated !== null && updated.trim()) { item.text = updated.trim(); saveFridgeItems(list); render(); }
    });
  });
  document.querySelectorAll('.list-delete').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.closest('.list-item').dataset.id;
      let list = getFridgeItems();
      list = list.filter(i => i.id !== id);
      saveFridgeItems(list);
      render();
    });
  });
  const findBtnEl = document.querySelector('.find-recipes-btn');
  if (findBtnEl) {
    findBtnEl.addEventListener('click', () => {
      const selectedTexts = getFridgeItems().filter(i => i.checked).map(i => i.text);
      state.fridgeResults = findMatchingRecipes(selectedTexts);
      render();
    });
  }
}

function renderDetail(app) {
  const recipe = findRecipeById(state.openId);
  if (!recipe) { state.view = 'list'; render(); return; }

  const baseServings = recipe.servings || 1;
  const currentServings = Math.round(baseServings * state.multiplier);

  const prepStr = formatDuration(recipe.prepHours, recipe.prepMinutes);
  const cookStr = formatDuration(recipe.cookHours, recipe.cookMinutes);
  const timeRow = (prepStr || cookStr)
    ? `<div class="detail-times">${prepStr ? `<span>Prep: ${prepStr}</span>` : ''}${cookStr ? `<span>Cook: ${cookStr}</span>` : ''}</div>` : '';

  const ingredientsHTML = (recipe.ingredients && recipe.ingredients.length)
    ? `<ul class="ingredient-list">${recipe.ingredients.map(ing => {
        const scaled = ing.amount * state.multiplier;
        const displayAmount = Number.isInteger(scaled) ? scaled : Math.round(scaled * 10) / 10;
        return `<li>${displayAmount}${ing.unit} ${ing.name}</li>`;
      }).join('')}</ul>`
    : `<p class="empty">No ingredients added yet.</p>`;

  const instructionsHTML = (recipe.instructions && recipe.instructions.length)
    ? `<ol class="instruction-list">${recipe.instructions.map(step => `<li>${getStepData(step).text}</li>`).join('')}</ol>`
    : recipe.desc ? `<p>${recipe.desc}</p>` : `<p class="empty">No instructions added yet.</p>`;

  const macrosHTML = recipe.macros
    ? `<h4 class="section-label">Macros (per serving)</h4><div class="macros"><div><strong>${recipe.macros.calories}</strong><span>kcal</span></div><div><strong>${recipe.macros.protein}g</strong><span>protein</span></div><div><strong>${recipe.macros.carbs}g</strong><span>carbs</span></div><div><strong>${recipe.macros.fat}g</strong><span>fat</span></div></div>` : '';

  const notesHTML = recipe.notes ? `<div class="notes"><strong>Notes:</strong> ${recipe.notes}</div>` : '';

  const photoHTML = recipe.photo ? `<img src="${recipe.photo}" class="detail-photo">` : '';

  const startCookingHTML = (recipe.instructions && recipe.instructions.length)
    ? `<button class="start-cooking-btn">▶ Start Cooking</button>` : '';

  app.innerHTML = `
    <button class="back-btn">&larr; Back</button>
    <h2 class="detail-title">${recipe.title}</h2>
    ${photoHTML}
    ${startCookingHTML}
    ${timeRow}
    <div class="servings-row"><span>Servings</span><div class="stepper"><button class="step-minus">-</button><span>${currentServings}</span><button class="step-plus">+</button></div></div>
    <button class="add-to-list-detail-btn">+ Add to shopping list</button>
    <h4 class="section-label">Ingredients</h4>
    ${ingredientsHTML}
    <h4 class="section-label">Instructions</h4>
    ${instructionsHTML}
    ${macrosHTML}
    ${notesHTML}
    <button class="edit-btn">Edit recipe</button>
    <button class="delete-btn">Delete recipe</button>
  `;

  app.querySelector('.back-btn').addEventListener('click', () => { state.view = 'list'; render(); });
  app.querySelector('.step-minus').addEventListener('click', () => {
    const newServings = Math.max(1, currentServings - 1);
    state.multiplier = newServings / baseServings;
    render();
  });
  app.querySelector('.step-plus').addEventListener('click', () => {
    state.multiplier = (currentServings + 1) / baseServings;
    render();
  });
  app.querySelector('.delete-btn').addEventListener('click', () => {
    if (confirm(`Delete "${recipe.title}"? This can't be undone.`)) {
      deleteRecipeById(recipe.id);
      state.view = 'list';
      render();
    }
  });
  app.querySelector('.edit-btn').addEventListener('click', () => { openEditForm(recipe); });
  const startCookingBtn = app.querySelector('.start-cooking-btn');
  if (startCookingBtn) startCookingBtn.addEventListener('click', () => { openCookMode(recipe); });
  app.querySelector('.add-to-list-detail-btn').addEventListener('click', (e) => {
    const items = getShoppingList();
    (recipe.ingredients || []).forEach(ing => {
      const scaled = ing.amount * state.multiplier;
      const displayAmount = Number.isInteger(scaled) ? scaled : Math.round(scaled * 10) / 10;
      items.push({ id: 'item-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7), text: `${displayAmount}${ing.unit} ${ing.name}`, checked: false });
    });
    saveShoppingList(items);
    const btn = e.target;
    btn.textContent = 'Added ✓';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = '+ Add to shopping list'; btn.disabled = false; }, 1500);
  });
}

function openCookMode(recipe) {
  state.view = 'cook';
  state.cookRecipeId = recipe.id;
  state.cookStep = 0;
  resetStepTimer();
  render();
}

function resetStepTimer() {
  if (cookIntervalId) { clearInterval(cookIntervalId); cookIntervalId = null; }
  state.cookTimerRemaining = null;
  state.cookTimerRunning = false;
}

function toggleCookTimer(stepData) {
  if (state.cookTimerRunning) {
    clearInterval(cookIntervalId);
    cookIntervalId = null;
    state.cookTimerRunning = false;
    render();
    return;
  }
  if (state.cookTimerRemaining == null) state.cookTimerRemaining = stepData.timerMinutes * 60;
  state.cookTimerRunning = true;
  render();
  cookIntervalId = setInterval(() => {
    state.cookTimerRemaining--;
    const display = document.getElementById('cook-timer-text');
    if (display) display.textContent = formatCookTimer(state.cookTimerRemaining);
    if (state.cookTimerRemaining <= 0) {
      clearInterval(cookIntervalId);
      cookIntervalId = null;
      state.cookTimerRunning = false;
      playTimerBeep();
      render();
    }
  }, 1000);
}

function renderCookMode(app) {
  const recipe = findRecipeById(state.cookRecipeId);
  if (!recipe || !recipe.instructions || !recipe.instructions.length) {
    state.view = 'detail'; state.openId = state.cookRecipeId; render(); return;
  }
  const steps = recipe.instructions;
  const total = steps.length;
  const idx = Math.min(state.cookStep, total - 1);
  const stepData = getStepData(steps[idx]);

  const timerHTML = stepData.timerMinutes > 0 ? `
    <div class="cook-timer">
      <div class="cook-timer-display" id="cook-timer-text">${formatCookTimer(state.cookTimerRemaining != null ? state.cookTimerRemaining : stepData.timerMinutes * 60)}</div>
      <div class="cook-timer-controls">
        <button class="timer-toggle-btn">${state.cookTimerRunning ? 'Pause' : (state.cookTimerRemaining ? 'Resume' : 'Start')}</button>
        <button class="timer-reset-btn">Reset</button>
      </div>
      <a class="real-timer-link" href="shortcuts://run-shortcut?name=${encodeURIComponent('Start Timer')}&input=text&text=${stepData.timerMinutes}">Start real timer instead &rarr;</a>
    </div>` : '';

  app.innerHTML = `
    <button class="back-btn cook-exit-btn">&larr; Exit</button>
    <div class="cook-progress">Step ${idx + 1} of ${total}</div>
    <div class="cook-step-text">${stepData.text}</div>
    ${timerHTML}
    <div class="cook-nav">
      <button class="cook-back-btn" ${idx === 0 ? 'disabled' : ''}>Back</button>
      <button class="cook-next-btn">${idx === total - 1 ? 'Finish' : 'Next'}</button>
    </div>
  `;

  app.querySelector('.cook-exit-btn').addEventListener('click', () => {
    resetStepTimer();
    state.view = 'detail'; state.openId = state.cookRecipeId;
    render();
  });
  app.querySelector('.cook-back-btn').addEventListener('click', () => {
    if (idx === 0) return;
    resetStepTimer();
    state.cookStep = idx - 1;
    render();
  });
  app.querySelector('.cook-next-btn').addEventListener('click', () => {
    resetStepTimer();
    if (idx === total - 1) {
      state.view = 'detail'; state.openId = state.cookRecipeId;
    } else {
      state.cookStep = idx + 1;
    }
    render();
  });

  const toggleBtn = app.querySelector('.timer-toggle-btn');
  if (toggleBtn) toggleBtn.addEventListener('click', () => toggleCookTimer(stepData));
  const resetBtn = app.querySelector('.timer-reset-btn');
  if (resetBtn) resetBtn.addEventListener('click', () => { resetStepTimer(); render(); });
}

function openAddChoice() {
  state.view = 'addChoice';
  render();
}

function renderAddChoice(app) {
  app.innerHTML = `
    <button class="back-btn">&larr; Cancel</button>
    <h2 class="detail-title">Add Recipe</h2>
    <p class="choice-subtitle">How do you want to add it?</p>
    <button class="choice-card" id="choice-full">
      <strong>Add Full Recipe</strong>
      <span>Fill in every detail yourself, step by step.</span>
    </button>
    <button class="choice-card" id="choice-paste">
      <strong>Paste Recipe Details</strong>
      <span>Paste the ingredients and instructions from somewhere else, and it gets sorted into place automatically.</span>
    </button>
  `;
  app.querySelector('.back-btn').addEventListener('click', () => { state.view = 'list'; render(); });
  document.getElementById('choice-full').addEventListener('click', () => openAddForm());
  document.getElementById('choice-paste').addEventListener('click', () => openPasteForm());
}

function openPasteForm() {
  state.view = 'paste';
  state.pasteData = { title: '', ingredientsText: '', instructionsText: '' };
  render();
}

function renderPasteForm(app) {
  app.innerHTML = `
    <button class="back-btn">&larr; Cancel</button>
    <h2 class="detail-title">Paste Recipe Details</h2>

    <label class="form-label">Title</label>
    <input type="text" id="p-title" placeholder="Recipe name" value="${escapeAttr(state.pasteData.title)}">

    <label class="form-label">Ingredients</label>
    <textarea id="p-ingredients" class="paste-box" placeholder="Paste ingredients here, one per line, e.g.&#10;2 cups flour&#10;500g chicken breast&#10;1 tsp salt">${state.pasteData.ingredientsText}</textarea>

    <label class="form-label">Instructions</label>
    <textarea id="p-instructions" class="paste-box" placeholder="Paste instructions here, one step per line">${state.pasteData.instructionsText}</textarea>

    <button class="save-btn" id="parse-continue-btn">Continue &rarr;</button>
  `;

  app.querySelector('.back-btn').addEventListener('click', () => { state.view = 'list'; render(); });
  document.getElementById('p-title').addEventListener('input', (e) => { state.pasteData.title = e.target.value; });
  document.getElementById('p-ingredients').addEventListener('input', (e) => { state.pasteData.ingredientsText = e.target.value; });
  document.getElementById('p-instructions').addEventListener('input', (e) => { state.pasteData.instructionsText = e.target.value; });

  document.getElementById('parse-continue-btn').addEventListener('click', () => {
    const parsedIngredients = parseIngredientsBlock(state.pasteData.ingredientsText);
    const parsedInstructions = parseInstructionsBlock(state.pasteData.instructionsText);

    state.view = 'add';
    state.editingId = null;
    state.formSection = state.section;
    state.formData = emptyFormData();
    state.formData.title = state.pasteData.title;
    state.formIngredients = parsedIngredients.length
      ? parsedIngredients.map(i => ({ amount: String(i.amount), unit: i.unit, name: i.name }))
      : [{ amount: '', unit: '', name: '' }];
    state.formInstructions = parsedInstructions.length
      ? parsedInstructions.map(s => { const d = getStepData(s); return { text: d.text, timerMinutes: d.timerMinutes ? String(d.timerMinutes) : '' }; })
      : [{ text: '', timerMinutes: '' }];
    render();
  });
}

function openAddForm() {
  state.view = 'add';
  state.editingId = null;
  state.formSection = state.section;
  state.formData = emptyFormData();
  state.formIngredients = [{ amount: '', unit: '', name: '' }];
  state.formInstructions = [{ text: '', timerMinutes: '' }];
  render();
}

function openEditForm(recipe) {
  let section = state.section;
  for (const key of Object.keys(sectionNames)) {
    if (getAllRecipes(key).some(r => r.id === recipe.id)) { section = key; break; }
  }
  state.view = 'add';
  state.editingId = recipe.id;
  state.formSection = section;
  state.formData = {
    title: recipe.title || '',
    desc: recipe.desc || '',
    prepHours: recipe.prepHours || '',
    prepMinutes: recipe.prepMinutes || '',
    cookHours: recipe.cookHours || '',
    cookMinutes: recipe.cookMinutes || '',
    servings: recipe.servings || '',
    notes: recipe.notes || '',
    calories: recipe.macros ? recipe.macros.calories : '',
    protein: recipe.macros ? recipe.macros.protein : '',
    carbs: recipe.macros ? recipe.macros.carbs : '',
    fat: recipe.macros ? recipe.macros.fat : '',
    photo: recipe.photo || null
  };
  state.formIngredients = (recipe.ingredients && recipe.ingredients.length)
    ? recipe.ingredients.map(i => ({ amount: String(i.amount), unit: i.unit, name: i.name }))
    : [{ amount: '', unit: '', name: '' }];
  state.formInstructions = (recipe.instructions && recipe.instructions.length)
    ? recipe.instructions.map(s => { const d = getStepData(s); return { text: d.text, timerMinutes: d.timerMinutes ? String(d.timerMinutes) : '' }; })
    : [{ text: '', timerMinutes: '' }];
  render();
}

function renderAddForm(app) {
  const ingredientRows = state.formIngredients.map((ing, i) => `
    <div class="form-ingredient-row">
      <input type="text" class="ing-amount" data-index="${i}" placeholder="Amt" value="${escapeAttr(ing.amount)}">
      <select class="ing-unit" data-index="${i}">
        ${['', 'g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'oz', 'lb'].map(u =>
          `<option value="${u}" ${ing.unit === u ? 'selected' : ''}>${u === '' ? '–' : u}</option>`
        ).join('')}
      </select>
      <input type="text" class="ing-name" data-index="${i}" placeholder="Ingredient" value="${escapeAttr(ing.name)}">
      <span class="row-remove" data-type="ingredient" data-index="${i}">&times;</span>
    </div>`).join('');

  const instructionRows = state.formInstructions.map((step, i) => `
    <div class="form-instruction-row">
      <span class="step-num">${i + 1}.</span>
      <div class="form-instruction-fields">
        <textarea class="instr-text" data-index="${i}" placeholder="Describe this step...">${step.text}</textarea>
        <input type="number" class="instr-timer" data-index="${i}" min="0" placeholder="Timer (min, optional)" value="${escapeAttr(step.timerMinutes)}">
      </div>
      <span class="row-remove" data-type="instruction" data-index="${i}">&times;</span>
    </div>`).join('');

  const photoPreview = state.formData.photo ? `<img src="${state.formData.photo}" class="photo-preview">` : '';

  app.innerHTML = `
    <button class="back-btn">&larr; Cancel</button>
    <h2 class="detail-title">${state.editingId ? 'Edit Recipe' : 'Add Recipe'}</h2>

    <label class="form-label">Photo</label>
    ${photoPreview}
    <input type="file" accept="image/*" id="photo-input" style="display:none">
    <button class="secondary-btn" id="photo-btn" type="button">${state.formData.photo ? 'Change photo' : 'Add photo'}</button>

    <label class="form-label">Title</label>
    <input type="text" id="f-title" placeholder="Recipe name" value="${escapeAttr(state.formData.title)}">

    <label class="form-label">Short description</label>
    <input type="text" id="f-desc" placeholder="Shown in the recipe list" value="${escapeAttr(state.formData.desc)}">

    <label class="form-label">Prep time</label>
    <div class="duration-row">
      <input type="number" id="f-prep-hr" min="0" placeholder="0" value="${escapeAttr(state.formData.prepHours)}"><span class="duration-unit">hr</span>
      <input type="number" id="f-prep-min" min="0" placeholder="0" value="${escapeAttr(state.formData.prepMinutes)}"><span class="duration-unit">min</span>
    </div>

    <label class="form-label">Cook time</label>
    <div class="duration-row">
      <input type="number" id="f-cook-hr" min="0" placeholder="0" value="${escapeAttr(state.formData.cookHours)}"><span class="duration-unit">hr</span>
      <input type="number" id="f-cook-min" min="0" placeholder="0" value="${escapeAttr(state.formData.cookMinutes)}"><span class="duration-unit">min</span>
    </div>

    <label class="form-label">Servings</label>
    <input type="number" id="f-servings" value="${escapeAttr(state.formData.servings)}">

    <label class="form-label">Ingredients</label>
    <div id="ingredient-rows">${ingredientRows}</div>
    <button class="add-row-btn" id="add-ingredient-btn" type="button">+ Add ingredient</button>

    <label class="form-label">Instructions</label>
    <div id="instruction-rows">${instructionRows}</div>
    <button class="add-row-btn" id="add-instruction-btn" type="button">+ Add step</button>

    <label class="form-label">Macros per serving (optional)</label>
    <div class="form-row-4">
      <input type="number" id="f-calories" placeholder="kcal" value="${escapeAttr(state.formData.calories)}">
      <input type="number" id="f-protein" placeholder="protein g" value="${escapeAttr(state.formData.protein)}">
      <input type="number" id="f-carbs" placeholder="carbs g" value="${escapeAttr(state.formData.carbs)}">
      <input type="number" id="f-fat" placeholder="fat g" value="${escapeAttr(state.formData.fat)}">
    </div>

    <label class="form-label">Notes</label>
    <textarea id="f-notes" placeholder="Serving suggestions, variations, etc.">${state.formData.notes}</textarea>

    <button class="save-btn" id="save-recipe-btn" type="button">${state.editingId ? 'Save Changes' : 'Save Recipe'}</button>
  `;

  app.querySelector('.back-btn').addEventListener('click', () => {
    if (state.editingId) { state.view = 'detail'; state.openId = state.editingId; }
    else { state.view = 'list'; }
    state.editingId = null;
    render();
  });

  const fieldMap = { 'f-title': 'title', 'f-desc': 'desc', 'f-prep-hr': 'prepHours', 'f-prep-min': 'prepMinutes', 'f-cook-hr': 'cookHours', 'f-cook-min': 'cookMinutes', 'f-servings': 'servings', 'f-notes': 'notes', 'f-calories': 'calories', 'f-protein': 'protein', 'f-carbs': 'carbs', 'f-fat': 'fat' };
  Object.keys(fieldMap).forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => { state.formData[fieldMap[id]] = el.value; });
  });

  document.querySelectorAll('.ing-amount').forEach(el => el.addEventListener('input', () => { state.formIngredients[el.dataset.index].amount = el.value; }));
  document.querySelectorAll('.ing-unit').forEach(el => el.addEventListener('change', () => { state.formIngredients[el.dataset.index].unit = el.value; }));
  document.querySelectorAll('.ing-name').forEach(el => el.addEventListener('input', () => { state.formIngredients[el.dataset.index].name = el.value; }));
  document.querySelectorAll('.instr-text').forEach(el => el.addEventListener('input', () => { state.formInstructions[el.dataset.index].text = el.value; }));
  document.querySelectorAll('.instr-timer').forEach(el => el.addEventListener('input', () => { state.formInstructions[el.dataset.index].timerMinutes = el.value; }));

  document.querySelectorAll('.row-remove').forEach(el => {
    el.addEventListener('click', () => {
      const idx = Number(el.dataset.index);
      if (el.dataset.type === 'ingredient') {
        state.formIngredients.splice(idx, 1);
        if (state.formIngredients.length === 0) state.formIngredients.push({ amount: '', unit: '', name: '' });
      } else {
        state.formInstructions.splice(idx, 1);
        if (state.formInstructions.length === 0) state.formInstructions.push({ text: '', timerMinutes: '' });
      }
      render();
    });
  });

  document.getElementById('add-ingredient-btn').addEventListener('click', () => {
    state.formIngredients.push({ amount: '', unit: '', name: '' });
    render();
  });
  document.getElementById('add-instruction-btn').addEventListener('click', () => {
    state.formInstructions.push({ text: '', timerMinutes: '' });
    render();
  });

  document.getElementById('photo-btn').addEventListener('click', () => { document.getElementById('photo-input').click(); });
  document.getElementById('photo-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    resizeImage(file, (dataUrl) => { state.formData.photo = dataUrl; render(); });
  });

  document.getElementById('save-recipe-btn').addEventListener('click', () => {
    if (!state.formData.title.trim()) { alert('Give the recipe a title first.'); return; }
    const ingredients = state.formIngredients
      .filter(ing => ing.name.trim())
      .map(ing => ({ name: ing.name.trim(), amount: parseFloat(ing.amount) || 0, unit: ing.unit }));
    const instructions = state.formInstructions
      .filter(s => s.text.trim())
      .map(s => {
        const mins = Number(s.timerMinutes) || 0;
        return mins > 0 ? { text: s.text.trim(), timerMinutes: mins } : s.text.trim();
      });
    const macros = (state.formData.calories || state.formData.protein || state.formData.carbs || state.formData.fat)
      ? { calories: Number(state.formData.calories) || 0, protein: Number(state.formData.protein) || 0, carbs: Number(state.formData.carbs) || 0, fat: Number(state.formData.fat) || 0 }
      : null;

    const recipeData = {
      title: state.formData.title.trim(),
      desc: state.formData.desc.trim(),
      prepHours: Number(state.formData.prepHours) || 0,
      prepMinutes: Number(state.formData.prepMinutes) || 0,
      cookHours: Number(state.formData.cookHours) || 0,
      cookMinutes: Number(state.formData.cookMinutes) || 0,
      servings: Number(state.formData.servings) || 1,
      ingredients, instructions, macros,
      notes: state.formData.notes.trim(),
      photo: state.formData.photo
    };

    if (state.editingId) {
      const edits = getRecipeEdits();
      edits[state.editingId] = recipeData;
      saveRecipeEdits(edits);
      state.view = 'detail';
      state.openId = state.editingId;
      state.editingId = null;
    } else {
      const newRecipe = { id: 'custom-' + Date.now(), ...recipeData };
      const data = getCustomRecipes();
      data[state.formSection].push(newRecipe);
      saveCustomRecipes(data);
      state.section = state.formSection;
      state.view = 'list';
    }
    render();
  });
}

function addShoppingItem() {
  const text = prompt('Add item (e.g. "500g pasta"):');
  if (!text) return;
  const items = getShoppingList();
  items.push({ id: 'item-' + Date.now(), text: text.trim(), checked: false });
  saveShoppingList(items);
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  const btn = document.createElement('button');
  btn.className = 'add-btn';
  btn.textContent = '+';
  btn.addEventListener('click', () => {
    if (state.section === 'list') addShoppingItem();
    else if (state.section === 'fridge') addFridgeItem();
    else openAddChoice();
  });
  document.body.appendChild(btn);
});
