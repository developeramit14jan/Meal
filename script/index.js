// some common data
const api_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let favourite_image_location = "./images/Like.jpg";
let un_favourite_image_location = "./images/UnLike.jpg";
let search_string = document.getElementById('search');
let image_location;
async function search_meal(search_data) {
  var response = await fetch(api_url + search_data);
  if (response.ok) {
    var data = await response.json();
    renderData(data);
    console.log(data.meals)
    // strMeal:
    console.log("Length", data.meals.length);
    console.log(data.meals[0].strMeal);
  }

}

search_string.addEventListener('keyup', function (event) {
  let search_data = event.target.value;
  console.log("your search string", search_data);
  if (search_data.length < 3) {
    document.getElementById("meal_result").style.fontSize = "25px";
    document.getElementById("meal_result").innerHTML = "Add Some more character";
  } else {
    search_meal(search_data);
  }

});


function renderData(data) {
  if (data.response == 'error') {
    document.getElementById("meal_result").style.fontSize = "25px";
    document.getElementById("meal_result").innerHTML = data.error;
  } else {

    console.log(image_location);
    console.log(data.meals)// for understanding data.meal is an array
    document.getElementById("meal_result").innerHTML = "Your Search Meal List :";
    //     // delete previous search meal
    var previous_data = document.getElementById("result");
    previous_data.remove();
    // creating new meal
    var data_container = document.getElementById("meal_list");
    var result = document.createElement('DIV');
    result.id = 'result';
    data_container.appendChild(result);


    // rendering each meals
    data.meals.forEach((element) => {
      result.appendChild(getData(element));
    });

  }
}

function getData(data) {
  // data container
  var data_Container = document.createElement('DIV');
  data_Container.id = data.idMeal;
  console.log(data.strMealThum);
  data_Container.className = "meal";
  let image_location = un_favourite_image_location;
  let checkTheIndexOfClientList = JSON.parse(localStorage.getItem("idOfMeals"));
  if (checkTheIndexOfClientList.indexOf(data.idMeal) != -1) {
    image_location = favourite_image_location;
  }


  data_Container.innerHTML = ` 
      <img id="meal_image" src ="${data.strMealThumb}" width =350>
        <div class ="meal_data" >
        <img id="favourite"  src =${image_location}>
        </div>
        <h3 >${data.strMeal}</h3>
        
    `
  return data_Container;
}

checkEntryOfLocalStorage();
function checkEntryOfLocalStorage() {
  if (localStorage.getItem("idOfMeals") == null) {
    localStorage.setItem("idOfMeals", JSON.stringify(Array()));
  }
}

// add the data to favourite list
document.addEventListener('click', function (event) {
  if (event.target.id == "favourite") {
    console.log("Your favourite", event.target.parentNode.parentNode.id);
    var idMeal = event.target.parentNode.parentNode.id;
    console.log(idMeal);
    var idOfAllMealList = JSON.parse(localStorage.getItem("idOfMeals"));
    if (idOfAllMealList.indexOf(idMeal) != -1) {
      localStorage.setItem("idOfMeals", JSON.stringify(idOfAllMealList));
      event.target.src = un_favourite_image_location;
      console.log(event.src);
      var idOfMealToBeRemove = idOfAllMealList.indexOf(idMeal);
      //remove the element from array
      idOfAllMealList.splice(idOfMealToBeRemove, 1);
      alert("Remove From Your List !!");
    } else {
      idOfAllMealList.push(idMeal);
      event.target.src = favourite_image_location;
      console.log(event.src);
      alert("Added To Your List !!");
    }
    localStorage.setItem("idOfMeals", JSON.stringify(idOfAllMealList));
  }
});
