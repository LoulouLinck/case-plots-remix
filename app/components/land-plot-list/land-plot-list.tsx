// The 'PlotsList' component handles the rendering of a collection of plots.
// Individual plot rendering is delegated to the Plot component.

import React, { useState } from "react";
import Plot from "../land-plot/land-plot"; // Import Plot component
import PlotDetails from "../land-plot-details/land-plot-details"; // Import PlotDetails component
import { Plot as PlotType } from "~/data/plots"; // Ensure correct type is imported: from data stored in plots.ts

// Interface for Props: 
// - Defines what PlotsList component expects to receive.
// - Enforces type safety, requiring 'plots' prop to match structure defined in plots.ts.
// - Adds 'currency' and 'conversionRate' props to handle dynamic pricing display.
interface PlotsListProps {
  plots: PlotType[]; // Define the expected prop type as an array of Plot objects.
  currency: "USD" | "EUR"; // Current currency ("USD" or "EUR").
  conversionRate: number; // Conversion rate from USD to EUR.
}

// Define PlotsList component.
// Uses PlotsListProps interface to have it accept:
// - 'plots': an array of Plot objects.
// - 'currency': a string indicating the selected currency (default USD).
// - 'conversionRate': a number to calculate the price in EUR if selected.
const PlotsList: React.FC<PlotsListProps> = ({ plots, currency, conversionRate }) => {
  // State to track selected plot for the modal
  const [selectedPlot, setSelectedPlot] = useState<PlotType | null>(null);

  // Open modal and set the selected plot
  const openPlotDetails = (plot: PlotType) => {
    setSelectedPlot(plot);
  };

  // Close modal and clear the selected plot
  const closePlotDetails = () => {
    setSelectedPlot(null);
  };

  return (
    <div>
      {/* Wrapper div for list of plots */}
      <div className="plots-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*
          'map' method iterates over 'plots' array passed as a prop.
          For each 'plot' object in the array:
          - A 'Plot' component is rendered.
          - 'key' prop ensures efficient update and tracking of items in list.
          - 'plot' object passed to 'Plot' component as prop to render its details.
          - Currency and conversion rate are passed to Plot for dynamic pricing.
        */}
        {plots.map((plot) => (
          <div 
            key={plot.id} 
            onClick={() => openPlotDetails(plot)}
            className="card-container cursor-pointer transition-transform transform hover:scale-105 hover:shadow-inner"
          >
            <Plot 
              plot={plot} 
              currency={currency} 
              conversionRate={conversionRate} 
            />
          </div>
        ))}
      </div>

      {/* PlotDetails Modal */}
      {selectedPlot && (
        <PlotDetails
          isOpen={Boolean(selectedPlot)}
          onClose={closePlotDetails}
          plot={selectedPlot}
          currency={currency}
          conversionRate={conversionRate}
        />
      )}
    </div>
  );
};

export default PlotsList;

{/*
  ---------------------- Dynamic Routing Code Reference ----------------------
  The below section demonstrates an alternative approach using dynamic routing.
  Uncomment and adjust if dynamic routing is required instead of modals.

  <div className="plots-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {plots.map((plot) => (
      <div key={plot.id}>
        <Link to={`/plots/${plot.id}`}> 
          {/* Ensure this matches the dynamic route */}
//           <Plot plot={plot} />
//         </Link>
//       </div>
//     ))}
//   </div>
// */}
