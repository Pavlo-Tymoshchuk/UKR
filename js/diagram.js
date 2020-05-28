Chart.defaults.global.tooltips.custom = function(tooltip) {
    // Tooltip Element
    var tooltipEl = document.getElementById('chartjs-tooltip');
    
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        legendItems.forEach((item) =>  {
            item.classList.remove('active');
        });
        return;
    }
    
    legendItems.forEach((item) =>  {
        item.classList.remove('active');
    });
    
    let curentItexElem = tooltip.dataPoints[0].index;
    
    legendItems[curentItexElem].classList.add('active');
 
    function getBody(bodyItem) {
        return bodyItem.lines;
    }
    
    
    // Set Text
    if (tooltip.body) {
        var bodyLines = tooltip.body.map(getBody);
        var innerHtml = '';
 
        bodyLines.forEach(function(body, i) {
            body = body[0].replace(/[^-0-9]/gim,'').replace("-","").replace("-","");
            innerHtml +=  body ;
        });
 
        var tableRoot = tooltipEl.querySelector('.manufacturing-hover-active');
        tableRoot.innerHTML = innerHtml;
    }
 
   
    let canvasBox = document.querySelector('#myChart').getBoundingClientRect();
    var position = this._chart.canvas.getBoundingClientRect();
    
    var positionY = this._chart.canvas.offsetTop;
    var positionX = this._chart.canvas.offsetLeft;
 
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
   
    tooltipEl.style.left = positionX + tooltip.caretX - 20  + 'px';
    tooltipEl.style.top = positionY +  tooltip.caretY - 20  + 'px';
};
 
var ctx = document.getElementById('myChart').getContext('2d');
 
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Оргтехника, телекоммуникации', 'Полиграфия', 'Бытовая электротехника', 'Транспортные средства и услуги', 'Туризм, спорт, развлечения', 'Авто-, мото-', 'Промышленность, производство','Оргтехника, телекоммуникации', 'Полиграфия', 'Бытовая электротехника', 'Транспортные средства и услуги', 'Туризм, спорт, развлечения', 'Авто-, мото-', 'Промышленность, производство'],
        datasets: [{
            data: [10, 19, 3, 5, 2, 3, 1,10, 19, 3, 5, 2, 3, 1],
            backgroundColor: '#F0F0FA',
            borderColor: "#FAFAFF",
            borderWidth: 1,
            hoverBackgroundColor: '#5C5DF7',
            hoverBorderColor: '#5C5DF7',
        }]
    },
    options: {
        legend: {
            display: false,
        },
        cutoutPercentage: 20,
        tooltips: {
            enabled: false,
        },
        animation: {
            duration: 0
        },
        hover: {
            animationDuration: 0 
        }
    }
});
 
var myLegendContainer = document.getElementById("myChartLegend");
myLegendContainer.innerHTML = myChart.generateLegend();
var legendItems = myLegendContainer.getElementsByTagName('li');

myLegendContainer.querySelector("ul").classList.add('legent__list');

for (var i = 0; i < legendItems.length; i++) {
  legendItems[i].classList.add('legent__item');
  legendItems[i].querySelector('span').classList.add('icon-drop');
  legendItems[i].setAttribute('data-index', i);
}

myChart.canvas.onHover = function(e) {
    console.log(e);
}

myChart.openToolTip = function(index) {
    var mouseMoveEvent, meta, point, rectangle, value;
 
    meta = this.getDatasetMeta(0);
    rectangle = this.canvas.getBoundingClientRect();
    point = meta.data[index].getCenterPoint();
 
    mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: rectangle.left + point.x,
      clientY: rectangle.top + point.y
    });
 
    this.canvas.dispatchEvent(mouseMoveEvent);
 
};
 
myChart.closeToolTip = function() {
    var mouseOutEvent = new MouseEvent('mouseout');
    return this.canvas.dispatchEvent(mouseOutEvent);
};
 
 
var legendItems = document.querySelectorAll(".legent__item");
 
legendItems.forEach(
  (value, index) => {
    value.addEventListener("mouseover", function() {
      myChart.closeToolTip();
      myChart.openToolTip(index);
    });
    value.addEventListener("mouseout", function() {
      myChart.closeToolTip();
    });
  }
);
 
console.log(myChart)

let secondContainerItems = document.createElement('ul');
secondContainerItems.classList.add('legent__list');
myLegendContainer.append(secondContainerItems);
let halfItems = Math.floor((legendItems.length - 1) / 2);

legendItems.forEach(function(item,index){
    
    if(index > halfItems) {
        secondContainerItems.append(item);
    }
});