import * as Carousel from "../ajax_fetch_axios_lab/carousel";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_qz5z8bl2apNuaOGBxvGpxKzIHjprDEMLDrzOrnAUrtPqhFG0f2BTWzf17AIV9igl";
// Set default headers and base URL for Axios requests
axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
/*async function initialLoad() {
  try {
    const breedSelect = document.querySelector('#breedSelect');
    // Fetch the list of breeds from the cat API
    const response = await fetch('https://api.thecatapi.com/v1/breeds');
    const breeds = await response.json();
    // Create options for each breed and append them to breedSelect
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error retrieving breeds:', error);
  }
}
initialLoad();
*/
(async function initialLoad() {
  const res = await axios("/breeds");
  const breeds = await res.data;

  breeds.forEach((breed) => {
    const opt = document.createElement("option");
    opt.value = breed.id;
    opt.textContent = breed.name;

    breedSelect.appendChild(opt);
  });

  loadCarousel();
})();

breedSelect.addEventListener("change", loadCarousel);
async function loadCarousel() {
  const val = breedSelect.value;
  const url = `/images/search?limit=25&breed_ids=${val}`;

  const res = await axios(url, {
    onDownloadProgress: updateProgress
  });

  buildCarousel(res.data);
}

function buildCarousel(data, favourites) {
  Carousel.clear();
  infoDump.innerHTML = "";

  data.forEach((ele) => {
    const item = Carousel.createCarouselItem(
      ele.url,
      breedSelect.value,
      ele.id
    );
    Carousel.appendCarousel(item);
  });

  if (favourites) {
    infoDump.innerHTML = "Here are your saved favourites!";
  } else if (data[0]) {
    const info = data[0].breeds || null;
    if (info && info[0].description) infoDump.innerHTML = info[0].description;
  } else {
    infoDump.innerHTML =
      "<div class='text-center'>No information on this breed, sorry!</div>";
  }

  Carousel.start();
}

axios.interceptors.request.use((request) => {
  console.log("Request Started.");
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  document.body.style.setProperty("cursor", "progress", "important");

  request.metadata = request.metadata || {};
  request.metadata.startTime = new Date().getTime();

  return request;
});

axios.interceptors.response.use(
  (response) => {
    response.config.metadata.endTime = new Date().getTime();
    response.config.metadata.durationInMS =
      response.config.metadata.endTime - response.config.metadata.startTime;

    console.log(
      `Request took ${response.config.metadata.durationInMS} milliseconds.`
    );
    document.body.style.cursor = "default";
    return response;
  },
  (error) => {
    error.config.metadata.endTime = new Date().getTime();
    error.config.metadata.durationInMS =
      error.config.metadata.endTime - error.config.metadata.startTime;

    console.log(
      `Request took ${error.config.metadata.durationInMS} milliseconds.`
    );
    document.body.style.cursor = "default";
    throw error;
  }
);

function updateProgress(progressEvent) {
  const total = progressEvent.total;
  const current = progressEvent.loaded;
  const percentage = Math.round((current / total) * 100);

  progressBar.style.transition = "width ease 1s";
  progressBar.style.width = percentage + "%";
}

export async function favourite(imgId) {
  const isFavorite = await axios(`/favourites?image_id=${imgId}`);

  if (isFavorite.data[0]) {
    await axios.delete(`/favourites/${isFavorite.data[0].id}`);
  } else {
    await axios.post("/favourites", {
      image_id: imgId
    });
  }
}

getFavouritesBtn.addEventListener("click", () => {
  getFavourites();
});
async function getFavourites() {
  const favourites = await axios(`/favourites`);

  const formattedFavs = favourites.data.map((entry) => {
    return entry.image;
  });

  buildCarousel(formattedFavs);
}



/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

