const STORAGE_KEY = 'customRecipes';
const DELETED_KEY = 'deletedRecipeIds';

const starterRecipes = {
  quick: [
    { id: 'q1', title: 'Chicken Parmesan', desc: 'Breaded chicken, tomato sauce, melted mozzarella.', prepTime: 15, cookTime: 25, servings: 2,
      ingredients: [{ name: 'chicken breasts', amount: 2, unit: '' },{ name: 'breadcrumbs', amount: 100, unit: 'g' },{ name: 'parmesan, grated', amount: 40, unit: 'g' },{ name: 'mozzarella', amount: 120, unit: 'g' },{ name: 'tomato sauce', amount: 250, unit: 'ml' },{ name: 'egg', amount: 1, unit: '' },{ name: 'olive oil', amount: 30, unit: 'ml' }],
      instructions: ['Preheat oven to 200°C.','Beat the egg in a shallow bowl. Coat each chicken breast in egg, then press into breadcrumbs.','Fry in olive oil over medium heat, 3-4 minutes per side until golden.','Transfer to a baking dish, top with tomato sauce and both cheeses.','Bake for 15 minutes until the cheese is bubbling and golden.'],
      macros: { calories: 620, protein: 48, carbs: 38, fat: 30 }, notes: 'Great with a side salad or spaghetti.' },
    { id: 'q2', title: 'Zucchini Frittata', desc: 'Eggs, zucchini, cheese — pan to oven in 15 minutes.', prepTime: 10, cookTime: 15, servings: 2,
      ingredients: [{ name: 'eggs', amount: 6, unit: '' },{ name: 'zucchini, sliced', amount: 200, unit: 'g' },{ name: 'parmesan, grated', amount: 30, unit: 'g' },{ name: 'olive oil', amount: 15, unit: 'ml' },{ name: 'salt', amount: 2, unit: 'g' }],
      instructions: ['Whisk the eggs with the parmesan and salt.','Heat oil in an oven-safe pan, cook zucchini for 5 minutes until soft.','Pour in the eggs, cook on low for 5 minutes until mostly set.','Finish under the grill for 3-4 minutes until golden on top.'],
      macros: { calories: 340, protein: 24, carbs: 6, fat: 24 }, notes: 'Good hot or cold, keeps well for lunch the next day.' },
    { id: 'q3', title: 'Baked Salmon with Tomatoes & Zucchini', desc: 'One tray, 20 minutes, hard to overcook.', prepTime: 10, cookTime: 20, servings: 2,
      ingredients: [{ name: 'salmon fillets', amount: 2, unit: '' },{ name: 'cherry tomatoes', amount: 200, unit: 'g' },{ name: 'zucchini, sliced', amount: 200, unit: 'g' },{ name: 'olive oil', amount: 20, unit: 'ml' },{ name: 'garlic cloves', amount: 2, unit: '' }],
      instructions: ['Preheat oven to 200°C.','Place salmon, tomatoes and zucchini on a tray. Drizzle with oil, scatter over crushed garlic.','Bake for 18-20 minutes until the salmon flakes easily.'],
      macros: { calories: 410, protein: 38, carbs: 9, fat: 25 }, notes: 'Serve with rice or crusty bread.' }
  ],
  prep: [
    { id: 'p1', title: 'Beef Ragù', desc: 'Slow-simmered beef and tomato sauce, freezes well.', prepTime: 15, cookTime: 90, servings: 4,
      ingredients: [{ name: 'beef mince', amount: 500, unit: 'g' },{ name: 'onion, diced', amount: 1, unit: '' },{ name: 'carrot, diced', amount: 1, unit: '' },{ name: 'celery stick, diced', amount: 1, unit: '' },{ name: 'tomato passata', amount: 700, unit: 'ml' },{ name: 'olive oil', amount: 20, unit: 'ml' },{ name: 'garlic cloves', amount: 2, unit: '' }],
      instructions: ['Heat oil in a large pot, soften onion, carrot and celery for 5 minutes.','Add beef mince, cook until browned.','Stir in garlic and passata, season.','Simmer on low for 1.5 hours, stirring occasionally.'],
      macros: { calories: 390, protein: 32, carbs: 14, fat: 22 }, notes: 'Freezes well in portions for up to 3 months.' },
    { id: 'p2', title: 'Meatballs in Tomato Sauce', desc: 'Big batch, great over pasta or on its own.', prepTime: 20, cookTime: 30, servings: 4,
      ingredients: [{ name: 'beef mince', amount: 500, unit: 'g' },{ name: 'breadcrumbs', amount: 50, unit: 'g' },{ name: 'egg', amount: 1, unit: '' },{ name: 'parmesan, grated', amount: 30, unit: 'g' },{ name: 'tomato passata', amount: 500, unit: 'ml' },{ name: 'garlic cloves', amount: 2, unit: '' }],
      instructions: ['Mix beef, breadcrumbs, egg and parmesan. Roll into balls.','Fry meatballs in a splash of oil until browned all over.','Add passata and garlic, cover and simmer for 20 minutes.'],
      macros: { calories: 410, protein: 34, carbs: 16, fat: 23 }, notes: 'Serve over pasta or with crusty bread.' }
  ],
  baking: [
    { id: 'b1', title: 'Basic Pancakes', desc: 'Four ingredients, ready in 10 minutes.', prepTime: 5, cookTime: 10, servings: 2,
      ingredients: [{ name: 'flour', amount: 120, unit: 'g' },{ name: 'milk', amount: 180, unit: 'ml' },{ name: 'egg', amount: 1, unit: '' },{ name: 'butter, melted', amount: 15, unit: 'g' }],
      instructions: ['Whisk flour, milk and egg into a smooth batter.','Stir in melted butter.','Cook spoonfuls in a hot non-stick pan, 2 minutes per side.'],
      macros: { calories: 320, protein: 12, carbs: 44, fat: 10 }, notes: 'Top with fruit or honey.' },
    { id: 'b2', title: 'One-Bowl Vanilla Cake', desc: 'Mix, pour, bake — no mixer needed.', prepTime: 10, cookTime: 35, servings: 8,
      ingredients: [{ name: 'flour', amount: 250, unit: 'g' },{ name: 'sugar', amount: 200, unit: 'g' },{ name: 'butter, softened', amount: 150, unit: 'g' },{ name: 'eggs', amount: 3, unit: '' },{ name: 'milk', amount: 80, unit: 'ml' },{ name: 'baking powder', amount: 8, unit: 'g' },{ name: 'vanilla extract', amount: 5, unit: 'ml' }],
      instructions: ['Preheat oven to 180°C, grease a cake tin.','Beat butter and sugar until pale and fluffy.','Beat in eggs one at a time, then vanilla.','Fold in flour and baking powder, then milk.','Pour into the tin and bake for 30-35 minutes until a skewer comes out clean.'],
      macros: { calories: 310, protein: 5, carbs: 42, fat: 14 }, notes: 'Keeps for 3 days in an airtight container.' }
  ]
};

