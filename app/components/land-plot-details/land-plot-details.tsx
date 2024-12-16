import React from "react";
import locationIcon from "../img/location_icon.png";
import sizeIcon from "../img/size_icon.png";
import descriptionIcon from "../img/description_icon.png";

interface PlotDetailsProps {
  plot: {
    id: string;
    title: string;
    size: number;
    price: number;
    location: string;
    description: string;
    projectType: string[]; // Additional data, like special project type
    owner: string; // Name of the owner
    contact: string; // Contact information
  };
  currency: "USD" | "EUR"; // Add currency prop
  conversionRate: number; // Add conversionRate prop
}

const PlotDetails: React.FC<PlotDetailsProps> = ({ plot, currency, conversionRate }) => {
  // Calculate the display price based on the selected currency
  let displayPrice = plot.price;
  if (currency === "EUR") {
    displayPrice = plot.price * conversionRate; // Convert to EUR
  }

  return (
    <div className="plot-details card bg-greenAccount-daylightCard text-greenAccount-daylightText dark:bg-greenAccount-darkCard dark:text-greenAccount-darkText rounded-lg shadow p-6 flex flex-col space-y-4">
      <h1 className="text-3xl font-bold">{plot.title}</h1>
  
      {/* Location with Icon */}
      {plot.location && (
        <p className="flex items-center">
          <img src={locationIcon} alt="Location Icon" className="w-5 h-5 mr-2" />
          {plot.location}
        </p>
      )}
  
      {/* Size with Icon */}
      {plot.size && (
        <p className="flex items-center">
          <img src={sizeIcon} alt="Size Icon" className="w-5 h-5 mr-2" />
          {plot.size} m²
        </p>
      )}
  
      {/* Conditional rendering based on selected currency */}
      <p className="font-sans text-greenAccount-daylightText dark:text-greenAccount-darkText">
        <span className="mr-5">
          {currency === "USD" ? "$" : "€"}
        </span>
        <span>{displayPrice.toLocaleString()}</span>
      </p>
  
      {/* Description with Icon */}
      {plot.description && (
        <p className="flex items-center mt-4">
          <img src={descriptionIcon} alt="Description Icon" className="w-5 h-5 mr-2" />
          {plot.description}
        </p>
      )}
  
      {/* Project Types */}
      {plot.projectType && plot.projectType.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">Project Type</h2>
          <ul className="list-disc list-inside">
            {plot.projectType.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </>
      )}
  
      {/* Owner */}
      <p>
        <strong>Owner:</strong>{" "}
        <a 
          href={`mailto:${plot.contact}`} 
          className="text-blue-500 hover:underline"
        >
          {plot.owner}
        </a>
      </p>
    </div>
  );
};

export default PlotDetails;
