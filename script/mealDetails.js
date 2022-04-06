const apiUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
driver();
function driver() {
    var idMeal = window.location.href.split("=")[1];
    searchMealById(idMeal);
}

//searching meal 
async function searchMealById(idMeal) {
    var response = await fetch(apiUrl + idMeal);
    if (response.ok) {
        renderData(await response.json());
    }
}

// render data
function renderData(meal) {
    // DrinkAlternate Area
    document.getElementById("image").src = meal.meals[0].strMealThumb;
    document.getElementById("mealName").innerHTML += meal.meals[0].strMeal;
    document.getElementById("instruction").innerHTML += meal.meals[0].strInstructions;
    // add ingredient to array
    var ingredient = addIngredient(meal.meals[0]);
    document.getElementById("list").innerHTML += `
    ${ingredient.map(ing => `<li>${ing}</li>`).join("")}`;
}
// add ingredient to array function
function addIngredient(meal) {
    var ingredient = [];
    for (let i = 1; i < 20; i++) {
        console.log(`${meal[`strIngredient${i}`]} - ${meal[`strIngredient${i}`]}`);
        if (meal[`strIngredient${i}`]) {
            ingredient.push(`${meal[`strIngredient${i}`]}  -  ${meal[`strIngredient${i}`]}`);
        } else {
            break;
        }
    }
    return ingredient;
}