'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    "use strict";

    var userChoice = void 0;
    var tabs = [];

    var menuButton = document.getElementById('menu-trigger');
    var menu = document.getElementsByClassName('menu-container')[0];
    var main = document.getElementsByTagName('main')[0];

    var UserChoice = function () {
        function UserChoice(tabs) {
            _classCallCheck(this, UserChoice);

            this.tabs = {};

            for (var i = 0; i < tabs.length; i++) {
                this.tabs[firstCapitalLetter(tabs[i])] = 'None';
            }
        }

        _createClass(UserChoice, [{
            key: 'addProperty',
            value: function addProperty(category, property) {
                this.tabs[category] = property;
            }
        }]);

        return UserChoice;
    }();

    ;

    function attachClickToMenuItems() {
        var buttons = document.getElementsByClassName('menu-group-item');

        var _loop = function _loop(i) {
            buttons[i].addEventListener('click', function (e) {

                var button = buttons[i].children[1];

                if (e.target.matches('.menu-group-item') || e.target.parentNode.matches('.menu-group-item')) {
                    if (button.hasAttribute('data-open')) {
                        button.classList.remove('block');
                        button.removeAttribute('data-open');
                    } else {
                        button.classList.add('block');
                        button.setAttribute('data-open', 1);
                    }
                }
            });
        };

        for (var i = 0; i < buttons.length; i++) {
            _loop(i);
        }
    };

    function attachClickToOptions(category) {
        var categoryChoice = void 0;

        for (var i = 0; i < category.children[1].children.length; i++) {
            category.children[1].children[i].addEventListener('click', function () {

                //Get the name of the choice
                categoryChoice = this.childNodes[0].childNodes[1].innerText;

                //Add the picture in the configurator
                var imageToAppend = document.createElement('div');
                var imageSrc = '../assets/images/' + categoryChoice.trim() + '.png';

                imageToAppend.setAttribute('style', 'background-image: url(\'' + imageSrc + '\');');

                //Remove all current images for this category
                var toRemove = document.querySelectorAll('[data-category=\"' + category.childNodes[0].innerText + '\"]');
                for (var _i = 0; _i < toRemove.length; _i++) {
                    toRemove[_i].remove();
                }

                //Add the selected image
                imageToAppend.setAttribute('data-category', category.childNodes[0].innerText);
                imageToAppend.classList.add('image-common');
                document.getElementsByClassName('wrapper')[0].appendChild(imageToAppend);

                //Uncheck all the choices
                for (var _i2 = 0; _i2 < this.parentNode.children.length; _i2++) {
                    // debugger;
                    this.parentNode.childNodes[_i2].childNodes[0].children[0].checked = false;
                    // this.parentNode.childNodes[i].checked = false;
                }

                //Check the choice
                this.childNodes[0].childNodes[0].checked = true;

                //Add the choice to the user choice object for email
                userChoice.addProperty(this.parentNode.parentNode.children[0].innerText, categoryChoice);
            });
        }
    };

    function buildMenu(data) {
        var menu = document.getElementsByClassName('menu-group')[0];

        //Find how many tabs will be in the menu
        tabs = findMenuTabs(data);
        var tabsNumber = tabs.length;

        //Create li element filled with title in span and options in another ul
        var categories = [],
            lists = [],
            title = [],
            listParent = [],
            optionContainer = [];

        for (var i = 0; i < tabs.length; i++) {
            categories[i] = document.createElement('li');
            categories[i].classList.add('menu-group-item');

            listParent[i] = document.createElement('ul');
            listParent[i].classList.add('secondary-menu');

            title[i] = document.createElement('span');
            title[i].innerText = firstCapitalLetter(tabs[i]);

            categories[i].appendChild(title[i]);
            // categories[i].appendChild(listParent[i]);
        }
        //Initialise the choice of the user
        initUserChoice(tabs);

        //Build Menu
        data.forEach(function (element) {
            //Build parent li and children label and input
            var container = document.createElement('li');
            container.classList.add('option');

            var li = document.createElement('label');
            li.textContent = element.name;
            li.htmlFor = element.name;

            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = element.name;

            var headerWrapper = document.createElement('div');
            headerWrapper.appendChild(radio);
            headerWrapper.appendChild(li);

            var description = document.createElement('span');
            description.classList.add('item-description');
            description.textContent = element.description;

            for (var _i3 = 0; _i3 < tabs.length; _i3++) {
                if (tabs[_i3] === element.position) {
                    container.appendChild(headerWrapper);
                    container.appendChild(description);

                    listParent[_i3].appendChild(container);
                }
            }

            for (var _i4 = 0; _i4 < tabs.length; _i4++) {
                categories[_i4].appendChild(listParent[_i4]);
            }
        });

        //Attach menu to body
        for (var _i5 = 0; _i5 < tabs.length; _i5++) {
            attachClickToOptions(categories[_i5]);
            menu.appendChild(categories[_i5]);

            var hr = document.createElement('hr');
            menu.appendChild(hr);
        }
    };

    function buildPage() {
        var data = void 0;
        handleJSONData().then(function (response) {

            //Build left menu
            buildMenu(JSON.parse(response));

            //Build upper menu

            //TODO:
            //Get the number of models and pass it to the builder function
            //Example with 3
            buildUpperMenu(5);
        }).then(function () {

            //After the left menu is ready, attach event handlers
            attachClickToMenuItems();
        });
    };

    function buildUpperMenu(numOfModels) {
        var slideInMenu = document.getElementById('slide-in-menu');

        //Create options and append them with parent div
        var modelsWrapper = document.createElement('div');
        modelsWrapper.classList.add('models-wrapper');

        for (var i = 0; i < numOfModels; i++) {
            var infoWrapper = document.createElement('div');
            infoWrapper.classList.add('info-wrapper');

            var model = document.createElement('div');
            model.classList.add('model');

            var image = document.createElement('div');
            image.classList.add('image-thumb');

            var select = document.createElement('div');
            select.innerText = 'Select';
            select.classList.add('select');

            //TODO
            //Change background image
            image.classList.add('main-image');

            model.appendChild(image);
            infoWrapper.appendChild(model);
            infoWrapper.appendChild(select);
            modelsWrapper.appendChild(infoWrapper);
        }

        slideInMenu.appendChild(modelsWrapper);
    };

    function checkIfMobile() {
        var styles = document.getElementsByTagName('link');

        for (var i = 0; i < styles.length; i++) {
            if (styles[i].href.indexOf('/styles/styles.mobile.css') > -1) {
                return true;
            }
        }
        return false;
    };

    function findMenuTabs(data) {
        var temp = [];

        data.forEach(function (element) {
            if (!temp.includes(element.position)) {
                temp.push(element.position);
            }
        });

        return temp;
    };

    function firstCapitalLetter(string) {
        return string[0].toUpperCase() + string.slice(1, string.length);
    };

    function handleJSONData() {
        return new Promise(function (resolve, reject) {
            //Send request
            var data = new XMLHttpRequest();
            data.open('GET', '../data.json');

            data.onload = function () {
                if (data.status === 200) {
                    resolve(data.responseText);
                } else {
                    reject(Error(data.statusText));
                }
            };

            data.onerror = function () {
                reject(Error("Something went wrong.."));
            };

            data.send(null);
        });
    };

    function initUserChoice(tabs) {
        userChoice = new UserChoice(tabs);
    };

    function sendConfiguration() {
        var button = document.getElementById('send-configuration');
        button.addEventListener('click', function () {
            console.log(userChoice);
        });
    };

    function toggleMenu() {
        var arrow = document.getElementById('menu-trigger');

        menuButton.addEventListener('click', function () {
            if (menu.hasAttribute('data-hidden')) {
                //Slide menu
                main.setAttribute('style', 'left: 25vw; width: 75vw; position: fixed; z-index: -1');
                menu.setAttribute('style', 'left: 0;');
                menu.removeAttribute('data-hidden');

                //Change icon
                arrow.classList.remove('fa-arrow-right');
                arrow.classList.add('fa-arrow-left');
            } else {
                //Slide menu
                main.setAttribute('style', 'left: 5vw; width: 95vw; position: fixed; z-index: -1');
                menu.setAttribute('style', 'left: -20vw ;');
                menu.setAttribute('data-hidden', 1);

                //Change icon
                arrow.classList.remove('fa-arrow-left');
                arrow.classList.add('fa-arrow-right');
            }
        });
    };

    function toggleSelectModel() {
        var button = document.getElementById('model-select');
        var slideInMenu = document.getElementById('slide-in-menu');
        var toggleArrow = document.getElementById('model-select').childNodes[3];

        button.addEventListener('click', function () {
            if (slideInMenu.hasAttribute('data-hidden')) {
                var flag = checkIfMobile();

                slideInMenu.setAttribute('style', 'top: calc(80px - 20em - 1em);');
                slideInMenu.removeAttribute('data-hidden');

                toggleArrow.classList.remove('fa-arrow-up');
                toggleArrow.classList.add('fa-arrow-down');
            } else {
                slideInMenu.setAttribute('style', 'top: calc(80px - 1em);');
                slideInMenu.setAttribute('data-hidden', 1);

                toggleArrow.classList.remove('fa-arrow-down');
                toggleArrow.classList.add('fa-arrow-up');
            }
        });
    };

    document.addEventListener('DOMContentLoaded', function () {
        buildPage();
        toggleMenu();
        toggleSelectModel();
        sendConfiguration();
        //menu.setAttribute('style', 'animation: swipe 1s linear reverse; animation-fill-mode: forwards;');
    });
})();