// 宽，高
var w = 500;
var h = 500;

// 颜色集合
var color = d3.scale.category20();
var color1 = d3.scale.category20b();
var color2 = d3.scale.category20c();

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
  .attr('fill', color2(0));

// 饼图

// outerRadius, innerRadius
var or = 500;
var ir = 0;


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
arcs.append('circle')
    .attr('clip-path', 'url(#chart-area)')
    .attr('cx', function(d, i) {
        return arc.centroid(d)[0];
    })
    .attr('cy', function(d, i) {
        return arc.centroid(d)[1];
    })
    .attr('r', 97)
    .attr('fill', function(d, i) {
        return color1(i);
    });

// rect
svg.append('rect')
    .attr('x', 200)
    .attr('y', 200)
    .attr('width', 100)
    .attr('height', 100)
    .attr('transform', "rotate(45, 250, 250)")
    .attr('fill', color1(89));
