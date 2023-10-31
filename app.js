const appId="8cc78df5";
const appKey="72f34230280267f083b4d94428cb3725";
const baseURL=`https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`
const RecipeLists=document.querySelector('.continerMain');
const searchValue=document.querySelector("#inputText");
const btnFind=document.querySelector('#searchBtn');

btnFind.addEventListener("click",()=>{
  fetchData(searchValue.value);
})
searchValue.addEventListener("keyup",(e)=>{
  const val=searchValue.value;
  if(e.keyCode===13){
    fetchData(val);
  }
})
const fetchData=async(type="egg")=>{ 
  RecipeLists.innerHTML='';
  searchValue.value='';  
      const response=await fetch(`${baseURL}&q=${type}`);
    const data = await response.json();
    let recipes=[];
    for( const item of data.hits){
      item.recipe.NoOfIngredients = item.recipe.ingredientLines.length;
      recipes.push(item.recipe);
      }
      console.log(data.hits);
    recipes=  _.orderBy(recipes, ['NoOfIngredients'], ['asc']);
    console.log(recipes);
    let content = '';
    for (const recipe of recipes ){
        // console.log(recipe);
        // console.log(recipe.recipe.label);
        // console.log(recipe.recipe.image);
        console.log(recipe.ingredientLines.length);
        content+=`
        <div class="item">
  <img src="${recipe.image}" class="image" alt="img" />
  <div class="flex-container">
    <h3 class="title">${recipe.label}</h3>
    <a class="view-btn" target="_blank" href="${recipe.url}">View Recipe</a>
  </div>
  <p class="item-data">Calories: ${recipe.calories.toFixed(2)}</p>
  <div class="ingrediantText">
    <ul id="ingrediantList">
      ${getArrToLi(recipe.ingredientLines)}
    </ul>
  </div>
</div>
        
    `           
    }
    RecipeLists.innerHTML= content; 
}
const getArrToLi=(arr)=>{
    let content='';
    //console.log(arr);
    for(const item of arr){
        content+= `<li>${item}</li>`
        //console.log(arr[item]);
    }
    return content;
}
function menuOnClick() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  openTab(event, 'homeTab')
 