"use strict";

var Singleton = (function() {
    var instance;

    class Calculator {
        constructor(number1, number2) {
            this.previousSign = '';
            this.History = '';
            this.sign = '';
            this.isNumber1 = true;
            this.number1 = number1;
            this.number2 = number2;
            this.currentNumber = this.number1;
        }
        doMath(operation, curNumber) {
            
            function checkForFixing (number) {
                if(number > Math.floor(number) && number < Math.ceil(number)) {
                    return parseFloat(parseFloat(number).toFixed(6));
                }
                else {
                    return number;
                }
            }

            switch (operation) {
                case '+':
                    return checkForFixing(this.addition());
                    break;
                case '-':
                    return checkForFixing(this.substraction());
                    break;
                case '*':
                    return checkForFixing(this.multiply());
                    break;
                case '/':
                    return checkForFixing(this.division());
                    break;
                case '%':
                    return checkForFixing(this.divisionWithRemainder());
                    break;
                case '1/x':
                    return checkForFixing(this.divisionByX());
                    break;
                case '√':
                    return checkForFixing(this.sqrt());
                    break;
                case '±':
                    return checkForFixing(this.plusMinus(curNumber));
                    break;
            }

            
        }
        addition() {
            return parseFloat(this.number1) + parseFloat(this.number2);
        }
        substraction() {
            return parseFloat(this.number1) - parseFloat(this.number2);
        }
        multiply() {
            return parseFloat(this.number1) * parseFloat(this.number2);
        }
        division() {
            return parseFloat(this.number1) / parseFloat(this.number2);
        }
        divisionWithRemainder() {
            return (parseFloat(this.number1) / parseFloat(this.number2) + parseFloat(this.number1) % parseFloat(this.number2));
        }
        divisionByX() {
            return 0.0 + 1 / parseFloat(this.number1);
        }
        sqrt() {
            return Math.sqrt(parseFloat(this.number1));
        }
        plusMinus(num) {
            return parseFloat(num * (-1));   
        }
        addDot() {
            if(this.currentNumber == '0') {
                this.currentNumber += '.';
                console.log(0);
                return;
            }
            let condition = false; //if there is already a dot
            for(var i = 0; i < this.currentNumber.length; i++) {
                if(this.currentNumber[i] == '.') {
                    condition = true;
                }
            }
                    console.log(condition);
            
            if(!condition) {
                this.currentNumber += '.';
            }
        }
        enterNumber(number) {
            var text = number.text().toString();

            if(number.hasClass('number')) {
                if($('.output').text() == '0'){

                    if(this.currentNumber == '') {
                        this.currentNumber +='';
                        console.log('here' + this.currentNumber);                        
                        this.currentNumber = parseFloat(this.currentNumber.substr(0, 1));
                        this.currentNumber += text;
                        this.showNumber(this.currentNumber);
                        console.log('here' + this.currentNumber);
                    }

                    text = text.substr(0,1);
                    this.currentNumber = text;
                    if(this.isNumber1){
                        this.number1 = this.currentNumber;
                    }
                    else {
                        this.number2 = this.currentNumber;    
                    }
                }
                else {
                        if(this.currentNumber == '0') {
                            this.currentNumber = '';
                        }
                    this.currentNumber += text;
                    if(this.isNumber1){
                        this.number1 = this.currentNumber;
                        console.log('number1 changed!');
                    }
                    else {
                        this.number2 = this.currentNumber;
                    }
                }
                console.log('number1: ' + this.number1);
                console.log('number2: ' + this.number2);
            }

            else if(number.hasClass('dot')){
                console.log(this.currentNumber);
                this.addDot();
                console.log(this.currentNumber);            
            }

            else if(number.hasClass('operations')) {
                //save current sign                
                if(this.sign != '±' || this.sign != '⬅') {
                    this.previousSign = this.sign;
                    console.log('previuos sign: ' + this.previousSign);
                    }
                this.sign = text;

                if(number.hasClass('backspace')) {
                    let tempNumber1 = this.number1;
                    this.currentNumber += '';

                    if(this.currentNumber.length == 1) {
                        this.currentNumber = 0;
                        this.currentNumber = parseFloat(this.currentNumber);
                    }
                    else {
                        this.currentNumber = this.currentNumber.substr(0, this.currentNumber.length - 1);
                        this.currentNumber = parseFloat(this.currentNumber);
                    }

                    if(this.isNumber1) {
                        this.number1 = this.currentNumber;
                    }
                    else {
                        this.number1 = tempNumber1;
                        this.number2 = this.currentNumber;
                    } 
                    console.log(typeof(this.number1) + ' ' + typeof(this.number2));
                    this.showNumber(this.History + this.currentNumber);
                    this.sign = this.previousSign;
                    return;
                }
                else if(number.hasClass('plus-minus')) {
                    this.currentNumber = parseFloat(this.currentNumber);
                    if(this.isNumber1) {
                        this.currentNumber = this.doMath(this.sign, this.currentNumber);
                        this.number1 = parseFloat(this.currentNumber);
                        this.showNumber(this.number1);                    
                    }
                    else {
                        this.currentNumber = this.doMath(this.sign, this.currentNumber);
                        this.number2 = parseFloat(this.currentNumber);
                        console.log('number2: ' + this.number2);
                        this.sign = this.previousSign;
                        if(this.number2 < 0) {
                            this.showNumber(this.number1 + this.sign + '(' + this.number2 + ')');
                        }
                        else {
                            this.showNumber(this.number1 + this.sign + this.number2);                            
                        }
                    }
                    return;
                }
                else if(number.hasClass('clear')) {
                    this.currentNumber = this.number1;
                    this.number1 = 0;
                    this.number2 = 0;
                    this.History = '';
                    this.isNumber1 = true;
                    this.showNumber(0);
                    return;
                }
                if(this.isNumber1) {
                    this.isNumber1 = false;
                    this.History = this.number1 + this.sign;
                }
                else {
                    this.History = this.currentNumber + this.sign;
                }
                this.currentNumber = this.number2;
            }
            else if(number.hasClass('equals')){
                this.currentNumber = this.doMath(this.sign);
                console.log(this.number1);
                console.log(typeof(this.sign));
                console.log(this.number2);
                console.log(this.currentNumber);

                if(this.number2 < 0) {
                    this.History += '(' + this.number2 + ')' + ' = ';
                }
                else {
                    this.History += this.number2 + ' = ';
                }

                this.isNumber1 = false;
                this.number1 = this.currentNumber;
                this.number2 = '';
            }
            this.showNumber(this.History + this.currentNumber);
        }
        showNumber(number) {
            $('.output').text(number);
        }
    }


    return {
        getInstance: function() {
            if(!instance) {
                instance = new Calculator(0, 0);
            }
            return instance;
        }
    }

})();




(function ($) {
    var calculator = Singleton.getInstance();
    let classToAdd;
    $('.button-style').hover(function(){
        let that = $(this);
        that.addClass('active');
        that.removeClass('border')

        // if(that.hasClass('number')) {
	    // that.removeClass('number');
        //     classToAdd = 1;
        // }
        // else if(that.hasClass('operations')) {
        //     that.removeClass('operations');
        //     classToAdd = 2;
        // }
        // else if(that.hasClass('memory')) {
        //     that.removeClass('memory');
        //     classToAdd = 3;
        // }
    },
    function(){
        var that = $(this);
        setTimeout(function(){
            switch (classToAdd) {
                case 1:
                    that.addClass('number');
                    break;
                case 2:
                    that.addClass('operations');
                    break;
                case 3:
                    that.addClass('memory');
                    break;
            }
            that.removeClass('active');
            that.addClass('border');
        }, 400);
    })


    $('.button-style').on('click', function () {
        var that = $(this);
        calculator.enterNumber(that);
    });
    
})(jQuery);



/*
-backspace <-OKEY
-plusminus - direct <-OKEY
-C <-OKEY

*/