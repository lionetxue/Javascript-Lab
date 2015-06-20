/**
 * Created by lin on 6/20/15.
 */
var margin = {top: 50, right: 70, bottom: 30, left: 50},
    width  = document.body.clientWidth - margin.left - margin.right,
    height = 700  - margin.top  - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width-50], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("cardinal")
    .x(function (d) { return x(d.label) + x.rangeBand() / 2; })
    .y(function (d) { return y(d.value); });

var color = d3.scale.ordinal()
    .range(["#b2e2e2","#66c2a4", "#2ca25f", "#006d2c",
     "#b3cde3","#8c96c6","#8856a7","#810f7c",
     "#bae4bc", "#7bccc4", "#43a2ca", "#0868ac",
     "#fdcc8a", "#fc8d59", "#e34a33", "#b30000",
     "#d7b5d8","#df65b0", "#dd1c77","#980043",
     "#fed98e", "#fe9929", "#d95f0e", "#993404" ]);

var svg = d3.select(".chart").append("svg")
    .attr("width",  width  + margin.left + margin.right)
    .attr("height", height + margin.top  + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("transpose_sightings_2015.csv", function (error, data) {

    var labelVar = 'Species';
    var varNames = d3.keys(data[0]).filter(function (key) { return key !== labelVar;});
    color.domain(varNames);

    var seriesData = varNames.map(function (name) {
        return {
            name: name,
            values: data.map(function (d) {
                return {name: name, label: d[labelVar], value: +d[name]};
            })
        };
    });

    // Generate Dynamic Dropdown List
    var select = d3.select("#menu")
        .append("select");
/*
    select
        .on("change", changeSpecies);
*/
    select.append("option")
        .attr("selected", "selected")
        .text("All");

    select.selectAll("option")
        .data(varNames.slice())
        .enter()
        .append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) { return d; });

    //

    x.domain(data.map(function (d) { return d.Species; }));
    y.domain([
        d3.min(seriesData, function (c) {
            return d3.min(c.values, function (d) { return d.value; });
        }),
        d3.max(seriesData, function (c) {
            return d3.max(c.values, function (d) { return d.value; });
        })
    ]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .style("fill", "#fff")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .style("fill", "#fff")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("fill", "#fff")
        .text("Birds Counted");

    var series = svg.selectAll(".series")
        .data(seriesData)
        .enter().append("g")
        .attr("class", "series");

    series.append("path")
        .attr("class", "line")
        .attr("d", function (d) { return line(d.values); })
        .style("stroke", function (d) { return color(d.name); })
        .style("stroke-width", "4px")
        .style("fill", "none")

    series.selectAll(".point")
        .data(function (d) { return d.values; })
        .enter().append("circle")
        .attr("class", "point")
        .attr("cx", function (d) { return x(d.label) + x.rangeBand()/2; })
        .attr("cy", function (d) { return y(d.value); })
        .attr("r", "5px")
        .style("fill", function (d) { return color(d.name); })
        .style("stroke", "grey")
        .style("stroke-width", "2px")
        .on("mouseover", function (d) { showPopover.call(this, d); })
        .on("mouseout",  function (d) { removePopovers(); })

    var legend = svg.selectAll(".legend")
        .data(varNames.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(60," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 20)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", color)
        .style("stroke", "grey");

    legend.append("text")
        .attr("x", width - 25)
        .attr("y", 6)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("fill", "#fff")
        .text(function (d) { return d; });

    function removePopovers () {
        $('.popover').each(function() {
            $(this).remove();
        });
    }

    function showPopover (d) {
        $(this).popover({
            title: d.name,
            placement: 'auto top',
            container: 'body',
            trigger: 'manual',
            html : true,
            content: function() {
                return "Date: " + d.label +
                    "<br/>Counts: " + d3.format(",")(d.value ? d.value: d.y1 - d.y0); }
        });
        $(this).popover('show')
    }
});


// radio button change functions to show or off table
d3.selectAll("input").on("change", change);

var timeout = setTimeout(function() {
    d3.select("input[value=\"chart\"]").property("checked", true).each(change);
}, 2000);

function change() {
    clearTimeout(timeout);
    if (this.value === "table") transitionTable();
    else transitionChart();
}

function transitionTable() {
    d3.select(".table").style("visibility", "visible");
}

function transitionChart() {
    d3.select(".table").style("visibility", "hidden");
}