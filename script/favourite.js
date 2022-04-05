const apiUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
driver();
function driver() {
    var idOfAllMealList = JSON.parse(localStorage.getItem("idOfMeals"));
    if (idOfAllMealList.length > 0) {
        document.getElementById("listHeading").innerHTML = "Your List :";
    }

    for (let i = 0; i < idOfAllMealList.length; i++) {
        seachMealById(idOfAllMealList[i]);
    }


}
// search meal details by id
async function seachMealById(idMeal) {
    let response = await fetch(apiUrl + idMeal);
    if (response.ok) {
        renderData(await response.json());
    } else {
        alert(response.status);
    }
}
// render each of meal
function renderData(mealdata) {
    mealdata.meals.forEach((meal) => {
        var mealInformation = document.createElement('DIV');
        mealInformation.id = "meal_data";
        mealInformation.className = "meal";
        document.getElementById("result").appendChild(mealInformation);
        mealInformation.innerHTML = `<img id="meal_image" src ="${meal.strMealThumb}" width =350>
    <div class ="mealImage" id ="${meal.idMeal}"><button id ="removeButton">Remove</button></div>
    <h3 >${meal.strMeal}</h3>`;

    });
}

// delete the mealFrom favouriteList
document.addEventListener('click', (event) => {
    if (event.target.id == "removeButton") {
        console.log(event.target.parentNode.id);
        var arrayOfId = JSON.parse(localStorage.getItem("idOfMeals"));
        console.log(arrayOfId);
        var mealToBeDeleted = arrayOfId.indexOf(event.target.parentNode.id);
        arrayOfId.splice(mealToBeDeleted, 1);
        document.getElementById(event.target.parentNode.parentNode.id).remove();
        localStorage.setItem("idOfMeals", JSON.stringify(arrayOfId));
        alert("Remove from your List !!");
        if (arrayOfId.length == 0) {
            document.getElementById("listHeading").innerHTML = "Your List is Empty now !!";
        }
    }

})
