// The 'PlotsList' component will iterate over the array of plots and render each 'Plot' component.

import React from "react";
import { plots } from "../../data/plots"; // from data stored in plots.ts
import Plot from "../land-plot/land-plot"; // import the 'Plot' component

const PlotsList: React.FC = () => {
  return (
    <div className="plots-list">
      {plots.map((plot) => (
        <Plot key={plot.id} plot={plot} />
      ))}
    </div>
  );
};

export default PlotsList;
