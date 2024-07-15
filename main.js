// main.js

// Obtener referencias a los elementos del DOM
const form = document.querySelector('[data-form]');
const productNameInput = document.querySelector('[data-name]');
const productPriceInput = document.querySelector('[data-price]');
const productImageInput = document.querySelector('[data-image]');
const productsContainer = document.querySelector('[data-product]');

// Array para almacenar los productos
const products = [];

// Función para agregar un producto
function addProduct(event) {
    event.preventDefault();

    const name = productNameInput.value;
    const price = parseFloat(productPriceInput.value);
    const image = productImageInput.value;

    if (name && !isNaN(price) && image) {
        const product = { name, price, image };
        products.push(product);
        renderProducts();
        clearForm();
    } else {
        alert('Completa todos los campos antes de agregar un producto.');
    }
}

// Función para renderizar los productos en el DOM
function renderProducts() {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <img src="${product.image}" alt="${product.name}">
        `;
        productsContainer.appendChild(productElement);
    });
}

// Función para limpiar el formulario
function clearForm() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productImageInput.value = '';
}

// Event listener para el envío del formulario
form.addEventListener('submit', addProduct);
    // <![CDATA[  <-- For SVG support
    if ('WebSocket' in window) {
        (function () {
            function refreshCSS() {
                var sheets = [].slice.call(document.getElementsByTagName("link"));
                var head = document.getElementsByTagName("head")[0];
                for (var i = 0; i < sheets.length; ++i) {
                    var elem = sheets[i];
                    var parent = elem.parentElement || head;
                    parent.removeChild(elem);
                    var rel = elem.rel;
                    if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                        var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                        elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                    }
                    parent.appendChild(elem);
                }
            }
            var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
            var address = protocol + window.location.host + window.location.pathname + '/ws';
            var socket = new WebSocket(address);
            socket.onmessage = function (msg) {
                if (msg.data == 'reload') window.location.reload();
                else if (msg.data == 'refreshcss') refreshCSS();
            };
            if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
                console.log('Live reload enabled.');
                sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
            }
        })();
    }
    else {
        console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
    }
    // ]]>