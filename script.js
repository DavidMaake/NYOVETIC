const songs = [
  {
    title: "FE!N",
    artist: "Travis Scott",
    page: "songs/fein.html"
  },

  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    page: "#"
  },

  {
    title: "Starboy",
    artist: "The Weeknd",
    page: "#"
  },

  {
    title: "One Dance",
    artist: "Drake",
    page: "#"
  }
];

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const suggestions = document.getElementById("suggestions");

/* LIVE SUGGESTIONS */

searchInput.addEventListener("input", function () {

  const value = searchInput.value.toLowerCase();

  suggestions.innerHTML = "";

  if (value === "") return;

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(value) ||
    song.artist.toLowerCase().includes(value)
  );

  filteredSongs.forEach(song => {

    const suggestionItem = document.createElement("div");

    suggestionItem.classList.add("suggestion-item");

    suggestionItem.innerHTML = `
      <strong>${song.title}</strong> - ${song.artist}
    `;

    suggestionItem.addEventListener("click", function () {
      window.location.href = song.page;
    });

    suggestions.appendChild(suggestionItem);

  });

});

/* SEARCH BUTTON */

searchButton.addEventListener("click", function () {

  const value = searchInput.value.toLowerCase();

  const foundSong = songs.find(song =>
    song.title.toLowerCase().includes(value) ||
    song.artist.toLowerCase().includes(value)
  );

  if (foundSong) {
    window.location.href = foundSong.page;
  }

  else {
    alert("No matching songs found.");
  }

});

/* SAVE FAVORITES */

function saveFavorite(title, artist, page) {

  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  const alreadyExists = favorites.find(
    song => song.title === title
  );

  if (!alreadyExists) {

    favorites.push({
      title,
      artist,
      page
    });

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    displayFavorites();

    alert("Song saved!");
  }

}

/* DISPLAY FAVORITES */

function displayFavorites() {

  const favoritesContainer =
    document.getElementById("favoritesContainer");

  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  favoritesContainer.innerHTML = "";

  favorites.forEach(song => {

    const card = document.createElement("div");

    card.classList.add("song-card");

    card.innerHTML = `
  <h3>${song.title}</h3>
  <p>${song.artist}</p>

  <a href="${song.page}">
    View Lyrics
  </a>

  <button
    class="remove-btn"
    onclick="removeFavorite('${song.title}')"
  >
    ❌ Remove
  </button>
`;

    favoritesContainer.appendChild(card);

  });

}

displayFavorites();

/* REMOVE FAVORITE */

function removeFavorite(title) {

  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  favorites = favorites.filter(
    song => song.title !== title
  );

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  displayFavorites();

}