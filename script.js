// создаем каталог и заполняем его товарами
function catalogItem(name, image, size, gender, brand, price) {
    this.name = name;
    this.image = `${image}.png`;
    this.size = size;
    this.gender = gender;
    this.brand = brand;
    this.price = price
};

let catalogList = [];

catalogList.push(new catalogItem('Футболка','image1','M','Муж','Levis',1000));
catalogList.push(new catalogItem('Комплект домашний','image2','S','Жен','Pelican',1500));
catalogList.push(new catalogItem('Туфли','image3','42','Муж','Ecco',8200));
catalogList.push(new catalogItem('Носки 2 пары','image4','25 - 27','Муж','Wilson',1300));
catalogList.push(new catalogItem('Носки','image5', '25 - 27','Муж','Wilson',300));

function drawItems() {
    catalogList.forEach(function (item, i) {
        drawItem(item, i)
    })
};

const catalogObj = document.querySelector('#catalog');
function drawItem(item, id) {
    catalogObj.insertAdjacentHTML('beforeend', 
    `<div id="item-${id}" class="prod_item">
        <div class="item">
            <div class="image"><img src="${item.image}"></div>
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
}
drawItems(catalogList);


// создаем корзину
let shoppingCart = {                                                                             
	items: [],
	basketSum: 0,
	basketQnt: 0,
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
	}
};

let emptyBasket = '<p>Ваша корзина пуста</p>';

// создаем отображение корзины
function drawTotal (shoppingCart) {
    const basketObj = document.querySelector('#basket');
    basketObj.textContent = '';

    if (shoppingCart.items.length === 0) {
        basketObj.insertAdjacentHTML('beforeend', `<div class="total">${emptyBasket}</div>`)
    } else {
        basketObj.insertAdjacentHTML('beforeend', 
        `<div class="total">
            <p>В корзине: ${shoppingCart.basketQnt} 
            товаров на сумму ${shoppingCart.basketSum} рублей.</p>
            <a class="buy" href="#">Купить</a>
        </div>`);
    }
};

drawTotal(shoppingCart);

// реакция на событие - добавление объекта в корзину
function clicker (cl) {
    let orderLine = {
	product: {},
	quantity: 0
	};
	if (cl.target.className === 'button') 
    {
        const id = Number(cl.target.getAttribute('data-id'));
       	orderLine.product = catalogList [id];
		orderLine.quantity = 1;
		shoppingCart.items.push (orderLine);
        shoppingCart.countBasketQnt ();
        shoppingCart.countBasketSum ();
		drawTotal(shoppingCart)  
	}
};
catalogObj.addEventListener('click', clicker);

// реакция на событие - нажатие кнопки "Купить" в корзине
function buyingClick(buying) {
        if (buying.target.className === 'buy') 
    {
        shoppingCart.items = [];
        shoppingCart.basketSum = 0;
        shoppingCart.basketQnt = 0;
        drawTotal(shoppingCart)  
    }   
};

const buyingObj = document.querySelector('#basket');
buyingObj.addEventListener('click', buyingClick);
