
// a) оператор if срабатывает, если в глобальной области нет переменной "а"
// переменная "а" объявлена в локальной области оператора if, в глобальной ее нет, поэтому результат - "undefined"

if (!("a" in window)) {
    var a = 1;
}
alert(a);

// b) переменная "а" не объявлена в глобальной области, результат будет "undefined"
var b = function a(x) {
    x && a(--x);
};
alert(a);

// с) в коде объявляется функция "а", затем - переменная "а" без присвоения значения, пalert выводит тело функции "а" - function a(x) {return x * 2; }
// если при объявлении переменной "а" присвоить значение (var a = 5), "alert" выведет это значение (5), если вызвать функцию "а", передав ей "х", "alert" выведет результат "х * 2"
function a(x) {
    return x * 2;
}
var a;
alert(a);

// d) функция "b" принимает 3 переменных, это, по сути, массив данных, третьему элементу массива(с индексом 2) присваивается значение 10, это элемент "а", его и выведет "alert"
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);

// е) метод функции "call" получил аргумент "null", функция ссылается на глобальный объект "window.a"
// в нем "null" выводит [obgect Window]
function a() {
    alert(this);
}
a.call(null);