// Retrieve information on the selected breed from the cat API
/*function getBreedInfo(breed) {
  fetch(`https://api.thecatapi.com/v1/breeds/${breed}`)
    .then(response => response.json())
    .then(data => {
      const carousel = document.getElementById('carousel');
      const infoDump = document.getElementById('infoDump');
      // Clear the carousel and infoDump elements
      carousel.innerHTML = '';
      infoDump.innerHTML = '';
      // Create carousel elements for each object in the response array
      data.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('carousel-item');
        element.innerHTML = `<img src="${item.image}" alt="${item.name}" />
                             <div class="caption">${item.description}</div>`;
        carousel.appendChild(element);
      });
      // Create an informational section within the infoDump element
      const breedInfo = document.createElement('div');
      breedInfo.classList.add('breed-info');
      breedInfo.innerHTML = `<h2>${data.name}</h2>
                             <p>${data.temperament}</p>
                             <p>${data.origin}</p>`;
      infoDump.appendChild(breedInfo);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
// Event handler for breedSelect
//const breedSelect = document.getElementById('breedSelect');
breedSelect.addEventListener('change', function() {
  const selectedBreed = breedSelect.value;
  getBreedInfo(selectedBreed);
});
// Call the getBreedInfo function at the end of initialLoad to create the initial carousel
function initialLoad() {
  // Your existing code for retrieving breeds and creating options goes here
  // Call getBreedInfo with the first breed as the initial selection
  const initialBreed = breedSelect.value;
  getBreedInfo(initialBreed);
}*/

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
// Retrieve a list of breeds from the cat API using Axios
/*function fetchBreeds() {
  return axios.get('breeds');
}
// Retrieve information on the selected breed from the cat API using Axios
function getBreedInfo(breed) {
  return axios.get(`breeds/${breed}`);
}
// Update your existing code to use the Axios functions
// Example usage of fetchBreeds
fetchBreeds()
  .then(response => {
    const breeds = response.data;
    // Process the breed data as needed
  })
  .catch(error => {
    console.error('Error:', error);
  });
// Example usage of getBreedInfo
function handleBreedSelect() {
  const selectedBreed = breedSelect.value;
  getBreedInfo(selectedBreed)
    .then(response => {
      const data = response.data;
      // Process the breed information as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
*/

/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */
// Add Axios interceptors to log request and response times
/*axios.interceptors.request.use(config => {
  config.metadata = { startTime: new Date() };
  console.log('Request started');
  return config;
}, error => {
  return Promise.reject(error);
});
axios.interceptors.response.use(response => {
  const { config } = response;
  const elapsedTime = new Date() - config.metadata.startTime;
  console.log(`Request finished in ${elapsedTime}ms`);
  return response;
}, error => {
  return Promise.reject(error);
});
// Use Axios for your API requests
// Example usage of fetchBreeds
axios.get('breeds')
  .then(response => {
    const breeds = response.data;
    // Process the breed data as needed
  })
  .catch(error => {
    console.error('Error:', error);
  });
// Example usage of getBreedInfo
function handleBreedSelect() {
  const selectedBreed = breedSelect.value;
  axios.get(`breeds/${selectedBreed}`)
    .then(response => {
      const data = response.data;
      // Process the breed information as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
*/

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 * progressBar id in html
 */
/*axios.interceptors.request.use(config => {
  // Reset the progress bar
  progressBar.style.width = '0%';
  // Attach the updateProgress function to the onDownloadProgress config option
  config.onDownloadProgress = updateProgress;
  console.log('Request started');
  return config;
}, error => {
  return Promise.reject(error);
});

function updateProgress(event) {
  // Log the ProgressEvent object to familiarize yourself with its structure
  console.log(event);
  // Calculate the progress percentage
  const progress = Math.round((event.loaded / event.total) * 100);
  // Update the width of the progressBar element
  progressBar.style.width = `${progress}%`;
}
*/
/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/*axios.interceptors.request.use(config => {
  document.body.style.cursor = "progress";
  // ...
  return config;
}, error => {
  document.body.style.cursor = "default";
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  document.body.style.cursor = "default";
  // ...
  return response;
}, error => {
  document.body.style.cursor = "default";
  return Promise.reject(error);
});
*/

/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
/*export async function favourite(imgId) {
  // your code here
}*/

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this. https://7pgrjb.csb.app/
 */
