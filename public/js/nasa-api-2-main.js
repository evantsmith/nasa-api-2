$(document).ready(function(){
    console.log('JS is linked');
    var asteroidArr = [];
    $('#searchBtn').on('click', function(event){
        event.preventDefault();
        console.log('Button clicked');
        var search_start_date = $('#start-date').val();
        var search_end_date = $('#end-date').val();
        var dates = {
            start_date : search_start_date,
            end_date : search_end_date
        }
        $.post('/search', dates, function(dataObj){
            for(var day in dataObj.near_earth_objects){

                for(var j =0; j < dataObj.near_earth_objects[day].length; j++){

                    if(dataObj.near_earth_objects[day][j]['is_potentially_hazardous_asteroid'] === true){
                        asteroidArr.push(dataObj.near_earth_objects[day][j]);
                    }
                }

            } // End outer for loop

            for(var i =0; i < asteroidArr.length; i++){

                var name = asteroidArr[i].name;
                var velocity = (asteroidArr[i].close_approach_data[0]['relative_velocity'].miles_per_hour);
                var maxDiameter = (asteroidArr[i].estimated_diameter.feet.estimated_diameter_max);
                var distance = (asteroidArr[i].close_approach_data[0]['miss_distance'].miles);
                var asteroid = `<h1>Name: ${name}</h1><h3>Velocity: ${velocity}(MPH)</h3><h3>Max Diameter: ${maxDiameter}(ft)</h3><h3>Distance: ${distance}(miles)<h3>`;
                $('body').append(asteroid);
            };
        }) // End $.post
            
        //console.log(nasaApiObj);
    }); // End click event
    

}); // End document.ready.