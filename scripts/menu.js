
const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
//DOM 
const buttons = document.querySelectorAll('.btns button');
const foods = document.querySelector('.foods');


for (const btn of buttons) {

  btn.addEventListener('click', () => {
    for (let i = 0; i < 5; i++) {
      if (btn.innerText === buttons[i].innerText) {
        buttons[i].className = "active"
        fetchMealByCategory(btn.innerText);

      } else {
        buttons[i].className = ""
      }


    }
  })

}

function fetchMealByCategory(categoryName = "Breakfast") {
  fetch(url + categoryName)
    .then(res => res.json())
    .then(foodData => {
      console.log(foodData);
      foods.innerHTML = "" 
      for (const food of foodData.meals) {
         foods.innerHTML += `
         <div class="food-card" onclick="goInfoPage(${food.idMeal})">
         <div>
            <img src="${food.strMealThumb}" alt="">
         </div>
         <div>
            <h5>$ 7.25</h5>
            <p>${food.strMeal}</p>
         </div>
       </div>            
           `
      }
    })

  }


fetchMealByCategory();

function goInfoPage(id){
  window.location.href = '/food/pages/info.html';


  localStorage.setItem('foodId',id)

}