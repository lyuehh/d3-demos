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

var p0;

svg.on("mousemove", function() {
    var p1 = d3.mouse(this),
    node = {
        x: p1[0],
        y: p1[1],
        px: (p0 || (p0 = p1))[0],
        py: p0[1]
    };

    p0 = p1;

    svg.append("svg:circle")
    .data([node])
    .attr("class", "node")
    .attr("cx", function(d) {
        return d.x;
    })
    .attr("cy", function(d) {
        return d.y;
    })
    .attr("r", 4.5)
    .transition()
    .ease(Math.sqrt)
    .delay(3000)
    .attr("r", 1e-6)
    .each("end", function() {
        force.nodes().shift();
    })
    .remove();

    force.nodes().push(node);
    force.start();
});
