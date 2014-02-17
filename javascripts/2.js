// 宽，高
var w = 500;
var h = 500;

// svg
var svg = d3.select('#container')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// 最外面的大圆
var c = svg.append('circle');
c.attr('cx', 250)
  .attr('cy', 250)
  .attr('r', 250)
  .attr('fill', 'blue');

// 饼图

// outerRadius, innerRadius
var or = 250;
var ir = 0;

// 颜色集合
var color = d3.scale.category20();
var color1 = d3.scale.category20b();

// 饼图布局
var pie = d3.layout.pie();

// path
var arc = d3.svg.arc()
    .innerRadius(ir)
    .outerRadius(or);

var dataset = _.chain(_.range(0,8)).map(function() {return 100/8;}).value();
var arcs = svg.selectAll('g.arc')
    .data(pie(dataset))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform', 'translate(' + or + ',' + or + ')');

// path
arcs.append('path')
    .attr('fill', function(d, i) {
        return color(i);
    })
    .attr('d', arc);

// circle
arcs.append('circle')
    .attr('cx', function(d, i) {
        return arc.centroid(d)[0];
    })
    .attr('cy', function(d, i) {
        return arc.centroid(d)[1];
    })
    .attr('r', 25)
    .attr('fill', function(d, i) {
        return color1(i);
    })
    // .style('stroke', '#000')
    // .style('stroke-width', 1)
    .attr('transform', 'rotate(22.5,0,0)');
