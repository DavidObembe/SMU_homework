//assign the data from data.js

var tbody = d3.select("tbody");


//select buttons
var button = d3.select('#filter-btn');
var city_button = d3.select('#filter-btn-city');
var state_button = d3.select('#filter-btn-state');
var country_button = d3.select('#filter-btn-country');
var shape_button = d3.select('#filter-btn-shape');
var duration_button = d3.select('#filter-btn-duration');

//select the form
var form = d3.select('#form');
var city_form = d3.select('#city_form ');
var state_form = d3.select('#state_form');
var country_form = d3.select('#country_form');
var shape_form = d3.select('#shape_form');
var duration_form = d3.select('#duration_form');




//create event handlers
button.on("click", runEnter);
form.on("submit", runEnter);

city_button.on("click", runEnter);
city_form.on("submit", runEnter);

state_button.on("click", runEnter);
state_form.on("submit", runEnter);

country_button.on("click", runEnter);
country_form.on("submit", runEnter);

shape_button.on("click", runEnter);
shape_form.on("submit", runEnter);

duration_button.on("click", runEnter);
duration_form.on("submit", runEnter);


//function that runs code
runEnter();

//complete the event handler function for the form
function runEnter() {
    //Prevent the page from refreshing
    if (d3.event) {
        d3.event.preventDefault();
    }

    //select the input element and get the raw html node
    var inputElement = d3.select("#datetime"); //the hashtag allows me to select by id
    var inputElement_city = d3.select("#city");
    var inputElement_state = d3.select("#state");
    var inputElement_country = d3.select("#country");
    var inputElement_shape = d3.select("#shape");
    var inputElement_duration = d3.select("#duration");

    // get the value property of the input element
    var inputValue = inputElement.property("value");
    var inputValue_city = inputElement_city.property("value");
    var inputValue_state = inputElement_state.property("value");
    var inputValue_country = inputElement_country.property("value");
    var inputValue_shape = inputElement_shape.property("value");
    var inputValue_duration = inputElement_duration.property("value");

    var sub_data = data;


    //filter by date
    if (inputValue !== "") {

        //Use the form input to filter the data by date
        var sub_data = data.filter(x => x.datetime === inputValue);


    }

    //filter by city
    if (inputValue_city !== "") {

        //Use the form input to filter the data by date
        var sub_data = data.filter(x => x.city === inputValue_city);


    }

    //filter by state
    if (inputValue_state !== "") {

        //Use the form input to filter the data by date
        var sub_data = data.filter(x => x.state === inputValue_state);


    }

    //filter by country
    if (inputValue_country !== "") {

        //Use the form input to filter the data by date
        var sub_data = data.filter(x => x.country === inputValue_country);


    }
    //filter by shape
    if (inputValue_shape !== "") {

        //Use the form input to filter the data by date
        var sub_data = data.filter(x => x.shape === inputValue_shape);


    }
    //filter by duration
    if (inputValue_duration !== "") {

        //Use the form input to filter the data by date
        var sub_data = data.filter(x => x.durationMinutes === inputValue_duration);

        console.log(sub_data);
    }





    var table = d3.select("#ufo-table");
    table.select('tbody').html("");

    sub_data.forEach(function(thing) {
        console.log(thing);

        //new row
        let newRow = table.select("tbody").append('tr');

        Object.entries(thing).forEach(function([key, value]) {
            newRow.append('td').text(value);
        });

    });


}

$(document).ready(function() {
    $('#ufo-table').DataTable();
});