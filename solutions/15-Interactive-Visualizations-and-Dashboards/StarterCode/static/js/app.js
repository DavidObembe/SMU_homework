d3.json("samples.json").then(function(data) {




    //check to see if data is loaded   
    console.log(data);

    // get metadata
    let metaData = data['metadata'];

    let sampleData = data['samples'];

    let subjectIDno = data.metadata.map(dataPoint => dataPoint.id)
    console.log(data.names)
    console.log(subjectIDno);

    //initialise page with a default plot - I used unfiltered sampledata values for this
    function init() {
        plotting_data = [{
            type: 'bar',
            x: sampleData[0].sample_values,
            y: sampleData[0].otu_ids,
            orientation: 'h'
        }];

        layout = {
            hovermode: 'closest',
            title: 'OTU Bars'
        };

        Plotly.newPlot("bar", plotting_data, layout);
    }

    //create dropdown
    var select = document.getElementById("selDataset");

    for (var i = 0; i < subjectIDno.length; i++) {
        var option = document.createElement("option"),
            txt = document.createTextNode(subjectIDno[i]);
        option.appendChild(txt);
        select.insertBefore(option, select.lastChild);
    }

    //call updated plot
    d3.selectAll("#selDataset").on("change", updatePlotly);

    //function to filter based on dropdown menu
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var selectedOption = dropdownMenu.property("value");


        //filtered function
        function isdropdown(val) {
            return val.id === selectedOption
                //return sampleData[0].otu_ids === val;
        }


        //filtered my otu_ids based on the dropdown and called it the variable "filter"
        var filtered = sampleData.filter((val) => isdropdown(val));

        //collected the itu_ids and the sample values from the "filter" and put them in an array
        var graphDataY = filtered.map(item => item.otu_ids);
        var graphDataX = filtered.map(item => item.sample_values);

        //check to see if I am correct 
        console.log(graphDataY);
        console.log(graphDataX);

        //I zip graphDataY and graphDataX
        var zippedData = graphDataX.map(function(e, i) {
            return [e, graphDataY[i]];
        });


        //sort zip
        //array [0] is the sample_values and i am sorting in descending order of sample values
        var sorted_zip = zippedData.sort((a, b) => (b[0] - a[0]));
        //check
        console.log(sorted_zip);

        //slice data to get top 10
        var x = sorted_zip.map(x => x[0].slice(0, 10));

        var y = sorted_zip[0][1].map(x => "OTU " + x).slice(0, 10);
        //var y = sorted_zip[1].slice(0, 9);
        console.log(x);
        console.log(y);



        //replot the bar graph
        // Plotly.restyle("bar", "x", [x]);
        // Plotly.restyle("bar", "y", [y]);

        // function adjustValue1() {
        //     Plotly.restyle('bar', 'x', [
        //         [x]
        //     ]);
        //     Plotly.restyle('bar', 'y', [
        //         [y]
        //     ]);
        // }

        // adjustValue1()

        ///////////////////////////////////////////////////////////////////////////
        function adjustValue1() {
            var traces = [{
                type: 'bar',
                x: x,
                y: y,
                orientation: 'h'
            }];

            var layout = {
                hovermode: 'closest',
                title: 'OTU Ids to Values'
            };

            Plotly.newPlot('bar', traces, layout);
        }
        adjustValue1();
    }

    init();









});