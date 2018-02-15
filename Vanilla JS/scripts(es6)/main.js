(function() {
    "use strict";
    let userChoice;
    let tabs = [];

    const menuButton = document.getElementById('menu-trigger');
    const menu = document.getElementsByClassName('menu-container')[0];
    const main = document.getElementsByTagName('main')[0];


    class UserChoice
    {
        constructor(tabs)
        {
            this.tabs = {};

            for(let i = 0; i < tabs.length; i++)
            {
                this.tabs[firstCapitalLetter(tabs[i])] = 'None';
            }
        }

        addProperty(category, property)
        {
            this.tabs[category] = property;
        }
        
    };

    function attachClickToMenuItems() {
        const buttons = document.getElementsByClassName('menu-group-item');

        for(let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function(e) {

                const button = buttons[i].children[1];

                if(e.target.matches('.menu-group-item') || e.target.parentNode.matches('.menu-group-item')){
                    if(button.hasAttribute('data-open')) {
                        button.classList.remove('block');
                        button.removeAttribute('data-open');
                    }
                    else {
                        button.classList.add('block');
                        button.setAttribute('data-open', 1);
                    }
                }
            });
        }
        
    };

    function attachClickToOptions(category){
        let categoryChoice;

        for(let i = 0; i < category.children[1].children.length; i++)
        {
            category.children[1].children[i].addEventListener('click', function() {

                //Get the name of the choice
                categoryChoice = this.childNodes[0].childNodes[1].innerText;

                //Add the picture in the configurator
                const imageToAppend = document.createElement('div');
                let imageSrc = '../assets/images/' + categoryChoice.trim() + '.png';
                
                imageToAppend.setAttribute('style', `background-image: url(\'${imageSrc}\');`);

                //Remove all current images for this category
                let toRemove = document.querySelectorAll('[data-category=\"' + category.childNodes[0].innerText + '\"]');
                for(let i = 0; i < toRemove.length; i++) {
                    toRemove[i].remove();
                }

                //Add the selected image
                imageToAppend.setAttribute('data-category', category.childNodes[0].innerText);
                imageToAppend.classList.add('image-common');
                document.getElementsByClassName('wrapper')[0].appendChild(imageToAppend);

                //Uncheck all the choices
                for(let i = 0; i < this.parentNode.children.length; i++)
                {
                    // debugger;
                    this.parentNode.childNodes[i].childNodes[0].children[0].checked = false;
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
        const menu = document.getElementsByClassName('menu-group')[0];

        //Find how many tabs will be in the menu
        tabs = findMenuTabs(data);
        const tabsNumber = tabs.length;

        //Create li element filled with title in span and options in another ul
        let categories = [], lists = [], title = [], listParent = [], optionContainer = [];

        for(let i = 0; i < tabs.length; i++) {
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
        data.forEach(function(element) {
            //Build parent li and children label and input
            let container = document.createElement('li');
            container.classList.add('option');

            let li = document.createElement('label');
            li.textContent = element.name;
            li.htmlFor = element.name;

            let radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = element.name;

            let headerWrapper = document.createElement('div');
            headerWrapper.appendChild(radio);
            headerWrapper.appendChild(li);

            let description = document.createElement('span');
            description.classList.add('item-description');
            description.textContent = element.description;

            for(let i = 0; i< tabs.length; i++) {
                if(tabs[i] === element.position){
                    container.appendChild(headerWrapper);
                    container.appendChild(description);

                    listParent[i].appendChild(container);
                }
            }

            for(let i = 0; i< tabs.length; i++) {
                categories[i].appendChild(listParent[i]);
            }
        });

        //Attach menu to body
        for(let i = 0; i < tabs.length; i++){
            attachClickToOptions(categories[i]);
            menu.appendChild(categories[i]);
            
            const hr = document.createElement('hr');
            menu.appendChild(hr);
        }
    };

    function buildPage() {
        let data;
        handleJSONData()
            .then(function(response) {

                //Build left menu
                buildMenu(JSON.parse(response));

                //Build upper menu

                //TODO:
                //Get the number of models and pass it to the builder function
                //Example with 3
                buildUpperMenu(5);

            })
            .then(function() {

                //After the left menu is ready, attach event handlers
                attachClickToMenuItems();
            });

        
    };

    function buildUpperMenu(numOfModels) {
        const slideInMenu = document.getElementById('slide-in-menu');

        //Create options and append them with parent div
        let modelsWrapper = document.createElement('div');
        modelsWrapper.classList.add('models-wrapper');

        for(let i = 0; i < numOfModels; i++)
        {
            let infoWrapper = document.createElement('div');
            infoWrapper.classList.add('info-wrapper');

            let model = document.createElement('div');
            model.classList.add('model');

            let image = document.createElement('div');
            image.classList.add('image-thumb');

            let select = document.createElement('div');
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
        let styles = document.getElementsByTagName('link');

        for(let i = 0; i < styles.length; i++){
            if(styles[i].href.indexOf('/styles/styles.mobile.css') > -1) {
                return true;
            }
        }
        return false;
    };

    function findMenuTabs(data) {
        let temp = [];

        data.forEach(function(element){
            if(!temp.includes(element.position)){
                temp.push(element.position);
            }
        });

        return temp;
    };

    function firstCapitalLetter(string) {
        return(string[0].toUpperCase() + string.slice(1, string.length));
    };

    function handleJSONData() {
        return new Promise(function(resolve, reject){
            //Send request
            let data = new XMLHttpRequest();
            data.open('GET', '../data.json');
            
            data.onload = function() {
                if(data.status === 200)
                {
                    resolve(data.responseText);
                }
                else
                {
                    reject(Error(data.statusText));
                }
            }
            
            data.onerror = function() {
                reject(Error("Something went wrong.."));
            }

            data.send(null);
        })
    };

    function initUserChoice(tabs){
        userChoice = new UserChoice(tabs);        
    };

    function sendConfiguration() {
        const button = document.getElementById('send-configuration');
        button.addEventListener('click', function() {
            console.log(userChoice);
        })
    };

    function toggleMenu() {
        let arrow = document.getElementById('menu-trigger');

        menuButton.addEventListener('click', function() {
            if(menu.hasAttribute('data-hidden')) {
                //Slide menu
                main.setAttribute('style', 'left: 25vw; width: 75vw; position: fixed; z-index: -1')
                menu.setAttribute('style', 'left: 0;');
                menu.removeAttribute('data-hidden');

                //Change icon
                arrow.classList.remove('fa-arrow-right');
                arrow.classList.add('fa-arrow-left');
            }
            else {
                //Slide menu
                main.setAttribute('style', 'left: 5vw; width: 95vw; position: fixed; z-index: -1')                
                menu.setAttribute('style', 'left: -20vw ;');
                menu.setAttribute('data-hidden', 1);

                //Change icon
                arrow.classList.remove('fa-arrow-left');
                arrow.classList.add('fa-arrow-right');
            }
        });
    };

    function toggleSelectModel() {
        const button = document.getElementById('model-select');
        const slideInMenu = document.getElementById('slide-in-menu');
        const toggleArrow = document.getElementById('model-select').childNodes[3];

        button.addEventListener('click', () => {
            if(slideInMenu.hasAttribute('data-hidden'))
            {
                let flag = checkIfMobile();
                
                slideInMenu.setAttribute('style', 'top: calc(80px - 20em - 1em);');
                slideInMenu.removeAttribute('data-hidden');

                toggleArrow.classList.remove('fa-arrow-up');
                toggleArrow.classList.add('fa-arrow-down');
            }
            else
            {
                slideInMenu.setAttribute('style', 'top: calc(80px - 1em);');
                slideInMenu.setAttribute('data-hidden', 1);

                toggleArrow.classList.remove('fa-arrow-down');
                toggleArrow.classList.add('fa-arrow-up');
            }
        });
    };

    document.addEventListener('DOMContentLoaded', function() {
        buildPage();
        toggleMenu();
        toggleSelectModel();
        sendConfiguration();
        //menu.setAttribute('style', 'animation: swipe 1s linear reverse; animation-fill-mode: forwards;');
    });
})();