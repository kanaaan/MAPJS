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
            window.location.href = "http://www.highcharts.com/demo/3d-column-interactive";
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
            title: "Snoqualmie Falls Trail", averageRating: 2, location: "Kirkland, WA", preview: "/images/SampleApp/Snoqualmie.jpg", pictureArray: [
                { type: "item", picture: "/images/SampleApp/Snoqualmie.jpg" },
                { type: "item", picture: "/images/SampleApp/Snoqualmie2.jpg" }
            ], description: "Snoqualmie Falls is one of Washington state's most popular scenic attractions. More than 1.5 million visitors come to the Falls every year. At the falls, you will find a two-acre park, gift shop, observation deck, the Salish Lodge and the famous 270 foot waterfall."
        },
        {
            title: "Foster Island Trail", averageRating: 4.5, location: "Bellevue, WA", preview: "/images/SampleApp/Foster.jpg", pictureArray: [
                { type: "item", picture: "/images/SampleApp/Foster.jpg" },
                { type: "item", picture: "/images/SampleApp/Foster2.jpg" }
            ], description: "Foster Island Trail is a 2 mile loop trail located near Seattle, Washington that features a lake and is good for all skill levels. The trail offers a number of activity options and is accessible year-round."
        },
        {
            title: "Alki Trail", averageRating: 1.5, location: "Seattle, WA", preview: "/images/SampleApp/Alki.jpg", pictureArray: [
                { type: "item", picture: "/images/SampleApp/Alki.jpg" },
                { type: "item", picture: "/images/SampleApp/Alki2.jpg" }
            ], description: "The Alki Trail rides along the northern and eastern shore of West Seattle along Alki Avenue. Largely riding on a widened sidewalk, separated from traffic by a parking lane and curb, traffic on the trail is separated for bikes and walkers, providing a less stressful experience for walkers and bikers alike. "
        }
    ]
    
    //processAll
    WinJS.UI.processAll().then(function () {
        mySplitView.splitView = document.querySelector(".splitView").winControl;
        new WinJS.UI._WinKeyboard(mySplitView.splitView.paneElement);
    });
    
    app.start();
})();
