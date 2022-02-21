// Set SVG container dimensions
var svgWidth = screen.availwidth;
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

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);