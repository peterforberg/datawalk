// create 2 data_set
const data1 = [
   {group: "A", value: 4},
   {group: "B", value: 16},
   {group: "C", value: 8}
];

const data2 = [
   {group: "A", value: 7},
   {group: "B", value: 1},
   {group: "C", value: 20},
   {group: "D", value: 10}
];

// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#div_chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Initialize the Y axis
const y = d3.scaleBand()
  .rangeRound([ height, 0 ])
  .padding(0.2);
const yAxis = svg.append("g")
  .attr("transform", `translate(0,${width})`)

// Initialize the X axis
const x = d3.scaleLinear()
  .range([ 0, width]);
const xAxis = svg.append("g")
  .attr("class", "myXaxis")


// A function that create / update the plot for a given variable:
function update(data) {

  // Update the X axis
  y.domain(data.map(d => d.group))
  yAxis.call(d3.axisLeft(y))

  // Update the Y axis
  x.domain([0, d3.max(data, d => d.value) ]);
  xAxis.transition().duration(1000).call(d3.axisBottom(x));

  // Create the u variable
  var u = svg.selectAll("rect")
    .data(data)

  u
    .join("rect") // Add a new rect for each new elements
    .transition() 
    .duration(1000)
      .attr("y", d => y(d.group))
      .attr("x", d => x(d.value))
      .attr("width", y.bandwidth())
      .attr("height", d => height - x(d.value))
      .attr("fill", "#69b3a2")
}

// Initialize the plot with the first dataset
update(data1)