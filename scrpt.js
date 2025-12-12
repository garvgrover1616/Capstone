/* FULL FINAL SCRIPT WITH ALL ONCLICK BUTTONS */

const CATEGORIES = [
  {
    id: "mobiles",
    title: "Mobiles",
    subtitle: "Smartphones & accessories",
    image: "image 3 copy.png",
    keywords: "mobile smartphone phone galaxy",
    products: [
      { id: "p1", name: "Galaxy M52", price: "₹22,999", thumb: "image 3-1.png", desc: "AMOLED | 8GB" },
      { id: "p2", name: "OnePlus Nord", price: "₹19,999", thumb: "image 3-3.png", desc: "Fluid AMOLED" },
    ]
  },
  {
    id: "electronics",
    title: "Electronics",
    subtitle: "Headphones & speakers",
    image: "image 2.png",
    keywords: "electronics audio speakers",
    products: [
      { id: "e1", name: "Studio Headphones", price: "₹5,299", thumb: "image 4.png", desc: "Noise Isolation" }
    ]
  },
  {
    id: "fruits",
    title: "Fruits",
    subtitle: "Fresh groceries",
    image: "23410-4-strawberry-photo 1.png",
    keywords: "fruits mango apple",
    products: [
      { id: "f1", name: "Mango Pack", price: "₹180", thumb: "22136-3-mango-fruit 1.png", desc: "Fresh Mango" }
    ]
  }
];

const menuGrid = document.querySelector("#menuGrid");
const globalSearch = document.querySelector("#globalSearch");
const searchBtn = document.querySelector("#searchBtn");
const suggestionsBox = document.querySelector("#suggestionsBox");
const suggestionsList = document.querySelector("#suggestionsList");

const categoryOverlay = document.querySelector("#categoryOverlay");
const closeCategory = document.querySelector("#closeCategory");
const catTitle = document.querySelector("#catTitle");
const catSubtitle = document.querySelector("#catSubtitle");
const productsList = document.querySelector("#productsList");
const modalSearch = document.querySelector("#modalSearch");

const previewOverlay = document.querySelector("#previewOverlay");
const closePreview = document.querySelector("#closePreview");
const previewTitle = document.querySelector("#previewTitle");
const previewBody = document.querySelector("#previewBody");


// Render Category Cards
function renderMenu() {
  menuGrid.innerHTML = "";
  CATEGORIES.forEach(cat => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.dataset.id = cat.id;

    card.innerHTML = `
      <img src="${cat.image}">
      <h3>${cat.title}</h3>
      <p>${cat.subtitle}</p>

      <button class="btn btn-primary open-category-btn">Open Category</button>
    `;

    // Clicking card opens category modal
    card.addEventListener("click", () => {
      openCategoryModal(cat.id);
    });

    // Onclick button inside card
    card.querySelector(".open-category-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      alert("Opening " + cat.title);
      openCategoryModal(cat.id);
    });

    menuGrid.appendChild(card);
  });
}

// Open Category Modal
function openCategoryModal(id) {
  const cat = CATEGORIES.find(c => c.id === id);
  catTitle.textContent = cat.title;
  catSubtitle.textContent = cat.subtitle;

  productsList.innerHTML = "";
  cat.products.forEach(p => {
    const item = document.createElement("div");
    item.className = "prod-item";
    item.dataset.id = p.id;

    item.innerHTML = `
      <img class="prod-thumb" src="${p.thumb}">
      <div>
        <h4>${p.name}</h4>
        <p>${p.desc} • ${p.price}</p>
      </div>

      <button class="btn btn-outline view-product-btn">View Item</button>
    `;

    // Clicking product opens preview
    item.addEventListener("click", () => {
      productClicked(p);
    });

    // Button inside product
    item.querySelector(".view-product-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      alert("Opening: " + p.name);
      openProductPreview(p);
    });

    productsList.appendChild(item);
  });

  categoryOverlay.classList.add("active");
}

// Close category modal
closeCategory.addEventListener("click", () => {
  categoryOverlay.classList.remove("active");
});

// Filter in modal
modalSearch.addEventListener("input", () => {
  const term = modalSearch.value.toLowerCase();
  document.querySelectorAll(".prod-item").forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(term) ? "flex" : "none";
  });
});

// Product Clicked
function productClicked(product) {
  alert("You clicked: " + product.name);
  openProductPreview(product);
}

// Open preview modal
function openProductPreview(product) {
  previewTitle.textContent = product.name;

  previewBody.innerHTML = `
    <div class="preview-grid">
      <img class="preview-thumb" src="${product.thumb}">
      <div>
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <p style="font-weight:bold">${product.price}</p>

        <div style="margin-top:12px; display:flex; gap:10px;">
          <button class="btn btn-primary add-cart">Add to Cart</button>
          <button class="btn btn-outline buy-now">Buy Now</button>
          <button class="btn btn-primary more-info">More Info</button>
        </div>
      </div>
    </div>
  `;

  // ALL ONCLICK BUTTONS
  previewBody.querySelector(".add-cart").onclick = () =>
    alert("Added to cart: " + product.name);

  previewBody.querySelector(".buy-now").onclick = () =>
    alert("Buying: " + product.name);

  previewBody.querySelector(".more-info").onclick = () =>
    alert("More details: " + product.name);

  previewOverlay.classList.add("active");
}

// Close preview modal
closePreview.addEventListener("click", () => {
  previewOverlay.classList.remove("active");
});

// Search suggestions + filter cards
globalSearch.addEventListener("input", () => {
  const q = globalSearch.value.toLowerCase();
  suggestionsList.innerHTML = "";
  let found = false;

  CATEGORIES.forEach(c => {
    if (c.title.toLowerCase().includes(q)) {
      const li = document.createElement("li");
      li.textContent = c.title;
      suggestionsList.appendChild(li);
      found = true;
    }
  });

  if (!found) {
    suggestionsList.textContent = "No results";
  }
});

renderMenu();
