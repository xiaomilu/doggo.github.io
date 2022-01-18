const DOG_CEO = "https://dog.ceo/api";
const BREEDS_URL = `${DOG_CEO}/breeds/list/all`;

const dropdownParent = document.querySelector('#dog-breeds');
const imgContainer = document.querySelector('.dog-img');
const loadingSpinner = document.querySelector('.spinner');

// Function to populate dog breeds dropdown list
const populateDogBreedList = async () => {
    // Get list of dog breeds
    const dogBreedsRes = await fetch(BREEDS_URL);
    const data = await dogBreedsRes.json();
    const dogBreedsObj = data.message;
    const listOfDogBreeds = Object.keys(dogBreedsObj);

    for (let i = 0; i < Object.keys(listOfDogBreeds).length; i++) {
        let option = document.createElement("option");
        option.value = listOfDogBreeds[i];
        option.innerText = listOfDogBreeds[i];

        dropdownParent.appendChild(option);
    }
    
}

const getDoggoImg = (url) => {
    // Show loading spinner
    loadingSpinner.classList.add("show");
    imgContainer.classList.remove("show");
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function(data) {
            imgContainer.src = data.message;
        })
};

populateDogBreedList();

dropdownParent.addEventListener("change", function(event) {
    imgContainer.classList.remove("show");
    let selectedBreedImgUrl = `${DOG_CEO}/breed/${event.target.value}/images/random`;

    getDoggoImg(selectedBreedImgUrl);
} );


imgContainer.addEventListener("click", function() {
    let url = `${DOG_CEO}/breed/${dropdownParent.value}/images/random`;

    getDoggoImg(url);
});

imgContainer.addEventListener("touchstart", function() {
    let url = `${DOG_CEO}/breed/${dropdownParent.value}/images/random`;

    getDoggoImg(url);
});

imgContainer.addEventListener("load", function () {
    loadingSpinner.classList.remove("show");
    imgContainer.classList.add("show");
});



