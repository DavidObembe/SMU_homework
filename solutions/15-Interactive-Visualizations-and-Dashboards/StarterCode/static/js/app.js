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

        ////Bubble Chart Initialisation
        var trace2 = [{
            x: sampleData[0].otu_ids,
            y: sampleData[0].sample_values,
            mode: 'markers',
            text: sampleData[0].otu_ids,
            marker: {
                color: sampleData[0].otu_ids,
                colorscale: "Bluered",
                size: sampleData[0].sample_values
            }

        }];



        var layout2 = {
            title: 'Bubble Chart of Otu_ids vs sample_values',
            showlegend: false,
            height: 600,
            width: 900
        };

        Plotly.newPlot('bubble', trace2, layout2);

        ////Guage chart Initialisation
        var data = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: 0,
            title: { text: "Belly Button Washing Frequency Scrubs per week" },
            type: "indicator",
            mode: "gauge+number",
            // delta: { reference: 380 },
            gauge: {
                axis: { range: [null, 10] },
                steps: [
                    { range: [0, 250], color: "lightgray" },
                    { range: [250, 400], color: "gray" }
                ],
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: 490
                }
            }
        }];

        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);

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

        console.log(dropdownMenu);
        console.log(selectedOption);


        //filtered function
        function isdropdown(val) {
            return val.id == selectedOption
                //return sampleData[0].otu_ids === val;
        }

        console.log(isdropdown(selectedOption));
        //filtered my otu_ids based on the dropdown and called it the variable "filter"
        // var filtered = sampleData.filter((val) => selectedOption.id);
        var filtered = sampleData.filter(isdropdown);

        console.log(filtered);

        //collected the otu_ids and the sample values from the "filter" and put them in an array
        var graphDataY = filtered.map(item => item.otu_ids);
        var graphDataX = filtered.map(item => item.sample_values);
        var graphData_label = filtered.map(item => item.otu_labels);

        //check to see if I am correct 
        console.log(graphDataY);
        console.log(graphDataX);

        //I zip graphDataY and graphDataX
        var zippedData = graphDataX.map(function(e, i) {
            return [e, graphDataY[i], graphData_label[i]];
        });

        console.log(zippedData)
            //sort zip
            //array [0] is the sample_values and i am sorting in descending order of sample values
        var sorted_zip = zippedData.sort((a, b) => (b[0] - a[0]));
        //check
        console.log(sorted_zip);

        //slice data to get top 10
        var x = sorted_zip.map(x => x[0].slice(0, 10));

        var y = sorted_zip[0][1].map(x => "OTU " + x).slice(0, 10);

        var hovername = sorted_zip.map(x => x[2].slice(0, 10));
        //var y = sorted_zip[1].slice(0, 9);
        console.log(x[0]);
        console.log(y);
        console.log(hovername);

        var trace1 = [{
            x: x[0],
            y: y,
            orientation: 'h',
            type: 'bar',
            text: hovername[0]


        }];

        var layout = {
            title: 'OTU Ids to Values'
        };

        Plotly.newPlot('bar', trace1, layout);

        ////demographic info section

        // Use D3 to select the dropdown menu

        //Let me see if I can use Jquery to insert text
        var metaDataFilter = metaData.filter(isdropdown);

        console.log(metaDataFilter);

        $('#sample-metadata').empty(); //clear the meta data table thing

        // Object.entries(metaDataFilter).forEach(function([key, value]) {
        //     let info = `<p><b>${key.toUpperCase()}</b> : ${value} </p>`;
        //     $('#sample-metadata').append(info);
        // });


        Object.entries(metaDataFilter[0]).forEach(function([key, value]) {
            let info = `<p><b>${key.toUpperCase()}</b> : ${value} </p>`;
            $('#sample-metadata').append(info);
            console.log(info);
        });


        //final section:  Guage Chart
        function guageme(washNo) {
            var data = [{
                domain: { x: [0, 1], y: [0, 1] },
                value: washNo,
                title: { text: "Belly Button Washing Frequency Scrubs per week" },
                type: "indicator",
                mode: "gauge+number",

                gauge: {
                    axis: { range: [null, 10] },
                    steps: [
                        { range: [0, 250], color: "lightgray" },
                        { range: [250, 400], color: "gray" }
                    ],
                    threshold: {
                        line: { color: "red", width: 4 },
                        thickness: 0.75,
                        value: 490
                    }
                }
            }];

            var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
            Plotly.newPlot('gauge', data, layout);

        }

        var washingNo = metaDataFilter[0].wfreq

        guageme(washingNo)
        console.log(metaDataFilter[0].wfreq)

    }


    init();














});