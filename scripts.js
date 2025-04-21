
//Itemname — input box jisme user meal ka naam likhta hai.
let Itemname = document.querySelector("#searchItem");
//main — wo container jisme meals display hote hain
let main = document.querySelector(".main");
//Jab "Search" button pe click hota hai, input ka value name me store hota hai
document.querySelector("#search").addEventListener("click", () => {
  let name = Itemname.value;
  if (name !== "") {  //Agar user kuch likhta hai to API call hoti hai MealDB se.
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    main.innerHTML = ""; //main.innerHTML = "" purane results ko clear karta hai.
    getData(url); //getData(url) function call hota hai jo data fetch karega.
    name = "";
  } else { //Agar input khali ho to alert aata hai.
    alert("enter name bro !!!");
  }
});

async function getData(url) { //Ye async function API se data fetch karta hai.
  try {
    const resp = await fetch(url);
    //Agar response theek aata hai to JSON me convert
    // karke LoadData function ko bhejta hai.
    if (resp.ok) {
      const data = await resp.json();
      LoadData(data.meals);
    } else {
      console.log("could not fetch data");
    }
  } catch (error) {
    //Catch block me error handle hota hai.
    alert("unable to get data");
  }
}
function LoadData(data) {
  data.map((item) => {
    const list = ({ idMeal, strMeal, strInstruction, strMealThumb } = item);
    Elements(list);
  });
  //Har meal item ko ek-ek karke Elements() function
  //  me bheja jata hai jo uska card banata hai.
}
function Elements(data) {
  const div = document.createElement("div");
  div.classList.add("items");
  main.appendChild(div);
  //Ek naya div banaya jata hai aur main div me add kiya jata hai.
  const img = document.createElement("img");
  div.appendChild(img);
  img.classList.add("img");
  img.src = data.strMealThumb;
  img.alt = data.strMeal;
  //Meal ka image dikhaya jata hai.
  const p = document.createElement("p");
  p.innerHTML = data.strMeal;
  p.classList.add("p");
  div.appendChild(p);
  //Meal ka naam show kiya jata hai.
  div.addEventListener("click", () => {
    main.innerHTML = "";
    main.appendChild(div);
    //Jab meal card pe click hota hai to detailed view open hota hai.
    let desc = document.createElement("p");
    desc.classList.add("desc");
    desc.innerHTML = `<h2>Instructions for making ${data.strMeal}</h2><br>${data.strInstructions}`;
    //Instruction show hoti hai.
    let it = document.createElement("p");
    it.innerHTML = `<h2>Ingredients need to make ${data.strMeal} </h2><br> ${data.strIngredient1}<br>${data.strIngredient2}<br>${data.strIngredient3}<br>${data.strIngredient4}<br>${data.strIngredient5}<br>${data.strIngredient6}<br>${data.strIngredien7}<br>${data.strIngredient8}<br>${data.strIngredien9}<br>${data.strIngredient10}<br>`;
    //10 ingredients dikhaye ja rahe hain.
    main.appendChild(it);
    main.appendChild(desc);
    //Aur sab kuch main div me dikhaya ja raha hai.
  });
}

async function RandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  //Ye function ek random meal fetch karta hai.
  if (resp.ok) {
    const data = await resp.json();
    // console.log(data.meals);
    const list = ({ idMeal, strMeal, strInstruction, strMealThumb } =
      data.meals[0]);
    AddingItem(list);//Random meal ko AddingItem() me bhej diya jata hai display ke liye.
  } else {
    alert("could not fetch the data");
  }
}

for (let i = 0; i < 5; i++) {
  RandomMeal();
}
//Page load hote hi 5 random meals dikhte hain.
const ul = document.querySelector("#ul");
function AddingItem(data) {
  const MealName = data.strMeal.slice(0, 10);
  const li = document.createElement("li");
  //Meal name 10 character tak cut kar ke show ho raha hai.
  const img = document.createElement("img");
  li.appendChild(img);
  img.classList.add("img");
  //Image show ho raha hai.
  img.src = data.strMealThumb;
  img.alt = MealName;
  const span = document.createElement("span");
  span.innerHTML = MealName;
  li.appendChild(span);
  ul.appendChild(li);
  //Name + image list me add ho rahe hain.
  li.addEventListener("click", () => {
    //Jab user kisi Today Special pe click kare, uska
    // full detailed view open hota hai with image, instructions, 
    // ingredients.
    main.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("items");
    main.appendChild(div);
    const img = document.createElement("img");
    div.appendChild(img);
    img.classList.add("img");
    img.src = data.strMealThumb;
    img.alt = data.strMeal;
    let desc = document.createElement("p");
    desc.classList.add("desc");
    desc.innerHTML = `<h2>Instructions for making ${data.strMeal} <br><a href="${data.strYoutube}" target="_blank">Youtube Link</a></h2><br>${data.strInstructions}`;
    let it = document.createElement("p");
    it.innerHTML = `<h2>Ingredients for ${data.strMeal} </h2><br> ${data.strIngredient1}<br>${data.strIngredient2}<br>${data.strIngredient3}<br>${data.strIngredient4}<br>${data.strIngredient5}<br>${data.strIngredient6}<br>${data.strIngredien7}<br>${data.strIngredient8}<br>${data.strIngredien9}<br>${data.strIngredient10}<br>`;
    main.appendChild(it);
    main.appendChild(desc);
  });
}
let select1 = document.querySelector("#c");
let food = document.querySelector("#food");
//Jab user ek country choose karta hai, second 
//dropdown update hota hai meals se.
select1.addEventListener("change", () => {
  let country = select1.value;
  Country(country);
  food.innerHTML = " <option hidden>Chooes one</option>";
});

async function Country(country) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
  );
  // console.log(resp);
  const data = await resp.json();
  const foods = data.meals;
  foods.map((food) => {
    // console.log(food.strMeal);
    CreateItem(food.strMeal);
  });
}
//API se country ke meals fetch hote hain.
function CreateItem(foods) {
  const items = document.createElement("option");
  items.value = foods;
  items.innerHTML = foods;
  food.appendChild(items);
}//Second dropdown me naye options add hote hain.

food.addEventListener("change", (event) => {
  Itemname.value = event.target.value;
});//Jab user second dropdown se meal choose kare, wo naam input box me 
// aa jata hai — jisse user directly search kar sake.
