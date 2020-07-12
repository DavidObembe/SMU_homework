//assign the data from data.js

var tbody = d3.select("tbody");


//select button
var button = d3.select('#filter-btn');

//select the form
var form = d3.select('#form');

//create event handlers
button.on("click", runEnter);
form.on("submit", runEnter);

runEnter();

//complete the event handler function for the form
function runEnter() {
    //Prevent the page from refreshing
    if (d3.event) {
        d3.event.preventDefault();
    }


    //select the input element and get the raw html node
    var inputElement = d3.select("#datetime"); //the hashtag allows me to select by id

    // get the value property of the input element
    var inputValue = inputElement.property("value");

    var sub_data = data;

    if (inputValue !== "") {

        //Use the form input to filter the data by date
        var sub_data = data.filter(x => x.datetime === inputValue);

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