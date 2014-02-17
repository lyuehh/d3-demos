  var w = 1280,
    h = 800,
    z = d3.scale.category20c();

  var force = d3.layout.force()
    .size([w, h]);

  var svg = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

  svg.append("svg:rect")
    .attr("width", w)
    .attr("height", h);

  d3.json("/javascripts/flare.json", function(root) {
    var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

    force
      .nodes(nodes)
      .links(links)
      .start();

    var link = svg.selectAll("line")
      .data(links)
      .enter().insert("svg:line")
      .style("stroke", "#999")
      .style("stroke-width", "1px");

    var node = svg.selectAll("circle.node")
      .data(nodes)
      .enter().append("svg:circle")
      .attr("r", 4.5)
      .style("fill", function(d) {
        return z(d.parent && d.parent.name);
      })
      .style("stroke", "#000")
      .call(force.drag);

    force.on("tick", function(e) {
      link.attr("x1", function(d) {
        return d.source.x;
      })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      node.attr("cx", function(d) {
        return d.x;
      })
        .attr("cy", function(d) {
          return d.y;
        });
    });
  });

  function flatten(root) {
    var nodes = [];

    function recurse(node, depth) {
      if (node.children) {
        node.children.forEach(function(child) {
          child.parent = node;
          recurse(child, depth + 1);
        });
      }
      node.depth = depth;
      nodes.push(node);
    }
    recurse(root, 1);
    return nodes;
  }

  function flatten2(root) {
    var nodes = [];
    function recur(node, depth) {
        if (node.children) {
            node.children.forEach(function(c) {
                c.parent = node;
                recur(c, depth + 1);
            });
        }
        node.depth = depth;
        node.push(node);
    }
    recur(root, 1);
    return nodes;
  }
