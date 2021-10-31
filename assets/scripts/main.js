// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  console.log("After fetched recipes.");
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  console.log("Calling createRecipeCards.");
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  console.log("In fetchRecipes.");
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

    console.log("In Promise constructor in fetchRecipes.");

    // # Part 1 - self-coded:
    for(let i = 0; i < recipes.length; i++) {
      console.log("In for in Promise constructor.");
      let x = fetch(recipes[i])
      .then(response => response.json())
      .then(data => {
        recipeData[recipes[i]] = data;
        console.log(data);
      })
      .then(() => {
        console.log("Object.keys(recipeData).length: ");
        console.log(Object.keys(recipeData).length);
        console.log("recipes.length: ");
        console.log(recipes.length);
        if(Object.keys(recipeData).length == recipes.length) {
          console.log("recipeData is of length 3.");
          resolve(true);
        }
      })
      .catch(() => {
        console.log("In catch for fetch().");
        reject(false);
      })
    }
    console.log("After for loop in Promise constructor in fetch.");
  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  console.log("In loop for recipeEl's.");

  // Part 1 Expose - TODO
  for(let i = 0; i < Object.keys(recipeData).length; i++) {
    const recipeEl = document.createElement("recipe-card");
    recipeEl.data = recipeData[recipes[i]]
    // note to self that set data(data) isn't a function, so
    // you can't/don't use that syntax with it, but
    // rather use an assignment syntax.
    // .setData(recipeData[recipes[i]])
    const mainEl = document.getElementsByTagName("main")[0];

    console.log("In loop for recipeEl's.");

    mainEl.appendChild(recipeEl);
    console.log("After mainEl.appendChild(recipeEl).");
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
}