const sectionNames = { quick: 'Quick Meals', prep: 'Meal Prep', baking: 'Baking' };
let state = { section: 'quick', view: 'list', openId: null, multiplier: 1, query: '' };

function escapeAttr(str) { return str.replace(/"/g, '&quot;'); }

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
  return [...starterRecipes[section], ...(custom[section] || [])].filter(r => !deleted.includes(r.id));
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

function render() {
  const app = document.getElementById('app');
  if (state.view === 'detail') renderDetail(app);
  else renderList(app);
}

function renderList(app) {
  const searchBarHTML = `<div class="search-bar"><input id="search-input" type="search" placeholder="Search recipes..." value="${escapeAttr(state.query)}"></div>`;
  let bodyHTML;

  if (state.query.trim()) {
    const results = searchRecipes(state.query);
    const cards = results.map(r =>
      `<div class="recipe-card" data-id="${r.id}"><span class="badge">${sectionNames[r.section]}</span><h3>${r.title}</h3><p>${r.desc || ''}</p></div>`
    ).join('');
    bodyHTML = `<div id="cards">${cards || '<p class="empty">No recipes match your search.</p>'}</div>`;
  } else {
    const tabs = Object.keys(sectionNames).map(key =>
      `<div class="tab ${key === state.section ? 'active' : ''}" data-section="${key}">${sectionNames[key]}</div>`
    ).join('');
    const cards = getAllRecipes(state.section).map(r =>
      `<div class="recipe-card" data-id="${r.id}"><h3>${r.title}</h3><p>${r.desc || ''}</p></div>`
    ).join('');
    bodyHTML = `<div class="section-tabs">${tabs}</div><div id="cards">${cards || '<p class="empty">No recipes here yet.</p>'}</div>`;
  }

  app.innerHTML = searchBarHTML + bodyHTML;

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    state.query = e.target.value;
    render();
    const newInput = document.getElementById('search-input');
    if (newInput) { newInput.focus(); newInput.setSelectionRange(newInput.value.length, newInput.value.length); }
  });

  if (!state.query.trim()) {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => { state.section = tab.dataset.section; render(); });
    });
  }
  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      state.openId = card.dataset.id;
      state.view = 'detail';
      state.multiplier = 1;
      render();
    });
  });
}

