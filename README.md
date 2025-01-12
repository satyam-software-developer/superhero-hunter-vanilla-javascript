# Superhero Hunter

Superhero Hunter using vanilla JavaScript project for frontend web development.

1. Demo: https://drive.google.com/file/d/1tsaN9G-S3j1uD2hOHBlJxWqinQmU2YmN/view?usp=sharing
2. Hosted link: https://satyam-software-developer.github.io/superhero-hunter-vanilla-javascript/

## Overview

The Superhero Hunter App is a web application that allows users to search for superheroes using the Marvel API. It displays a list of superheroes based on user input and provides additional information on each superhero. The app also includes a feature to mark superheroes as favourites and view them on a separate page. This app is built using vanilla JavaScript and Marvel’s API, styled using CSS frameworks such as Bootstrap.

## Description

This is a web application built using JavaScript, HTML, and CSS that allows users to search for their favourite Marvel superheroes and view their detailed information. The app also allows users to add characters to their favourites list for easy access.

## Features

- Search functionality for Marvel superheroes
- Add characters to favourites list
- View detailed information for characters

# Home Page

- Displays a list of superheroes.
- Includes a search bar to filter superheroes based on the search query.
- Each superhero result has a "Favorite" button.
- Clicking on a superhero name opens a new page with detailed information.

# Superhero Page

- Displays detailed information about the superhero (name, photo, bio, comics, events, series, stories).

# Favorite Superheroes Page

- Displays a list of favourite superheroes.
- This list persists between browser sessions using localStorage.
- Each superhero has a "Remove from favourites" button.

## Marvel API Integration

The app utilizes the Marvel API to fetch superhero data. This includes:

- Listing superheroes.
- Detailed superhero information.
- Search functionality based on user input.

## API Authentication

To use the Marvel API, we need to generate a hash using a combination of:

- Timestamp (ts).
- Private Key.
- Public Key.

## Functionality

# Home Page

- Search: Enter the superhero name to filter results using the Marvel API.
- Favorite: Each superhero has a "Favorite" button that adds the superhero to the "My Favorite Superheroes" list, stored in localStorage.
- View Superhero: Clicking on the superhero’s name leads to a detailed page with more information.

# Superhero Page

- Displays a lot of information, including name, photo, bio, comics, events, series, and stories, fetched from the Marvel API.

# Favorite Superheroes Page

- Lists all superheroes marked as favourites.
- Includes a "Remove from favourites" button for each superhero, which updates the list in real-time and in localStorage.

## LocalStorage for Favorites

The "My Favorite Superheroes" list is stored in the browser’s local storage, ensuring that the list persists between browser sessions. You can add and remove superheroes from this list.

## Technologies Used

- HTML5
- CSS3 (Bootstrap)
- JavaScript (Vanilla) for API calls, DOM manipulation, and event handling.
- Marvel API for superhero data.
- localStorage for persisting favourite superheroes.

## Dependencies

- Javascript
- HTML
- CSS
- Marvel API('https://developer.marvel.com/')

## Deployment

- Clone the repository to your local machine

```bash
  git clone https://github.com/satyam-software-developer/superhero-hunter-vanilla-javascript.git
```

- Obtain an API key from the Marvel Developer Portal (https://developer.marvel.com/) and add it to the appropriate location in the code

- Run the application by opening the index.html file in your browser.

## Usage

1. Search for a Marvel superhero by typing their name in the search bar and clicking the "Search" button.
2. Click on a character to view their detailed information.
3. Click the "Add to Favorites" button to add a character to your favourites list.
4. View your favourite characters by clicking on the "Favorites" tab.

## Note

The app is using a free developer API key from Marvel, thus the usage of the app is limited by the terms of service of Marvel's API.

## License

This project is licensed under the MIT License.

## Author

SATYAM KUMAR
