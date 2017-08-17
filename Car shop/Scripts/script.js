"use strict";
(function() {

    class Car {
        constructor(_price, _type, _color, _forSale) {
            this.price = _price;
            this.type = _type;
            this.color = _color;
            this.forSale = _forSale;
        }
    }

    class Person {
        constructor(_money, _favType, _favColor, _ownedCars) {
            this.money = _money;
            this.favType = _favType;
            this.favColor = _favColor;
            this.ownedCars = _ownedCars;
        }

        ask(selectedShop) {
            selectedShop.sell(this);
        }

        changeOwned(newCar) {
            this.ownedCars.push(newCar);
        }

    }

    class Shop {
        constructor(_cars, _list) {
            this.cars = _cars;
            this.infoList = _list;
        }

        sell(customer) {
            //Reveal answer
            $('.answer').show();
            const temp = $('.output').html();

            if (this.check(customer)) {
                this.infoList.concat('Date of contract: ', Date());
                $('.output').html(temp + '\n' + ' <p>CONGRATS! You just bought this car! Date of contract: ' + Date() + '</p>');
            } else {
                $('.output').html(temp + '\n' + ' <p>We are sorry, but the car you are looking for is not available on ' + Date() + '.</p>');
            }
        }

        check(buyer) {
            let i;
            for (i = 0; i < this.cars.length; i++) {
                if ((this.cars[i].price <= buyer.money) && (this.cars[i].color == buyer.favColor) && (this.cars[i].type == buyer.favType) && (this.cars[i].forSale)) {
                    buyer.changeOwned(this.cars[i]);
                    this.cars.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }

    //display info:
    function prepareToDisplay(whatToDIsplay, showTick) {
        let readyToDisplay = $('<ul>');
        $(readyToDisplay).attr('class', 'in');
        for (let i = 0; i < whatToDIsplay.length; i++) {
            let temp = $('<li></li>');
            let tempInside = $('<div>' + whatToDIsplay[i].type + ' ' + whatToDIsplay[i].color + ': ' + whatToDIsplay[i].price + '</div>');
            
            //add tick
            if (whatToDIsplay[i].forSale && showTick) {
                $(temp).addClass('active');
            }

            $(tempInside).appendTo(temp);
            $(temp).appendTo(readyToDisplay);
        }
        return readyToDisplay;
    }

    function displayStock(wheretoDisplay, stock, tick) {
        $(wheretoDisplay).find($('.in')).remove();
        $(wheretoDisplay).append(prepareToDisplay(stock, tick));
    }

    //create shop:
    let automobile1 = new Car(1200, 'Estate', 'blue', true);
    let automobile2 = new Car(2200, 'SUV', 'red', false);
    let automobile3 = new Car(5600, 'Convertible', 'white', true);
    let automobile4 = new Car(3200, 'SUV', 'black', true);
    let automobile5 = new Car(4200, 'Estate', 'black', true);

    const automobiles = [];
    automobiles.push(automobile1);
    automobiles.push(automobile2);
    automobiles.push(automobile3);
    automobiles.push(automobile4);
    automobiles.push(automobile5);

    let logList = '';

    var myShop = new Shop(automobiles, logList);

    //setting-up user
    let visitorMoney = $('.price-input').val();
    let visitorColor = $('.color-input').val();
    let visitorType = $('.select-input').val();
    var visitor = new Person(visitorMoney, visitorType, visitorColor, []);

    displayStock($('.shop-list'), myShop.cars, true);

    $('.submit-button').on('click', function() {

        visitor.money = $('.price-input').val();
        visitor.favColor = $('.color-input').val();
        visitor.favType = $('.select-input').val();

        visitor.ask(myShop);
        displayStock($('.shop-list'), myShop.cars, true);
        displayStock($('.customer-list'), visitor.ownedCars, false);
    });

    var animateCarTimeout;

    $(window).on('scroll', function() {
        const scroll = $(this).scrollTop();
        
        clearTimeout(animateCarTimeout);

        animateCarTimeout = setTimeout(function(){
            if (scroll > 0) {
                $('.car').animate({
                    left: '-180px'
                }, 'fast');
            } else {
                $('.car').animate({
                    left: '0'
                }, 'fast');
            }
        }, 100);
    });
})();