import {
  select,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  drag,
} from "d3";

const fontColor = "white";
const colorNotVisited = "#606860";
const colorVisited = "#6b9080";

const lambdaIcon =
  "m208.45 227.89c-1.59 2.26-2.93 4.12-4.22 6q-30.86 45.42-61.7 90.83-28.69 42.24-57.44 84.43a3.88 3.88 0 0 1 -2.73 1.59q-40.59-.35-81.16-.88c-.3 0-.61-.09-1.2-.18a14.44 14.44 0 0 1 .76-1.65q28.31-43.89 56.62-87.76 25.11-38.88 50.25-77.74 27.86-43.18 55.69-86.42c2.74-4.25 5.59-8.42 8.19-12.75a5.26 5.26 0 0 0 .56-3.83c-5-15.94-10.1-31.84-15.19-47.74-2.18-6.81-4.46-13.58-6.5-20.43-.66-2.2-1.75-2.87-4-2.86-17 .07-33.9.05-50.85.05-3.22 0-3.23 0-3.23-3.18 0-20.84 0-41.68-.06-62.52 0-2.32.76-2.84 2.94-2.84q51.19.09 102.4 0a3.29 3.29 0 0 1 3.6 2.43q27 67.91 54 135.77 31.5 79.14 63 158.3c6.52 16.38 13.09 32.75 19.54 49.17.77 2 1.57 2.38 3.59 1.76 17.89-5.53 35.82-10.91 53.7-16.45 2.25-.7 3.07-.23 3.77 2 6.1 19.17 12.32 38.3 18.5 57.45.21.66.37 1.33.62 2.25-1.28.47-2.48 1-3.71 1.34q-61 19.33-121.93 38.68c-1.94.61-2.52-.05-3.17-1.68q-18.61-47.16-37.31-94.28-18.29-46.14-36.6-92.28c-1.83-4.62-3.63-9.26-5.46-13.88-.29-.79-.69-1.48-1.27-2.7z";
const databaseIcon =
  "M18.067 1.609c-0.497-0.326-1.193-0.615-2.069-0.858-1.742-0.484-4.050-0.75-6.498-0.75s-4.756 0.267-6.498 0.75c-0.877 0.243-1.573 0.532-2.069 0.858-0.619 0.407-0.933 0.874-0.933 1.391v12c0 0.517 0.314 0.985 0.933 1.391 0.497 0.326 1.193 0.615 2.069 0.858 1.742 0.484 4.050 0.75 6.498 0.75s4.756-0.267 6.498-0.751c0.877-0.243 1.573-0.532 2.069-0.858 0.619-0.406 0.933-0.874 0.933-1.391v-12c0-0.517-0.314-0.985-0.933-1.391zM3.27 1.714c1.658-0.46 3.87-0.714 6.23-0.714s4.573 0.254 6.23 0.714c1.795 0.499 2.27 1.059 2.27 1.286s-0.474 0.787-2.27 1.286c-1.658 0.46-3.87 0.714-6.23 0.714s-4.573-0.254-6.23-0.714c-1.795-0.499-2.27-1.059-2.27-1.286s0.474-0.787 2.27-1.286zM15.73 16.286c-1.658 0.46-3.87 0.714-6.23 0.714s-4.573-0.254-6.23-0.714c-1.795-0.499-2.27-1.059-2.27-1.286v-2.566c0.492 0.309 1.164 0.583 2.002 0.816 1.742 0.484 4.050 0.75 6.498 0.75s4.756-0.267 6.498-0.751c0.838-0.233 1.511-0.507 2.002-0.816v2.566c0 0.227-0.474 0.787-2.27 1.286zM15.73 12.286c-1.658 0.46-3.87 0.714-6.23 0.714s-4.573-0.254-6.23-0.714c-1.795-0.499-2.27-1.059-2.27-1.286v-2.566c0.492 0.309 1.164 0.583 2.002 0.816 1.742 0.484 4.050 0.75 6.498 0.75s4.756-0.267 6.498-0.75c0.838-0.233 1.511-0.507 2.002-0.816v2.566c0 0.227-0.474 0.787-2.27 1.286zM15.73 8.286c-1.658 0.46-3.87 0.714-6.23 0.714s-4.573-0.254-6.23-0.714c-1.795-0.499-2.27-1.059-2.27-1.286v-2.566c0.492 0.309 1.164 0.583 2.002 0.816 1.742 0.484 4.050 0.75 6.498 0.75s4.756-0.267 6.498-0.75c0.838-0.233 1.511-0.507 2.002-0.816v2.566c0 0.227-0.474 0.787-2.27 1.286z";

