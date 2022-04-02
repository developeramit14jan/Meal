// some common data
const api_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let favourite_image_location = "./images/Like.jpg";
let un_favourite_image_location = "./images/UnLike.jpg";
let search_string = document.getElementById('search');
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


function renderData(data){
  if(data.response == 'error'){
   document.getElementById("meal_result").style.fontSize = "25px";
    document.getElementById("meal_result").innerHTML = data.error;
  }else{
    let image_location = un_favourite_image_location;
    console.log(data.meals)// for understanding data.meal is an array
    document.getElementById("meal_result").innerHTML="Your Search Meal List :";
    document.getElementById("result").innerHTML = data.meals.map(
      meal =>`<div class ="meal" id ="${meal.idMeal}">
      <img id ="meal_image" src ="${meal.strMealThumb}">
      <div class ="meal_data" id="${meal.strMeal}">
      <img id="favourite" src =${image_location}>
      
      </div>
      <h3>${meal.strMeal}
      </h3>
      </div>`
    ).join('')
  }
}

// function renderData(data) {
//   // Checking if there's anything found
//   if (data.response == 'error') {
//     // adding message for client
//     document.getElementById("result").style.fontSize = "25px";
//     document.getElementById("result").innerHTML = data.error;


//   }
//   else {
//     // delete previous search meal
//     var previous_data = document.getElementById("result");
//     previous_data.remove();
//     // creating new meal
//     var data_container = document.getElementById("meal_list");
//     var newdata = document.createElement('DIV');
//     newdata.id = 'new_list';
//     data_container.appendChild(newdata);


//     // rendering each meals
//     data.meals.forEach((element) => {
//       newdata.appendChild(getData(element));
//     });
  
// }

// function getData(data) {
//   // data container
//   var data_Container = document.createElement('DIV');
//   data_Container.id = data.id;
//   console.log(data.strMealThum);
//   data_Container.className = "search_string_data";
//   let image_location = favourite_image_location;
//   // var favourite_super_hero_index = JSON.parse(localStorage.getItem("id_of_favourite"));
//   // if(favourite_super_hero_index.indexOf(data.id) != -1){
//   //   image_location = favourite;
//   // }

//   data_Container.innerHTML = ` 
//       <div id ="meal_list">
//       <img id="meal_image" src ="${data.strMealThumb}" width =350>
//         <div id=${data.strMeal}>
//         <div id ="display_name">
//         <h3 >${data.strMeal}</h3>
//         </div>
//         <img id="favourite" src =${image_location} width =100>
//         </div>

        
//     `
//   return data_Container;
// }
// }