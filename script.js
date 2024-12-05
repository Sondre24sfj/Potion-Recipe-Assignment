let cauldron = {
    herbs: 0,
    berries: 0,
    mushrooms: 0,
    water: 0,
    flowers: 0
};

let successfulBrews = 0;
let currentRecipe = 'healing'; 

const recipes = {
    healing: { herbs: 2, berries: 1, mushrooms: 1 },
    strength: { herbs: 3, berries: 2, mushrooms: 2 }
};

function addIngredient(ingredient) {
    if (cauldron.hasOwnProperty(ingredient)) {
        cauldron[ingredient]++;
        updateCauldron();
        console.log(`Added 1 ${ingredient} to the cauldron.`);
    }
}

function checkPotion() {
    let recipe = recipes[currentRecipe];
    let isPotionPerfect = true;

    for (let ingredient in recipe) {
        if (cauldron[ingredient] !== recipe[ingredient]) {
            isPotionPerfect = false;
            break;
        }
    }

    if (isPotionPerfect) {
        successfulBrews++;
        document.getElementById("successfulBrews").innerText = successfulBrews;
        document.getElementById("potionResult").innerText = "Congratulations! You've brewed a perfect potion!";
    } else {
        document.getElementById("potionResult").innerText = "Oops! This potion is not correct. Try again!";
    }

    console.log("Cauldron contains:");
    for (let ingredient in cauldron) {
        console.log(`${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}: ${cauldron[ingredient]}`);
    }
}

function updateCauldron() {
    let cauldronContents = '';
    for (let ingredient in cauldron) {
        cauldronContents += `<div class="ingredients">${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}: ${cauldron[ingredient]}</div>`;
    }
    document.getElementById("cauldronContents").innerHTML = cauldronContents;
}

function switchRecipe(recipeType) {
    currentRecipe = recipeType;
    let recipeText = recipeType === 'healing' ? "Healing Potion" : "Strength Potion";
    document.getElementById("recipe-description").innerText = `Create a ${recipeText}!`;

    let ingredients = recipes[recipeType];
    let ingredientList = document.getElementById("ingredient-buttons");
    
    cauldron = { herbs: 0, berries: 0, mushrooms: 0, water: 0, flowers: 0 };
    updateCauldron();

    for (let button of ingredientList.children) {
        button.disabled = false;
    }
    
    document.getElementById("potionResult").innerText = '';
}
