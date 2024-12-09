// The 'Plot' component will display the individual plot details (title, size, price, location, description).

import React from "react";

interface PlotProps {
  plot: {
    id: string;
    title: string;
    size: number;
    price: number;
    location: string;
    description: string;
  };
}

const Plot: React.FC<PlotProps> = ({ plot }) => {
  return (
    <div className="plot-card">
      <h2>{plot.title}</h2>
      <p><strong>Location:</strong> {plot.location}</p>
      <p><strong>Size:</strong> {plot.size} m²</p>
      <p><strong>Price:</strong> ${plot.price.toLocaleString()}</p>
      <p><strong>Description:</strong> {plot.description}</p>
    </div>
  );
};

export default Plot;
