var w = 1280,
h = 800;

var force = d3.layout.force()
.gravity(0)
.charge(0)
.size([w, h]);

var svg = d3.select("#chart").append("svg:svg")
.attr("width", w)
.attr("height", h);

svg.append("svg:rect")
.attr("width", w)
.attr("height", h);

force.on("tick", function() {
    svg.selectAll("circle")
    .attr("cx", function(d) {
        return d.x;
    })
    .attr("cy", function(d) {
        return d.y;
    });
});

svg.on("mousemove", function() {
    var point = d3.mouse(this),
    node = {
        x: point[0],
        y: point[1]
    };

    svg.append("svg:circle")
    .data([node])
    .attr("class", "node")
    .attr("cx", function(d) {
        return d.x;
    })
    .attr("cy", function(d) {
        return d.y;
    })
    .attr("r", 0.0001)
    .transition()
    .ease(Math.sqrt)
    .attr("r", 5)
    .transition()
    .delay(3000)
    .attr("r", 0.0001)
    .each("end", function() {
        force.nodes().shift();
    })
    .remove();

    force.nodes().push(node);
    force.start();
});
