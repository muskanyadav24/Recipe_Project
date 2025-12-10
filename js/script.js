const recipeUrl = () => {
    const recipeList = document.getElementById("recipeList");
    const recipeContent = document.getElementById("recipeContent");

    fetch('https://dummyjson.com/recipes')
        .then(response => response.json())
        .then(data => {
            const recipes = data.recipes;
            recipeList.innerHTML = "";

            recipes.forEach(recipe => {
                const li = document.createElement("li");
                li.textContent = recipe.name;
                li.onclick = () => showRecipe(recipe);
                recipeList.appendChild(li);
            });
            function showRecipe(recipe) {
                recipeContent.innerHTML = `
                <h1 class="recipe-title pt-3">${recipe.name}</h1>
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-img">
                <div class="recipe-details">
                <h3 class="color-p pt-3">Ingredients:</h3>
                <ul class="ps-5">${recipe.ingredients.map(i => `<li class="fs-5">${i}</li>`).join('')}</ul>
                <h3 class="color-p">Instructions:</h3>
                <p class="ps-5 fs-4">${recipe.instructions}</p>
                <p class="ps-5 fs-4"><b>Prep Time:</b> ${recipe.prepTimeMinutes} min | 
                    <b>Cook Time:</b> ${recipe.cookTimeMinutes} min</p>
                <p class="ps-5 fs-4"><b>Difficulty:</b> ${recipe.difficulty}</p>
                </div>
            `;
            }
        })
        .catch(err => {
            recipeList.innerHTML = `<li>Error loading recipes</li>`;
            console.error(err);
        });
}
recipeUrl();

// JQuery for Theme Toggle
$(document).ready(() =>{
    $("#themebtn").click(function(){
    if($("body, .right-side, .sidebar").hasClass("light")){
        $("body, .right-side, .sidebar").removeClass("light").addClass("dark");
        $("#themebtn").text("Light Mode");
    }else{
        $("body, .right-side, .sidebar").removeClass("dark").addClass("light");
        $("#themebtn").text("Dark Mode");
    }       
});
});
