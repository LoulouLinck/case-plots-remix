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
    <div className="plot card font-sans bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg p-4">
      <h2 className="text-xl sm:text-2xl py-4 sm:py-6 font-sans font-semibold text-gray-900 dark:text-white">{plot.title}</h2>
      <p className="font-sans text-gray-700 dark:text-gray-400"><strong>Location:</strong> {plot.location}</p>
      <p className="font-sans text-gray-700 dark:text-gray-400"><strong>Size:</strong> {plot.size} m²</p>
      <p className="font-sans text-gray-700 dark:text-gray-400"><strong>Price:</strong> ${plot.price.toLocaleString()}</p>
      <p className="font-sans text-gray-500 dark:text-gray-400"><strong>Description:</strong> {plot.description}</p>
    </div>
  );
};

export default Plot;