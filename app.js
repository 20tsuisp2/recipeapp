const STORAGE_KEY = 'customRecipes';

const starterRecipes = {
  quick: [
    { title: 'Chicken Parmesan', desc: 'Breaded chicken, tomato sauce, melted mozzarella.' },
    { title: 'Zucchini Frittata', desc: 'Eggs, zucchini, cheese — pan to oven in 15 minutes.' },
    { title: 'Baked Salmon with Tomatoes & Zucchini', desc: 'One tray, 20 minutes, hard to overcook.' }
  ],
  prep: [
    { title: 'Beef Ragù', desc: 'Slow-simmered beef and tomato sauce, freezes well.' },
    { title: 'Meatballs in Tomato Sauce', desc: 'Big batch, great over pasta or on its own.' }
  ],
  baking: [
    { title: 'Basic Pancakes', desc: 'Four ingredients, ready in 10 minutes.' },
    { title: 'One-Bowl Vanilla Cake', desc: 'Mix, pour, bake — no mixer needed.' }
  ]
};

const sectionNames = { quick: 'Quick Meals', prep: 'Meal Prep', baking: 'Baking' };
let activeSection = 'quick';

function getCustomRecipes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : { quick: [], prep: [], baking: [] };
}

function saveCustomRecipes(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getAllRecipes(section) {
  const custom = getCustomRecipes();
  return [...starterRecipes[section], ...(custom[section] || [])];
}

function render() {
  const app = document.getElementById('app');
  const tabs = Object.keys(sectionNames).map(key =>
    `<div class="tab ${key === activeSection ? 'active' : ''}" data-section="${key}">${sectionNames[key]}</div>`
  ).join('');

  const cards = getAllRecipes(activeSection).map(r =>
    `<div class="recipe-card"><h3>${r.title}</h3><p>${r.desc}</p></div>`
  ).join('');

  app.innerHTML = `<div class="section-tabs">${tabs}</div>${cards || '<p>No recipes here yet.</p>'}`;

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeSection = tab.dataset.section;
      render();
    });
  });
}

function addRecipe() {
  const title = prompt('Recipe name:');
  if (!title) return;
  const desc = prompt('Short description (ingredients/method):') || '';
  const data = getCustomRecipes();
  data[activeSection].push({ title, desc });
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
