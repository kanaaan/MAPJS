(function () {
    "use strict";
    
    var app = WinJS.Application;
   
  
    //SPLIT VIEW
    
    var mySplitView = window.mySplitView = {
        splitView: null,

        trailClicked: WinJS.UI.eventHandler(function (ev) {
            var trailId = ev.currentTarget.dataset.trailId;
            updateUI(allTrails[trailId]);
        }),

        homeClicked: WinJS.UI.eventHandler(function (ev) {
            //add remove tags
            document.getElementById("app").classList.add("show-home");
            document.getElementById("app").classList.remove("show-trail");
        }),
        

        LeafletMapClicked: WinJS.UI.eventHandler(function (ev) {
            //href
            window.location.href = "map";
        }), 
        
        LeafletMapEmbeddedClicked: WinJS.UI.eventHandler(function (ev) {
            // hide the map
            document.getElementById("map").style.display = 'block';
            document.getElementById("container").style.display = 'none';
            //Leaflet map
            var descriptionElt = document.body.querySelector(".win-h2-Home");
            descriptionElt.textContent = "Leaflet test Map";
            var map = L.map('map').setView([51.505, -0.09], 13);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        }),

        crossfilterClicked: WinJS.UI.eventHandler(function (ev) {
            //href
            window.location.href = "http://square.github.io/crossfilter/";
        }),

        GraphtestClicked: WinJS.UI.eventHandler(function (ev) {
            //window.location.href = "http://www.highcharts.com/demo/3d-column-interactive";
            // hide the map
            document.getElementById("map").style.display = 'none';
            document.getElementById("container").style.display = 'block';
            $('#container').highcharts({
                title: {
                    text: 'Monthly Average Temperature',
                    x: -20 //center
                },
                subtitle: {
                    text: 'Source: WorldClimate.com',
                    x: -20
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    },
                    plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                        name: 'Tokyo',
                        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    }, {
                        name: 'New York',
                        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                    }]
            });
        }),
    };
    
    
    //END SPLIT VIEW
    
    
    function updateUI(trail) {
        
        //add remove tags
        document.getElementById("app").classList.add("show-trail");
        document.getElementById("app").classList.remove("show-home");
        
        //update title
        var titleElt = document.body.querySelector(".trail-title");
        titleElt.textContent = trail.title;
        
        //update location
        var locationElt = document.body.querySelector(".trail-location");
        locationElt.textContent = trail.location;
        
        //update description
        var descriptionElt = document.body.querySelector(".trail-description");
        descriptionElt.textContent = trail.description;
        
        //update Rating
        var ratingElt = document.body.querySelector(".rating");
        ratingElt.winControl.averageRating = trail.averageRating;
        ratingElt.winControl.userRating = 0;
    }
    
    var trailNameToID = {
        "Snoqualmie Falls Trail": 0,
        "Foster Island Trail": 1,
        "Alki Trail": 2
    }
    
    
    var allTrails = [
        {
            title: "Test Trail 1", averageRating: 2, location: "Kirkland, WA", description: "waterfall."
        },
        {
            title: "Test Trail 2", averageRating: 4.5, location: "Bellevue, WA", description: "Foster Island ."
        },
        {
            title: "Test Trail 3", averageRating: 1.5, location: "Seattle, WA", description: "Trail rides"
        }
    ]
    
    //processAll
    WinJS.UI.processAll().then(function () {
        mySplitView.splitView = document.querySelector(".splitView").winControl;
        new WinJS.UI._WinKeyboard(mySplitView.splitView.paneElement);
    });
    
    app.start();
})();
