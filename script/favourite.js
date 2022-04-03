const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
driver();
function driver(){
    var mealName = JSON.parse(localStorage.getItem("idOfMeals"));
    console.log(mealName[0]);
    seachMealById(mealName[0]);
}

async function seachMealById(mealName){
    let response = await fetch(apiUrl+mealName);
    if(response.ok){
        renderData(await response.json());
    }
}

function renderData(mealInformation){
    console.log(mealInformation);
}