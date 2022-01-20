const gender = [
    {id:"d1", value:.684, region:"Female"},
    {id:"d2", value:.272, region:"Male"},
    {id:"d3", value:.037, region:"Non-binary"},
    {id:"d4", value:.007, region:"Prefer Not to Say"},
];

const rep = [
    {id:"d1", value:.108, region:"Community"},
    {id:"d2", value:.014, region:"Tribal Nation"},
    {id:"d3", value:.878, region:"Sector/Org/Group"}
];

const income = [
    {id:"d1", value:.006, region:"< 10k"},
    {id:"d2", value:.010, region:"10k - 15k"},
    {id:"d3", value:.019, region:"15k - 25k"},
    {id:"d4", value:.019, region:"25k - 35k"},
    {id:"d5", value:.076, region:"35k - 50k"},
    {id:"d6", value:.140, region:"50k - 75k"},
    {id:"d7", value:.121, region:"75k - 100k"},
    {id:"d8", value:.191, region:"100k - 150k"},
    {id:"d9", value:.140, region:"150k - 200k"},
    {id:"d10", value:.153, region:"> 200k"},
    {id:"d11", value:.124, region:"Prefer not to say"}
];

const residence = [
    {id:"d1", value:.10, region:"Rural"},
    {id:"d2", value:.8, region:"Urban"},
    {id:"d3", value:.13, region:"Suburban"},
    {id:"d4", value:.16, region:"Indian Reservation"},
    {id:"d5", value:.14, region:"Other"}
];

const education = [
    {id:"d1", value:.005, region:"High school, no degree"},
    {id:"d2", value:.009, region:"High school degree"},
    {id:"d3", value:.047, region:"College no degree"},
    {id:"d4", value:.056, region:"Associate's degree"},
    {id:"d5", value:.281, region:"Bachelor's degree"},
    {id:"d6", value:.440, region:"Master's degree"},
    {id:"d7", value:.060, region:"Doctoral degree"},
    {id:"d8", value:.065, region:"Professional degree"},
    {id:"d9", value:.038, region:"Other / Prefer not to say"}
];


// const margins = {top: 20, bottom: 10, left: 30};
// const chart_width = 600 - margins.left;
// const chart_height = 400 - margins.top - margins.bottom;

// const x = d3.scaleLinear().range([0,chart_width]);
// const y = d3.scaleBand().rangeRound([chart_height,0]).padding(0.1);

// const chart_container = d3
//     .select("#svg_chart1")
//     .attr("width", chart_width + margins.left)
//     .attr("height", chart_height + margins.top + margins.bottom);

//     x.domain([0,1])
//     const format = d3.format('~%')

//     chart_container 
//         .append("g")
//         .call(d3.axisBottom(x).tickFormat(format));
    
//     let chart = chart_container
//         .append("g");

// function update(data) {

//     data.sort(function(a, b) {
//         return d3.ascending(a.value, b.value)
//       })

//     y.domain(data.map((d) => d.region))

//     let bars = chart
//         .selectAll(".bar")
//         .data(data, function(d) { return d.region; });
        
//     bars.exit()
//         .transition()
//         .duration(1000)
//         .attr("width", 0)
//         .remove();
    
//     bars.enter()
//         .append("rect")
//         .classed("bar", true)
//         .attr('height', y.bandwidth())
//         .attr('y', d => y(d.region))
//         .attr('x', 0)
//         .attr("transform", `translate(0, ${margins.top})`)
//         .transition()
//         .duration(1000)
//         .attr('width', d => x(d.value));

//     let labels = chart  
//         .selectAll(".label")
//         .data(data, function(d) { return d.region; });

//     labels.exit()
//         .remove();
    
//     labels.enter()
//         .append("text")
//         .classed("label", true)
//         .text(d => d.region)
//         .attr("x", d => x(d.value) + 10)
//         .attr("y", d => y(d.region) + y.bandwidth() / 2)
//         .attr("dominant-baseline", "central")
//         .attr("transform", `translate(0, ${margins.top})`);
//     };

//     update(data1);

const margins = {top: 20, bottom: 10, left: 10, right:10};
const chart_width = 600 - margins.left - margins.right;
const chart_height = 400 - margins.top - margins.bottom;

const chart_container = d3
    .select("#svg_chart1")
    .attr("width", chart_width + margins.left)
    .attr("height", chart_height + margins.top + margins.bottom);

const yScale = d3
                .scaleBand()
                .rangeRound([chart_height,0])
                .padding(0.1)
                .domain([chart_height + margins.top + margins.bottom]);

const format = d3.format('~%');

let xScale = d3
                .scaleLinear()
                .range([0,chart_width])
                .domain([0,1]);
let xAxis = chart_container
                .append("g")
                .attr("transform", `translate(${margins.left},0)`)
                .classed("xAxis_output", true)
                .call(d3.axisBottom(xScale).tickFormat(format));

// let yAxis = chart_container
//                 .append("g")
//                 .attr("yAxis_output", true)
//                 .call(d3.axisLeft(yScale));

let chart = chart_container
                .append("g")
                .classed("data_ouput", true);

function update(data) {
    
    // sort the data from least to greatest
    // this might seem counterintuitive, but they are plotted in reverse
    data.sort(function(a, b) {
        return d3.ascending(a.value, b.value)
      })
      
    yScale.domain(data.map((d) => d.region))
    xScale.domain([0, d3.max(data, (d) => d.value) + .1])

    xAxis.transition().duration(1000).call(d3.axisBottom(xScale).tickFormat(format))

    let bars = chart
        .selectAll(".bar")
        .data(data, function(d) { return d.region; });
        
    bars.exit()
        .transition()
        .duration(1000)
        .attr("width", 0)
        .remove();
    
    bars.enter()
        .append("rect")
        .classed("bar", true)
        .attr('height', yScale.bandwidth())
        .attr('y', d => yScale(d.region))
        .attr('x', 0)
        .attr("transform", `translate(${margins.left}, ${margins.top})`)
        .transition()
        .duration(1000)
        .attr('width', d => xScale(d.value));

    let labels = chart  
        .selectAll(".label")
        .data(data, function(d) { return d.region; });

    labels.exit()
        .remove();
    
    labels.enter()
        .append("text")
        .classed("label", true)
        .text(d => d.region)
        .attr("x", d => xScale(d.value) + 10)
        .attr("y", d => yScale(d.region) + yScale.bandwidth() / 2)
        .attr("dominant-baseline", "central")
        .attr("transform", `translate(${margins.left}, ${margins.top})`);
    };

update(gender);