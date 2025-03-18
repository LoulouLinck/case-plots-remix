// The 'Plot' component will display the individual plot details (title, size, price, location, description).

import React from "react";
import locationIcon from '../img/location_icon.png';
import sizeIcon from '../img/size_icon.png';
import descriptionIcon from '../img/description_icon.png';

// Interface for PlotProps
// - 'plot' object includes all plot details such as title, size, price, location, and description.
// - 'currency' specifies the current currency (USD or EUR).
// - 'conversionRate' used to calculate price in EUR when needed.
interface PlotProps {
  plot: {
    id: string;
    title: string;
    size: number;
    price: number; // Price in USD by default
    location: string;
    description: string;
  };
  currency: "USD" | "EUR"; // Currency in which the price is displayed
  conversionRate: number; // Conversion rate from USD to EUR
}

const Plot: React.FC<PlotProps> = ({ plot, currency, conversionRate }) => {
  // Calculate price based on the selected currency
  let displayPrice = plot.price;
  if (currency === "EUR") {
    displayPrice = plot.price * conversionRate; // Convert USD to EUR
  }

  return (
    // Applying the card styling logic for the plot component
    <div className="card mb-2">
      <h2 className="heading">
        {plot.title}
      </h2>

      <p className="icon-info-spacing">
       <img src={locationIcon} alt="Location Icon" className="card-icon-size" />
       {plot.location}
      </p>

      <p className="icon-info-spacing">
       <img src={sizeIcon} alt="Size Icon" className="card-icon-size" /> 
       {plot.size} m²
      </p>

      {/* Conditional rendering based on selected currency */}
      <p className="icon-info-spacing">
       <span className="mr-5">
         {currency === "USD" ? "$" : "€"}
       </span>
       <span>{displayPrice.toLocaleString()}</span>
      </p>

      <p className="icon-info-spacing">
       <img src={descriptionIcon} alt="Description Icon" className="card-icon-size" /> 
       {plot.description}
      </p>

    </div>
  );
};

export default Plot;