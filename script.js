/* =========================
   SONG DATABASE
========================= */

const songs = [

  {
    title: "FE!N",
    artist: "Travis Scott",
    page: "songs/fein.html",
    image: "images/travis.png"
  },

  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    page: "#",
    image: "images/the wekend.webp"
  },

  {
    title: "Starboy",
    artist: "The Weeknd",
    page: "#",
    image: "images/the wekend.webp"
  },

  {
    title: "One Dance",
    artist: "Drake",
    page: "#",
    image: "images/drake.jpg"
  }

];

/* =========================
   ELEMENTS
========================= */

const searchInput =
  document.getElementById("searchInput");

const searchButton =
  document.getElementById("searchButton");

const suggestions =
  document.getElementById("suggestions");

/* =========================
   LIVE SEARCH SUGGESTIONS
========================= */

if (searchInput) {

  searchInput.addEventListener("input", function () {

    const value =
      searchInput.value.toLowerCase().trim();

    suggestions.innerHTML = "";

    if (value === "") {
      return;
    }

    const filteredSongs = songs.filter(song =>

      song.title.toLowerCase().includes(value) ||

      song.artist.toLowerCase().includes(value)

    );

    if (filteredSongs.length === 0) {

      suggestions.innerHTML = `
        <div class="suggestion-item">
          No matching songs found.
        </div>
      `;

      return;
    }

    filteredSongs.forEach(song => {

      const suggestionItem =
        document.createElement("div");

      suggestionItem.classList.add(
        "suggestion-item"
      );

      suggestionItem.innerHTML = `
        <strong>${song.title}</strong>
        <br>
        <small>${song.artist}</small>
      `;

      suggestionItem.addEventListener(
        "click",
        function () {

          window.location.href = song.page;
        }
      );

      suggestions.appendChild(
        suggestionItem
      );

    });

  });

}

/* =========================
   SEARCH BUTTON
========================= */

if (searchButton) {

  searchButton.addEventListener(
    "click",
    function () {

      const value =
        searchInput.value
          .toLowerCase()
          .trim();

      const foundSong = songs.find(song =>

        song.title
          .toLowerCase()
          .includes(value)

        ||

        song.artist
          .toLowerCase()
          .includes(value)

      );

      if (foundSong) {

        window.location.href =
          foundSong.page;
      }

      else {

        alert(
          "No matching songs found."
        );
      }

    }
  );

}

/* =========================
   SAVE FAVORITES
========================= */

function saveFavorite(
  title,
  artist,
  page,
  image
) {

  let favorites =

    JSON.parse(
      localStorage.getItem("favorites")
    ) || [];

  const alreadyExists = favorites.find(
    song => song.title === title
  );

  if (!alreadyExists) {

    favorites.push({

      title,
      artist,
      page,
      image

    });

    localStorage.setItem(

      "favorites",

      JSON.stringify(favorites)

    );

    displayFavorites();

    alert("Song saved!");

  }

  else {

    alert("Song already saved.");

  }

}

/* =========================
   DISPLAY FAVORITES
========================= */

function displayFavorites() {

  const favoritesContainer =

    document.getElementById(
      "favoritesContainer"
    );

  if (!favoritesContainer) return;

  const favorites =

    JSON.parse(
      localStorage.getItem("favorites")
    ) || [];

  favoritesContainer.innerHTML = "";

  if (favorites.length === 0) {

    favoritesContainer.innerHTML = `
      <p>No saved songs yet.</p>
    `;

    return;
  }

  favorites.forEach(song => {

    const card =
      document.createElement("div");

    card.classList.add("song-card");

    card.innerHTML = `

      <img
        src="${song.image}"
        alt="${song.title}"
      >

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

/* =========================
   REMOVE FAVORITE
========================= */

function removeFavorite(title) {

  let favorites =

    JSON.parse(
      localStorage.getItem("favorites")
    ) || [];

  favorites = favorites.filter(

    song => song.title !== title

  );

  localStorage.setItem(

    "favorites",

    JSON.stringify(favorites)

  );

  displayFavorites();

}

/* =========================
   INITIALIZE FAVORITES
========================= */

displayFavorites();

/* =========================
   PARTICLES BACKGROUND
========================= */

tsParticles.load("tsparticles", {

  background: {

    color: "transparent"

  },

  particles: {

    number: {

      value: 60

    },

    color: {

      value: "#00ffff"

    },

    links: {

      enable: true,

      color: "#00ffff",

      distance: 150,

      opacity: 0.2

    },

    move: {

      enable: true,

      speed: 1

    },

    opacity: {

      value: 0.3

    },

    size: {

      value: {

        min: 1,
        max: 4

      }

    }

  }

});
