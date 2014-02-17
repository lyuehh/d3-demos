// based on: http://mbostock.github.io/d3/talk/20110921/patent-suits.html

var links = [
    {source: "王菲", target: "李亚鹏"},
    {source: "李亚鹏", target: "瞿颖"},
    {source: "王菲", target: "谢霆锋"},
    {source: "李亚鹏", target: "周迅"},
    {source: "谢霆锋", target: "周迅"},
    {source: "谢霆锋", target: "张柏芝"},
    {source: "周迅", target: "窦鹏"},
    {source: "窦鹏", target: "窦唯"},
    {source: "窦唯", target: "王菲"},
    {source: "周迅", target: "李大齐"},
    {source: "瞿颖", target: "张亚东"},
    {source: "张亚东", target: "窦颖"},
    {source: "窦颖", target: "窦唯"}
];

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
    link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var w = 1280,
h = 800;

var force = d3.layout.force()
.nodes(d3.values(nodes))
.links(links)
.size([w, h])
.linkDistance(80)
.charge(-500)
.on("tick", tick)
.start();

var svg = d3.select("#chart").append("svg:svg")
.attr("width", w)
.attr("height", h);

svg.append("svg:rect")
.attr("width", w)
.attr("height", h);

// Per-type markers, as they don't inherit styles.
svg.append("svg:defs").selectAll("marker")
.data(["suit", "licensing", "resolved"])
.enter().append("svg:marker")
.attr("id", String)
.attr("viewBox", "0 -5 10 10")
.attr("refX", 15)
.attr("refY", -1.5)
.attr("markerWidth", 6)
.attr("markerHeight", 6)
.attr("orient", "auto")
.append("svg:path")
.attr("d", "M0,-5L10,0L0,5");

var path = svg.append("svg:g").selectAll("path")
.data(force.links())
.enter().append("svg:path")
.attr("class", function(d) { return "link " + d.type; })
.attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

var circle = svg.append("svg:g").selectAll("circle")
.data(force.nodes())
.enter().append("svg:circle")
.attr("r", 8)
.call(force.drag);

var text = svg.append("svg:g").selectAll("g")
.data(force.nodes())
.enter().append("svg:g");

// A copy of the text with a thick white stroke for legibility.
text.append("svg:text")
.attr("x", 12)
.attr("y", ".31em")
.attr("class", "shadow")
.text(function(d) { return d.name; });

text.append("svg:text")
.attr("x", 12)
.attr("y", ".31em")
.text(function(d) { return d.name; });

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
    path.attr("d", function(d) {
        var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    });

    circle.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    text.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
}
