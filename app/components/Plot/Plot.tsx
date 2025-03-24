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
  currency: "USD" | "EUR"; // Currency in display
  conversionRate: number; // Conversion rate USD to EUR
}

const Plot: React.FC<PlotProps> = ({ plot, currency, conversionRate }) => {
  // Calculate price based on the selected currency
  let displayPrice = plot.price;
  if (currency === "EUR") {
    displayPrice = plot.price * conversionRate; // Convert USD to EUR
  }

  return (
    <div className="bg-yellow-50/50 dark:bg-teal-900/60 rounded-lg shadow-sm p-4 hover:shadow-lg mb-2">
      <h2 className="text-xl sm:text-2xl py-4 sm:py-6 font-semibold">
        {plot.title}
      </h2>

      <p className="flex items-center mb-2">
        <img src={locationIcon} alt="Location Icon" className="w-5 h-5 mr-2" />
        {plot.location}
      </p>

      <p className="flex items-center mb-2">
        <img src={sizeIcon} alt="Size Icon" className="w-5 h-5 mr-2" />
        {plot.size} m²
      </p>

      {/* Conditional rendering based on selected currency */}
      <p className="flex items-center mb-2">
        <span className="mr-5">{currency === "USD" ? "$" : "€"}</span>
        <span>{displayPrice.toLocaleString()}</span>
      </p>

      <p className="flex items-center mb-2">
        <img src={descriptionIcon} alt="Description Icon" className="w-5 h-5 mr-2" />
        {plot.description}
      </p>
    </div>
  );
};

export default Plot;