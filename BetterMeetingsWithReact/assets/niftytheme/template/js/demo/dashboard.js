
// Dashboard.js
// ====================================================================
// This file should not be included in your project.
// This is just a sample how to initialize plugins or components.
//
// - ThemeOn.net -


$(window).on('load', function() {



    // Network chart ( Morris Line Chart )
    // =================================================================
    // Require MorrisJS Chart
    // -----------------------------------------------------------------
    // http://morrisjs.github.io/morris.js/
    // =================================================================

    var day_data = [
        {"elapsed": "Oct-12", "value": 24, b:2},
        {"elapsed": "Oct-13", "value": 34, b:22},
        {"elapsed": "Oct-14", "value": 33, b:7},
        {"elapsed": "Oct-15", "value": 22, b:6},
        {"elapsed": "Oct-16", "value": 28, b:17},
        {"elapsed": "Oct-17", "value": 60, b:15},
        {"elapsed": "Oct-18", "value": 60, b:17},
        {"elapsed": "Oct-19", "value": 70, b:7},
        {"elapsed": "Oct-20", "value": 67, b:18},
        {"elapsed": "Oct-21", "value": 86, b: 18},
        {"elapsed": "Oct-22", "value": 86, b: 18},
        {"elapsed": "Oct-23", "value": 113, b: 29},
        {"elapsed": "Oct-24", "value": 130, b: 23},
        {"elapsed": "Oct-25", "value": 114, b:10},
        {"elapsed": "Oct-26", "value": 80, b:22},
        {"elapsed": "Oct-27", "value": 109, b:7},
        {"elapsed": "Oct-28", "value": 100, b:6},
        {"elapsed": "Oct-29", "value": 105, b:17},
        {"elapsed": "Oct-30", "value": 110, b:15},
        {"elapsed": "Oct-31", "value": 102, b:17},
        {"elapsed": "Nov-01", "value": 107, b:7},
        {"elapsed": "Nov-02", "value": 60, b:18},
        {"elapsed": "Nov-03", "value": 67, b: 18},
        {"elapsed": "Nov-04", "value": 76, b: 18},
        {"elapsed": "Nov-05", "value": 73, b: 29},
        {"elapsed": "Nov-06", "value": 94, b: 13},
        {"elapsed": "Nov-07", "value": 135, b:2},
        {"elapsed": "Nov-08", "value": 154, b:22},
        {"elapsed": "Nov-09", "value": 120, b:7},
        {"elapsed": "Nov-10", "value": 100, b:6},
        {"elapsed": "Nov-11", "value": 130, b:17},
        {"elapsed": "Nov-12", "value": 100, b:15},
        {"elapsed": "Nov-13", "value": 60, b:17},
        {"elapsed": "Nov-14", "value": 70, b:7},
        {"elapsed": "Nov-15", "value": 67, b:18},
        {"elapsed": "Nov-16", "value": 86, b: 18},
        {"elapsed": "Nov-17", "value": 86, b: 18},
        {"elapsed": "Nov-18", "value": 113, b: 29},
        {"elapsed": "Nov-19", "value": 130, b: 23},
        {"elapsed": "Nov-20", "value": 114, b:10},
        {"elapsed": "Nov-21", "value": 80, b:22},
        {"elapsed": "Nov-22", "value": 109, b:7},
        {"elapsed": "Nov-23", "value": 100, b:6},
        {"elapsed": "Nov-24", "value": 105, b:17},
        {"elapsed": "Nov-25", "value": 110, b:15},
        {"elapsed": "Nov-26", "value": 102, b:17},
        {"elapsed": "Nov-27", "value": 107, b:7},
        {"elapsed": "Nov-28", "value": 60, b:18},
        {"elapsed": "Nov-29", "value": 67, b: 18},
        {"elapsed": "Nov-30", "value": 76, b: 18},
        {"elapsed": "Des-01", "value": 73, b: 29},
        {"elapsed": "Des-02", "value": 94, b: 13},
        {"elapsed": "Des-03", "value": 79, b: 24}
    ];

    var chart = Morris.Line({
        element: 'morris-chart-network',
        data: day_data,
        axes:false,
        xkey: 'elapsed',
        ykeys: ['value', 'b'],
        labels: ['Download Speed', 'Upload Speed'],
        yLabelFormat :function (y) { return y.toString() + ' Mb/s'; },
        gridEnabled: false,
        gridLineColor: 'transparent',
        lineColors: ['#5b6b79','#a5a5a5'],
        lineWidth:[2,1],
        pointSize:[0,2],
        fillOpacity:.7,
        gridTextColor:'#999',
        parseTime: false,
        resize:true,
        behaveLikeLine : true,
        hideHover: 'auto'
    });





    // Visitor chart ( Sparkline chart )
    // =================================================================
    // Require Sparkline Chart
    // -----------------------------------------------------------------
    // http://omnipotent.net/jquery.sparkline/#s-about
    // =================================================================
    $("#demo-chart-visitors").sparkline([476,643,356,453,745,976,867,886,984,645,767,799], {
        type: 'line',
        width: '110',
        height: '22',
        spotRadius: 3,
        lineWidth: 1.5,
        lineColor:'#5b6b79',
        fillColor: 'transparent',
        spotColor: '#5b6b79',
        minSpotColor: '#5b6b79',
        maxSpotColor: '#5b6b79',
        highlightLineColor : '#5b6b79',
        highlightSpotColor: '#5b6b79',
        tooltipChartTitle: 'Visitors',
        tooltipSuffix:' k',
    });





    // Bounce rate chart ( Sparkline chart )
    // =================================================================
    // Require Sparkline Chart
    // -----------------------------------------------------------------
    // http://omnipotent.net/jquery.sparkline/#s-about
    // =================================================================
    $("#demo-chart-bounce-rate").sparkline([23,12,22,25,35,15,30,19,25,33,29,37], {
        type: 'line',
        width: '110',
        height: '22',
        spotRadius: 3,
        lineWidth: 1.5,
        lineColor:'#5b6b79',
        fillColor: 'transparent',
        spotColor: '#5b6b79',
        minSpotColor: '#5b6b79',
        maxSpotColor: '#5b6b79',
        highlightLineColor : '#5b6b79',
        highlightSpotColor: '#5b6b79',
        tooltipChartTitle: 'Bounce rate',
        tooltipSuffix:' %'

    });






    // EXTRA SMALL WEATHER WIDGET
    // =================================================================
    // Require sckycons
    // -----------------------------------------------------------------
    // http://darkskyapp.github.io/skycons/
    // =================================================================

    // on Android, a nasty hack is needed: {"resizeClear": true}
    skyconsOptions = {
        "color": "#3bb5e8",
        "resizeClear": true
    }

    /* Main Icon */
    var skycons = new Skycons(skyconsOptions);
    skycons.add("demo-weather-xs-icon", Skycons.PARTLY_CLOUDY_DAY);
    skycons.play();






    // HDD USAGE - SPARKLINE LINE AREA CHART
    // =================================================================
    // Require sparkline
    // -----------------------------------------------------------------
    // http://omnipotent.net/jquery.sparkline/#s-about
    // =================================================================
    $("#demo-sparkline-area").sparkline([57,69,70,68,73,76,75,79,73,76,77,73], {
        type: 'line',
        width: '110',
        height: '50',
        spotRadius: 2.5,
        lineWidth:1.5,
        lineColor:'rgba(255,255,255,.5)',
        fillColor: 'rgba(0,0,0,0.2)',
        spotColor: 'rgba(255,255,255,.5)',
        minSpotColor: 'rgba(255,255,255,.5)',
        maxSpotColor: 'rgba(255,255,255,.5)',
        highlightLineColor : '#ffffff',
        highlightSpotColor: '#ffffff',
        tooltipChartTitle: 'Usage',
        tooltipSuffix:' %'

    });







    // EARNING - SPARKLINE LINE CHART
    // =================================================================
    // Require sparkline
    // -----------------------------------------------------------------
    // http://omnipotent.net/jquery.sparkline/#s-about
    // =================================================================
    $("#demo-sparkline-line").sparkline([345,404,305,455,378,767], {
        type: 'line',
        width: '110',
        height: '50',
        spotRadius: 2.5,
        lineWidth:1.5,
        lineColor:'#ffffff',
        fillColor: false,
        minSpotColor :false,
        maxSpotColor : false,
        highlightLineColor : '#ffffff',
        highlightSpotColor: '#ffffff',
        tooltipChartTitle: 'Earning',
        tooltipPrefix :'$ ',
        spotColor:'#ffffff',
        valueSpots : {
            '0:': '#ffffff'
        }
    });







    // SALES - SPARKLINE BAR CHART
    // =================================================================
    // Require sparkline
    // -----------------------------------------------------------------
    // http://omnipotent.net/jquery.sparkline/#s-about
    // =================================================================
    $("#demo-sparkline-bar").sparkline([40,32,53,45,67,45,56,34,67,76], {
        type: 'bar',
        height: '50',
        barWidth: 7,
        barSpacing: 3,
        zeroAxis: false,
        tooltipChartTitle: 'Daily Sales',
        tooltipSuffix:' Sales',
        barColor: '#fff'}
    );






    // TOP MOVIE - SPARKLINE PIE CHART
    // =================================================================
    // Require sparkline
    // -----------------------------------------------------------------
    // http://omnipotent.net/jquery.sparkline/#s-about
    // =================================================================
    $("#demo-sparkline-pie").sparkline([5, 12, 17 ,55], {
        type: 'pie',
        width: '50',
        height: '50',
        tooltipChartTitle: 'Top Movies',
        tooltipFormat: '{{offset:offset}} ({{percent.1}}%)',
        tooltipValueLookups: {
            'offset': {
                0: 'Drama',
                1: 'Action',
                2: 'Comedy',
                3: 'Adventure'
            }
        },
        sliceColors: ['#2d4859','#fe7211','#7ad689','#128376'],
    });









    // PANEL OVERLAY
    // =================================================================
    // Require Nifty js
    // -----------------------------------------------------------------
    // http://www.themeon.net
    // =================================================================
    $('#demo-panel-network-refresh').niftyOverlay().on('click', function(){
        var $el = $(this), relTime;

        $el.niftyOverlay('show');


        relTime = setInterval(function(){
            $el.niftyOverlay('hide');
            clearInterval(relTime);
        },2000);
    });








    // WEATHER WIDGET
    // =================================================================
    // Require sckycons
    // -----------------------------------------------------------------
    // http://darkskyapp.github.io/skycons/
    // =================================================================

    // on Android, a nasty hack is needed: {"resizeClear": true}
    skyconsOptions = {
        "color": "#fff",
        "resizeClear": true
    }
    /* Main Icon */
    var skycons = new Skycons(skyconsOptions);
    skycons.add("demo-weather-icon-1", Skycons.PARTLY_CLOUDY_DAY);
    skycons.play();



    /* Small Icons*/
    var skycons2 = new Skycons(skyconsOptions);
    skycons2.add("demo-weather-icon-2", Skycons.CLOUDY);
    skycons2.play();



    var skycons3 = new Skycons(skyconsOptions);
    skycons3.add("demo-weather-icon-3", Skycons.WIND);
    skycons3.play();



    var skycons4 = new Skycons(skyconsOptions);
    skycons4.add("demo-weather-icon-4", Skycons.RAIN);
    skycons4.play();



    var skycons5 = new Skycons(skyconsOptions);
    skycons5.add("demo-weather-icon-5", Skycons.PARTLY_CLOUDY_DAY);
    skycons5.play();



    // WELCOME NOTIFICATIONS
    // =================================================================
    // Require Admin Core Javascript
    // =================================================================
     var fvisit  = setTimeout(function(){
        $.niftyNoty({
            type: 'dark',
            title: 'Hello Admin,',
            message: 'Lorem ipsum dolor sit amet consectetuer <br> adipiscing elit sed diam nonummy nibh.',
            container: 'floating',
            timer: 5500
        });
        clearTimeout(fvisit);
     }, 3000);

});
