// Selecting the elements from the DOM for later use
let info = document.getElementById("info-container");
let title = document.getElementById("page-title");

// Retrieving the heroInfo object from localStorage, which was saved when the user clicked on "More Info".
// This data will be used to display hero details on the page.
let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));

// Dynamically updating the page title with the hero's name followed by " | SH" (presumably for "SuperHero")
title.innerHTML = heroInfo.name + " | SH";

// Adding an event listener for when the page is fully loaded
window.addEventListener("load", function () {
  // Retrieving the IDs of the user's favorite characters from localStorage
  let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

  // If no favorites exist, initialize an empty Map to store IDs
  if (favouritesCharacterIDs == null) {
    favouritesCharacterIDs = new Map();
  } else if (favouritesCharacterIDs != null) {
    // If favorites do exist, parse them from a JSON string and convert back to a Map
    favouritesCharacterIDs = new Map(
      JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
    );
  }

  // Adding the hero's information to the page dynamically by manipulating the innerHTML
  info.innerHTML = `
               <div class="flex-row hero-name">${heroInfo.name}</div>
               <div class="flex-row hero-img-and-more-info">
                    <img id="portraitImage" class="hero-img" src="${
                      heroInfo.portraitImage
                    }" alt="">
                    <img style="display:none;" id="landscapeImage" src="${
                      heroInfo.landscapeImage
                    }" alt="">
                    <div class="flex-col more-info">
                         <div class="flex-row id">
                              <b>ID:</b><span>${heroInfo.id}</span>
                         </div>
                         <div class="flex-row comics">
                              <b>Comics:</b><span>${heroInfo.comics}</span>
                         </div>
                         <div class="flex-row series">
                              <b>Series:</b><span>${heroInfo.series}</span>
                         </div>
                         <div class="flex-row stories">
                              <b>Stories:</b><span>${heroInfo.stories}</span>
                         </div>
                    </div>
               </div>
               <div class="flex-col hero-description">
                    <b>Description:</b>
                    <p>${
                      heroInfo.description != ""
                        ? heroInfo.description
                        : "No Description Available"
                    }</p>
               </div>
               <div style="display:none;">
                    <span>${heroInfo.name}</span>
                    <span>${heroInfo.portraitImage}</span>
                    <span>${heroInfo.landscapeImage}</span>
                    <span>${heroInfo.id}</span>
                    <span>${heroInfo.comics}</span>
                    <span>${heroInfo.series}</span>
                    <span>${heroInfo.stories}</span>
                    <span>${heroInfo.squareImage}</span>
                    <span>${heroInfo.description}</span>
               </div>
               <button class="btn add-to-fav-btn">${
                 favouritesCharacterIDs.has(`${heroInfo.id}`)
                   ? '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites'
                   : '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites</button>'
               }

          `;
  // Call the function that attaches event listeners to the dynamic content after it's been rendered
  addEvent();
});

// This event listener handles image switching based on screen size (responsive design)
// It switches between portrait and landscape images depending on the screen width
window.addEventListener("resize", function () {
  let portraitImage = document.getElementById("portraitImage");
  let landscapeImage = document.getElementById("landscapeImage");

  // If the screen width is less than 678px, display the landscape image and hide the portrait image
  if (document.body.clientWidth < 678) {
    portraitImage.style.display = "none";
    landscapeImage.style.display = "block";
  } else {
    // If the screen width is greater than or equal to 678px, show the portrait image and hide the landscape image
    landscapeImage.style.display = "none";
    portraitImage.style.display = "block";
  }
});

// Function that gets called after the content has been loaded
// It adds a click event listener to the "Add to Favourites" button
function addEvent() {
  let favouriteButton = document.querySelector(".add-to-fav-btn");
  favouriteButton.addEventListener("click", addToFavourites);
}

