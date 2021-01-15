let _balance = 1000;

let _products = {
    beer: {
        count: 100,
        price: 30
    },
    wine: {
        count: 50,
        price: 140
    },
    pepsi: {
        count: 80,
        price: 25
    }
}

function translate(nameOfProduct) {
    switch (nameOfProduct) {
        case 'beer':
            return 'Пиво';
        case 'wine':
            return 'Вино';
        case 'pepsi':
            return 'Пепси';
    }
}

function checkAvailability(product, count) {
    return _products[product].count >= count ? true : false;
}

function sell(obj) {
    for (const { product, count } of obj) {
        _balance += _products[product].price * count;
        _products[product].count -= count;
    }

    return receipt(obj);
}

function receipt(obj) {
    let receiptBlock = document.createElement('div');

    let fullPrice = 0;
    for (const { product, count } of obj) {
        let item = document.createElement('p');
        item.innerText = `${translate(product)}: ${count} шт/${_products[product].price * count} грн`;

        receiptBlock.appendChild(item);

        fullPrice += _products[product].price * count;
    }

    let priceP = document.createElement('p');
    priceP.innerText = `Всего: ${fullPrice} грн`;
    priceP.style.fontWeight = 'bold';
    priceP.style.marginTop = '4px';

    receiptBlock.appendChild(priceP);

    return receiptBlock;
}

function checkStorage(product) {
    return _products[product].count + ' шт.';
}

function checkBalance() {
    return _balance + ' гривен';
}

export { sell, translate, checkAvailability, checkStorage, checkBalance };