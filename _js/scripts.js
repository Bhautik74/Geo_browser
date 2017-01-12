/**
 * Created by Kamil on 2017-01-09.
 */
(function () {

    // GEOLOKALIZACJA Z GOOGLE - DOJADZ //

    var init = {



        makeMap: function () {
            var loc = this.location.split(",");
            var pos = new google.maps.LatLng(loc[0],loc[1]);

            var mapOptions = {
                zoom: 16,
                center: pos,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.mapObj = new google.maps.Map(document.querySelector("#map"),mapOptions);
            this.destination = pos;

            var marker = new google.maps.Marker({
                map: this.mapObj,
                position: pos,
                animation: google.maps.Animation.BOUNCE,
                icon: this.options.mapMarker
            });
        },


        handleRoute: function (result,status) {

            if(status != google.maps.DirectionStatus.OK || !result.routes[0]){
                alert("Wprowadziłeś złe dane!");
                return false;
            }

            this.pathRender.setDirections(result);
            this.fromInput.value = result.routes[0].legs[0].start_adress;
        },


        prepareRoute: function(){
            var renderOption = {
                map: this.mapObj,
                polylineOptions: {
                    strokeColor:"#ff0000",
                    strokeWeight:4,
                    strokeOpacity:0.8
                },
                suppressMarkers: true
            };
            
            this.pathRender.setOptions(renderOption);


            var pathData = {
                origin: this.formInput.value,
                destination: this.destination,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            this.path.route(pathData, this.handleRoute.bind(this))
        },

        map: function (options) {

            if(!options.location) return;

            try{ google.maps.event.addDomListener(window,"load", this.makeMap.bind(this)); } catch(e) {return;}
            this.options = options;
            this.location = this.options.location;
            this.form = document.querySelector("#mapForm");

            this.formInput = document.querySelector("#form");
            this.path = new google.maps.DirectionsService();
            this.pathRender = new google.maps.DirectionsService();

            this.form.onsubmit = function(e){
                e.preventDefault();
                this.prepareRoute();
            }.bind(this);


        }


    };
init.map({
        location: "52.16235,21.071409",
        mapMarker:"./map_marker.png"
    });

})();