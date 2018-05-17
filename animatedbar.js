function showverBarChart()
{
//console.log("in function"+dataset);
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 100, left: 70},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;
// set the ranges
var x = d3.scaleBand()
.range([0, width])
.paddingInner(0.1);
var y = d3.scaleLinear()
.range([height, 0]);
var tooltip = d3.select("body").append("div").attr("class", "tooltip");
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#d3Chart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
"translate(" + margin.left + "," + margin.top + ")");
// format the data
dataset.forEach(function(d) {
d["2010YearEnd"] = +d["2010YearEnd"];
});
// Scale the range of the data in the domains
x.domain(dataset.map(function(d) { return d.Automaker; }));
y.domain([0, d3.max(dataset, function(d) { return d["2010YearEnd"]; })]);
// append the rectangles for the bar chart
svg.selectAll(".bar")
.data(dataset)
.enter().append("rect")
.attr("class", "bar")
.attr("x", function(d) { return x(d.Automaker); })
.attr("width", x.bandwidth())
.attr("y", function(d) { return y(d["2010YearEnd"]); })
.attr("height", function(d) { return height - y(d["2010YearEnd"]); })
.on("mouseover", function(d){
tooltip.style("left", d3.event.pageX - 50 + "px")
.style("top", d3.event.pageY - 50 + "px")
.style("display","inline-block")
.html("<b>"+(d.Automaker) + " : " + (d["2010YearEnd"])+"</b>");
})
.on("mouseout", function(d){ tooltip.style("display", "none");});
// add the x Axis
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.style("text-anchor", "end")
.attr("dx", "-.8em")
.attr("dy", "-.55em")
.attr("transform", "rotate(-90)" );
// add the y Axis
svg.append("g")
.call(d3.axisLeft(y));
svg.append("text")
.attr("transform",
"translate(" + (width/2) + " ," +
(height + margin.top + 70) + ")")
.style("text-anchor", "middle")
.text("Brand");
svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x",0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Sales");
} 
