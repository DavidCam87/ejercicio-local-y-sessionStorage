const PRODUCTS = [
  {
    id: 1,
    nombre: 'Camiseta básica',
    precio: 15.99,
    categoria: 'Ropa',
    img: "https://todocofrade.com/wp-content/uploads/2019/11/106-34.png"
  },
  {
    id: 2,
    nombre: 'Pantalón vaquero',
    precio: 29.99,
    categoria: 'Ropa',
    img: "https://www.motosdakar.es/wp-content/uploads/2021/07/TEJANO-II-LADY-1.png"
  },
  {
    id: 3,
    nombre: 'Zapatillas deportivas',
    precio: 49.99,
    categoria: 'Calzado',
    img: "https://img.kwcdn.com/product/open/2023-09-07/1694051384919-4ee8734277c141efacfe049000e9bec7-goods.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp"
  },
  {
    id: 4,
    nombre: 'Teléfono móvil',
    precio: 299.99,
    categoria: 'Tecnología',
    img: "https://cdn.phonehouse.es/res_static/cmsmaker/D6EE2F8339BEC9E0EFD1B9F4756E2045.jpg?auto=format"
  },
  {
    id: 5,
    nombre: 'Auriculares inalámbricos',
    precio: 79.99,
    categoria: 'Tecnología',
    img: "https://shop.jvc.es/wp-content/uploads/2022/09/JVC_HA-A9T-B_Earbud.png"
  },
  {
    id: 6,
    nombre: 'Libro de ficción',
    precio: 12.50,
    categoria: 'Libros',
    img: "https://aliarediciones.es/wp-content/uploads/2019/07/Camino-entre-realidad-y-ficci%C3%B3n-600x600.png"
  },
  {
    id: 7,
    nombre: 'Reloj de pulsera',
    precio: 99.50,
    categoria: 'Accesorios',
    img: "https://ae01.alicdn.com/kf/S7af94f9417b948329b224fbb5ea1b2f3x/Reloj-de-pulsera-de-cuarzo-para-hombre-cron-grafo-de-pulsera-de-f-brica-gran-oferta.png"
  },
  {
    id: 8,
    nombre: 'Mochila escolar',
    precio: 24.99,
    categoria: 'Accesorios',
    img: "https://www.totto.es/dw/image/v2/BFJS_PRD/on/demandware.static/-/Sites-master-catalog-AX/default/dwa273507f/FOTOSALTA/T.221/MA04ECO002-2120N-3CE_1.png?sh=650"
  },
  {
    id: 9,
    nombre: 'Lámpara de escritorio',
    precio: 34.99,
    categoria: 'Hogar',
    img: "https://www.fluxs.es/wp-content/uploads/2021/11/Lampara-de-escritorio-LED-con-cargador-inalambrico-VELA.png"
  },
  {
    id: 10,
    nombre: 'Set de utensilios de cocina',
    precio: 39.99,
    categoria: 'Hogar',
    img: "https://www.bastilipo.com/wp-content/uploads/2018/12/Basilea.MAIN_.png.webp"
  }
];
const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || {};

const updateCart = () => {
  const cartDiv = document.querySelector(".cart");
  const contadorSpan = document.getElementById("contador");
  let totalItems = 0;
  cartDiv.innerHTML = "";

  for (const productId in cartProducts) {
    const product = cartProducts[productId];
    const div = document.createElement("div");
    const name = document.createElement("p");
    const price = document.createElement("p");
    const img = document.createElement("img");
    const quantity = document.createElement("p");
    const divButtons = document.createElement("div");
    const addButton = document.createElement("button");
    const removeButton = document.createElement("button");

    div.classList.add("div-cart");
    divButtons.classList.add("div-buttons");
    name.textContent = `${product.nombre} x${product.cantidad}`;
    quantity.textContent = `${product.cantidad}`;
    price.textContent = `${product.precio}`;
    img.src = product.img;

    addButton.textContent = "+";
    removeButton.textContent = "-";

    addButton.addEventListener("click", () => {
      cartProducts[productId].cantidad++;
      updateCart();
      saveLocalStorage();
    });

    removeButton.addEventListener("click", () => {
      if (cartProducts[productId].cantidad > 0) {
        cartProducts[productId].cantidad--;
        if (cartProducts[productId].cantidad === 0) {
          delete cartProducts[productId];
        }
        updateCart();
        saveLocalStorage();
      }
    });

    div.append(name);
    div.append(price);
    div.append(img);
    div.append(divButtons);
    divButtons.append(removeButton);
    divButtons.append(quantity);
    divButtons.append(addButton);
    cartDiv.append(div);

    totalItems += product.cantidad;
  }
  contadorSpan.textContent = totalItems;
};

updateCart();

const printProductsContent = (products) => {
  const divContent = document.querySelector(".content");
  divContent.innerHTML = "";

  for (const product of products) {
    const div = document.createElement("div");
    const name = document.createElement("h3");
    const price = document.createElement("p");
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    const cart = document.createElement("img");

    name.textContent = product.nombre;
    price.textContent = `$${product.precio}`;
    img.src = product.img;
    divImg.classList.add("div-img");
    div.classList.add("product");
    cart.classList.add("cart-img");
    cart.src = "https://cdn-icons-png.flaticon.com/512/5465/5465858.png";

    div.append(cart);
    div.append(name);
    div.append(divImg);
    div.append(price);
    divImg.append(img);
    divContent.append(div);

    cart.addEventListener("click", (event) => {
      const productId = product.id;
      const selectedProduct = PRODUCTS.find(product => product.id == productId);

      if (cartProducts[productId]) {
        cartProducts[productId].cantidad++;

      } else {
        cartProducts[productId] = { ...selectedProduct, cantidad: 1 };

      }
      updateCart();
      saveLocalStorage();
    });
  }
};

const carrito = document.querySelector(".carrito");
carrito.addEventListener("click", () => {
  const cartDiv = document.querySelector(".cart");
  cartDiv.classList.toggle("openned");
});

printProductsContent(PRODUCTS);

const saveLocalStorage = () => {
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
};