// Объект каталог
const shopCatalog = {
    catalogList: [
        {
            name: 'Футболка',
            //image: 'image1.png',
            size: 'M',
            gender: 'Муж',
            brand: 'Levis',
            price: 1000
        },
        {
            name: 'Комплект домашний',
            //image: 'image2.png',
            size: 'S',
            gender: 'Жен',
            brand: 'Pelican',
            price: 1500
        },
        {
            name: 'Туфли',
            //image: 'image3.png',
            size: '42',
            gender: 'Муж',
            brand: 'Ecco',
            price: 8200
        },
        {
            name: 'Носки 2 пары',
            //image: 'image4.png',
            size: '25 - 27',
            gender: 'Муж',
            brand: 'Wilson',
            price: 1300
        },
        {
            name: 'Носки',
            //image: 'image5.png',
            size: '25 - 27',
            gender: 'Муж',
            brand: 'Wilson',
            price: 300
        }
    ],
    // функция отрисовки каталога с товарами
    renderCatalog: function () {
        this.catalogList.forEach(function (item, id) {
            const catalogObj = document.querySelector('#catalog');
            catalogObj.insertAdjacentHTML('beforeend',
                `<div id="item-${id}" class="prod_item">
            <div class="item">
                <div class="image"><img src=""></div>
                <div class="description">
                    <h2>${item.name} ${item.brand}, ${item.gender}</h2>
                    <h3>${item.size}</h3>
                    <div class="price">Цена: 
                        <span>${item.price}</span> руб.
                    </div>
                </div>
            </div>
            <div class="sale">
                <div data-id="${id}" class="button">В корзину</div>
            </div>
        </div>`);
        })

    },
};