/**
 * Draws the given graph as D3 force graph.
 * @param {Object} graph - graph to be drawn.
 */
export function drawD3Graph(graph) {
  const width = 700;
  const height = 500;

  var svg = select("svg").attr("width", width).attr("height", height);

  // remove previous drawing of call graph
  svg.selectAll("*").remove();

  // specify arrow for not visited edges
  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "-0 -4 10 10")
    .attr("refX", "16")
    .attr("refY", "-1")
    .attr("orient", "auto")
    .attr("markerWidth", "10")
    .attr("markerHeight", "10")
    .append("svg:path")
    .attr("d", "M 0,-4 L 8 ,0 L 0, 4")
    .attr("fill", colorNotVisited)
    .style("stroke", "none");

  // specify arrow for visited edges
  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrowVisited")
    .attr("viewBox", "-0 -4 10 10")
    .attr("refX", "16")
    .attr("refY", "-1")
    .attr("orient", "auto")
    .attr("markerWidth", "10")
    .attr("markerHeight", "10")
    .append("svg:path")
    .attr("d", "M 0,-4 L 8 ,0 L 0, 4")
    .attr("fill", colorVisited)
    .style("stroke", "none");

  // apply force algorithm to graph nodes
  var simulation = forceSimulation(graph.nodes)
    .force(
      "link",
      forceLink(graph.links)
        .id(function (d) {
          return d.id;
        })
        .distance(150)
        .strength(2)
    )
    .force("charge", forceManyBody(-30))
    .force("center", forceCenter(width / 2, height / 2))
    .force("collide", forceCollide().radius(80))
    .on("tick", ticked);

  // define graph links
  var link = svg
    .append("g")
    .selectAll("path")
    .data(graph.links)
    .enter()
    .append("path")
    .attr("marker-end", function (d) {
      if (d.visited === true) return "url(#arrowVisited)";
      return "url(#arrow)";
    })
    .attr("stroke-width", "4")
    .attr("fill", "none")
    .attr("opacity", 0.8)
    .attr("stroke", function (d) {
      if (d.visited === true) return colorVisited;
      return colorNotVisited;
    });

  // define graph nodes
  var node = svg
    .append("g")
    .selectAll("g")
    .data(graph.nodes)
    .enter()
    .append("g")
    .attr("class", "button")
    .call(drag().on("start", dragStarted).on("drag", dragged));

  node
    .append("circle")
    .attr("r", 35)
    .attr("stroke", fontColor)
    .attr("stroke-width", "3")
    .attr("fill", function (d) {
      if (d.visited === true) return colorVisited;
      return colorNotVisited;
    });

  node
    .append("g")
    .attr("transform", function (d) {
      if (d.type === "lambdaFunction") return "translate(-19,-20)";
      if (d.type === "database") return "translate(-18,-17)";
    })
    .append("path")
    .attr("d", function (d) {
      if (d.type === "lambdaFunction") return lambdaIcon;
      if (d.type === "database") return databaseIcon;
    })
    .attr("fill", fontColor)
    .attr("transform", function (d) {
      if (d.type === "lambdaFunction") return "scale(0.095)";
      if (d.type === "database") return "scale(2)";
    });

  node
    .append("text")
    .text(function (d) {
      return d.name;
    })
    .attr("text-anchor", "middle")
    .attr("dy", "60")
    .attr("font-size", "smaller")
    .attr("fill", fontColor);

  // function called upon each simulation iteration
  function ticked() {
    link.attr("d", function (d) {
      // enabling curved edges (for displaying multiple edges between same nodes)
      const dr = 100 / (d.edgeNumber / 5);
      return (
        "M" +
        d.source.x +
        "," +
        d.source.y +
        "A" +
        dr +
        "," +
        dr +
        " 0 0,1 " +
        d.target.x +
        "," +
        d.target.y
      );
    });

    node.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  }

  // function for enabling dragging
  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  // function for enabling dragging
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
}
