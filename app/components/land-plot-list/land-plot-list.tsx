// The 'PlotsList' component handles the rendering of a collection of plots.
// Individual plot rendering is delegated to the Plot component.

import React from "react";
import Plot from "../land-plot/land-plot"; // Import Plot component
import { Plot as PlotType } from "~/data/plots"; // Ensure correct type is imported: from data stored in plots.ts

// Interface for Props: 
// - Defines what PlotsList component expects to receive.
// - Enforces type safety, requiring 'plots' prop to match structure defined in plots.ts.
interface PlotsListProps {
  plots: PlotType[]; // Define the expected prop type as an array of Plot objects.
}

// Define PlotsList component.
// Uses PlotsListProps interface to have it accept a 'plots' prop: an array of Plot objects.
const PlotsList: React.FC<PlotsListProps> = ({ plots }) => {
  return (
    // Wrapper div for list of plots.
    <div className="plots-list">
      {/*
        'map' method iterates over 'plots' array passed as a prop.
        For each 'plot' object in the array:
        - A 'Plot' component is rendered.
        - 'key' prop ensures efficient update and tracking of items in list.
        - 'plot' object passed to 'Plot' component as prop to render its details.
      */}
      {plots.map((plot) => (
        <Plot key={plot.id} plot={plot} />
      ))}
    </div>
  );
};

export default PlotsList;