// This function handles adding or removing the hero from the user's favorites list
function addToFavourites() {
  // If the button currently says "Add to Favourites"
  if (
    this.innerHTML ==
    '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites'
  ) {
    // Create an object that stores the relevant hero information
    let heroInfo = {
      name: this.parentElement.children[3].children[0].innerHTML,
      description: this.parentElement.children[3].children[8].innerHTML,
      comics: this.parentElement.children[3].children[4].innerHTML,
      series: this.parentElement.children[3].children[5].innerHTML,
      stories: this.parentElement.children[3].children[6].innerHTML,
      portraitImage: this.parentElement.children[3].children[1].innerHTML,
      id: this.parentElement.children[3].children[3].innerHTML,
      landscapeImage: this.parentElement.children[3].children[2].innerHTML,
      squareImage: this.parentElement.children[3].children[7].innerHTML,
    };

    // Retrieve the array of favorite characters from localStorage
    let favouritesArray = localStorage.getItem("favouriteCharacters");

    // If there are no favorite characters yet, initialize the array as empty
    if (favouritesArray == null) {
      favouritesArray = [];
    } else {
      // If the array exists, parse it back into an array
      favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
    }

    // Retrieve the map of favorite character IDs from localStorage
    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

    if (favouritesCharacterIDs == null) {
      // If the map doesn't exist, initialize it as an empty Map
      favouritesCharacterIDs = new Map();
    } else {
      // Parse and convert it back to a Map object
      favouritesCharacterIDs = new Map(
        JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
      );
    }

    // Add the current hero's ID to the map
    favouritesCharacterIDs.set(heroInfo.id, true);

    // Add the hero's info to the favorites array
    favouritesArray.push(heroInfo);

    // Save the updated map and array back to localStorage
    localStorage.setItem(
      "favouritesCharacterIDs",
      JSON.stringify([...favouritesCharacterIDs])
    );
    localStorage.setItem(
      "favouriteCharacters",
      JSON.stringify(favouritesArray)
    );

    // Change the button text to indicate the hero is now a favorite
    this.innerHTML =
      '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';

    // Show a toast message indicating the hero was added to favorites
    document.querySelector(".fav-toast").setAttribute("data-visiblity", "show");

    // Hide the toast message after 1 second
    setTimeout(function () {
      document
        .querySelector(".fav-toast")
        .setAttribute("data-visiblity", "hide");
    }, 1000);
  }
  // If the button currently says "Remove from Favourites"
  else {
    // Get the ID of the hero to remove from favorites
    let idOfCharacterToBeRemoveFromFavourites =
      this.parentElement.children[3].children[3].innerHTML;

    // Retrieve the favorites array and map from localStorage
    let favouritesArray = JSON.parse(
      localStorage.getItem("favouriteCharacters")
    );
    let favouritesCharacterIDs = new Map(
      JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
    );

    // Create a new array that will contain all characters except the one being removed
    let newFavouritesArray = [];

    // Remove the character's ID from the map
    favouritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavourites}`);

    // Filter the favorites array to remove the selected character
    favouritesArray.forEach((favourite) => {
      if (idOfCharacterToBeRemoveFromFavourites != favourite.id) {
        newFavouritesArray.push(favourite);
      }
    });

    // Save the updated favorites array and map back to localStorage
    localStorage.setItem(
      "favouriteCharacters",
      JSON.stringify(newFavouritesArray)
    );
    localStorage.setItem(
      "favouritesCharacterIDs",
      JSON.stringify([...favouritesCharacterIDs])
    );

    // Change the button text back to "Add to Favourites"
    this.innerHTML =
      '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';

    // Show a toast message indicating the hero was removed from favorites
    document
      .querySelector(".remove-toast")
      .setAttribute("data-visiblity", "show");

    // Hide the toast message after 1 second
    setTimeout(function () {
      document
        .querySelector(".remove-toast")
        .setAttribute("data-visiblity", "hide");
    }, 1000);
  }
}

/*----------------------------------------- Theme Changing  -------------------------------------------------  */

// Selecting the theme toggle button
let themeButton = document.getElementById("theme-btn");

// Add an event listener to handle theme switching when the button is clicked
themeButton.addEventListener("click", themeChanger);

// Immediately Invoked Function Expression (IIFE) that checks localStorage for the saved theme and applies it
(function () {
  let currentTheme = localStorage.getItem("theme");

  // If no theme is stored, set the default theme to light
  if (currentTheme == null) {
    root.setAttribute("color-scheme", "light");
    themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    themeButton.style.backgroundColor = "#0b8e99";
    localStorage.setItem("theme", "light");
    return;
  }

  // Apply the stored theme and adjust the button accordingly
  switch (currentTheme) {
    case "light":
      root.setAttribute("color-scheme", "light");
      themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      themeButton.style.backgroundColor = "#0b8e99";
      break;
    case "dark":
      root.setAttribute("color-scheme", "dark");
      themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
      themeButton.style.backgroundColor = "#a82fb3";
      themeButton.childNodes[0].style.color = "black";
      break;
  }
})();

// Function that handles theme switching when the user clicks the theme button
function themeChanger() {
  let root = document.getElementById("root");

  // If the current theme is light, switch to dark theme
  if (root.getAttribute("color-scheme") == "light") {
    root.setAttribute("color-scheme", "dark");
    themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    themeButton.style.backgroundColor = "#a82fb3";
    themeButton.childNodes[0].style.color = "black";
    localStorage.setItem("theme", "dark");
  }
  // If the current theme is dark, switch back to light theme
  else if (root.getAttribute("color-scheme") == "dark") {
    root.setAttribute("color-scheme", "light");
    themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    themeButton.style.backgroundColor = "#0b8e99";
    themeButton.childNodes[0].style.color = "white";
    localStorage.setItem("theme", "light");
  }
}
