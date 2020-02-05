
document.addEventListener("DOMContentLoaded", function(event) {
    
    function isIE() {
        ua = navigator.userAgent;
        /* MSIE used to detect old browsers and Trident used to newer ones*/
        var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1 || ua.indexOf("Edge") > -1;
        
        return is_ie; 
    }
    /* Create an alert to show if the browser is IE or not */
    if (isIE()){
        (function() {
        // проверяем поддержку
        if (!Element.prototype.closest) {

            // реализуем
            Element.prototype.closest = function(css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
            };
        }

        })();
        (function() {

        // проверяем поддержку
        if (!Element.prototype.matches) {

            // определяем свойство
            Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;

        }

        })();
        
        (function() {
            var arr = [window.Element, window.CharacterData, window.DocumentType];
            var args = [];

            arr.forEach(function (item) {
                if (item) {
                args.push(item.prototype);
                }
            });

            // from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
            (function (arr) {
                arr.forEach(function (item) {
                if (item.hasOwnProperty('remove')) {
                    return;
                }
                Object.defineProperty(item, 'remove', {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                    value: function remove() {
                    this.parentNode.removeChild(this);
                    }
                });
                });
            })(args);
        })();
            
        (function (arr) {
            arr.forEach(function (item) {
                if (item.hasOwnProperty('append')) {
                return;
                }
                Object.defineProperty(item, 'append', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function append() {
                    var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();
                    
                    argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                    });
                    
                    this.appendChild(docFrag);
                }
                });
            });
        })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
            
        (function (arr) {
            arr.forEach(function (item) {
                if (item.hasOwnProperty('prepend')) {
                return;
                }
                Object.defineProperty(item, 'prepend', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function prepend() {
                    var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                    argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                    });

                    this.insertBefore(docFrag, this.firstChild);
                }
                });
            });
        })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
    }else {
         // Button effect

        let buttons = document.querySelectorAll('.js-button-decor');

        for(var i = 0; buttons.length > i; i++) {
            let span = document.createElement("span");
            span.classList.add('decor');
            buttons[i].appendChild(span);
            
            buttons[i].addEventListener('mouseover', function(e){
                let box = this.getBoundingClientRect();
                let left = e.clientX - box.left;
                let decorElem = this.querySelector('.decor');
                
                this.classList.add("active");
                
                decorElem.style.left = '' + left + 'px';
            });
            
            buttons[i].addEventListener("mouseleave", function(){
                this.classList.remove("active");
            });
        }
         // //Button effect
    }
    
    // Header
    
    let burger = document.querySelector('.header-burger');
    let burgerList = document.querySelector(".burger-menu__wrapper");

    burger.addEventListener('click', function(){
        this.classList.toggle('active');
        burgerList.classList.toggle("active");
    });

    document.addEventListener('click', function(e){
        let elem = e.target;

        if(!elem.closest(".header-burger") && !elem.closest(".burger-menu__wrapper")) {
            burgerList.classList.remove('active');
            burger.classList.remove('active');
        }
    });

    // /Header



    // Infinity slider 

    var arrowsInfinity = document.querySelectorAll('.js-arrow-infinity')

    function initialSliderInfinity() {
        for(var i = 0;arrowsInfinity.length > i; i++) {
            let slider = arrowsInfinity[i].closest(".slider-infinity");
            let arrowNext = arrowsInfinity[i].querySelector('.next');
            let arrowPrev = arrowsInfinity[i].querySelector('.prev');
            let sliderList = slider.querySelector('.js-slider-list');
            
            arrowNext.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-slider-item-infinity.show');
                
                itemShow.nextElementSibling.classList.add('show');
                itemShow.classList.remove('show');
                
                setTimeout(function(){
                    let newElem = itemShow;
                    itemShow.remove();
                    sliderList.append(newElem);
                },750);
                
            });
            
            arrowPrev.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-slider-item-infinity.show');
                let lastElem = sliderList.lastElementChild;
                
                sliderList.prepend(lastElem);
                
                setTimeout(function(){
                    itemShow.previousElementSibling.classList.add('show');
                    itemShow.classList.remove('show');
                },20)
            });
            
            var startPointX;
            var startPointY;
            slider.addEventListener("touchstart", function(event) {
                startPointX = event.changedTouches[0].screenX;
                startPointY = event.changedTouches[0].screenY;
            }, false);
            slider.addEventListener("touchend", function(event){
                var endPointX = event.changedTouches[0].screenX;
                var endPointY = event.changedTouches[0].screenY;
                
                if(startPointX - endPointX > 40) {
                    arrowNext.click();
                } else if(endPointX - startPointX > 40) {
                    arrowPrev.click();
                }
            }, false);
        }
    }
    initialSliderInfinity();



    // More info
        
      function showMoreInfo() {
            
        let info = document.querySelectorAll('.js-item .content p');
        let content = document.querySelectorAll('.js-item .content');
        let moreButton = document.querySelectorAll('.js-item .more_info');
        
        if(info) {
            for(var i = 0; info.length > i; i++) {
                if(info[i].offsetHeight > content[i].offsetHeight) {
                    moreButton[i].classList.add('show');
                }else {
                    moreButton[i].classList.remove('show');
                }
            }
        }
    }
        
    showMoreInfo();
    
    // /More info
    
    // Check input
    
    document.addEventListener('click', function(e){
        let elem = e.target;
        
        if(elem.closest('.notyfication__item')) {
            let notyItem = document.querySelectorAll('.notyfication__item');
            
            for(var i = 0;notyItem.length > i; i++) {
                notyItem[i].classList.remove('active');
            }
            
            elem.closest('.notyfication__item').classList.add('active');
        }
    });
    
    // //Check input
    
     // Popup
        
    let mainButton = document.querySelectorAll('.js-button');
    let overlay = document.querySelector('.overlay');
    let htmlOverflow = document.querySelector('html');
    
    for(var i = 0; mainButton.length > i; i++) {
        if(mainButton[i] !== null) {
            
            mainButton[i].addEventListener('click', function(){
                let getData = this.getAttribute('data-target');
                let popup = document.querySelector('.popup[data-target = ' + getData + ']');
                popup.classList.add('active');
                overlay.classList.add('active');
                htmlOverflow.classList.add('overflow')
            });
        }
    }
    
    document.addEventListener('click', function(e){
        let elem = e.target;
        
        if(elem.closest('.js-close')){
            let popupActive = document.querySelector('.popup.active');
            if(popupActive) {
                popupActive.classList.remove('active');
                overlay.classList.remove('active');
                htmlOverflow.classList.remove('overflow');
            }
            
        }
    });

    overlay.addEventListener('click', function(){
        let popupActive = document.querySelector('.popup.active');
        popupActive.classList.remove('active');
        overlay.classList.remove('active');
        htmlOverflow.classList.remove('overflow');
    });
    
    
    let moreInfo = document.querySelectorAll('.js-more-info');
    
    for(var i = 0; moreInfo.length > i; i++) {
        moreInfo[i].addEventListener('click', function(){
            let item = this.closest(".js-item");
            let reviewContent = item.querySelector('.content p').innerHTML;
            let reviewName = item.querySelector('.reviews__name').innerHTML;
            let reviewSub = item.querySelector('.reviews__sub').innerHTML;
            let reviewImg = item.querySelector('.reviews__img').getAttribute('style');
            
            let popupReview = document.querySelector('.popup-reviews');
            
            popupReview.querySelector('.popup-reviews__content p').innerHTML = '' + reviewContent + '';
            popupReview.querySelector('.reviews__name').innerHTML = '' + reviewName + '';
            popupReview.querySelector('.reviews__sub').innerHTML = '' + reviewSub + '';
            popupReview.querySelector('.reviews__img').setAttribute('style', '' + reviewImg + '');
        });
    }
    
    // /Popup
});