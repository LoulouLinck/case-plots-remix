// The 'PlotsList' component handles the rendering of a collection of plots.
// Individual plot rendering is delegated to the Plot component.

import React from "react";
import { Link } from "@remix-run/react"; // Import the Link component for navigation
import React, { useState } from "react";
import Plot from "../land-plot/land-plot"; // Import Plot component
import Modal from "../modal"; // Import Modal component for displaying plot details in a modal
import PlotDetails from "../land-plot-details/land-plot-details"; // Import PlotDetails component
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
  // State to track selected plot for the modal
  const [selectedPlot, setSelectedPlot] = useState<PlotType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal and set the selected plot
  const openModal = (plot: PlotType) => {
    setSelectedPlot(plot);
    setIsModalOpen(true);
  };

  // Close modal and clear the selected plot
  const closeModal = () => {
    setSelectedPlot(null);
    setIsModalOpen(false);
  };

  return (
    // Wrapper div for list of plots.
    <div className="plots-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/*
        'map' method iterates over 'plots' array passed as a prop.
        For each 'plot' object in the array:
        - A 'Plot' component is rendered.
        - 'key' prop ensures efficient update and tracking of items in list.
        - 'plot' object passed to 'Plot' component as prop to render its details.
      */}
      {plots.map((plot) => (
        <Link key={plot.id} to={`/plots/${plot.id}`}>
          <Plot plot={plot} />
        </Link>
      ))}
    <div>
      {/* Wrapper div for list of plots */}
      <div className="plots-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*
          'map' method iterates over 'plots' array passed as a prop.
          For each 'plot' object in the array:
          - A 'Plot' component is rendered.
          - 'key' prop ensures efficient update and tracking of items in list.
          - 'plot' object passed to 'Plot' component as prop to render its details.
        */}
        {plots.map((plot) => (
          <div key={plot.id} onClick={() => openModal(plot)}>
            <Plot plot={plot} />
          </div>
        ))}
      </div>

      {/* Modal for PlotDetails */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedPlot && <PlotDetails plot={selectedPlot} />}
      </Modal>
    </div>
  );
};

export default PlotsList;