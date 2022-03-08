/* eslint-disable react/no-this-in-sfc */
import React, { useRef, useEffect } from "react";
import { select, hierarchy, tree, linkVertical } from "d3";
import useResizeObserver from "../../util/useResizeObserver";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function TreeChart({ data, isDebugging }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const previouslyRenderedData = usePrevious(data);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

    const root = hierarchy(data);
    const treeLayout = tree().size([width + 100, height - 150]);
    treeLayout(root);

    const linkGenerator = linkVertical()
      .x((node) => node.x - 50)
      .y((node) => node.y + 75);

    // nodes
    svg
      .selectAll(".node")
      .data(root.descendants())
      .join((enter) => {
        return enter.append("circle").attr("opacity", 0);
      })
      .attr("class", "node")
      .attr("cx", (node) => node.x - 50)
      .attr("cy", (node) => node.y + 50)
      .attr("r", 25)
      .transition()
      .duration(500)
      .delay((node) => node.depth * 500)
      .attr("opacity", 0.5)
      .attr("fill", "green");

    // links
    const enteringAndUpdatingLinks = svg
      .selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("d", linkGenerator)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength();

        return `${length - 45} ${length}`;
      })
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("opacity", 1);

    if (data !== previouslyRenderedData) {
      enteringAndUpdatingLinks
        .attr("stroke-dashoffset", function () {
          return this.getTotalLength();
        })
        // .transition()
        // .duration(500)
        // .delay((link) => link.source.depth * 500)
        .attr("stroke-dashoffset", 0);
    }

    svg
      .selectAll(".label")
      .data(root.descendants())
      .join((enter) => enter.append("text").attr("opacity", 0))
      .attr("class", "label")
      .attr("x", (node) => node.x - 50)
      .attr("y", (node) => node.y + 55)
      .attr("text-anchor", "middle")
      .attr("font-size", 20)
      .attr("font-weight", "bold")
      .text((node) => node.data.name)
      .transition()
      .duration(500)
      .delay((node) => node.depth * 300)
      .attr("opacity", 1)
      .attr("fill", "black");

    if (isDebugging) {
      svg
        .selectAll(".loc-dep")
        .data(root.descendants())
        .join((enter) => enter.append("text").attr("opacity", 0))
        .attr("class", "loc-dep")
        .attr("x", (node) => node.x - 100)
        .attr("y", (node) => node.y + 45)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .text((node) => `LV: ${node.depth}`)
        .transition()
        .duration(500)
        .delay((node) => node.depth * 300)
        .attr("opacity", 1)
        .attr("fill", "black");

      svg
        .selectAll(".loc-index")
        .data(root.descendants())
        .join((enter) => enter.append("text").attr("opacity", 0))
        .attr("class", "loc-index")
        .attr("x", (node) => node.x - 103)
        .attr("y", (node) => node.y + 60)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .text((node) => `Index: ${node.data.index}`)
        .transition()
        .duration(500)
        .delay((node) => node.depth * 300)
        .attr("opacity", 1)
        .attr("fill", "black");
    }
  }, [data, dimensions, previouslyRenderedData]);

  return (
    <div ref={wrapperRef} style={{ height: "100%", width: "100%" }}>
      <svg ref={svgRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}

export default TreeChart;
