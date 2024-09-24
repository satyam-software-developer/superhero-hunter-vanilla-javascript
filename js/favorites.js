// Selecting the card container from the DOM using its ID
let cardContainer = document.getElementById("container");

// Event listener attached to the window object to execute when the page is fully loaded
window.addEventListener("load", function () {
  // Retrieving the 'favouriteCharacters' array from localStorage
  let favourites = localStorage.getItem("favouriteCharacters");

  // If 'favouriteCharacters' is null, display a message indicating no characters are present
  if (favourites == null) {
    cardContainer.innerHTML =
      '<p class="no-characters">No characters present in Favourites</p>';
    return; // Exit the function if no favourites are found
  }
  // If 'favourites' is not null, parse the JSON string to convert it into an array
  else {
    favourites = JSON.parse(this.localStorage.getItem("favouriteCharacters"));
  }

  // If all characters have been deleted and the favourites array is empty, display a no characters message
  if (favourites.length == 0) {
    cardContainer.innerHTML =
      '<p class="no-characters">No characters present in Favourites</p>';
    return; // Exit the function
  }

  // Clear the card container before inserting new elements
  cardContainer.innerHTML = "";

  // Iterate through each character in the favourites array
  favourites.forEach((character) => {
    // Add a card for each character in the DOM with relevant information (image, name, ID, comics, etc.)
    cardContainer.innerHTML += `
               <div class="flex-col card">
                    <img src="${character.squareImage}" alt="">
                    <span class="name">${character.name}</span>
                    <span class="id">Id : ${character.id}</span>
                    <span class="comics">Comics : ${character.comics}</span>
                    <span class="series">Series : ${character.series}</span>
                    <span class="stories">Stories : ${character.stories}</span>
                    <a class="character-info" href="./more-info.html">
                         <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button>
                    </a>
                    <div style="display:none;">
                         <span>${character.id}</span>
                         <span>${character.name}</span>
                         <span>${character.comics}</span>
                         <span>${character.series}</span>
                         <span>${character.stories}</span>
                         <span>${character.description}</span>
                         <span>${character.landscapeImage}</span>
                         <span>${character.portraitImage}</span>
                         <span>${character.squareImage}</span>
                    </div>
                    <button class="btn remove-btn"><i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites</button>
               </div>
          `;
  });
  // Once all cards are inserted into the DOM, attach event listeners to the buttons
  addEvent();
});

// Function to attach event listeners to remove buttons and character info buttons after cards are rendered in DOM
function addEvent() {
  // Attach click event listener to all remove buttons in the DOM
  let removeBtn = document.querySelectorAll(".remove-btn");
  removeBtn.forEach((btn) =>
    btn.addEventListener("click", removeCharacterFromFavourites)
  );

  // Attach click event listener to all character info buttons for navigating to detailed info page
  let characterInfo = document.querySelectorAll(".character-info");
  characterInfo.forEach((character) =>
    character.addEventListener("click", addInfoInLocalStorage)
  );
}

// Function to remove a character from the favourites list
function removeCharacterFromFavourites() {
  // Extract the character's ID from the card's DOM element to identify which character to remove
  let idOfCharacterToBeDeleted =
    this.parentElement.children[2].innerHTML.substring(5); // Get the character ID by trimming 'Id : ' prefix

  // Retrieve the current 'favouriteCharacters' array from localStorage
  let favourites = JSON.parse(localStorage.getItem("favouriteCharacters"));

  // Retrieve the map of favourite character IDs to manage which IDs are in favourites
  let favouritesCharacterIDs = new Map(
    JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
  );

  // Remove the character ID from the 'favouritesCharacterIDs' map
  favouritesCharacterIDs.delete(`${idOfCharacterToBeDeleted}`);

  // Find and remove the character object from the favourites array based on the character ID
  favourites.forEach(function (favourite, index) {
    if (favourite.id == idOfCharacterToBeDeleted) {
      // Remove the character from the array
      favourites.splice(index, 1);
    }
  });

  // If the favourites array is now empty, display the no characters message in the DOM
  if (favourites.length == 0) {
    cardContainer.innerHTML =
      '<p class="no-characters">No characters present in Favourites</p>';
  }

  // Update the modified favourites array and IDs map back into localStorage
  localStorage.setItem("favouriteCharacters", JSON.stringify(favourites));
  localStorage.setItem(
    "favouritesCharacterIDs",
    JSON.stringify([...favouritesCharacterIDs])
  );

  // Remove the character card from the DOM
  this.parentElement.remove();

  // Display a "Removed from favourites" toast notification
  document
    .querySelector(".remove-toast")
    .setAttribute("data-visiblity", "show");

  // Hide the toast notification after 1 second
  setTimeout(function () {
    document
      .querySelector(".remove-toast")
      .setAttribute("data-visiblity", "hide");
  }, 1000);
}

