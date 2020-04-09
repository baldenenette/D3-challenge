var svgWidth = 900;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 80, left: 100 };

var svgWidth = 900;
var svgHeight = 500;

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

// Load data from data.csv
d3.csv("./assets/data/data.csv").then(function (myData) {
  console.log(myData);
  myData.forEach(function (data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  // Create scale functions

  var xScale = d3
    .scaleLinear()
    .domain([8, d3.max(myData, (d) => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3
    .scaleLinear()
    .domain([4, d3.max(myData, (d) => d.healthcare)])
    .range([height, 0]);

  // Create Axes

  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yLinearScale);
  chartGroup.append("g").call(leftAxis);
  chartGroup
    .append("g")
    .attr("transform", "translate(0, " + height + ")")
    .call(bottomAxis);
  chartGroup
    .append("g")
    .append("text")
    .text("In Poverty")
    .attr("transform", `translate(${width / 2},${height + 36})`);
  chartGroup
    .append("g")
    .append("text")
    .text("Lacks Healthcare")
    .style("text-anchor", "middle")
    .attr("transform", `translate(-36,${height / 2}) rotate(-90)`);
  chartGroup
    .append("g")
    .selectAll("circle")
    .data(myData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.poverty))
    .attr("cy", (d) => yLinearScale(d.healthcare))
    .attr("r", 10)
    .attr("fill", "lightblue");
  chartGroup
    .append("g")
    .selectAll("text")
    .data(myData)
    .enter()
    .append("text")
    .text((d) => d.abbr)
    .attr("dx", (d) => xScale(d.poverty))
    .attr("dy", (d) => yLinearScale(d.healthcare) + 4)
    .style("text-anchor", "middle")
    .style("font-size", "11px")
    .attr("fill", "white");
});
