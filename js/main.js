
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
    
     if ('NodeList' in window && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
        };
    }
    
    // Header
    
    let burger = document.querySelector('.header-burger');
    let burgerList = document.querySelector(".burger-menu__wrapper");
    let burgerClose = document.querySelector('.close-burger');

    burger.addEventListener('click', function(){
        burgerList.classList.add("active");
        document.querySelector('html').classList.add('overflow');
    });

    document.addEventListener('click', function(e){
        let elem = e.target;

        if(!elem.closest(".header-burger") && !elem.closest(".burger-menu__wrapper") && !elem.closest(".js-button")) {
            burgerList.classList.remove('active');
            document.querySelector('html').classList.remove('overflow');
        }
    });
    
    burgerClose.addEventListener('click', function(){
        burgerList.classList.remove('active');
        document.querySelector('html').classList.remove('overflow');
    });

    // /Header

    
    // mainSLider
    
    let arrows = document.querySelectorAll(".js-arrows");
    
     function initialSlider() {
        for(var i = 0;arrows.length > i; i++) {
            let slider = arrows[i].closest(".slider");
            let arrowNext = arrows[i].querySelector('.js-next');
            let arrowPrev = arrows[i].querySelector('.js-prev');
            let allItems = slider.querySelectorAll('.js-slider-item').length;
            
            if(allItems < 2) {
                arrowNext.classList.add("disabled");
            }
            
            arrowNext.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-slider-item.show');
                let itemElseShow = slider.querySelector('.js-slider-item-else.active');
                
                if(slider.querySelector('.js-slider-item.show').nextElementSibling == null) {
                    return;
                }
                
                
                arrowPrev.classList.remove('disabled');
                
                if(itemElseShow) {
                    itemElseShow.nextElementSibling.classList.add('active');
                    itemElseShow.classList.remove('active');
                }
                
                itemShow.nextElementSibling.classList.add('show');
                itemShow.classList.remove('show');
                
                if(slider.querySelector('.js-slider-item.show').nextElementSibling == null) {
                    arrowNext.classList.add('disabled');
                }
            });
            
            arrowPrev.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-slider-item.show');
                let itemElseShow = slider.querySelector('.js-slider-item-else.active');
                
                if(slider.querySelector('.js-slider-item.show').previousElementSibling == null) {
                    return;
                }
                
                arrowNext.classList.remove('disabled');
                
                if(itemElseShow) {
                    itemElseShow.previousElementSibling.classList.add('active');
                    itemElseShow.classList.remove('active');
                }
                
                itemShow.previousElementSibling.classList.add('show');
                itemShow.classList.remove('show');
                
                if(slider.querySelector('.js-slider-item.show').previousElementSibling == null) {
                    arrowPrev.classList.add('disabled');
                }
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
    

    initialSlider();
    
    // /Main SLider

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
    
    window.addEventListener('resize', function(){
        showMoreInfo();
    });
    
    // /More info
    
    // Popup
        
    let mainButton = document.querySelectorAll('.js-button');
    let overlay = document.querySelector('.overlay');
    let htmlOverflow = document.querySelector('html');
    
    for(var i = 0; mainButton.length > i; i++) {
        if(mainButton[i] !== null) {
            
            mainButton[i].addEventListener('click', function(){
                let getData = this.getAttribute('data-target');
                let popupActive = document.querySelector('.popup.active');
                let popup = document.querySelector('.popup[data-target = ' + getData + ']');
                popup.classList.add('active');
                overlay.classList.add('active');
                htmlOverflow.classList.add('overflow');
                
                if(popupActive) {
                    popupActive.classList.remove('active');
                }
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
            
            if(popupActive) {
                popupActive.classList.remove('active');
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
    
    // Drop
    
    var dropList = document.querySelectorAll('.js-drop-item');


    document.addEventListener('click', function(e){
        let element = e.target;
        
        if(element.closest('.js-drop-button')){
            let isActive = element.closest('.js-drop-item').classList.contains('active')? true: false;
            
            dropList.forEach(item => {item.classList.remove('active')});
            
            if(isActive)
                element.closest('.js-drop-item').classList.remove('active');
            else
                element.closest('.js-drop-item').classList.add('active');
        }
        
        if(element.closest('.js-drop-contains')){
            let dropList = element.closest('.js-drop-item');
            let dropItems = dropList.querySelectorAll('.js-drop-contains');
            
            dropItems.forEach(item => {item.classList.remove('active')});
            element.closest('.js-drop-contains').classList.add('active');
            let innerContent = element.closest('.js-drop-contains').querySelector('.text').innerHTML;
            let dropInput = dropList.querySelector('.js-drop-input');
            let dropInfo = dropList.querySelector('.js-drop-info');
            
            if(dropInfo) {
                dropInfo.innerHTML = innerContent;
            }
            
            if(dropInput) {
                dropInput.value = innerContent;
            }

            // close dropdown
            dropList.classList.remove('active');
        }
    });
    
    document.querySelector('body').addEventListener('click', function(event){
        
        let dropItem = event.target.closest('.js-drop-item');
        
        if(!dropItem) {
            document.querySelectorAll('.js-drop-item').forEach(function(item){
                item.classList.remove('active');
            }); 
        }
        if(dropItem) {
            if(!dropItem.classList.contains("active")) {
                document.querySelectorAll('.js-drop-item').forEach(function(item){
                    item.classList.remove('active');
                });
            }
        }
        
    });
    
    // //Drop
    
    // Map block 
    
    let svgPath = document.querySelectorAll('.svg-content path');
    let hoverDiv = document.querySelector('.hover-map');
    let mapitem = document.querySelectorAll('.region__item');
    
    document.addEventListener('mouseover', function(e){
        let item = e.target;
        
        if(item.closest('.svg-content path')) {
            let box = item.getBoundingClientRect();
            let targetId = item.getAttribute('data-target');
            let stepLeft = 0;
            let stepTop = 0;
            
            if(targetId == "odessa") {
                stepLeft = 25;
                positionPercent(box, stepLeft, stepTop);
            }
            
            if(targetId == "kiev") {
                stepLeft = -10;
                stepTop = 10;
                positionPercent(box, stepLeft, stepTop)
            }
            
            if(targetId == "sum") {
                stepTop = 20;
                stepLeft = -10;
                positionPercent(box, stepLeft, stepTop)
            }
            
            if(targetId == "kherson") {
                stepLeft = 10;
                positionPercent(box, stepLeft, stepTop)
            }
                
            if(targetId == "kirovo") {
                stepLeft = 10;
                positionPercent(box, stepLeft, stepTop)
            }
            
            if(targetId == "cherkass") {
                stepLeft = 15;
                positionPercent(box, stepLeft, stepTop)
            }
            
            if(targetId == "roven") {
                stepLeft = 10;
                positionPercent(box, stepLeft, stepTop)
            }
            
            if(targetId == "chernovitska") {
                stepLeft = -10;
                positionPercent(box, stepLeft, stepTop)
            }
            
            if(targetId == "khmelnitsk") {
                stepLeft = -5;
                stepTop = 10;
                positionPercent(box, stepLeft, stepTop)
            }
            
            
            positionPercent(box,stepLeft,stepTop);
            
            for(var i = 0; svgPath.length > i; i++) {
                svgPath[i].classList.remove("active");
            }
            
            for(var i = 0; mapitem.length > i; i++) {
                mapitem[i].classList.remove("active");
            }
            
            document.querySelector('.region__item[data-target='+ targetId +']').classList.add('active');
            let value = document.querySelector('.region__item[data-target='+ targetId +']').getAttribute('data-value');
            let hoverItem = document.querySelector('.hover-map');
            hoverItem.innerHTML = value;
            
            item.classList.add('active');
        }
        
        if(item.closest('.region__item')) {
            let targetId = item.closest('.region__item').getAttribute('data-target');
            let valueItem = item.closest('.region__item').getAttribute('data-value');
            let svgItem = document.querySelector('.svg-content path[data-target='+ targetId +']');
            let hoverItem = document.querySelector('.hover-map');
            hoverItem.innerHTML = valueItem;
            let stepLeft = 0;
            let stepTop = 0;
            
            if(svgItem !== null) {
                let box = svgItem.getBoundingClientRect();
                
                if(targetId == "odessa") {
                    stepLeft = 25;
                    positionPercent(box, stepLeft, stepTop)
                }
                
                if(targetId == "kiev") {
                    stepLeft = -10;
                    stepTop = 10;
                    positionPercent(box, stepLeft, stepTop)
                }
                
                if(targetId == "sum") {
                    stepTop = 20;
                    stepLeft = -10;
                    positionPercent(box, stepLeft, stepTop)
                }
                
                if(targetId == "kherson") {
                    stepLeft = 10;
                    positionPercent(box, stepLeft, stepTop)
                }
                
                if(targetId == "kirovo") {
                    stepLeft = 10;
                    positionPercent(box, stepLeft, stepTop)
                }
                
                if(targetId == "cherkass") {
                    stepLeft = 15;
                    positionPercent(box, stepLeft, stepTop)
                }
                
                if(targetId == "roven") {
                    stepLeft = 10;
                    positionPercent(box, stepLeft, stepTop)
                }
                
                if(targetId == "chernovitska") {
                    stepLeft = -10;
                    positionPercent(box, stepLeft, stepTop)
                }
                
                if(targetId == "khmelnitsk") {
                    stepLeft = -5;
                    stepTop = 10;
                    positionPercent(box, stepLeft, stepTop)
                }
                
            
                positionPercent(box,stepLeft,stepTop);
                
                for(var i = 0; svgPath.length > i; i++) {
                    svgPath[i].classList.remove("active");
                }
                
                svgItem.classList.add('active');
            }
            
        }
    });
    
    mapitem.forEach((item) => {
        item.addEventListener('mouseout', function(e){
            hideBlock();
        });
    });
    
    svgPath.forEach((item) => {
        item.addEventListener('mouseout', function(e){
            if(!e.relatedTarget.closest('.hover-map')) {
                hideBlock();
            }
        });
    });

    
    function hideBlock() {
        svgPath.forEach(function(item){
            item.classList.remove("active");
        });
        
        mapitem.forEach(function(item){
            item.classList.remove("active");
        });
        
        hoverDiv.style.left = "-1000px";
        
        document.querySelector('html').classList.remove('overflow');
    }
    
    function positionPercent(box,stepLeft,stepTop){
        let wrapper = document.querySelector('.svg-map').getBoundingClientRect();
        let wrapperLeft = wrapper.left;
        let wrapperTop = wrapper.top;
        let widthBox = box.width;
        let heightBox = box.height;
        let leftPosition = (box.left - wrapperLeft)   + (widthBox / 3) + stepLeft;
        let topPosition =  (box.top - wrapperTop) + (heightBox / 3) + stepTop;
        
        hoverDiv.style.left = '' + leftPosition + 'px';
        hoverDiv.style.top = '' + topPosition + 'px';
    }
    
    // /Map block
    
    // Add reviews photo

    let fileInput = document.querySelector('.js-input-file');
    let preview = document.querySelector('.add-reviews__photo');
    let previewImg;
    
    if(preview) {
        previewImg = preview.getAttribute('style');
    }
    
    if(fileInput) {
        fileInput.addEventListener("change",function(){
            let file = fileInput.files[0];
            let reader = new FileReader();
            reader.onloadend = function () {
                let src = reader.result;
                preview.setAttribute("style",`background-image: url(${src})`);
                
                preview.classList.add('active');
            }

            if (file) {
                reader.readAsDataURL(file);
            } else {
                preview.src = "";
            }
        });
        
        let clearInput = document.querySelector('.clear-file-input');

        clearInput.addEventListener('click',function(){
            preview.setAttribute("style",`${previewImg}`);
            preview.classList.remove('active');
            preview.querySelector('.js-input-file').value = null;
        });
    }
    
    // //Add rivews photo
    
    // Print 
    
    // Stars 
    
    let starsItem = document.querySelectorAll('.js-star-item');
    let starInput = document.querySelector('.js-stars-input');
    let starList = document.querySelector('.js-star-list');
    starsItem.forEach((item) =>{
        item.addEventListener('click',function(){
            let starValuse = item.getAttribute('data-target');
            starInput.setAttribute('value', starValuse);
            starList.classList.add('checked');
            
            for(var i = 0; starsItem.length > i; i++) {
                starsItem[i].classList.remove('active');
            }
            item.classList.add('active');
        });
    });
});


window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+38(___)-___-____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }
  
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  
  });
  
});