function makeResponsive() {


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
    var chosenYAxis = "healthcare";

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
    //function used for updating y-scale var upon click on axis label
    function yScale(data, chosenYAxis) {
        // create scales
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[chosenYAxis])])
            .range([height, 0]);

        return yLinearScale;

    }

    // function used for updating xAxis var upon click on axis label
    function renderXAxes(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);

        xAxis.transition()
            .duration(1000)
            .call(bottomAxis);

        return xAxis;
    }

    // function used for updating yAxis var upon click on axis label
    function renderYAxes(newYScale, yAxis) {
        var leftAxis = d3.axisLeft(newYScale);

        yAxis.transition()
            .duration(1000)
            .call(leftAxis);

        return yAxis;
    }


    // function used for updating circles group with a transition to
    // new circles
    function renderXCircles(circlesGroup, newXScale, chosenXAxis, ) {

        circlesGroup.transition()
            .duration(1000)
            .attr("cx", d => newXScale(d[chosenXAxis]))


        return circlesGroup;
    }

    function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

        circlesGroup.transition()
            .duration(1000)
            .attr("cy", d => newYScale(d[chosenYAxis]));

        return circlesGroup;
    }

    // new functions for rendering text
    function renderXText(textGroup, newXScale, chosenXAxis) {

        textGroup.transition()
            .duration(1000)
            .attr("dx", d => newXScale(d[chosenXAxis]))

        return textGroup;
    }

    function renderYText(textGroup, newYScale, chosenYAxis) {

        textGroup.transition()
            .duration(1000)
            .attr("dy", d => newYScale(d[chosenYAxis]));

        return textGroup;
    }


    // function used for updating circles group with new tooltip
    function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

        var xlabel;

        if (chosenXAxis === "poverty") {
            label = "In Poverty %";
        } else if (chosenXAxis === "age") {
            label = "Age (median)";
        } else if (chosenXAxis === "income") {
            label = "Household Income(Median)";
        }

        var ylabel;
        if (chosenYAxis === "healthcare") {
            label = "Lack of Healthcare (%)";
        } else if (chosenYAxis === "smokes") {
            label = "Smokes (%)";
        } else if (chosenYAxis === "obesity") {
            label = "Obese (%)";
        }

        // Step 6: Initialize tool tip
        // ==============================
        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            // .offset([80, -60])
            .html(function(d) {
                return (`<strong>${d.state}<strong><hr>${xlabel} ${d[chosenXAxis]} & ${ylabel}: ${d[chosenYAxis]}`);
            });


        circlesGroup.call(toolTip);

        circlesGroup.on("mouseover", function(d) {
            toolTip.show(d, this);
            toolTip.style("top", (d3.mouse(this)[1]) + 130 + "px")
                .style("left", (d3.mouse(this)[0]) + 70 + "px")

            d3.select(this)
                .attr("cursor", "default");


            d3.select(this)
                .transition()
                .duration(1000)
                .attr("fill", "purple")
                .attr("r", "35");
        })

        //on mouseout event
        .on("mouseout", function(d) {
            toolTip.hide(d);

            d3.select(this)
                .transition()
                .duration(1000)
                .attr("fill", "black")
                .attr("r", "20");
        });

        return circlesGroup;
    }
    //function used for updating text group with new tooltip
    function updateToolTipForText(chosenXAxis, chosenYAxis, textGroup) {

        var xlabel;
        if (chosenXAxis === "poverty") {
            xlabel = "In Poverty %";
        } else if (chosenXAxis === "age") {
            xlabel = "Age (Median)";
        } else {
            xlabel = "Household Income (Median)";
        }

        var ylabel;
        if (chosenYAxis === "healthcare") {
            ylabel = "Lacks Healthcare %";
        } else if (chosenYAxis === "obesity") {
            ylabel = "Obesity %";
        } else {
            ylabel = "Smokes %";
        }

        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            // .offset([80, -60])
            .html(function(d) {
                return (`<strong>${d.state}</strong><hr> ${xlabel}: ${d[chosenXAxis]} & ${ylabel}: ${d[chosenYAxis]}`);


            });

        textGroup.call(toolTip);

        textGroup.on("mouseover", function(data) {
                toolTip.show(data, this);
                toolTip.style("top", (d3.mouse(this)[1]) + 170 + "px")
                    .style("left", (d3.mouse(this)[0]) + 170 + "px")

                d3.select(this)
                    .attr("cursor", "default");

                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("fill", "black")
                    .attr("font-size", "24px");
            })
            // on mouseout event
            .on("mouseout", function(data, index) {
                toolTip.hide(data);

                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("fill", "#fff")
                    .attr("font-size", "12px");
            });

        return textGroup;
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
            d.income = +d.income;
            d.incomeMoe = +d.incomeMoe;
            d.obesity = +d.obesity;
            d.obesityHigh = +d.obesityHigh;
            d.obesityLow = +d.obesityLow;
            d.poverty = +d.poverty;
            d.povertyMoe = +d.povertyMoe;
            d.smokes = +d.smokes;

        });


        // xLinearScale function above csv import
        // var xLinearScale = d3.scaleLinear()
        //     .domain(d3.extent(data, d => d.poverty))
        //     .range([0, width]);
        var xLinearScale = xScale(data, chosenXAxis);



        // Create y scale function
        // var yLinearScale = d3.scaleLinear()
        //     .domain([0, d3.max(data, d => d.healthcare)])
        //     .range([height, 0]);
        var yLinearScale = yScale(data, chosenYAxis);


        // Create initial axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // append x axis
        var xAxis = chartGroup.append("g")
            .classed("x-axis", true)
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        // append y axis
        var yAxis = chartGroup.append("g")
            .call(leftAxis);


        // append initial circles
        var overallPoints = chartGroup.selectAll("circle")
            .data(data)
            .enter();

        var circlesGroup = overallPoints
            .append("circle")
            .attr("r", "20")
            // .attr("class", "stateCircle");
            .attr("fill", "black")
            .attr("stroke-width", "2")
            .attr("stroke", "#e3e3e3")
            .attr("opacity", ".8");


        //fly in
        circlesGroup
            .transition()
            .duration(2000)
            .attr("cx", d => xLinearScale(d[chosenXAxis]))
            .attr("cy", d => yLinearScale(d[chosenYAxis]));


        // now draw text in each of our point containers
        var textGroup = overallPoints
            .append("text")
            // We return the abbreviation to .text, which makes the text the abbreviation.
            .text(function(d) {
                return d.abbr;
            })
            // Now place the text using our scale.
            .attr("dx", function(d) {
                return xLinearScale(d[chosenXAxis]);
            })
            .attr("dy", function(d) {
                return yLinearScale(d[chosenYAxis])
            })
            .attr("font-size", "12px")
            .attr("fill", "#fff")
            .attr("class", "stateText");


        // Create group for three x-axis labels
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



        // create and append 3 y axis 
        var ylabelsGroup = chartGroup.append("g")
            .attr("transform", "rotate(-90)");

        var healthcareLabel = ylabelsGroup.append('text')
            .attr("y", 20 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "healthcare")
            .attr("class", "aText")
            .classed("active", true)
            .text("Lack of Healthcare(%)");

        var smokesLabel = ylabelsGroup.append('text')
            .attr("y", 40 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "smokes")
            .attr("class", "aText")
            .classed("inactive", true)
            .text("Smokes (%)");

        var obesityLabel = ylabelsGroup.append("text")
            .attr("y", 60 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "obesity") // value to grab for event listener
            .attr("class", "aText")
            .classed("inactive", true)
            .text("Obesity %");



        // updateToolTip function above csv import
        var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
        textGroup = updateToolTipForText(chosenXAxis, chosenYAxis, textGroup);

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
                    xAxis = renderXAxes(xLinearScale, xAxis);

                    // updates circles with new x values
                    circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);

                    //update circle text
                    textGroup = renderXText(textGroup, xLinearScale, chosenXAxis);


                    // updates tooltips with new info
                    circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
                    textGroup = updateToolTipForText(chosenXAxis, chosenYAxis, textGroup);

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

        // y axis labels event listener
        ylabelsGroup.selectAll("text")
            .on("click", function() {
                // get value of selection
                var value = d3.select(this).attr("value");
                if (value !== chosenYAxis) {

                    // replaces chosenyAxis with value
                    chosenYAxis = value;

                    // console.log(chosenXAxis)

                    // functions here found above csv import
                    // updates Y scale for new data
                    yLinearScale = yScale(data, chosenYAxis);

                    // updates Y axis with transition
                    yAxis = renderYAxes(yLinearScale, yAxis);

                    // updates circles with new y values
                    circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

                    //update circle text
                    textGroup = renderYText(textGroup, yLinearScale, chosenYAxis);


                    // updates tooltips with new info
                    circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
                    textGroup = updateToolTipForText(chosenXAxis, chosenYAxis, textGroup);


                    // changes classes to change bold text
                    if (chosenYAxis === "healthcare") {
                        healthcareLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        obesityLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        smokesLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (chosenYAxis === "obesity") {
                        healthcareLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        obesityLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        smokesLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else {
                        healthcareLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        obesityLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        smokesLabel
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