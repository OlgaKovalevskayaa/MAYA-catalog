const items = [{
        title: "Трусики",
        description: "Ультратонкие, бесшовные, мягкие!",
        price: 1000,
        img: "./img_clothing-catalog/1.jpg",
        rating: 3,
    },
    {
        title: "Трусики",
        description: "Ультратонкие, бесшовные, мягкие!",
        price: 1000,
        img: "./img_clothing-catalog/2.jpg",
        rating: 3.1,
    },
    {
        title: "Трусики",
        description: "Ультратонкие, бесшовные, мягкие!",
        price: 1000,
        img: "./img_clothing-catalog/3.jpg",
        rating: 5.0,
    },
    {
        title: "Бюстгальтер для кормления",
        description: "Продвинутая модель. Нет косточек и боковых швов",
        price: 2000,
        img: "./img_clothing-catalog/4.jpg",
        rating: 4.7,
    },
    {
        title: "Бюстгальтер для кормления",
        description: "Продвинутая модель. Нет косточек и боковых швов",
        price: 2000,
        img: "./img_clothing-catalog/5.jpg",
        rating: 4.9,
    },
    {
        title: "Бюстгальтер для кормления",
        description: "Продвинутая модель. Нет косточек и боковых швов",
        price: 2000,
        img: "./img_clothing-catalog/6.jpg",
        rating: 3.2,
    },
    {
        title: "Бандаж для беременных",
        description: "Бандаж для комфортной беременности",
        price: 5000,
        img: "./img_clothing-catalog/7.jpg",
        rating: 4.4,
    },
    {
        title: "Бандаж для беременных",
        description: "Бандаж для комфортной беременности",
        price: 6000,
        img: "./img_clothing-catalog/8.jpg",
        rating: 4.4,
    },
    {
        title: "Бандаж для беременных",
        description: "Бандаж для комфортной беременности",
        price: 7000,
        img: "./img_clothing-catalog/9.jpg",
        rating: 4.8,
    },
    {
        title: "Леггинсы",
        description: "Лосины для беременных",
        price: 2000,
        img: "./img_clothing-catalog/10.jpg",
        rating: 4.2,
    },
    {
        title: "Леггинсы",
        description: "Лосины для беременных",
        price: 3000,
        img: "./img_clothing-catalog/11.jpg",
        rating: 4.7,
    },
    {
        title: "Бандаж послеродовой",
        description: "Помогает восстановлению",
        price: 3800,
        img: "./img_clothing-catalog/12.jpg",
        rating: 4.4,
    },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {

    const { title, description, img, price, rating } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;


    const ratingContainer = item.querySelector(".rating");
    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    return item;
}


const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {
                // Сначала дорогие
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                // Сначала дешевые
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                // От более высокого рейтинга к более низкому
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                // По алфавиту
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
});