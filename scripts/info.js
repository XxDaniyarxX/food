const id = localStorage.getItem('foodId')

const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const ingsImgUrl = "https://www.themealdb.com/images/ingredients/";

// DOM
const h2Name = document.getElementById("food-name")
const img = document.getElementById("food-img")
const ings = document.querySelector('.ings-images')

const insList = document.querySelector('.ins .ins-list')
const video = document.querySelector('.video iframe')


// obrobotka oshibok try catch
async function getFoodInfo(){
    const res = await fetch(url + id);
    const infoData = await res.json()
    console.log(infoData);
    const food = infoData.meals[0]
    h2Name.innerText = food.strMeal
    img.src = food.strMealThumb
    for (let i = 1; i < 21; i++) {
        if(food['strIngredient' + i]){
            ings.innerHTML += `
            <div>
                <img src="${ingsImgUrl + food['strIngredient' + i]}.png" alt="">
                <h4>
                  ${food['strMeasure'+i]}
                  ${food['strIngredient' + i]}
                 </h4>
            </div>
            `
        }else {
            break;
        }
    }
    insList.innerHTML = "Step: " +food.strInstructions.replaceAll('\r\n',`
        <div class="line">   </div>
        Step:
        `)
    video.src = food.strYoutube.replace('watch?v=', 'embed/')  
}



if (id !== null){
    getFoodInfo()
}