function renderDetail(app) {
  const recipe = findRecipeById(state.openId);
  if (!recipe) { state.view = 'list'; render(); return; }

  const baseServings = recipe.servings || 1;
  const currentServings = Math.round(baseServings * state.multiplier);

  const timeRow = (recipe.prepTime || recipe.cookTime)
    ? `<div class="detail-times">${recipe.prepTime ? `<span>Prep: ${recipe.prepTime} min</span>` : ''}${recipe.cookTime ? `<span>Cook: ${recipe.cookTime} min</span>` : ''}</div>` : '';

  const ingredientsHTML = (recipe.ingredients && recipe.ingredients.length)
    ? `<ul class="ingredient-list">${recipe.ingredients.map(ing => {
        const scaled = ing.amount * state.multiplier;
        const displayAmount = Number.isInteger(scaled) ? scaled : Math.round(scaled * 10) / 10;
        return `<li>${displayAmount}${ing.unit} ${ing.name}</li>`;
      }).join('')}</ul>`
    : `<p class="empty">No ingredients added yet.</p>`;

  const instructionsHTML = (recipe.instructions && recipe.instructions.length)
    ? `<ol class="instruction-list">${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>`
    : recipe.desc ? `<p>${recipe.desc}</p>` : `<p class="empty">No instructions added yet.</p>`;

  const macrosHTML = recipe.macros
    ? `<h4 class="section-label">Macros (per serving)</h4><div class="macros"><div><strong>${recipe.macros.calories}</strong><span>kcal</span></div><div><strong>${recipe.macros.protein}g</strong><span>protein</span></div><div><strong>${recipe.macros.carbs}g</strong><span>carbs</span></div><div><strong>${recipe.macros.fat}g</strong><span>fat</span></div></div>` : '';

  const notesHTML = recipe.notes ? `<div class="notes"><strong>Notes:</strong> ${recipe.notes}</div>` : '';

  app.innerHTML = `
    <button class="back-btn">&larr; Back</button>
    <h2 class="detail-title">${recipe.title}</h2>
    ${timeRow}
    <div class="servings-row"><span>Servings</span><div class="stepper"><button class="step-minus">-</button><span>${currentServings}</span><button class="step-plus">+</button></div></div>
    <h4 class="section-label">Ingredients</h4>
    ${ingredientsHTML}
    <h4 class="section-label">Instructions</h4>
    ${instructionsHTML}
    ${macrosHTML}
    ${notesHTML}
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
}

function addRecipe() {
  const title = prompt('Recipe name:');
  if (!title) return;
  const desc = prompt('Short description (ingredients/method):') || '';
  const data = getCustomRecipes();
  const id = 'custom-' + Date.now();
  data[state.section].push({ id, title, desc });
  saveCustomRecipes(data);
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  const btn = document.createElement('button');
  btn.className = 'add-btn';
  btn.textContent = '+';
  btn.addEventListener('click', addRecipe);
  document.body.appendChild(btn);
});
