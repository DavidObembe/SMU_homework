function makeResponsive() {

    //randomly set image
    let num = Math.floor(Math.random() * Math.floor(100));
    if (num > 50) {
        d3.select(".image").style("background-image", 'url("maxresdefault.jpg")');
    } else {
        d3.select(".image").style("background-image", 'url("motleyCrue.jpg")');
    }

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("scatter").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;


    var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper, append an SVG group that will hold our chart,
    // and shift the latter by left and top margins.
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Append an SVG group
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Initial Params
    var chosenXAxis = "poverty";

    // function used for updating x-scale var upon click on axis label
    function xScale(data, chosenXAxis) {
        // create scales
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
                d3.max(data, d => d[chosenXAxis]) * 1.2
            ])
            .range([0, width]);

        return xLinearScale;

    }

    // function used for updating xAxis var upon click on axis label
    function renderAxes(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);

        xAxis.transition()
            .duration(1000)
            .call(bottomAxis);

        return xAxis;
    }

    // function used for updating circles group with a transition to
    // new circles
    function renderCircles(circlesGroup, newXScale, chosenXAxis) {

        circlesGroup.transition()
            .duration(1000)
            .attr("cx", d => newXScale(d[chosenXAxis]));

        return circlesGroup;
    }

    // function used for updating circles group with new tooltip
    function updateToolTip(chosenXAxis, circlesGroup) {

        var label;

        if (chosenXAxis === "poverty") {
            label = "In Poverty %";
        } else if (chosenXAxis === "age") {
            label = "Age (median)";
        } else if (chosenXAxis === "income") {
            label = "Household Income(Median)";
        }



        // Step 6: Initialize tool tip
        // ==============================
        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            // .offset([80, -60])
            .html(function(d) {
                return (`<strong>${d.state}<strong><hr>${label} ${d[chosenXAxis]} & Healthcare: ${d.healthcare}`);
            });





        circlesGroup.call(toolTip);

        circlesGroup.on("mouseover", function(d) {
            toolTip.show(d, this);
            toolTip.style("top", (d3.mouse(this)[1]) + 130 + "px")
                .style("left", (d3.mouse(this)[0]) + 70 + "px")

            // tooltip.style("left", d3.event.pageX + "px");
            // tooltip.style("top", d3.event.pageY + "px");

            d3.select(this)
                .transition()
                .duration(1000)
                .attr("fill", "pink")
                .attr("r", "35");
        }).on("mouseout", function(d) {
            toolTip.hide(d);

            d3.select(this)
                .transition()
                .duration(1000)
                .attr("fill", "purple")
                .attr("r", "15");
        });

        return circlesGroup;
    }

    // Retrieve data from the CSV file and execute everything below
    d3.csv("assets/data/data.csv").then(function(data, err) {
        if (err) throw err;

        // parse data
        data.forEach(function(d) {
            d.age = +d.age;
            d.ageMoe = +d.ageMoe;
            d.healthcare = +d.healthcare;
            d.healthcareHigh = +d.healthcareHigh;
            d.healthcareLow = +d.healthcareLow;
            d.id = +d.id;
            d.income = +d.income; ////////////////////
            d.incomeMoe = +d.incomeMoe;
            d.obesity = +d.obesity;
            d.obesityHigh = +d.obesityHigh;
            d.obesityLow = +d.obesityLow;
            d.poverty = +d.poverty;
            d.povertyMoe = +d.povertyMoe;
            smokes = +d.smokes;

        });


        // xLinearScale function above csv import
        var xLinearScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.poverty))
            .range([0, width]);



        // Create y scale function
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.healthcare)])
            .range([height, 0]);


        // Create initial axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // append x axis
        var xAxis = chartGroup.append("g")
            .classed("x-axis", true)
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        // append y axis
        chartGroup.append("g")
            .call(leftAxis);

        // append initial circles
        var circlesGroup = chartGroup.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", "20")
            .attr("fill", "purple")
            .attr("stroke-width", "2")
            .attr("stroke", "black")
            .attr("opacity", ".5");

        //fly in
        circlesGroup
            .transition()
            .duration(2000)
            .attr("cx", d => xLinearScale(d[chosenXAxis]))
            .attr("cy", d => yLinearScale(d.healthcare));

        // Create group for two x-axis labels
        var labelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);

        var povertylabel = labelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("class", "aText")
            .attr("value", "poverty") // value to grab for event listener
            .classed("active", true)
            .text("In Poverty(%)");

        var ageLabel = labelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 40)
            .attr("class", "aText")
            .attr("value", "age") // value to grab for event listener
            .classed("inactive", true)
            .text("Age (median)");

        var incomeLabel = labelsGroup.append('text')
            .attr("x", 0)
            .attr("y", 60)
            .attr("class", "aText")
            .attr("value", "income") // value to grab for event listener
            .classed("inactive", true)
            .text("Household income(median");


        // append y axis & create 3
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "aText")
            .text("Lack of Healthcare(%)");

        // updateToolTip function above csv import
        var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // x axis labels event listener
        labelsGroup.selectAll("text")
            .on("click", function() {
                // get value of selection
                var value = d3.select(this).attr("value");
                if (value !== chosenXAxis) {

                    // replaces chosenXAxis with value
                    chosenXAxis = value;

                    // console.log(chosenXAxis)

                    // functions here found above csv import
                    // updates x scale for new data
                    xLinearScale = xScale(data, chosenXAxis);

                    // updates x axis with transition
                    xAxis = renderAxes(xLinearScale, xAxis);

                    // updates circles with new x values
                    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

                    // updates tooltips with new info
                    circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

                    // changes classes to change bold text
                    if (chosenXAxis === "age") {
                        ageLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        povertylabel
                            .classed("active", false)
                            .classed("inactive", true);
                        incomeLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (chosenXAxis === "poverty") {
                        ageLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        povertylabel
                            .classed("active", true)
                            .classed("inactive", false);
                        incomeLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (chosenXAxis === "income") {
                        ageLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        povertylabel
                            .classed("active", false)
                            .classed("inactive", true);
                        incomeLabel
                            .classed("active", true)
                            .classed("inactive", false);
                    }

                }
            });
    }).catch(function(error) {
        console.log(error);
    });
}


// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);