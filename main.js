const getSel = sel => document.querySelector(sel);
import * as SHOP from './shop.js';

const BALANCE = getSel('.shop__balance').querySelector('.item__info');
const PRODUCTS_BLOCKS = document.querySelectorAll('.shop__product');
const SALE_FORM = getSel('.sale__form');
const CART_BLOCK = getSel('.sale__cart');
const BUY_BUTTON = getSel('.sale__buy');
const ERROR_WINDOW = getSel('.error');

let cart = [];

(function () {
    BALANCE.innerText = SHOP.checkBalance();

    for (const block of PRODUCTS_BLOCKS)
        block.querySelector('.item__info').innerText = SHOP.checkStorage(block.dataset.product);
})()

function updateShopInfo(cart) {
    BALANCE.innerText = SHOP.checkBalance();

    for (const { product } of cart) {
        getSel(`.shop__product-${product}`).querySelector('.item__info').innerText = SHOP.checkStorage(product);
    }
}

function setNewItemToTheCart(product, count) {
    const newItem = document.createElement('p');

    newItem.innerText = `${SHOP.translate(product)}: ${count} шт.`;
    newItem.classList.add(`cart__product-${product}`);

    CART_BLOCK.appendChild(newItem);
}

function setNewQuantityOfProduct(product, count) {
    CART_BLOCK.querySelector(`.cart__product-${product}`).innerText = `${SHOP.translate(product)}: ${count} шт.`;
}

class Product {
    constructor(product, count) {
        this.product = product;
        this.count = +count;
    }
}

SALE_FORM.addEventListener(
    'submit',
    function (e) {
        e.preventDefault();

        const PRODUCT = this.querySelector('input:checked').dataset.product;
        const PRODUCT_COUNT = this.querySelector('.amount-of-product');

        if (SHOP.checkAvailability(PRODUCT, PRODUCT_COUNT.value)) {
            const productIdInTheCart = cart.findIndex(val => val.product == PRODUCT);

            if (productIdInTheCart == -1) {
                cart.push(new Product(PRODUCT, PRODUCT_COUNT.value));

                setNewItemToTheCart(PRODUCT, PRODUCT_COUNT.value);
            }
            else {
                cart[productIdInTheCart].count = +PRODUCT_COUNT.value;

                setNewQuantityOfProduct(PRODUCT, PRODUCT_COUNT.value);
            }
        }
        else {
            ERROR_WINDOW.classList.remove('none');
            ERROR_WINDOW.innerText = `Простите, но в данный момент ${SHOP.translate(PRODUCT)} осталось только ${SHOP.checkStorage(PRODUCT)}`;

            setTimeout(() => {
                ERROR_WINDOW.classList.add('none');
                ERROR_WINDOW.innerText = '';
            }, 2500);
        }

        PRODUCT_COUNT.value = 1;
    }
);

BUY_BUTTON.addEventListener(
    'click',
    function () {
        if (cart.length > 0) {
            getSel('.shop__receipt').innerHTML = '';
            getSel('.shop__receipt').appendChild(SHOP.sell(cart));

            updateShopInfo(cart);

            CART_BLOCK.innerHTML = '';
            cart = [];
        }
    }
);