// @flow
import * as React from 'react';
import { reverse } from 'ramda';
import type { Tick } from '../types.flow';

type SpiderRingsProps = {
  ticks: Array<number>,
  scale: Tick,
  ringFills: [string]
};

export default function SpiderRings(props: SpiderRingsProps) {
  const { ticks, scale, ringFills } = props;
  const outerFirst = reverse(ticks);
  const total = outerFirst.length;
  let largest;
  return (
    <g>
      {outerFirst.map((tickValue, i) => {
        if (i === 0) {
          largest = scale(tickValue);
        }
        return (
          <circle
            key={ `${tickValue}` }
            stroke={ ringFills[i] }
            strokeWidth=".3"
            fill="transparent"
            r={ (largest / total) * (total - i) }
          />
        );
      })}
    </g>
  );
}

/**
 * 	for(var j=0; j<cfg.levels-1; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data(allAxis)
	   .enter()
	   .append("svg:line")
	   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
	   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
	   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
	   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
	   .attr("class", "line")
	   .style("stroke", "grey")
	   .style("stroke-opacity", "0.75")
	   .style("stroke-width", "0.3px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
	}
 */
