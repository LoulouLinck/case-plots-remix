
import React from "react";

interface PlotDetailsProps {
  plot: {
    id: string;
    title: string;
    size: number;
    price: number;
    location: string;
    description: string;
    project: string[]; // Additional data, like special project type
    owner: string; // Name of the owner
    contact: string; // Contact information
  };
}

const PlotDetails: React.FC<PlotDetailsProps> = ({ plot }) => {
  return (
    <div className="plot-details card bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold mb-4">{plot.title}</h1>
      <p><strong>Location:</strong> {plot.location}</p>
      <p><strong>Size:</strong> {plot.size} m²</p>
      <p><strong>Price:</strong> ${plot.price.toLocaleString()}</p>
      <p><strong>Owner:</strong> {plot.owner}</p>
      <p><strong>Contact:</strong> {plot.contact}</p>
      <h2 className="text-xl font-semibold mt-4">Project type:</h2>
      <ul className="list-disc list-inside">
        {plot.project.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <p className="mt-4"><strong>Description:</strong> {plot.description}</p>
    </div>
  );
};

export default PlotDetails;
