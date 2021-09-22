const itemList = document.querySelector('#items');
const main = document.querySelector('#new');

let emptyBasket = '<p>Ваша корзина пуста</p>'

function orderStrSum () {                                                       
		if (this.status === 'confirmed') {                                      
			this.orderSummary = this.item.price * this.quantity
		}
}


let item1 = {
	name: 'Футболка',
	size: 'M',
	colour: 'красный',
	price: 1000,
	gender: 'Муж',
	age: 'Взрослые',
	section: 'Одежда',
	type: 'Футболки, майки',
	brand: 'Levis'

};

let item2 = {
	name: 'Комплект',
	size: 'S',
	colour: 'бежевый',
	price: 1500,
	gender: 'Жен',
	age: 'Взрослые',
	section: 'Одежда',
	type: 'Одежда для дома',
	brand: 'Pelican'
};

let item3 = {
	name: 'Туфли',
	size: '42',
	colour: 'black',
	price: 8200,
	gender: 'Муж',
	age: 'Взрослые',
	section: 'Обувь',
	type: 'Туфли',
	brand: 'Ecco',
	material: 'кожа натуральная'	
};

let item4 = {
	name: 'Носки 2 пары, комплект',
	size: '25 - 27',
	colour: 'синий',
	price: 1300,
	gender: 'Муж',
	age: 'Взрослые',
	section: 'Одежда',
	type: 'Аксессуары',
	brand: 'Wilson'
};

let item5 = {
	name: 'Носки',
	size: '25 - 27',
	colour: 'черный',
	price: 300,
	gender: 'Муж',
	age: 'Взрослые',
	section: 'Одежда',
	type: 'Аксессуары',
	brand: 'Wilson'
};

let orderStr1 = {                                                                    
	item: item1,
	quantity: 3,
	status: 'started',                                                                
	orderSummary: 0,                                                                 
	confirmation: function () {
		this.status = 'confirmed'
	}
	};

let orderStr2 = {
	item: item2,
	quantity: 2,
	status: 'started',
	orderSummary: 0,
	confirmation: orderStr1.confirmation
};

let orderStr3 = {
	item: item3,
	quantity: 1,
	status: 'started',
	orderSummary: 0,
	confirmation: orderStr1.confirmation
};

let orderStr4 = {
	item: item4,
	quantity: 5,
	status: 'started',
	orderSummary: 0,
	confirmation: orderStr1.confirmation
};


let itemsList = {
	items: []
};

let basket = {                                                                             
	items: [],
	basketSum: 0,
	basketQnt: 0,
	paidSum: 0,
	status: 'started',
	confirmation: orderStr1.confirmation,
	payment: function () {                                                                 
		this.status = 'paid',
		this.paidSum = this.basketSum
	},
	ready: function () {
		this.status = 'ready'
	},
	shipping: function () {
		this.status = 'shipped'
	},	
	delivery: function () {
		this.status = 'delivered'
	},	
	countBasketSum: function () {
		this.basketSum = 0;
		for (idx in this.items) {
			this.basketSum += this.items[idx].orderSummary
		}
	},
	countBasketQnt: function () {
		this.basketQnt = 0;
		for (idx in this.items) {
			this.basketQnt += this.items[idx].quantity
		}
	}
};


itemsList.items.push (item1);
itemsList.items.push (item2);
itemsList.items.push (item3);
itemsList.items.push (item4);
itemsList.items.push (item5);


orderStr1.confirmation ();                                                                   
orderStr2.confirmation ();
orderStr3.confirmation ();                                   
orderStr4.confirmation ();

orderStr1.orderStrSum = orderStrSum;                                                        
orderStr2.orderStrSum = orderStrSum;
orderStr3.orderStrSum = orderStrSum;
orderStr4.orderStrSum = orderStrSum;

orderStr1.orderStrSum ();                                                                     
orderStr2.orderStrSum ();
orderStr3.orderStrSum ();
orderStr4.orderStrSum ();

basket.items.push (orderStr1);                                                               
basket.items.push (orderStr2);
basket.items.push (orderStr3);
basket.items.push (orderStr4);

                                                        
basket.countBasketSum ();
basket.countBasketQnt ();

for( var itr in itemsList.items) {
	    itemList.insertAdjacentHTML('beforeend', 
        `<div class="prod_item">
        <span>Товар - ${itemsList.items[itr].name}</span> 
        <span>Цена товара - ${itemsList.items[itr].price} руб</span>
        <span>Цвет товара - ${itemsList.items[itr].colour}</span>
        <span>Размер - ${itemsList.items[itr].size}</span>
        <span>Возраст - ${itemsList.items[itr].age}</span>
        <span>Пол - ${itemsList.items[itr].gender}</span>
        </div>`);
}

if (basket == 0) {
	main.insertAdjacentHTML('beforeend', `<div class="prod_item total">${emptyBasket}</div>`);
} else {
	for (var iterator in basket.items) {
        main.insertAdjacentHTML('beforeend', 
        `<div class="prod_item">
        <span>Товар - ${basket.items[iterator].item.name}</span> 
        <span>Цена товара - ${basket.items[iterator].item.price} руб</span>
        <span>Количество - ${basket.items[iterator].quantity}</span>
        </div>`);
    }
};

if (basket != 0) {
    const totalPrice = main.insertAdjacentHTML('beforeend', 
    `<hr><div class="prod_item total">В корзине: ${basket.items.length} товаров (${basket.basketQnt} шт.) на сумму 
    ${basket.basketSum} рублей</div>`);
}
