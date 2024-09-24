// Public key for Marvel API authentication
// Satyam Public key
// 8ee65ec0b199279c5b89089cf9c56021

// Private key for Marvel API authentication
// Satyam Private key
// da14b55a0c1576b13badd1fd8429e7be353f620a

// Combined hash for API request authentication
// Satyam hash
// 1da14b55a0c1576b13badd1fd8429e7be353f620a8ee65ec0b199279c5b89089cf9c56021
// MD5 hash of the combined hash
// md5(hash) = f30452873be9f4740aaebfcdd00c2d42

// API endpoint for Marvel characters
// satyam: https://gateway.marvel.com/v1/public/characters?apikey=8ee65ec0b199279c5b89089cf9c56021

/*------------  Selecting the element from DOM ----------------------------------------*/

// Select the search bar input element from the DOM by its ID 'search-bar'
let searchBar = document.getElementById("search-bar");

// Select the unordered list element that will display the search results by its ID 'search-results'
let searchResults = document.getElementById("search-results");

// Adding event listener to the search bar for input changes
searchBar.addEventListener("input", () => searchHeros(searchBar.value));

// Function to make an API call to search for heroes
async function searchHeros(textSearched) {
  // Define the public and private keys for API access
  const PUBLIC_KEY = "8ee65ec0b199279c5b89089cf9c56021";
  const PRIVATE_KEY = "da14b55a0c1576b13badd1fd8429e7be353f620a";

  // Generate a timestamp for the request
  let ts = new Date().getTime();
  // Create a hash using MD5 for the API request
  let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

  // If the search bar is empty, clear the displayed results
  if (textSearched.length == 0) {
    searchResults.innerHTML = ``;
    return;
  }

  // Fetch data from the Marvel API based on the search input
  await fetch(
    `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
  )
    .then((res) => res.json()) // Convert the response to JSON format
    .then((data) => showSearchedResults(data.data.results)); // Pass the results to the function to display them
}

// Function for displaying the searched results in the DOM
// Accepts an array of searched heroes as an argument
function showSearchedResults(searchedHero) {
  // Retrieve the IDs of characters that are added to favourites from localStorage
  let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

  if (favouritesCharacterIDs == null) {
    // Initialize it with an empty map if no favourites are found
    favouritesCharacterIDs = new Map();
  } else if (favouritesCharacterIDs != null) {
    // Parse and convert to map if favourites IDs exist
    favouritesCharacterIDs = new Map(
      JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
    );
  }

  // Clear previous search results
  searchResults.innerHTML = ``;
  // Initialize a count to limit displayed results
  let count = 1;

  // Iterate over the searched heroes array
  for (const key in searchedHero) {
    // Display only the first 5 results
    if (count <= 5) {
      // Get a single hero object from the searched results
      let hero = searchedHero[key];
      // Append the hero information to the search results in the DOM
      searchResults.innerHTML += `
               <li class="flex-row single-search-result">
                    <div class="flex-row img-info">
                         <img src="${
                           hero.thumbnail.path +
                           "/portrait_medium." +
                           hero.thumbnail.extension
                         }" alt="">
                         <div class="hero-info">
                              <a class="character-info" href="./more-info.html">
                                   <span class="hero-name">${hero.name}</span>
                              </a>
                         </div>
                    </div>
                    <div class="flex-col buttons">
                         <button class="btn add-to-fav-btn">${
                           favouritesCharacterIDs.has(`${hero.id}`)
                             ? '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites'
                             : '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites</button>'
                         }
                    </div>
                    <div style="display:none;">
                         <span>${hero.name}</span>
                         <span>${hero.description}</span>
                         <span>${hero.comics.available}</span>
                         <span>${hero.series.available}</span>
                         <span>${hero.stories.available}</span>
                         <span>${
                           hero.thumbnail.path +
                           "/portrait_uncanny." +
                           hero.thumbnail.extension
                         }</span>
                         <span>${hero.id}</span>
                         <span>${
                           hero.thumbnail.path +
                           "/landscape_incredible." +
                           hero.thumbnail.extension
                         }</span>
                         <span>${
                           hero.thumbnail.path +
                           "/standard_fantastic." +
                           hero.thumbnail.extension
                         }</span>
                    </div>
               </li>
               `;
    }
    count++;
  }
  // Attach event listeners to the buttons after they are inserted into the DOM
  events();
}

// Function for attaching event listeners to buttons
function events() {
  // Select all buttons that add characters to favourites
  let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
  // Add click event listener to each button
  favouriteButton.forEach((btn) =>
    btn.addEventListener("click", addToFavourites)
  );

  // Select all character info links
  let characterInfo = document.querySelectorAll(".character-info");
  // Add click event listener to each character info link
  characterInfo.forEach((character) =>
    character.addEventListener("click", addInfoInLocalStorage)
  );
}

// Function invoked when "Add to Favourites" or "Remove from Favourites" button is clicked
// The appropriate action is taken according to the button clicked
function addToFavourites() {
  // Check if the button is for adding to favourites
  if (
    this.innerHTML ==
    '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites'
  ) {
    // Create an object containing relevant info of the hero to add to favourites
    let heroInfo = {
      name: this.parentElement.parentElement.children[2].children[0].innerHTML,
      description:
        this.parentElement.parentElement.children[2].children[1].innerHTML,
      comics:
        this.parentElement.parentElement.children[2].children[2].innerHTML,
      series:
        this.parentElement.parentElement.children[2].children[3].innerHTML,
      stories:
        this.parentElement.parentElement.children[2].children[4].innerHTML,
      portraitImage:
        this.parentElement.parentElement.children[2].children[5].innerHTML,
      id: this.parentElement.parentElement.children[2].children[6].innerHTML,
      landscapeImage:
        this.parentElement.parentElement.children[2].children[7].innerHTML,
      squareImage:
        this.parentElement.parentElement.children[2].children[8].innerHTML,
    };

    // Retrieve the favourites array from localStorage
    let favouritesArray = localStorage.getItem("favouriteCharacters");

    // If favouritesArray is null (first time visiting), create a new array
    if (favouritesArray == null) {
      favouritesArray = [];
    } else {
      // Otherwise, parse it into an array
      favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
    }

    // Retrieve the favourites character IDs from localStorage
    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

    if (favouritesCharacterIDs == null) {
      // Initialize it with an empty map if no IDs are found
      favouritesCharacterIDs = new Map();
    } else {
      // Parse and convert it into a map if IDs exist
      favouritesCharacterIDs = new Map(
        JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
      );
    }

    // Add the character ID to the favouritesCharacterIDs map
    favouritesCharacterIDs.set(heroInfo.id, true);

    // Add the heroInfo object to favouritesArray
    favouritesArray.push(heroInfo);

    // Store the updated favouritesCharacterIDs map in localStorage
    localStorage.setItem(
      "favouritesCharacterIDs",
      JSON.stringify([...favouritesCharacterIDs])
    );
    // Store the updated favouritesCharacters array in localStorage
    localStorage.setItem(
      "favouriteCharacters",
      JSON.stringify(favouritesArray)
    );

    // Change the button text to "Remove from Favourites"
    this.innerHTML =
      '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';

    // Show a toast notification indicating the character has been added to favourites
    document.querySelector(".fav-toast").setAttribute("data-visiblity", "show");
    // Hide the toast notification after 1 second
    setTimeout(function () {
      document
        .querySelector(".fav-toast")
        .setAttribute("data-visiblity", "hide");
    }, 1000);
  } else {
    // If the button was clicked for removing from favourites
    let heroID =
      this.parentElement.parentElement.children[2].children[6].innerHTML;

    // Retrieve the favourites array from localStorage
    let favouritesArray = localStorage.getItem("favouriteCharacters");
    // Parse the array if it exists
    if (favouritesArray) {
      favouritesArray = JSON.parse(favouritesArray);
    }

    // Filter out the hero being removed from the favouritesArray
    favouritesArray = favouritesArray.filter((hero) => hero.id !== heroID);

    // Retrieve the favourites character IDs from localStorage
    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
    // Parse the IDs into a map
    favouritesCharacterIDs = new Map(JSON.parse(favouritesCharacterIDs));

    // Remove the character ID from the favouritesCharacterIDs map
    favouritesCharacterIDs.delete(heroID);

    // Store the updated favouritesCharacterIDs map in localStorage
    localStorage.setItem(
      "favouritesCharacterIDs",
      JSON.stringify([...favouritesCharacterIDs])
    );
    // Store the updated favouritesCharacters array in localStorage
    localStorage.setItem(
      "favouriteCharacters",
      JSON.stringify(favouritesArray)
    );

    // Change the button text to "Add to Favourites"
    this.innerHTML =
      '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';

    // Show a toast notification indicating the character has been removed from favourites
    document.querySelector(".fav-toast").setAttribute("data-visiblity", "show");
    // Hide the toast notification after 1 second
    setTimeout(function () {
      document
        .querySelector(".fav-toast")
        .setAttribute("data-visiblity", "hide");
    }, 1000);
  }
}

// Function which stores the info object of the character for which the user wants to see the info
function addInfoInLocalStorage() {
  // This function stores the character's data in localStorage.
  // When the user clicks on the info button, this data is saved so that
  // when the info page is opened, it can fetch the heroInfo and display the data.

  let heroInfo = {
    // Retrieve the character's name from the DOM structure
    name: this.parentElement.parentElement.parentElement.children[2].children[0]
      .innerHTML,
    // Retrieve the character's description
    description:
      this.parentElement.parentElement.parentElement.children[2].children[1]
        .innerHTML,
    // Retrieve the number of comics the character appears in
    comics:
      this.parentElement.parentElement.parentElement.children[2].children[2]
        .innerHTML,
    // Retrieve the number of series the character appears in
    series:
      this.parentElement.parentElement.parentElement.children[2].children[3]
        .innerHTML,
    // Retrieve the number of stories the character appears in
    stories:
      this.parentElement.parentElement.parentElement.children[2].children[4]
        .innerHTML,
    // Retrieve the path for the character's portrait image
    portraitImage:
      this.parentElement.parentElement.parentElement.children[2].children[5]
        .innerHTML,
    // Retrieve the character's ID
    id: this.parentElement.parentElement.parentElement.children[2].children[6]
      .innerHTML,
    // Retrieve the path for the character's landscape image
    landscapeImage:
      this.parentElement.parentElement.parentElement.children[2].children[7]
        .innerHTML,
    // Retrieve the path for the character's square image
    squareImage:
      this.parentElement.parentElement.parentElement.children[2].children[8]
        .innerHTML,
  };

  // Store the heroInfo object in localStorage as a JSON string
  localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}

/*--------------------  Theme Changing   -------------------------------------  */

// Selection of the theme button from the DOM by its ID 'theme-btn'
let themeButton = document.getElementById("theme-btn");

// Add a click event listener to the theme button that triggers the themeChanger function
themeButton.addEventListener("click", themeChanger);

// Immediately Invoked Function Expression (IIFE) to check localStorage
// and apply the previously set theme when the page loads
(function () {
  // Retrieve the current theme from localStorage
  let currentTheme = localStorage.getItem("theme");
  if (currentTheme == null) {
    // If no theme is set, default to light theme
    root.setAttribute("color-scheme", "light");
    // Update the theme button icon and style
    themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    themeButton.style.backgroundColor = "#0b8e99";
    // Store the default theme in localStorage
    localStorage.setItem("theme", "light");
    return; // Exit the function as the default theme is set
  }

  // Apply the theme based on the value retrieved from localStorage
  switch (currentTheme) {
    case "light":
      // Set to light theme and update button appearance
      root.setAttribute("color-scheme", "light");
      themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      themeButton.style.backgroundColor = "#0b8e99";
      break; // Exit switch statement
    case "dark":
      // Set to dark theme and update button appearance
      root.setAttribute("color-scheme", "dark");
      themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
      themeButton.style.backgroundColor = "#a82fb3";
      themeButton.childNodes[0].style.color = "black"; // Set icon color
      break; // Exit switch statement
  }
})();

// Function for handling theme button changes
function themeChanger() {
  // Select the root element from the DOM
  let root = document.getElementById("root");

  // Check the current color scheme of the root element
  if (root.getAttribute("color-scheme") == "light") {
    // If the current theme is light, switch to dark theme
    root.setAttribute("color-scheme", "dark");
    themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`; // Update button icon
    themeButton.style.backgroundColor = "#a82fb3"; // Update button background color
    themeButton.childNodes[0].style.color = "black"; // Change icon color
    localStorage.setItem("theme", "dark"); // Save the dark theme in localStorage
  } else if (root.getAttribute("color-scheme") == "dark") {
    // If the current theme is dark, switch to light theme
    root.setAttribute("color-scheme", "light");
    themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`; // Update button icon
    themeButton.style.backgroundColor = "#0b8e99"; // Update button background color
    themeButton.childNodes[0].style.color = "white"; // Change icon color
    localStorage.setItem("theme", "light"); // Save the light theme in localStorage
  }
}