// Function to store selected character info into localStorage when the user clicks "More Info"
function addInfoInLocalStorage() {
  // Extract detailed information of the selected character and store it in 'heroInfo' object
  let heroInfo = {
    name: this.parentElement.children[7].children[1].innerHTML,
    description: this.parentElement.children[7].children[5].innerHTML,
    comics: this.parentElement.children[7].children[2].innerHTML,
    series: this.parentElement.children[7].children[3].innerHTML,
    stories: this.parentElement.children[7].children[4].innerHTML,
    portraitImage: this.parentElement.children[7].children[7].innerHTML,
    id: this.parentElement.children[7].children[0].innerHTML,
    landscapeImage: this.parentElement.children[7].children[6].innerHTML,
  };

  // Store the 'heroInfo' object in localStorage for later use on the info page
  localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}

/*------------------------------------- Theme Changing  -------------------------------------------------  */

// Select the theme toggle button from the DOM using its ID
let themeButton = document.getElementById("theme-btn");

// Add an event listener to handle theme changes when the user clicks the theme button
themeButton.addEventListener("click", themeChanger);

// IIFE (Immediately Invoked Function Expression) to apply the previously set theme from localStorage when the page loads
(function () {
  // Retrieve the current theme from localStorage, or default to 'light' if no theme is set
  let currentTheme = localStorage.getItem("theme");
  if (currentTheme == null) {
    root.setAttribute("color-scheme", "light"); // Set default theme to light
    themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`; // Change button icon to moon for light theme
    themeButton.style.backgroundColor = "#0b8e99"; // Set background color for light theme
    localStorage.setItem("theme", "light"); // Save the light theme in localStorage
    return;
  }

  // Apply the stored theme based on the current theme value
  switch (currentTheme) {
    case "light":
      root.setAttribute("color-scheme", "light"); // Apply light theme
      themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      themeButton.style.backgroundColor = "#0b8e99";
      break;
    case "dark":
      root.setAttribute("color-scheme", "dark"); // Apply dark theme
      themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
      themeButton.style.backgroundColor = "#a82fb3";
      themeButton.childNodes[0].style.color = "black";
      break;
  }
})();

// Function to toggle between light and dark themes when the theme button is clicked
function themeChanger() {
  let root = document.getElementById("root");

  // Toggle to dark theme if currently in light theme
  if (root.getAttribute("color-scheme") == "light") {
    root.setAttribute("color-scheme", "dark");
    themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    themeButton.style.backgroundColor = "#a82fb3";
    themeButton.childNodes[0].style.color = "black";
    localStorage.setItem("theme", "dark"); // Save the dark theme in localStorage

    // Toggle to light theme if currently in dark theme
  } else if (root.getAttribute("color-scheme") == "dark") {
    root.setAttribute("color-scheme", "light");
    themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    themeButton.style.backgroundColor = "#0b8e99";
    themeButton.childNodes[0].style.color = "white";
    localStorage.setItem("theme", "light"); // Save the light theme in localStorage
  }
}
