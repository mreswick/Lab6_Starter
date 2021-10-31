// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'assets/recipes/recipe1.json',
  'assets/recipes/recipe2.json',
  'assets/recipes/recipe3.json'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {};

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.

    // Part 1 Expose - TODO

    // # Part 1 - self-coded:
    for(let i = 0; i < recipes.length; i++) {
      let x = fetch(recipes[i])
      .then(response => response.json())
      .then(data => {
        recipeData[recipes[i]] = data;
        return data;
      })
      .then(data => {
        if(Object.keys(recipeData).length == recipes.length) {
          resolve(true);
        }
        return data;
      })
      .catch(data => {
        reject(false);
      })
    }
  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.


  // Part 1 Expose - TODO
  for(let i = 0; i < Object.keys(recipeData).length; i++) {
    // only create recipes for first 3 (that we already were given):
    if(i >= 3) {
      break;
    }

    const recipeEl = document.createElement("recipe-card");
    recipeEl.data = recipeData[recipes[i]];
    // note to self that set data(data) isn't a function, so
    // you can't/don't use that syntax with it, but
    // rather use an assignment syntax.
    // .setData(recipeData[recipes[i]])
    const mainEl = document.getElementsByTagName("main")[0];
    mainEl.appendChild(recipeEl);
  }
}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/

  // Part 2 Explore - TODO

  // website #1: https://marisamoore.com/maple-walnut-blueberry-crisp/
  //  script is in: <script type="application/ld+josn" class="yoast-schema-graph">...</script>

  // website #2: https://www.twopurplefigs.com/holiday-turkish-pasta-with-yogurt-sauce/
  // script is in: <script type="application/ld+josn" class="yoast-schema-graph">...</script>

  // https://cadryskitchen.com/vegan-strawberry-milk/
  // script is in: <script type="application/ld+json" class="yoast-schema-graph">...</script>

  let buttonEl = document.getElementsByTagName("button")[0];
  buttonEl.addEventListener('click', butClickHandler);

}

function butClickHandler(event) {
  let buttonEl = document.getElementsByTagName("button")[0];
  if(buttonEl.textContent == "Show more") {
    // change button content
    buttonEl.innerHTML = "Show less";
    // create and show elements for remaining recipes
    for(let i = 3; i < Object.keys(recipeData).length; i++) {
      const recipeEl = document.createElement("recipe-card");
      recipeEl.data = recipeData[recipes[i]];
      const mainEl = document.getElementsByTagName("main")[0];
      mainEl.appendChild(recipeEl);
    }
  } else if(buttonEl.textContent == "Show less") {
    // change button content
    buttonEl.innerHTML = "Show more";
    // delete elements for last three recipes
    // note to self: assume below gets recipes in order they'd
    // be in html page
    const mainEl = document.getElementsByTagName("main")[0];
    const recipeEls = document.getElementsByTagName("recipe-card");
    // index of 3 used as additional recipes we added in local .json
    // files are #4-#6
    for(let j = 3; j < Object.keys(recipeData).length; j++) {
      // note to self that this .remove() removes the element
      // from the array as well as from the DOM,
      // so need to keep index constant (as array length is decreasing
      // with each delete)
      recipeEls[3].remove();
    }

  } else {
  }
}