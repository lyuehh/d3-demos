// 宽，高
var w = 500;
var h = 500;

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
  .attr('fill', 'yellow');

// 饼图

// outerRadius, innerRadius
var or = 500;
var ir = 0;

// 颜色集合
var color = d3.scale.category20();
var color1 = d3.scale.category20b();
var color2 = d3.scale.category20c();

// 饼图布局
var pie = d3.layout.pie();

// path
var arc = d3.svg.arc()
    .innerRadius(ir)
    .outerRadius(or);

var dataset = _.chain(_.range(0,4)).map(function() {return 100/4;}).value();
var arcs = svg.selectAll('g.arc')
    .data(pie(dataset))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform', 'translate(' + or/2 + ',' + or/2 + ')');

// path
arcs.append('path')
    .attr('fill', function(d, i) {
        return 'transparent';
    })
    .attr('d', arc);

// 蒙版
arcs.append('clipPath')
    .attr('id', 'chart-area')
    .append('circle')
    .attr('x', w/2)
    .attr('y', w/2)
    .attr('r', w/2);

// circle
var c1 = arcs.append('circle')
    .attr('clip-path', 'url(#chart-area)')
    .attr('cx', function(d, i) {
        return arc.centroid(d)[0] + arc.centroid(d)[0]/3;
    })
    .attr('cy', function(d, i) {
        return arc.centroid(d)[1] + arc.centroid(d)[1]/3;
    })
    .attr('r', 235)
    .attr('fill', function(d, i) {
        return color1(i);
    });

arcs.append('circle')
    .attr('cx', function(d, i) {
        return arc.centroid(d)[0] - arc.centroid(d)[0]/3.5;
    })
    .attr('cy', function(d, i) {
        return arc.centroid(d)[1] - arc.centroid(d)[1]/3.5;
    })
    .attr('r', 60)
    .attr('fill', function(d, i) {
        return color2(i);
    });
