// Folder/section definitions. Each recipe lists which of these it belongs to
// in its `folders` array, so one recipe can appear in several sections.
const folderDefs = [
  { id: 'quick', label: 'Quick meals' },
  { id: 'onepot', label: 'One pot meals' },
  { id: 'airfry', label: 'Airfry/Oven meals' },
  { id: 'chicken', label: 'Chicken' },
  { id: 'beef', label: 'Beef' },
  { id: 'pork', label: 'Pork' },
  { id: 'seafood', label: 'Seafood' },
  { id: 'marinades', label: 'Marinades' }
];

const allRecipes = [
  {
    id: 'r01', title: 'Quick Creamy Miso Chicken Ramen',
    desc: 'Caramelised soy chicken mince in a creamy coconut-miso broth with noodles, corn and soft egg.',
    folders: ['quick', 'onepot', 'chicken'],
    image: 'images/quick-creamy-miso-chicken-ramen.webp',
    prepHours: 0, prepMinutes: 5, cookHours: 0, cookMinutes: 15, servings: 4,
    ingredients: [
      { name: 'extra-virgin olive oil', amount: 3, unit: 'tbsp' },
      { name: 'minced (ground) chicken', amount: 500, unit: 'g' },
      { name: 'tamari or soy sauce', amount: 2, unit: 'tbsp' },
      { name: 'brown sugar', amount: 2, unit: 'tsp' },
      { name: 'dark soy sauce (optional)', amount: 0.5, unit: 'tsp' },
      { name: 'sesame oil', amount: 2, unit: 'tsp' },
      { name: 'unsalted butter', amount: 40, unit: 'g' },
      { name: 'freshly grated garlic', amount: 1, unit: 'tbsp' },
      { name: 'freshly grated ginger', amount: 1, unit: 'tbsp' },
      { name: 'spring onions, finely sliced', amount: 3, unit: '' },
      { name: 'chicken stock', amount: 750, unit: 'ml' },
      { name: 'water', amount: 500, unit: 'ml' },
      { name: 'coconut milk', amount: 250, unit: 'ml' },
      { name: 'white miso paste', amount: 1.5, unit: 'tbsp' },
      { name: 'rice wine vinegar', amount: 2, unit: 'tbsp' },
      { name: 'ramen noodles', amount: 300, unit: 'g' },
      { name: 'tamari or soy sauce, to taste', amount: 2, unit: 'tbsp' },
      { name: 'soft-boiled eggs, halved', amount: 2, unit: '' },
      { name: 'spring onions, finely sliced, to serve', amount: 2, unit: '' },
      { name: 'canned sweet corn kernels, drained', amount: 400, unit: 'g' },
      { name: 'carrot, grated', amount: 1, unit: '' },
      { name: 'toasted sesame seeds', amount: 2, unit: 'tsp' }
    ],
    instructions: [
      'Heat 1 tbsp of the olive oil in a large frying pan over high heat. Add the chicken and cook for 3-4 minutes, breaking it up, until browned and any excess moisture has cooked off.',
      'Add the remaining oil, tamari, brown sugar and dark soy sauce (if using). Cook for 2-3 minutes until crispy and golden. Set aside in a bowl.',
      'In the same pan, add the sesame oil, butter, garlic, ginger and spring onion over medium heat. Cook, stirring, for 1-2 minutes until fragrant.',
      'Add the chicken stock, water, coconut milk, miso paste, tamari and vinegar. Bring to the boil.',
      { text: 'Add the noodles, pushing them under the liquid. Cook for 1 minute, separating with tongs. Season the broth to taste.', timerMinutes: 1 },
      'Divide the ramen among bowls. Top each with the crispy chicken mince and your choice of toppings.'
    ],
    macros: { calories: 770, protein: 39, carbs: 48, fat: 46 },
    notes: 'Broth (without noodles) keeps 3 days in the fridge or freezes for 2 months. Leftovers with noodles keep 3 days but are not suitable to freeze.'
  },
  {
    id: 'r02', title: 'Korean Beef Rice Bowls',
    desc: 'Sweet, tangy gochujang beef mince over rice with kimchi, carrot, cucumber and a spicy mayo drizzle.',
    folders: ['quick', 'onepot', 'beef'],
    image: 'images/korean-beef-rice-bowls.webp',
    prepHours: 0, prepMinutes: 10, cookHours: 0, cookMinutes: 10, servings: 4,
    ingredients: [
      { name: 'freshly grated garlic', amount: 1, unit: 'tsp' },
      { name: 'freshly grated ginger', amount: 1, unit: 'tsp' },
      { name: 'soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'brown sugar', amount: 2, unit: 'tbsp' },
      { name: 'sesame oil', amount: 1, unit: 'tbsp' },
      { name: 'gochujang', amount: 1, unit: 'tbsp' },
      { name: 'rice vinegar', amount: 1, unit: 'tsp' },
      { name: 'sesame seeds, plus extra to garnish', amount: 1, unit: 'tbsp' },
      { name: 'extra-virgin olive oil', amount: 2, unit: 'tbsp' },
      { name: 'minced (ground) beef', amount: 500, unit: 'g' },
      { name: 'spring onions, finely sliced (1 tbsp reserved for garnish)', amount: 2, unit: '' },
      { name: 'whole-egg mayonnaise', amount: 3, unit: 'tbsp' },
      { name: 'gochujang', amount: 1, unit: 'tsp' },
      { name: 'sesame oil', amount: 0.5, unit: 'tsp' },
      { name: 'rice vinegar', amount: 0.5, unit: 'tsp' },
      { name: 'cooked jasmine rice', amount: 370, unit: 'g' },
      { name: 'kimchi', amount: 240, unit: 'g' },
      { name: 'carrot, julienned', amount: 1, unit: '' },
      { name: 'Lebanese cucumber, sliced into half moons', amount: 1, unit: '' }
    ],
    instructions: [
      'Whisk together the garlic, ginger, soy sauce, brown sugar, sesame oil, gochujang, rice vinegar and sesame seeds for the stir-fry sauce. Set aside.',
      'Heat the oil in a large frying pan over medium-high heat. Add the beef and cook until browned, breaking it up as it cooks.',
      'Pour in the stir-fry sauce and stir to coat. Simmer for 2-3 minutes until slightly thickened. Turn off the heat and stir through the spring onion.',
      'Whisk together the mayo drizzle ingredients until smooth.',
      'Divide the rice among bowls. Top with the beef, kimchi, carrot and cucumber. Drizzle with the mayo and garnish with extra sesame seeds and spring onion.'
    ],
    macros: { calories: 677, protein: 35, carbs: 44, fat: 39 },
    notes: 'Beef keeps 3 days in the fridge; toppings can be prepped 2-3 days ahead.'
  },
  {
    id: 'r03', title: 'Chicken Quesadillas',
    desc: 'Crispy, cheesy quesadillas loaded with spiced chicken thigh, ready in 20 minutes.',
    folders: ['quick', 'airfry', 'chicken'],
    image: 'images/chicken-quesadillas.webp',
    prepHours: 0, prepMinutes: 10, cookHours: 0, cookMinutes: 10, servings: 4,
    ingredients: [
      { name: 'boneless, skinless chicken thighs, finely diced', amount: 500, unit: 'g' },
      { name: 'olive oil', amount: 3, unit: 'tbsp' },
      { name: 'sweet paprika', amount: 1, unit: 'tsp' },
      { name: 'garlic powder', amount: 1, unit: 'tsp' },
      { name: 'onion powder', amount: 1, unit: 'tsp' },
      { name: 'ground cumin', amount: 0.5, unit: 'tsp' },
      { name: 'dried oregano', amount: 0.5, unit: 'tsp' },
      { name: 'sea salt flakes', amount: 1, unit: 'tsp' },
      { name: 'freshly cracked black pepper', amount: 0.5, unit: 'tsp' },
      { name: 'red onion, finely diced', amount: 1, unit: '' },
      { name: 'freshly minced garlic', amount: 1, unit: 'tsp' },
      { name: 'large flour tortillas', amount: 4, unit: '' },
      { name: 'shredded cheese (cheddar/mozzarella mix)', amount: 250, unit: 'g' },
      { name: 'sour cream, to serve', amount: 1, unit: '' },
      { name: 'coriander leaves, picked', amount: 0.25, unit: 'bunch' },
      { name: 'lime wedges, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      'Toss the diced chicken with 2 tbsp of the olive oil, paprika, garlic powder, onion powder, cumin, oregano, salt and pepper. Set aside.',
      'Heat the remaining oil in a large frying pan over medium-high heat. Add onion and garlic, cook 1-2 minutes until softened.',
      { text: 'Add the chicken and cook, stirring, for 6-8 minutes until golden and cooked through. Set aside on a plate.', timerMinutes: 7 },
      'In the same pan, add a tortilla and sprinkle over cheese, the chicken mixture, then more cheese on one half. Fold in half.',
      { text: 'Cook over medium-low heat for 2-3 minutes each side until golden and crispy. Repeat with remaining tortillas.', timerMinutes: 5 },
      'Rest for 1 minute, then cut into wedges. Serve with sour cream, coriander and lime.'
    ],
    macros: { calories: 686, protein: 42, carbs: 26, fat: 46 },
    notes: 'Can be cooked in the air fryer (180C, 5-7 min, flip halfway) or oven (220C, 10 min, flip halfway) instead of the pan. Freezes well before or after cooking.'
  },
  {
    id: 'r04', title: 'Sticky Hoisin Beef',
    desc: 'One-pan hoisin beef mince with cabbage and carrot over rice noodles, finished with peanuts and lime.',
    folders: ['quick', 'onepot', 'beef'],
    image: 'images/sticky-hoisin-beef.webp',
    prepHours: 0, prepMinutes: 5, cookHours: 0, cookMinutes: 15, servings: 4,
    ingredients: [
      { name: 'wide flat rice noodles', amount: 200, unit: 'g' },
      { name: 'sesame oil, to toss noodles', amount: 1, unit: 'tsp' },
      { name: 'extra-virgin olive oil', amount: 1, unit: 'tbsp' },
      { name: 'freshly minced garlic', amount: 1, unit: 'tbsp' },
      { name: 'spring onions, finely sliced (white/green separated)', amount: 2, unit: '' },
      { name: 'minced (ground) beef', amount: 500, unit: 'g' },
      { name: 'carrot, julienned', amount: 1, unit: '' },
      { name: 'wombok (napa) cabbage, finely shredded', amount: 0.5, unit: '' },
      { name: 'hoisin sauce', amount: 60, unit: 'ml' },
      { name: 'tamari or soy sauce', amount: 1, unit: 'tbsp' },
      { name: 'dark soy sauce', amount: 1, unit: 'tbsp' },
      { name: 'rice wine vinegar', amount: 1, unit: 'tbsp' },
      { name: 'brown sugar', amount: 1, unit: 'tbsp' },
      { name: 'sesame oil', amount: 1, unit: 'tsp' },
      { name: 'crushed roasted peanuts (optional)', amount: 40, unit: 'g' },
      { name: 'lime wedges, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      'Cook the noodles per packet instructions. Drain, rinse under cold water, toss with sesame oil. Set aside.',
      { text: 'Heat oil in a large pan over medium-high heat. Add garlic and white spring onion, cook 30 seconds. Add beef mince and cook, breaking up, for 5-7 minutes until browned.', timerMinutes: 6 },
      'Add the carrot and cabbage, cook 2-3 minutes until softened.',
      { text: 'Add hoisin, tamari, dark soy, vinegar, brown sugar and sesame oil. Cook 2-3 minutes until sticky.', timerMinutes: 3 },
      'Divide noodles among bowls, top with the beef mixture, peanuts, green spring onion and lime wedges.'
    ],
    macros: { calories: 667, protein: 40, carbs: 70, fat: 23 },
    notes: 'Beef mixture keeps 3 days in the fridge or freezes for 3 months (noodles do not freeze).'
  },
  {
    id: 'r05', title: 'Honey Garlic Chicken Thighs',
    desc: 'Pan-seared chicken thighs finished in a sticky honey soy glaze, ready in 20 minutes.',
    folders: ['quick', 'onepot', 'chicken'],
    image: 'images/honey-garlic-chicken-thighs.webp',
    prepHours: 0, prepMinutes: 5, cookHours: 0, cookMinutes: 15, servings: 4,
    ingredients: [
      { name: 'boneless chicken thighs, skin on or off', amount: 6, unit: '' },
      { name: 'sea salt flakes', amount: 0.5, unit: 'tsp' },
      { name: 'freshly cracked black pepper', amount: 0.5, unit: 'tsp' },
      { name: 'olive oil', amount: 1, unit: 'tbsp' },
      { name: 'tamari or soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'honey', amount: 3, unit: 'tbsp' },
      { name: 'brown sugar', amount: 1, unit: 'tbsp' },
      { name: 'freshly minced garlic', amount: 1, unit: 'tbsp' },
      { name: 'rice vinegar', amount: 1, unit: 'tbsp' },
      { name: 'sesame oil', amount: 1, unit: 'tsp' },
      { name: 'cornflour (cornstarch)', amount: 1, unit: 'tsp' },
      { name: 'water', amount: 2, unit: 'tbsp' },
      { name: 'steamed rice, to serve', amount: 1, unit: '' },
      { name: 'steamed Chinese broccoli or Asian greens, to serve', amount: 1, unit: '' },
      { name: 'spring onion, finely sliced, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      'Pat the chicken dry, season both sides with salt and pepper.',
      { text: 'Heat oil in a large pan over medium-high heat. Add chicken skin-side down and cook 4-5 minutes until golden. Flip and cook a further 4-5 minutes until cooked through. Set aside.', timerMinutes: 9 },
      'Whisk together the sauce ingredients (soy, honey, brown sugar, garlic, vinegar, sesame oil, cornflour, water) in a small bowl.',
      { text: 'Reduce heat to medium. Pour sauce into the pan, simmer 2-3 minutes until thickened and glossy. Return chicken to the pan, turning to coat.', timerMinutes: 3 },
      'Slice chicken if desired, serve over rice with greens on the side, spooning over extra sauce and spring onion.'
    ],
    macros: { calories: 400, protein: 43, carbs: 19, fat: 17 },
    notes: 'Leftovers keep 3 days in the fridge or freeze for 2 months.'
  },
  {
    id: 'r06', title: 'Speedy Satay Chicken',
    desc: 'Chicken mince simmered in a creamy coconut peanut satay sauce, no marinating or skewers needed.',
    folders: ['quick', 'onepot', 'chicken'],
    image: 'images/speedy-satay-chicken.webp',
    prepHours: 0, prepMinutes: 5, cookHours: 0, cookMinutes: 10, servings: 4,
    ingredients: [
      { name: 'coconut milk', amount: 400, unit: 'ml' },
      { name: 'chicken stock', amount: 125, unit: 'ml' },
      { name: 'natural smooth peanut butter', amount: 90, unit: 'g' },
      { name: 'kecap manis', amount: 1, unit: 'tbsp' },
      { name: 'dark soy sauce', amount: 1, unit: 'tsp' },
      { name: 'light olive oil', amount: 2, unit: 'tbsp' },
      { name: 'brown onion, finely diced', amount: 1, unit: '' },
      { name: 'freshly minced garlic', amount: 1, unit: 'tbsp' },
      { name: 'minced (ground) chicken', amount: 500, unit: 'g' },
      { name: 'water, if needed', amount: 2, unit: 'tbsp' },
      { name: 'mild curry powder', amount: 1, unit: 'tbsp' },
      { name: 'ground turmeric', amount: 0.5, unit: 'tsp' },
      { name: 'sweet paprika', amount: 1, unit: 'tsp' },
      { name: 'white sugar', amount: 1, unit: 'tsp' },
      { name: 'sea salt flakes, plus extra to taste', amount: 0.5, unit: 'tsp' },
      { name: 'steamed jasmine rice, to serve', amount: 1, unit: '' },
      { name: 'Lebanese cucumbers, sliced', amount: 2, unit: '' },
      { name: 'red onion, sliced', amount: 0.25, unit: '' },
      { name: 'crushed peanuts', amount: 40, unit: 'g' },
      { name: 'fresh coriander leaves', amount: 0.25, unit: 'bunch' },
      { name: 'lime wedges', amount: 1, unit: '' }
    ],
    instructions: [
      'Whisk together all the satay sauce ingredients in a jug until smooth. Set aside.',
      { text: 'Heat oil in a large pan over medium-high heat. Add onion and garlic, cook 1-2 minutes. Add chicken mince and cook, breaking up gently, for 3-4 minutes until juicy, chunky pieces form.', timerMinutes: 4 },
      'Deglaze with the water, then add curry powder, turmeric, paprika, sugar and salt.',
      { text: 'Add the satay sauce, reduce heat to medium, simmer 3-4 minutes until thickened, glossy and creamy.', timerMinutes: 4 },
      'Season to taste. Spoon over rice with cucumber, red onion, peanuts, coriander, lime and chilli oil if using.'
    ],
    macros: { calories: 641, protein: 37, carbs: 19, fat: 46 },
    notes: 'Keeps in the fridge for 3 days or freezes for 3 months.'
  },
  {
    id: 'r07', title: 'Air Fryer Sticky Pork Belly Bites',
    desc: 'Marinated pork belly rashers air-fried until sticky and caramelised, served with a smashed cucumber salad.',
    folders: ['quick', 'airfry', 'pork', 'marinades'],
    image: 'images/air-fryer-sticky-pork-belly-bites.webp',
    prepHours: 0, prepMinutes: 10, cookHours: 0, cookMinutes: 18, servings: 4,
    ingredients: [
      { name: 'light soy sauce', amount: 2, unit: 'tbsp' },
      { name: 'honey', amount: 2, unit: 'tbsp' },
      { name: 'hoisin sauce', amount: 2, unit: 'tbsp' },
      { name: 'rice wine vinegar', amount: 2, unit: 'tbsp' },
      { name: 'sesame oil', amount: 1, unit: 'tbsp' },
      { name: 'finely grated fresh ginger', amount: 1, unit: 'tbsp' },
      { name: 'freshly grated garlic', amount: 1, unit: 'tbsp' },
      { name: 'Chinese five spice', amount: 0.5, unit: 'tsp' },
      { name: 'ground white pepper', amount: 0.5, unit: 'tsp' },
      { name: 'pork belly rashers, rind removed, cut into 4-5cm pieces', amount: 1100, unit: 'g' },
      { name: 'olive oil spray', amount: 1, unit: '' },
      { name: 'Lebanese cucumbers', amount: 2, unit: '' },
      { name: 'spring onions, finely sliced', amount: 2, unit: '' },
      { name: 'freshly grated ginger', amount: 0.5, unit: 'tsp' },
      { name: 'freshly grated garlic', amount: 0.5, unit: 'tsp' },
      { name: 'rice wine vinegar', amount: 1, unit: 'tbsp' },
      { name: 'light soy sauce', amount: 1, unit: 'tsp' },
      { name: 'sesame oil', amount: 1, unit: 'tsp' },
      { name: 'honey', amount: 1, unit: 'tsp' },
      { name: 'sesame seeds', amount: 1, unit: 'tsp' },
      { name: 'chilli oil, or to taste', amount: 1, unit: 'tbsp' },
      { name: 'cooked jasmine rice, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      'Combine soy sauce, honey, hoisin, rice vinegar, sesame oil, ginger, garlic, five spice and white pepper in a large bowl. Scoop out 2 tbsp of the marinade and set aside (this becomes the glaze).',
      'Add the pork belly to the remaining marinade and toss to coat. Marinate 30 minutes to 24 hours in the fridge for best flavour, or cook straight away.',
      { text: 'Preheat air fryer to 180C. Arrange pork in a single layer in the basket, lightly touching but not overlapping. Cook in batches if needed.', timerMinutes: 3 },
      { text: 'Air fry for 16-20 minutes, turning halfway, until golden and caramelised with rendered fat. Start checking from 16 minutes.', timerMinutes: 18 },
      'Meanwhile, make the cucumber salad: crack the cucumbers with a knife, then toss with the remaining salad ingredients.',
      'As soon as the pork comes out, brush with the reserved 2 tbsp marinade for a glossy glaze.',
      'Serve pork over rice with the cucumber salad, sesame seeds and chilli oil.'
    ],
    macros: { calories: 953, protein: 56, carbs: 55, fat: 56 },
    notes: 'Oven method: 200C for 25-30 min, turning halfway. Pork can be marinated up to 24 hours ahead; leftovers keep 3 days.'
  },
  {
    id: 'r08', title: 'Quick One-Pot Chicken Stroganoff',
    desc: 'A speedy stroganoff built around a barbecue chicken, so there is no raw meat to cook from scratch.',
    folders: ['quick', 'onepot', 'chicken'],
    image: 'images/quick-one-pot-chicken-stroganoff.webp',
    prepHours: 0, prepMinutes: 10, cookHours: 0, cookMinutes: 10, servings: 4,
    ingredients: [
      { name: 'olive oil', amount: 1, unit: 'tbsp' },
      { name: 'brown onion, halved, sliced', amount: 1, unit: '' },
      { name: 'button mushrooms, sliced', amount: 200, unit: 'g' },
      { name: 'garlic cloves, crushed', amount: 2, unit: '' },
      { name: 'tomato paste', amount: 1, unit: 'tbsp' },
      { name: 'sweet paprika', amount: 1, unit: 'tsp' },
      { name: 'cooking cream', amount: 300, unit: 'ml' },
      { name: 'chicken liquid stock', amount: 125, unit: 'ml' },
      { name: 'barbecue chicken, cut into portions', amount: 1, unit: '' },
      { name: 'fresh continental parsley leaves, finely chopped', amount: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Heat the oil in a large deep frying pan over medium heat. Cook the onion, stirring occasionally, for 4-5 minutes until golden brown.',
      { text: 'Stir in the mushrooms, garlic, tomato paste and paprika. Cook, stirring, for 30 seconds. Gradually pour in the cream and chicken stock. Bring to a simmer, then reduce heat to medium-low.', timerMinutes: 1 },
      { text: 'Place the chicken portions in the sauce. Cover and cook for 3 minutes until heated through.', timerMinutes: 3 },
      'Scatter parsley over the stroganoff just before serving.'
    ]
  },
  {
    id: 'r09', title: 'Thai Creamy Chicken One-Pot',
    desc: 'Mild, creamy and family-friendly, just needs a side of steamed rice to soak up the sauce.',
    folders: ['onepot', 'chicken'],
    image: 'images/thai-creamy-chicken-one-pot.webp',
    prepHours: 0, prepMinutes: 15, cookHours: 0, cookMinutes: 40, servings: 4,
    ingredients: [
      { name: 'olive oil', amount: 2, unit: 'tsp' },
      { name: 'skin-on chicken thigh cutlets', amount: 6, unit: '' },
      { name: 'red onion, cut into thin wedges', amount: 1, unit: '' },
      { name: 'red curry paste', amount: 2, unit: 'tbsp' },
      { name: 'coconut milk', amount: 400, unit: 'ml' },
      { name: 'chicken stock', amount: 250, unit: 'ml' },
      { name: 'butternut pumpkin, peeled, deseeded, cut into 2cm pieces', amount: 700, unit: 'g' },
      { name: 'fresh basil leaves, to serve', amount: 1, unit: '' },
      { name: 'steamed rice, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      { text: 'Heat the oil in a large, deep frying pan over medium-high heat. Add half the chicken, skin-side down, and cook for 5 minutes until golden. Turn and cook for 1 minute. Transfer to a plate. Repeat with remaining chicken.', timerMinutes: 6 },
      'Reduce heat to medium. Discard all but 2 tbsp fat from the pan. Cook the onion, stirring, for 3 minutes until softened. Add curry paste, cook 1 minute until aromatic. Add coconut milk, stock and pumpkin, stir to combine.',
      { text: 'Add chicken back to the pan, skin-side up, nestling among the pumpkin. Bring to a simmer, reduce heat to medium-low. Cook, uncovered, for 30 minutes until chicken is cooked through and liquid has reduced and thickened slightly.', timerMinutes: 30 },
      'Sprinkle with basil and serve with rice.'
    ],
    notes: 'Customisable - add frozen peas, blanched snow peas or baby spinach a few minutes before the end of cooking.'
  },
  {
    id: 'r10', title: 'Healthy Chicken Noodle and Vegetable Soup',
    desc: 'A big pot of chicken, wholemeal spaghetti and vegetables in a light broth.',
    folders: ['quick', 'onepot', 'chicken'],
    image: 'images/healthy-chicken-noodle-vegetable-soup.webp',
    prepHours: 0, prepMinutes: 15, cookHours: 0, cookMinutes: 30, servings: 5,
    ingredients: [
      { name: 'extra virgin olive oil', amount: 1, unit: 'tbsp' },
      { name: 'large carrots, peeled, thinly sliced', amount: 2, unit: '' },
      { name: 'large celery sticks, thinly sliced', amount: 2, unit: '' },
      { name: 'brown onion, finely chopped', amount: 1, unit: '' },
      { name: 'garlic cloves, crushed', amount: 2, unit: '' },
      { name: 'finely grated fresh ginger', amount: 2, unit: 'tsp' },
      { name: 'chicken thigh fillets, trimmed, thinly sliced', amount: 500, unit: 'g' },
      { name: 'salt-reduced chicken stock', amount: 750, unit: 'ml' },
      { name: 'water', amount: 500, unit: 'ml' },
      { name: 'dried wholemeal spaghetti pasta, broken in half', amount: 80, unit: 'g' },
      { name: 'broccoli, cut into small florets, stem peeled, thinly sliced', amount: 150, unit: 'g' },
      { name: 'frozen corn kernels', amount: 145, unit: 'g' },
      { name: 'zucchini, halved lengthways, thinly sliced crossways', amount: 1, unit: '' },
      { name: 'chopped fresh continental parsley leaves, to serve', amount: 1, unit: '' },
      { name: 'grated lemon rind, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      { text: 'Heat the oil in a large saucepan over medium heat. Add carrot, celery and onion. Cook, stirring, for 6-7 minutes until softened. Add garlic and ginger, cook 1 minute until aromatic. Add chicken, cook 3-4 minutes until browned.', timerMinutes: 11 },
      { text: 'Add the stock and water, bring to the boil. Add the spaghetti and bring to a simmer. Partially cover, cook 10 minutes until al dente. Add broccoli, corn and zucchini, cook 5 minutes until tender.', timerMinutes: 15 },
      'Divide soup among bowls. Top with parsley and lemon rind. Season with pepper.'
    ]
  },
  {
    id: 'r11', title: 'Pork and Pineapple Thai Red Curry',
    desc: 'Wok-fried pork fillet in a coconut red curry sauce with sweet pineapple.',
    folders: ['quick', 'onepot', 'pork'],
    image: 'images/pork-and-pineapple-thai-red-curry.webp',
    prepHours: 0, prepMinutes: 15, cookHours: 0, cookMinutes: 15, servings: 4,
    ingredients: [
      { name: 'peanut oil', amount: 1, unit: 'tbsp' },
      { name: 'brown onion, finely chopped', amount: 1, unit: '' },
      { name: 'pork fillet, thickly sliced (or sliced pork scotch fillet steaks)', amount: 500, unit: 'g' },
      { name: 'Thai red curry paste', amount: 2, unit: 'tbsp' },
      { name: 'coconut milk', amount: 270, unit: 'ml' },
      { name: 'chicken stock', amount: 250, unit: 'ml' },
      { name: 'fish sauce', amount: 1.5, unit: 'tbsp' },
      { name: 'palm sugar, grated', amount: 1, unit: 'tbsp' },
      { name: 'fresh pineapple, peeled, cored, roughly chopped', amount: 0.25, unit: '' },
      { name: 'lime juice', amount: 1, unit: 'tbsp' },
      { name: 'fresh coriander leaves', amount: 0.25, unit: 'cup' },
      { name: 'fried shallots', amount: 0.25, unit: 'cup' },
      { name: 'steamed jasmine rice, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      { text: 'Heat a large wok over high heat. Add the peanut oil, swirl to coat. Add onion, stir-fry 3 minutes until softened. Add pork, stir-fry 3 minutes until browned. Add curry paste, cook 1 minute until fragrant.', timerMinutes: 7 },
      { text: 'Add coconut milk and chicken stock, bring to the boil. Reduce heat to medium, simmer 5-7 minutes until sauce thickens and pork is cooked through. Add fish sauce, palm sugar and pineapple, simmer 2 minutes until heated through. Stir in lime juice.', timerMinutes: 9 },
      'Spoon curry into bowls. Top with coriander and fried shallots. Serve with rice.'
    ],
    notes: 'Using sliced pork scotch fillet steaks instead of fillet saves about $6 on the total recipe cost.'
  },
  {
    id: 'r12', title: 'Chicken and Sweetcorn Soup',
    desc: 'Classic takeaway-style corn and shredded chicken soup with silky egg-white ribbons.',
    folders: ['quick', 'onepot', 'chicken'],
    image: 'images/chicken-and-sweetcorn-soup.webp',
    prepHours: 0, prepMinutes: 10, cookHours: 0, cookMinutes: 20, servings: 4,
    ingredients: [
      { name: 'chicken stock', amount: 1, unit: 'l' },
      { name: 'garlic cloves, crushed', amount: 2, unit: '' },
      { name: 'creamed corn', amount: 420, unit: 'g' },
      { name: 'corn kernels, drained, rinsed', amount: 125, unit: 'g' },
      { name: 'green onions, thinly sliced', amount: 3, unit: '' },
      { name: 'shredded cooked chicken', amount: 2, unit: 'cup' },
      { name: 'soy sauce', amount: 2, unit: 'tsp' },
      { name: 'sweet chilli sauce', amount: 1, unit: 'tbsp' },
      { name: 'egg whites, lightly beaten', amount: 2, unit: '' },
      { name: 'sesame oil', amount: 0.5, unit: 'tsp' }
    ],
    instructions: [
      { text: 'Place the stock, garlic, creamed corn, corn kernels, half the green onion and 1 cup cold water in a saucepan over medium-high heat. Cover, bring to the boil. Reduce heat to low, simmer 5 minutes. Add chicken, soy sauce and sweet chilli sauce. Stir to combine, simmer 10 minutes until heated through.', timerMinutes: 15 },
      'Gradually stir in the egg whites, then the sesame oil. Divide between bowls. Top with remaining onion. Serve.'
    ]
  },
  {
    id: 'r13', title: 'Creamy One-Pan Salmon and Risoni',
    desc: 'Ready in 35 minutes, this creamy pasta is loaded with salmon, peas and spinach.',
    folders: ['quick', 'onepot', 'seafood'],
    image: 'images/creamy-one-pan-salmon-and-risoni.webp',
    prepHours: 0, prepMinutes: 15, cookHours: 0, cookMinutes: 20, servings: 4,
    ingredients: [
      { name: 'butter', amount: 50, unit: 'g' },
      { name: 'small brown onion, finely chopped', amount: 1, unit: '' },
      { name: 'garlic cloves, crushed', amount: 2, unit: '' },
      { name: 'plain flour', amount: 1, unit: 'tbsp' },
      { name: 'milk', amount: 2, unit: 'cup' },
      { name: 'chicken stock', amount: 2, unit: 'cup' },
      { name: 'dried risoni pasta', amount: 1.5, unit: 'cup' },
      { name: 'frozen peas', amount: 1, unit: 'cup' },
      { name: 'basil pesto', amount: 2, unit: 'tbsp' },
      { name: 'lemon juice', amount: 1, unit: 'tbsp' },
      { name: 'canned red salmon, drained, skin and bones removed, flaked', amount: 415, unit: 'g' },
      { name: 'baby spinach', amount: 60, unit: 'g' },
      { name: 'small fresh basil leaves', amount: 0.25, unit: 'cup' },
      { name: 'finely grated lemon rind, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      'Melt the butter in a large, heavy-based shallow casserole dish over medium-high heat. Add onion, cook 5 minutes until softened. Add garlic, cook 30 seconds until fragrant. Stir in the flour.',
      { text: 'Gradually stir in the milk and chicken stock. Bring to the boil, stirring occasionally. Reduce heat to medium. Add risoni, stir to combine. Cook, stirring frequently, for 10 minutes until risoni is tender, adding the peas in the last 3 minutes.', timerMinutes: 10 },
      'Remove from heat. Stir in the pesto and lemon juice. Top with the salmon, spinach, basil leaves and lemon rind. Season with salt and pepper. Stir to combine. Serve.'
    ],
    macros: { calories: 544, protein: 35, carbs: 43.6, fat: 24.3 }
  },
  {
    id: 'r14', title: 'All-in-One-Pan Beef Stroganoff',
    desc: 'Sliced beef rump, mushrooms and angel hair pasta cooked together in a smoked paprika sour cream sauce.',
    folders: ['quick', 'onepot', 'beef'],
    image: 'images/all-in-one-pan-beef-stroganoff.webp',
    prepHours: 0, prepMinutes: 15, cookHours: 0, cookMinutes: 25, servings: 4,
    ingredients: [
      { name: 'extra virgin olive oil', amount: 2, unit: 'tbsp' },
      { name: 'beef rump steak, trimmed, thinly sliced', amount: 600, unit: 'g' },
      { name: 'large brown onion, halved, cut into thick wedges', amount: 1, unit: '' },
      { name: 'cup mushrooms, halved', amount: 200, unit: 'g' },
      { name: 'garlic cloves, crushed', amount: 2, unit: '' },
      { name: 'smoked paprika, plus extra to serve', amount: 1, unit: 'tbsp' },
      { name: 'Worcestershire sauce', amount: 2, unit: 'tbsp' },
      { name: 'tomato paste', amount: 2, unit: 'tbsp' },
      { name: 'beef stock', amount: 3, unit: 'cup' },
      { name: 'water', amount: 2, unit: 'cup' },
      { name: 'dried angel hair pasta', amount: 300, unit: 'g' },
      { name: 'zucchini, cut into ribbons', amount: 2, unit: '' },
      { name: 'sour cream', amount: 0.67, unit: 'cup' },
      { name: 'chopped fresh flat-leaf parsley, to serve', amount: 0.25, unit: 'cup' }
    ],
    instructions: [
      { text: 'Heat half the oil in a large saucepan over medium-high heat. Cook the beef in 2 batches, for 4 minutes each, until just browned. Transfer to a heatproof bowl.', timerMinutes: 8 },
      { text: 'Heat remaining oil in the same pan over medium-high heat. Add onion and mushrooms, cook, stirring, for 3 minutes until onion starts to brown. Add garlic and paprika, cook 30 seconds until fragrant. Add Worcestershire sauce and tomato paste, stir to coat. Add beef stock and water, bring to the boil. Add pasta, cook, stirring occasionally, for 5 minutes until tender.', timerMinutes: 9 },
      'Return beef to the pan with the zucchini ribbons. Stir. Cook a further 2 minutes until heated through. Stir in half the sour cream.',
      'Serve stroganoff topped with remaining sour cream, sprinkled with parsley and extra paprika.'
    ],
    macros: { calories: 763, protein: 47.1, carbs: 64.1, fat: 32.9 },
    notes: 'Sits alongside the chicken stroganoff as a his-and-hers pair.'
  },
  {
    id: 'r15', title: 'One-Pot Italian Chicken',
    desc: 'Pan-seared chicken breast in a creamy sun-dried tomato, garlic and basil sauce.',
    folders: ['quick', 'onepot', 'chicken'],
    image: 'images/one-pot-italian-chicken.webp',
    prepHours: 0, prepMinutes: 5, cookHours: 0, cookMinutes: 20, servings: 4,
    ingredients: [
      { name: 'olive oil', amount: 1, unit: 'tbsp' },
      { name: 'unsalted butter', amount: 20, unit: 'g' },
      { name: 'small chicken breast fillets', amount: 4, unit: '' },
      { name: 'garlic cloves, finely chopped', amount: 2, unit: '' },
      { name: 'sun-dried tomatoes, sliced', amount: 80, unit: 'g' },
      { name: 'white wine', amount: 80, unit: 'ml' },
      { name: 'thickened cream', amount: 250, unit: 'ml' },
      { name: 'chicken stock', amount: 125, unit: 'ml' },
      { name: 'baby spinach', amount: 60, unit: 'g' },
      { name: 'fresh basil leaves, torn', amount: 1, unit: 'cup' },
      { name: 'crusty bread, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      { text: 'Heat the olive oil and butter in a large non-stick frying pan over high heat until butter is foamy. Season the chicken and add to the pan. Reduce heat to medium-high. Cook 5 minutes each side until just cooked through. Transfer to a plate, cover with foil to keep warm.', timerMinutes: 10 },
      'Add the garlic to the pan, cook 1 minute until aromatic. Add the sun-dried tomatoes, stir to coat. Add the white wine, cook 1 minute until reduced.',
      { text: 'Add the cream and chicken stock. Return the chicken to the pan and simmer 5 minutes until liquid is reduced. Stir through the spinach until wilted. Season and sprinkle with basil. Serve with crusty bread.', timerMinutes: 5 }
    ],
    notes: 'Contains white wine.'
  },
  {
    id: 'r16', title: 'One-Pan Creamy Chicken and Bacon',
    desc: 'Chicken thigh and bacon in a garlicky parmesan cream sauce with peas and spinach.',
    folders: ['quick', 'onepot', 'chicken'],
    image: 'images/one-pan-creamy-chicken-and-bacon.webp',
    prepHours: 0, prepMinutes: 15, cookHours: 0, cookMinutes: 25, servings: 4,
    ingredients: [
      { name: 'extra virgin olive oil', amount: 2, unit: 'tbsp' },
      { name: 'chicken thigh fillets', amount: 500, unit: 'g' },
      { name: 'brown onion, finely chopped', amount: 1, unit: '' },
      { name: 'middle bacon rashers, trimmed, chopped', amount: 125, unit: 'g' },
      { name: 'garlic cloves, crushed', amount: 3, unit: '' },
      { name: 'cooking cream', amount: 300, unit: 'ml' },
      { name: 'chicken stock cube, crumbled', amount: 1, unit: '' },
      { name: 'finely grated parmesan', amount: 0.33, unit: 'cup' },
      { name: 'frozen peas', amount: 0.5, unit: 'cup' },
      { name: 'baby spinach', amount: 60, unit: 'g' },
      { name: 'finely grated lemon rind', amount: 1, unit: 'tsp' },
      { name: 'crusty bread, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      { text: 'Heat 1 tbsp oil in a large frying pan over medium-high heat. Add chicken, cook, turning, for 5 minutes until golden and browned. Transfer to a plate.', timerMinutes: 5 },
      'Add remaining oil to the pan. Add onion and bacon, cook, stirring, for 5 minutes until onion softens and bacon is golden. Add garlic, cook 30 seconds until fragrant. Transfer 1/4 of the bacon mixture to a bowl, cover to keep warm.',
      { text: 'Return chicken to the pan with the cream, stock cube, parmesan and 1 1/3 cups water. Bring to the boil. Reduce heat to medium. Simmer, uncovered, stirring occasionally, for 10 minutes until chicken is cooked through and sauce has thickened.', timerMinutes: 10 },
      'Stir in the peas and spinach. Cook 1-2 minutes until heated through. Remove from heat. Stir in lemon rind. Season. Sprinkle with reserved bacon. Serve with crusty bread.'
    ],
    macros: { calories: 606, protein: 41.7, carbs: 32.9, fat: 13.5 }
  },
  {
    id: 'r17', title: 'Creamy Ham and Mushroom Pasta Bake',
    desc: 'Farfalle baked in a cheesy white sauce with ham, mushroom and spring onion.',
    folders: ['airfry', 'pork'],
    image: 'images/creamy-ham-and-mushroom-pasta-bake.webp',
    prepHours: 0, prepMinutes: 10, cookHours: 0, cookMinutes: 20, servings: 5,
    ingredients: [
      { name: 'farfalle pasta', amount: 500, unit: 'g' },
      { name: 'butter, plus a little extra', amount: 50, unit: 'g' },
      { name: 'small mushrooms, halved', amount: 200, unit: 'g' },
      { name: 'spring onions, finely sliced', amount: 1, unit: 'bunch' },
      { name: 'plain flour', amount: 50, unit: 'g' },
      { name: 'milk', amount: 500, unit: 'ml' },
      { name: 'thickly cut ham, chopped', amount: 140, unit: 'g' },
      { name: 'mature cheddar, grated', amount: 140, unit: 'g' }
    ],
    instructions: [
      'Cook the pasta according to pack instructions, then drain. Heat oven to 200C/fan 180C/gas 6. Melt a little butter in a large saucepan. Fry the mushrooms for a couple of minutes, then scoop out and set aside. Wipe out the pan.',
      { text: 'Melt the remaining butter in the pan, add most of the onions and soften for 1 minute. Stir in the flour for another minute, then gradually stir in the milk until you have a lump-free sauce. Increase the heat and bubble the sauce, stirring for a few minutes to thicken. Turn off the heat, stir in the ham and most of the cheese, then season to taste.', timerMinutes: 5 },
      { text: 'Tip the pasta and mushrooms into a large ovenproof dish, pour over the sauce and mix well. Scatter over the remaining cheese and spring onions, then bake for 10 minutes until golden.', timerMinutes: 10 }
    ],
    macros: { calories: 727, protein: 32, carbs: 91, fat: 25 },
    notes: 'Filed under Pork since it is ham, not chicken, beef or salmon.'
  },
  {
    id: 'r18', title: 'Microwave Sweet and Sour Chicken',
    desc: 'A no-fuss sweet and sour chicken made almost entirely in the microwave.',
    folders: ['quick', 'chicken'],
    image: 'images/microwave-sweet-and-sour-chicken.webp',
    prepHours: 0, prepMinutes: 8, cookHours: 0, cookMinutes: 15, servings: 4,
    ingredients: [
      { name: 'tomato ketchup', amount: 9, unit: 'tbsp' },
      { name: 'malt vinegar', amount: 3, unit: 'tbsp' },
      { name: 'dark muscovado sugar', amount: 4, unit: 'tbsp' },
      { name: 'garlic cloves, crushed', amount: 2, unit: '' },
      { name: 'skinless and boneless chicken breast, cut into chunks', amount: 4, unit: '' },
      { name: 'small onion, roughly chopped', amount: 1, unit: '' },
      { name: 'canned pineapple pieces in juice, drained', amount: 227, unit: 'g' },
      { name: 'sugar snap peas, roughly sliced', amount: 100, unit: 'g' },
      { name: 'salted, roasted cashew nuts (optional)', amount: 1, unit: 'handful' }
    ],
    instructions: [
      { text: 'In a large microwaveable dish, mix the ketchup, vinegar, sugar and garlic thoroughly with the chicken and onion. Microwave, uncovered, on high for 8-10 minutes until the chicken is starting to cook and the sauce is sizzling.', timerMinutes: 9 },
      { text: 'Stir in the pineapple pieces and sugar snap peas and return to the microwave for another 3-5 minutes until the chicken is completely cooked through. Leave to stand for a few minutes, then stir in the cashews, if using, and serve.', timerMinutes: 4 }
    ],
    macros: { calories: 305, protein: 36, carbs: 38, fat: 2 },
    notes: 'Original recipe included 2 red peppers, seeded and cut into chunks, added with the onion - left out here since he does not eat bell peppers. Extra sugar snap peas or a handful of shredded carrot works as a colour swap if wanted.'
  },
  {
    id: 'r19', title: 'Bang Bang Chicken and Vegetable Noodles',
    desc: 'Poached shredded chicken tossed with spiralised courgette and carrot noodles in a peanut chilli dressing.',
    folders: ['quick', 'chicken'],
    image: 'images/bang-bang-chicken-and-vegetable-noodles.webp',
    prepHours: 0, prepMinutes: 20, cookHours: 0, cookMinutes: 10, servings: 4,
    ingredients: [
      { name: 'chicken breasts', amount: 2, unit: '' },
      { name: 'courgettes (zucchini)', amount: 4, unit: '' },
      { name: 'carrots', amount: 4, unit: '' },
      { name: 'spring onions, finely sliced on an angle (save a few green parts to sprinkle on top)', amount: 4, unit: '' },
      { name: 'beansprouts', amount: 150, unit: 'g' },
      { name: 'frozen soya or edamame beans, defrosted', amount: 180, unit: 'g' },
      { name: 'smooth peanut butter', amount: 4, unit: 'tbsp' },
      { name: 'soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'sweet chilli sauce', amount: 3, unit: 'tbsp' },
      { name: 'sesame oil', amount: 2, unit: 'tbsp' },
      { name: 'lime, zest and juice', amount: 1, unit: '' },
      { name: 'honey-roasted peanuts, bashed with a rolling pin', amount: 50, unit: 'g' },
      { name: 'red chilli, thinly sliced (optional)', amount: 1, unit: '' }
    ],
    instructions: [
      { text: 'Bring a large pan of seasoned water to a simmer, add the chicken breasts and lower the heat to a gentle simmer. Poach for 8-10 minutes until the chicken is cooked through - test by cutting in half through the thickest part. Transfer to a plate to cool while you prepare the noodles.', timerMinutes: 9 },
      'Using a spiralizer (thicker noodle setting) or a julienne peeler, turn the courgettes and carrots into curly noodles. Tip into a bowl with the spring onions, beansprouts and soya beans.',
      'Mash the peanut butter and soy sauce together to loosen, then whisk in the sweet chilli sauce, sesame oil, lime zest and juice, and 1 tbsp water. When the chicken is cool enough to handle, shred with two forks. Add to the vegetables, drizzle over the dressing and gently toss until well coated. Transfer to a platter and scatter over the peanuts and chilli, if using.'
    ],
    macros: { calories: 440, protein: 31, carbs: 22, fat: 23 },
    notes: 'Needs a spiralizer or julienne peeler for the courgette/carrot noodles - a ready spiralised veg pack from the supermarket works too. Leftovers make a great packed lunch.'
  },
  {
    id: 'r20', title: 'Quick and Easy Korean Pork',
    desc: 'Griddled marinated pork belly wrapped in lettuce with rice and an optional ssamjang dipping sauce.',
    folders: ['quick', 'pork', 'marinades'],
    image: 'images/quick-and-easy-korean-pork.webp',
    prepHours: 0, prepMinutes: 15, cookHours: 0, cookMinutes: 15, servings: 4,
    ingredients: [
      { name: 'good-quality pork belly, skin and ribs removed, carved into thin slices', amount: 500, unit: 'g' },
      { name: 'large lettuce (Little Gem or iceberg), leaves washed and separated', amount: 1, unit: '' },
      { name: 'cooked white short-grain rice, to serve', amount: 1, unit: '' },
      { name: 'Conference pears, peeled and cored', amount: 2, unit: '' },
      { name: 'white onion', amount: 0.5, unit: '' },
      { name: 'garlic cloves', amount: 3, unit: '' },
      { name: 'thumb-sized piece ginger', amount: 1, unit: '' },
      { name: 'spring onion', amount: 1, unit: '' },
      { name: 'soy sauce', amount: 1, unit: 'tbsp' },
      { name: 'brown sugar', amount: 2, unit: 'tbsp' },
      { name: 'toasted sesame oil', amount: 1, unit: 'tbsp' },
      { name: 'Korean chilli paste (gochujang, or any Asian chilli paste)', amount: 2, unit: 'tbsp' },
      { name: 'Korean soy bean paste, for ssamjang sauce (optional)', amount: 3, unit: 'tbsp' },
      { name: 'Korean chilli paste, for ssamjang sauce (optional)', amount: 1.5, unit: 'tbsp' },
      { name: 'mirin, for ssamjang sauce (optional)', amount: 2, unit: 'tbsp' },
      { name: 'roasted sesame oil, for ssamjang sauce (optional)', amount: 1, unit: 'tsp' },
      { name: 'sesame seeds, for ssamjang sauce (optional)', amount: 1, unit: 'tsp' },
      { name: 'spring onion, white part only, finely chopped, for ssamjang sauce (optional)', amount: 0.5, unit: '' }
    ],
    instructions: [
      'Put all the marinade ingredients (pears, onion, garlic, ginger, spring onion, soy sauce, brown sugar, sesame oil, chilli paste) in a food processor and blend until smooth. Season to taste, then pour over the sliced pork.',
      'You can cook the meat straight away, but for best results marinate in the fridge for at least 30 minutes, up to 24 hours.',
      'Make the ssamjang sauce (if using) by mixing all of the ingredients together, then set aside.',
      { text: 'Heat a griddle pan over a high heat and cook the pork in batches for 2-3 minutes each side until charred and cooked through.', timerMinutes: 5 },
      'Serve with white rice and a few lettuce leaves. To eat, place a small scoop of rice in a leaf, then a piece of pork, smear with ssamjang sauce if using, and wrap up.'
    ],
    macros: { calories: 456, protein: 25, carbs: 32, fat: 25 }
  },
  {
    id: 'r21', title: 'Crispy Sesame Lemon Chicken',
    desc: 'Battered fried chicken pieces tossed in a sticky lemon, honey and sesame sauce.',
    folders: ['quick', 'chicken'],
    image: 'images/crispy-sesame-lemon-chicken.webp',
    prepHours: 0, prepMinutes: 10, cookHours: 0, cookMinutes: 15, servings: 6,
    ingredients: [
      { name: 'chicken breast fillets, cut into 2cm pieces', amount: 600, unit: 'g' },
      { name: 'cornflour', amount: 2, unit: 'tbsp' },
      { name: 'plain flour', amount: 5, unit: 'tbsp' },
      { name: 'baking powder', amount: 1, unit: 'tsp' },
      { name: 'white pepper, large pinch', amount: 1, unit: '' },
      { name: 'egg, beaten', amount: 1, unit: '' },
      { name: 'sunflower or vegetable oil, for frying', amount: 2, unit: 'tbsp' },
      { name: 'spring onions, finely sliced, to serve', amount: 2, unit: '' },
      { name: 'cooked noodles, to serve (optional)', amount: 1, unit: '' },
      { name: 'cornflour, for the sauce', amount: 2, unit: 'tsp' },
      { name: 'unwaxed lemons, zested and juiced', amount: 2, unit: '' },
      { name: 'honey', amount: 2, unit: 'tbsp' },
      { name: 'soy sauce', amount: 2, unit: 'tbsp' },
      { name: 'sesame seeds', amount: 2, unit: 'tsp' },
      { name: 'sesame oil', amount: 2, unit: 'tsp' }
    ],
    instructions: [
      'To make the sauce, whisk the cornflour into a bowl with the lemon zest and juice until any lumps disappear. Add the honey, soy sauce, sesame seeds and sesame oil, mix again. Set aside.',
      'Combine the cornflour, flour, baking powder, 1/4 tsp salt, pepper, beaten egg and 4 tbsp water in a large bowl. Tip in the chicken pieces, gently tossing to coat.',
      { text: 'Heat the vegetable oil over a high heat and fry the battered chicken in batches for 6 minutes per batch until golden and cooked through. Remove and transfer to a plate lined with kitchen paper.', timerMinutes: 6 },
      'When all the chicken has been cooked, return it all to the pan, still over a high heat. Pour in the sauce and toss to coat - it will thicken and cling to the chicken. Scatter with spring onions and serve with noodles, if you like.'
    ],
    macros: { calories: 280, protein: 26, carbs: 26, fat: 8 }
  },
  {
    id: 'r22', title: 'Easy Thai Prawn Curry',
    desc: 'A fast tomato and coconut curry loaded with prawns, ready in 20 minutes.',
    folders: ['quick', 'onepot', 'seafood'],
    image: 'images/easy-thai-prawn-curry.webp',
    prepHours: 0, prepMinutes: 5, cookHours: 0, cookMinutes: 15, servings: 4,
    ingredients: [
      { name: 'vegetable oil', amount: 1, unit: 'tbsp' },
      { name: 'onion, chopped', amount: 1, unit: '' },
      { name: 'fresh root ginger', amount: 1, unit: 'tsp' },
      { name: 'Thai red curry paste', amount: 1.5, unit: 'tsp' },
      { name: 'canned chopped tomatoes', amount: 400, unit: 'g' },
      { name: 'sachet coconut cream', amount: 50, unit: 'g' },
      { name: 'raw frozen prawns', amount: 400, unit: 'g' },
      { name: 'coriander, chopped, to serve (optional)', amount: 1, unit: '' }
    ],
    instructions: [
      { text: 'Heat the oil in a medium saucepan. Tip in the onion and ginger, cook a few minutes until softened. Stir in the curry paste, cook 1 minute more. Pour over the chopped tomatoes and coconut cream. Bring to the boil, then simmer for 5 minutes, adding a little boiling water if the mixture gets too thick.', timerMinutes: 5 },
      { text: 'Tip in the prawns, then cook for 5-10 minutes more, depending on how large they are. Serve alongside plain rice and sprinkle with chopped coriander, if you like.', timerMinutes: 8 }
    ],
    macros: { calories: 156, protein: 13, carbs: 7, fat: 8 }
  },
  {
    id: 'r23', title: 'Easy Teriyaki Chicken',
    desc: 'Pan-fried chicken thigh in a glossy homemade teriyaki sauce with sesame and spring onion.',
    folders: ['quick', 'onepot', 'chicken'],
    image: 'images/easy-teriyaki-chicken.webp',
    prepHours: 0, prepMinutes: 5, cookHours: 0, cookMinutes: 15, servings: 4,
    ingredients: [
      { name: 'toasted sesame oil', amount: 2, unit: 'tbsp' },
      { name: 'skinless and boneless chicken thighs, sliced', amount: 6, unit: '' },
      { name: 'large garlic cloves, crushed', amount: 2, unit: '' },
      { name: 'thumb-sized piece ginger, grated', amount: 1, unit: '' },
      { name: 'runny honey', amount: 50, unit: 'g' },
      { name: 'light soy sauce', amount: 30, unit: 'ml' },
      { name: 'rice wine vinegar', amount: 1, unit: 'tbsp' },
      { name: 'sesame seeds, to serve', amount: 1, unit: 'tbsp' },
      { name: 'spring onions, shredded, to serve', amount: 4, unit: '' },
      { name: 'sticky rice, to serve', amount: 1, unit: '' },
      { name: 'steamed bok choi or spring greens, to serve', amount: 1, unit: '' }
    ],
    instructions: [
      { text: 'Heat the oil in a non-stick pan over a medium heat. Add the chicken and fry for 7 minutes, or until golden. Add the garlic and ginger and fry for 2 minutes.', timerMinutes: 9 },
      { text: 'Stir in the honey, soy sauce and vinegar. Bring to the boil and cook for 2-5 minutes over a medium heat until the chicken is sticky and coated in a thick sauce.', timerMinutes: 4 },
      'Scatter over the spring onions and sesame seeds, then serve the chicken with the rice and steamed veg.'
    ],
    macros: { calories: 243, protein: 18, carbs: 11, fat: 14 },
    notes: 'Serve with sliced red chilli at the table if he likes heat. Can be made ahead - sit the chicken in the sauce for 30 minutes then reheat, or chill and reheat within 3 days (add a splash of water when reheating). Sliced cold, it works well in wraps or salads the next day.'
  },
  {
    id: 'r24', title: 'Honey Chicken',
    desc: 'Cubed chicken breast fried and tossed in a honey, soy, garlic and ginger sauce.',
    folders: ['quick', 'chicken'],
    image: 'images/honey-chicken.webp',
    prepHours: 0, prepMinutes: 15, cookHours: 0, cookMinutes: 15, servings: 4,
    ingredients: [
      { name: 'chicken breasts (about 600g), trimmed and cut into 2-3cm cubes', amount: 4, unit: '' },
      { name: 'plain flour', amount: 2, unit: 'tbsp' },
      { name: 'ginger, peeled and finely grated', amount: 40, unit: 'g' },
      { name: 'garlic cloves, finely chopped', amount: 4, unit: '' },
      { name: 'soy sauce', amount: 6, unit: 'tbsp' },
      { name: 'honey', amount: 5, unit: 'tbsp' },
      { name: 'lemon, juiced', amount: 1, unit: '' },
      { name: 'sunflower, vegetable, rice bran or rapeseed oil', amount: 1, unit: 'tbsp' },
      { name: 'cooked rice and steamed broccoli, to serve (optional)', amount: 1, unit: '' }
    ],
    instructions: [
      'Tip the chicken into a bowl, sprinkle over the flour and some seasoning and toss until the chicken is evenly coated.',
      { text: 'Combine the ginger, garlic, soy, honey and half the lemon juice in a bowl. Heat the oil in a large frying pan or wok over a high heat and fry the chicken for 3-4 minutes until lightly golden.', timerMinutes: 4 },
      { text: 'Tip in the honey sauce and stir-fry for 10 minutes, or until the chicken is cooked through and the sauce has reduced enough to coat the back of a spoon. Taste for seasoning and squeeze over the remaining lemon juice, if needed, then serve with rice and steamed broccoli, if you like.', timerMinutes: 10 }
    ],
    macros: { calories: 333, protein: 36, carbs: 35, fat: 6 }
  }
];
