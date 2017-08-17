// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

var paths = {
    destSass: './Styles/styles.css'
}

gulp.task('sass', function() {
    gulp.src('**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('**/*.scss', ['sass']);
});







// "use strict";

// class Calculator {
//     constructor(number1, number2) {
//         this.toDisplay = '';
//         this.sign = '';
//         this.isNumber1 = true;
//         this.number1 = number1;
//         this.number2 = number2;
//         this.currentNumber = this.number1;
//     }
//     doMath(operation) {
        
//         function checkForFixing (number) {
//             if(number > Math.floor(number) && number < Math.ceil(number)) {
//                 return parseFloat(number).toFixed(6);
//             }
//             else {
//                 return number;
//             }
//         }

//         switch (operation) {
//             case '+':
//                 return checkForFixing(this.addition());
//                 break;
//             case '-':
//                 return checkForFixing(this.substraction());
//                 break;
//             case '*':
//                 return checkForFixing(this.multiply());
//                 break;
//             case '/':
//                 return checkForFixing(this.division());
//                 break;
//             case '%':
//                 return checkForFixing(this.divisionWithRemainder());
//                 break;
//             case '1/x':
//                 return checkForFixing(this.divisionByX());
//                 break;
//             case '√':
//                 return checkForFixing(this.sqrt());
//                 break;
//             case '±':
//                 return checkForFixing(this.plusMinus());
//                 break;
//         }

        
//     }
//     addition() {
//         return parseInt(this.number1) + parseInt(this.number2);
//     }
//     substraction() {
//         return this.number1 - this.number2;
//     }
//     multiply() {
//         return this.number1 * this.number2;
//     }
//     division() {
//         return this.number1 / this.number2;
//     }
//     divisionWithRemainder() {
//         return (this.number1 / this.number2 + this.number1 % this.number2);
//     }
//     divisionByX() {
//         return 0.0 + 1 / this.number1;
//     }
//     sqrt() {
//         return Math.sqrt(this.number1);
//     }
//     plusMinus() {
//         return this.number1 * (-1);   
//     }
//     addDot() {
//         if(this.currentNumber == '0') {
//             this.currentNumber += '.';
//             console.log(0);
//             return;
//         }
//         let condition = false; //if there is already a dot
//         for(var i = 0; i < this.currentNumber.length; i++) {
//             if(this.currentNumber[i] == '.') {
//                 condition = true;
//             }
//         }
//                 console.log(condition);
        
//         if(!condition) {
//             this.currentNumber += '.';
//         }
//     }
//     enterNumber(number) {
//         var text = number.text().toString();

//         if(number.hasClass('number')) {
//             if($('.output').text() == '0'){
//                 text = text.substr(0,1);
//                 this.currentNumber = text;
//                 if(this.isNumber1){
//                     this.number1 = this.currentNumber;
//                 }
//                 else {
//                     this.number2 = this.currentNumber;    
//                 }
//             }
//             else {
//                 this.currentNumber += text;
//                 if(this.isNumber1){
//                     this.number1 = this.currentNumber;
//                     console.log('number1 changed!');
//                 }
//                 else {
//                     this.number2 = this.currentNumber;
//                 }
//             }
//             console.log('number1: ' + this.number1);
//             console.log('number2: ' + this.number2);
//         }

//         else if(number.hasClass('dot')){
//             console.log(this.currentNumber);
//             this.addDot();
//             console.log(this.currentNumber);            
//         }

//         else if(number.hasClass('operations')) {
//             this.sign = text;
//             if(this.isNumber1) {
//                 this.isNumber1 = false;                
//             }
//             else {
//                 // this.number1 = this.number2;
//                 this.currentNumber = this.number2;
//             }
//             this.currentNumber = this.number2;
//         }
//         else if(number.hasClass('equals')){
//             this.currentNumber = this.doMath(this.sign);
//             console.log(this.number1);
//             console.log(this.sign);
//             console.log(this.number2);
//             console.log(this.currentNumber);
//             this.isNumber1 = false;
//             this.number1 = this.currentNumber;
//             this.number2 = '';
//         }
//         this.showNumber(this.currentNumber);
//     }
//     showNumber(number) {
//         $('.output').text(number);
//     }

// }

// let num1 = '0',
//         num2 = '0',
//         num = new Calculator(num1, num2);

// (function ($) {

//     // $('.button-style').hover(function(){
// 	//     $(this).addClass('active');
// 	//     $(this).removeClass('border');
//     // },
//     // function(){
//     //     var that = $(this);
//     //     setTimeout(function(){
//     //         that.removeClass('active');
//     //         that.addClass('border');
//     //     }, 800);
//     // })

    

//     $('.button-style').on('click', function () {
//         var that = $(this);
//         //not for there
//         num.enterNumber(that);
//     });
    
// })(jQuery);