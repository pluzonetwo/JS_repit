const productItem = {
    render(good) {
        return `<div class='good'>
                <div><b>Наименование</b>: ${good.title}</div>
                <div><b>Цена за шт.</b>: ${good.price}</div>
                <div><b>Количество</b>: ${good.quantity}</div>
                <div><b>Итоговая стоимость</b>: ${good.price * good.quantity}</div>
              </div>`;
    }
};

const cart = {
    productItem,
    goods: [],
    init() {
        this.cartListBlock = document.querySelector('#cart');
        this.renderCart();
    },
    renderCart() {
        this.cartListBlock.innerHTML = '';
        for (let i = 0; i < cart.goods.length; i++) {
            if (this.goods.length) {
                this.cartListBlock.insertAdjacentHTML('beforeend', this.productItem.render(this.goods[i]));
            } else {
                const div = document.createElement('div');
                div.innerHTML = `<b>Здесь ничего нет</b>`;
                this.cartListBlock.appendChild(div);
            }
        }
        this.cartListBlock.insertAdjacentHTML('beforeend',
            `В корзине ${this.goods.length} товаров на сумму ${this.countBasketPrice()}`);
    },
    countBasketPrice() {
        return this.goods.reduce((price, good) => price + good.price * good.quantity, 0);
    },
    addProductToCart(item) {
        let elemFound = false;
        for (let i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id === item.goods.id) {
                this.goods[i].quantity++;
                elemFound = true;
            }
        }
        if (elemFound === false) {
            this.goods.push({...item});
        }
        this.render();
    },
    clearCart() {
        this.goods = [];
        this.renderCart();
    },
};

const catalog = {
    cart,
    productItem,
    catalogGoods: [
        {
            id: 1111,
            title: 'Notebook',
            price: 30000,
            quantity: 1,
        },
        {
            id: 2222,
            title: 'Mouse',
            price: 2000,
            quantity: 1,
        },
        {
            id: 3333,
            title: 'Gamepad',
            price: 10000,
            quantity: 1,
        },
        {
            id: 4444,
            title: 'Keyboard',
            price: 3500,
            quantity: 2,
        },
    ],
    init() {
        this.catalogListBlock = document.querySelector('#catalog');
        this.addButton = document.querySelector('#addBtn');
        this.cartClearButton = document.querySelector('#clear-btn');
        this.cartClearButton.addEventListener('click', cart.clearCart.bind(cart));
        for (let i = 0; i < catalog.catalogGoods.length; i++) {
            this.catalogListBlock.insertAdjacentHTML('beforeend', this.productItem.render(this.catalogGoods[i]));
            this.catalogListBlock.insertAdjacentHTML('beforeend', '<button id="addBtn">Add to cart</button>');
            this.addButton.addEventListener('click', cart.addProductToCart.bind(cart, catalog.catalogGoods[i]));
        }
    },
};

catalog.init();
cart.init();