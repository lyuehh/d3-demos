
// 宽，高
var w = 500;
var h = 500;
var color = d3.scale.category20();
var color2 = d3.scale.category20b();
var color3 = d3.scale.category20c();

// svg
var svg = d3.select('#container')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// 最外面的大圆
var c = svg.append('circle')
  .attr('cx', w/2)
  .attr('cy', w/2)
  .attr('r', w/2)
  // .attr('fill', color(0));
  .attr('fill', 'transparent');

// pie, 为了4等分圆
var pie = d3.layout.pie();
var or = 250;
var ir = 0;

var arc = d3.svg.arc()
    .innerRadius(ir)
    .outerRadius(or);

var dataset = _.chain(_.range(0,4)).map(function() {return 100/4;}).value();
var arcs = svg.selectAll('g.arc')
    .data(pie(dataset))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform', 'translate('+ or +','+ or +'),rotate(45,0,0)');

arcs.append('path')
    .attr('fill', function(d, i) {
        return 'transparent';
        // return color2(i);
    })
    .attr('d', arc);

arcs.append('circle')
    .attr('cx', function(d, i) {
        return arc.centroid(d)[0];
    })
    .attr('cy', function(d, i) {
        return arc.centroid(d)[1];

    })
    .attr('r', 85)
    .attr('fill', function(d, i) {
        return color3(i);
    });

svg.append('circle')
    .attr('cx', function(d, i) {
        return 250;
    })
    .attr('cy', function(d, i) {
        return 250;

    })
    .attr('r', 85)
    .attr('fill', function(d, i) {
        // return 'transparent';
        return color3('a');
    });


