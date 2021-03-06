// Set SVG container dimensions
var svgWidth = 1000;
var svgHeight = 500;

// Prep for chart dimensions
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// Set chart dimensions
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create SVG wrapper
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append chart SVG group, shift position
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data
d3.csv("data.csv").then(function(stateData) {

    // Step 1: Parse Data/Cast as numbers
    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
      });
  
      // Step 2: Create scale functions
      var xLinearScale = d3.scaleLinear()
        .domain([25, d3.max(stateData, d => d.age)])
        .range([0, width]);
  
      var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.poverty)])
        .range([height, 0]);
  
      // Step 3: Create axis functions
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);
  
      // Step 4: Append Axes to the chart
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
  
      chartGroup.append("g")
        .call(leftAxis);
  
      // Step 5: Create Circles
      var circlesGroup = chartGroup.selectAll("circle")
      .data(stateData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.age))
      .attr("cy", d => yLinearScale(d.poverty))
      .attr("r", "15")
      .attr("fill", "pink")
      .attr("opacity", ".5");

        // Step 6: Create text labels
        var textGroup = chartGroup.selectAll("text")
        .data(stateData)
        .enter()
        .append("text")
        .text(function (d) {
            return d.abbr;
        })
        .attr("x", d => xLinearScale(d.age) - 10)
        .attr("y", d => yLinearScale(d.poverty) + 7)
        .attr("size", 20)
        .attr("color", "black");
  
      // Step 7: Create axes labels
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - 240)
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Poverty Rate");
  
      chartGroup.append("text")
        .attr("transform", `translate(${width / 2 - 50}, ${height + margin.top - 10})`)
        .attr("class", "axisText")
        .text("Median Age");
    }).catch(function(error) {
      console.log(error);
    });