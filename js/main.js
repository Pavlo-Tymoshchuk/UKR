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

// Button effect

let buttons = document.querySelectorAll('.js-button');

buttons.forEach(function(item){
    let span = document.createElement("span");
    span.classList.add('decor');
    item.appendChild(span);
    
    item.addEventListener('mouseover', function(e){
        let box = item.getBoundingClientRect();
        let left = e.clientX - box.left;
        let decorElem = item.querySelector('.decor');
        
        item.classList.add("active");
        
        decorElem.style.left = '' + left + 'px';
    });
    
    item.addEventListener("mouseleave", function(){
        item.classList.remove("active");
    });
})



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