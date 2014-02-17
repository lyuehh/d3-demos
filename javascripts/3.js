// 宽，高
var w = 500;
var h = 500;

var color = d3.scale.category20();

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
  .attr('fill', color(0));

var c2 = svg.append('circle')
    .attr('cx', w/2)
    .attr('cy', w/2)
    .attr('r', 150)
    .attr('fill', color(1));

// rect
svg.append('rect')
    .attr('x', 175)
    .attr('y', 175)
    .attr('width', 150)
    .attr('height', 150)
    .attr('transform', "rotate(45, 250, 250)")
    .attr('fill', color(4));

svg.append('circle')
    .attr('cx', 50)
    .attr('cy', 250)
    .attr('r', 50)
    .attr('fill', color(2));

svg.append('circle')
    .attr('cx', 450)
    .attr('cy', 250)
    .attr('r', 50)
    .attr('fill', color(2));

svg.append('circle')
    .attr('cx', 250)
    .attr('cy', 50)
    .attr('r', 50)
    .attr('fill', color(2));

svg.append('circle')
    .attr('cx', 250)
    .attr('cy', 450)
    .attr('r', 50)
    .attr('fill', color(2));
