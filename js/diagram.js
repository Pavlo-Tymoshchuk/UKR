
Chart.defaults.global.tooltips.custom = function(tooltip) {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip');

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

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

            var tableRoot = tooltipEl.querySelector('p');
            tableRoot.innerHTML = innerHtml;
        }

        // var positionY = this._chart.canvas.offsetTop;
        // var positionX = this._chart.canvas.offsetLeft;
        
        let canvasBox = document.querySelector('#myChart').getBoundingClientRect();
        
        let canvasPositionLeft = canvasBox.left;
        let canvasPositionTop = canvasBox.top;
        
        //console.log(canvasPositionTop);

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        
        //console.log(tooltip.caretX)
        tooltipEl.style.left = tooltip.caretX - 20  + 'px';
        tooltipEl.style.top = tooltip.caretY - 20  + 'px';
    };

var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Оргтехника, телекоммуникации', 'Полиграфия', 'Бытовая электротехника', 'Транспортные средства и услуги', 'Туризм, спорт, развлечения', 'Авто-, мото-', 'Промышленность, производство'],
        datasets: [{
            data: [10, 19, 3, 5, 2, 3, 1],
            backgroundColor: '#F0F0FA',
            borderColor: "#FAFAFF",
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(92, 93, 247, 0.5)',
        }]
    },
    options: {
        legend: {
            display: false,
        },
        cutoutPercentage: 20,
        tooltips: {
            enabled: false,
        }
    }
});

var myLegendContainer = document.getElementById("myChartLegend");

// generate HTML legend
myLegendContainer.innerHTML = myChart.generateLegend();

// bind onClick event to all LI-tags of the legend
var legendItems = myLegendContainer.getElementsByTagName('li');

for (var i = 0; i < legendItems.length; i += 1) {
  legendItems[i].addEventListener("click", legendClickCallback, false);
  legendItems[i].classList.add('legent__item');
}


function legendClickCallback(event) {
    event = event || window.event;

    var target = event.target || event.srcElement;
    while (target.nodeName !== 'LI') {
        target = target.parentElement;
    }
    var parent = target.parentElement;
    var chartId = parseInt(parent.classList[0].split("-")[0], 10);
    var chart = Chart.instances[chartId];
    var index = Array.prototype.slice.call(parent.children).indexOf(target);

    chart.legend.options.onClick.call(chart, event, chart.legend.legendItems[index]);
    // if (chart.isDatasetVisible(index)) {
    //     target.classList.remove('hidden');
    // } else {
    //     target.classList.add('hidden');
    // }
}

function hoverLefend() {
        var idx = target.datasetIndex;
        console.log("legend " + idx);
}