// Объект корзина
const shoppingCart = {
    items: [],
    basketSum: 0,
    basketQnt: 0,
    emptyBasket: '<p>Ваша корзина пуста</p>',
    countBasketSum: function () {
        this.basketSum = 0;
        for (idx in this.items) {
            this.basketSum += this.items[idx].quantity * this.items[idx].product.price
        }
    },
    countBasketQnt: function () {
        this.basketQnt = 0;
        for (idx in this.items) {
            this.basketQnt += this.items[idx].quantity
        }
    },
    // функция, формирующая правильные окончания в итоговой строке корзины (товар, товара, товаров)
    correctEndings: function (qnt) {
        if (Math.floor(qnt / 10) < 2) {
            if (qnt <= 4 && qnt > 1) {
                return 'а'
            } else if (qnt >= 5 && qnt <= 19) {
                return 'ов'
            } else {
                return ''
            }
        } else {
            if (qnt % 10 <= 4 && qnt % 10 > 1) {
                return 'а'
            } else if (qnt % 10 === 1) {
                return ''
            } else {
                return 'ов'
            }
        }
    },
    // функция отрисовки корзины (детально) потоварно, экрана с адресом доставки и экрана с комментарием
    renderCart: function () {
        const basketObj = document.querySelector('#cart');
        basketObj.textContent = '';

        if (this.items.length === 0) {
            basketObj.insertAdjacentHTML('beforeend', `<div class="total">${this.emptyBasket}</div>`)
        } else {
            basketObj.insertAdjacentHTML('beforeend',
                `<div class="total">
                    <p>В корзине: ${this.basketQnt} 
                    товар${this.correctEndings(this.basketQnt)} на сумму ${this.basketSum} рублей.</p>
                    
                </div>
        
                <div id="buy_hidden">
                    <p class="buy" id="buy">Перейти к доставке</p>
                </div>
        
                <div id="delivery" class="delivery">
                    <p class="buy" id="confirm">Подтвердить адрес доставки</p>
                </div>
        
                <div id="messageHtml" class="delivery">
                    <p class="buy" id="message">Подтвердить заказ</p>
                </div>
        
                `);

            const buyToHide = document.getElementById('buy_hidden');
            const deliveryToHide = document.getElementById('delivery');
            const messageToHide = document.getElementById('messageHtml');

            id = 0;
            for (let idx = 0; idx < this.items.length; idx++) {
                let chartHtml = `<div id="${id}" class="buy_hidden__item">
                    ${this.items[idx].product.name} в количестве ${this.items[idx].quantity} шт. 
                    на ${this.items[idx].product.price * this.items[idx].quantity} руб.`;
                buyToHide.insertAdjacentHTML('afterbegin', `${chartHtml}
                <div class="del_button">
                <span data-id="${id}" class="buy_hidden__delete"> (удалить)</span>
                </div>
                </div>`)

                id++;
            }

            const toBuy = document.getElementById('buy');
            const toConfirm = document.getElementById('confirm');
            const toMessage = document.getElementById('message');

            toBuy.addEventListener('click', function () {
                buyToHide.style.display = 'none';
                deliveryToHide.style.display = 'flex';
                confirmDraw();
            });
            toConfirm.addEventListener('click', function () {
                deliveryToHide.style.display = 'none';
                messageToHide.style.display = 'flex';
                messageDraw();
                let inputAddr = document.getElementById('addr');
            });
            toMessage.addEventListener('click', function () {
                messageToHide.style.display = 'none';
                shoppingCart.items = [];
                shoppingCart.countBasketQnt();
                shoppingCart.countBasketSum();
                shoppingCart.renderCart();
            });

            function confirmDraw() {
                let delivery =
                    `<p class="buy_hidden__head">Адрес доставки:</p>            
                        <input id="addr" type="text" class="buy_hidden__confirm" placeholder="г.Москва, ул.Академика Королева, 12">`;
                deliveryToHide.insertAdjacentHTML('afterbegin', delivery);
            }
            function messageDraw() {
                let messageHtml =
                    `<p class="buy_hidden__head">Комментарий к заказу:</p>
                        <form class="form" action="#">
                            <form action="#">
                                <input id="text" class="buy_hidden__confirm" type="text" placeholder="Ваше имя"><br>
                                <input id="email" class="buy_hidden__confirm" type="email" placeholder="Ваш email"><br>
                                <textarea id="message" class="buy_hidden__confirm" cols="30" rows="10" placeholder="Ваш комментарий"></textarea><br>
                            </form>
                        </form>`;
                messageToHide.insertAdjacentHTML('afterbegin', messageHtml);
            }
        }

    },
    clicker: function (cl) {
        let orderLine = {
            product: {},
            quantity: 0
        };
        if (cl.target.className === 'button') {
            const id = Number(cl.target.getAttribute('data-id'));
            let counter = 0;
            for (let idx = 0; idx < shoppingCart.items.length; idx++) {
                if (shopCatalog.catalogList[id].name === shoppingCart.items[idx].product.name) {
                    counter = idx + 1;
                    break;
                }
            };
            if (counter === 0) {
                orderLine.product = shopCatalog.catalogList[id];
                orderLine.quantity = 1;
                shoppingCart.items.push(orderLine);
            } else {
                shoppingCart.items[counter - 1].quantity++
            }
            shoppingCart.countBasketQnt();
            shoppingCart.countBasketSum();
            shoppingCart.renderCart();
        }
    },
    clickerDel: function (evnt) {
        if (evnt.target.className === 'buy_hidden__delete') {
            const this_id = Number(evnt.target.getAttribute('data-id'));
            this.items.splice(this_id, 1);
            this.countBasketQnt();
            this.countBasketSum();
            this.renderCart();
        }
    }
};





function init() {
    shopCatalog.renderCatalog();
    shoppingCart.renderCart();

    const catalogObj = document.querySelector('#catalog');
    catalogObj.addEventListener('click', shoppingCart.clicker.bind(shoppingCart));

    const cartObj = document.getElementById('cart');
    cartObj.addEventListener('click', shoppingCart.clickerDel.bind(shoppingCart));








};

window.addEventListener('load', init);
