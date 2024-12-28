import React from "react";
import { Plot as PlotType } from "~/data/plots"; // Ensure correct type is imported: from data stored in plots.ts
import locationIcon from "../img/location_icon.png";
import sizeIcon from "../img/size_icon.png";
import descriptionIcon from "../img/description_icon.png";

import mooreIllustration from "../img/moore_illustration.png";
import feldheckenIllustration from "../img/feldhecken_illustration.png";
import waelderIllustration from "../img/waelder-illustration.png";
import streuobstwiesenIllustration from "../img/streuobstwiesen_illusration.png";

const projectTypeImages: { [key in PlotType["projectType"]]: string } = {
  // Moore: "https://cdn.prod.website-files.com/65a509e09ca04e38935eece9/65aa677dc83cadddf5d1b408_Illustration_Oekosystem_Moor.webp", 
  // Feldhecken: "https://cdn.prod.website-files.com/65a509e09ca04e38935eece9/65aa66ea9abffedbe6dc02c0_Illustration_Oekosystem_Feldhecken.webp",
  // Wälder: "https://cdn.prod.website-files.com/65a509e09ca04e38935eece9/65af709e4f8346039794891f_Illustration_Oekosystem_Wald.webp",
  // Streuobstwiesen: "https://cdn.prod.website-files.com/65a509e09ca04e38935eece9/65aa677dafd04b69f1a90b00_Illustration_Oekosystem_Obstwiese.webp",
  Moore: mooreIllustration,
  Feldhecken: feldheckenIllustration,
  Wälder: waelderIllustration,
  Streuobstwiesen: streuobstwiesenIllustration,
};

interface PlotDetailsProps {
  isOpen: boolean; // Determines whether the modal is open or closed
  onClose: () => void; // Function to handle closing the modal
  plot: {
    id: string;
    title: string;
    size: number;
    price: number;
    location: string;
    description: string;
    projectType: PlotType["projectType"]; // Single project type value
    owner: string; // Name of the owner
    contact: string; // Contact information
  };
  currency: "USD" | "EUR"; // Add currency prop
  conversionRate: number; // Add conversionRate prop
}

const PlotDetails: React.FC<PlotDetailsProps> = ({ 
  isOpen,
  onClose,
  plot, 
  currency, 
  conversionRate 
}) => {
  // If the modal is not open, render nothing (return null)
  if (!isOpen) return null;

  // Calculate the display price based on the selected currency
  let displayPrice = plot.price;
  if (currency === "EUR") {
    displayPrice = plot.price * conversionRate; // Convert to EUR
  }

  return (
    <div
      className="fixed inset-0 bg-green-900 bg-opacity-30 dark:bg-darkGreen-800 dark:bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose} // Close modal on clicking the backdrop
    >
      {/* Modal content */}
      <div
        className="bg-greenAccount-beigeFeatures dark:bg-darkGreen-600 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Plot Details Content */}
        <div 
          className="p-6">
          {/* Title and Spacing Adjustment */}
          <h1 className="text-3xl font-bold">{plot.title}</h1>
        </div>

          {/* Close button inside content */}
          <button
            className="absolute top-3 right-3 text-greenAccount-lightGreenFeatures dark:text-darkGreen-100 hover:text-greenAccount-daylightText dark:hover:text-darkGreen-200"
            onClick={onClose}
            style={{ fontSize: "30px", lineHeight: "1" }}
          >
            ✖
          </button>

          <hr className="h-[1px] border-0 bg-gradient-to-r from-transparent via-greenAccount-daylightText opacity-20 to-transparent" />

          {/* className="w-[90%] mx-auto h-[1px] border-0 bg-gradient-to-r from-transparent via-greenAccount-daylightText to-transparent" */}

        {/* Control spacing here */}
        <div className="flex flex-col space-y-4 p-6">
    
          {/* Description with Icon */}
          {plot.description && (
            <p className="flex items-center">
              <img src={descriptionIcon} alt="Description Icon" className="w-5 h-5 mr-2" />
              {plot.description}
            </p>
          )}
    
          {/* Location with Icon */}
          {plot.location && (
            <p className="flex items-center">
              <img src={locationIcon} alt="Location Icon" className="w-5 h-5 mr-2" />
              {plot.location}
            </p>
          )}
          
          {/* Owner */}
          <p>
            <strong>Owner:</strong>{" "}
            <a href={`mailto:${plot.contact}`} className="text-blue-500 hover:underline">
              {plot.owner}
            </a>
          </p>
    
          {/* Size and Price with Icon */}
          <div className="grid grid-cols-[auto_1fr] gap-4">
            {/* Size and Price Column */}
            <div className="flex flex-col space-y-4">
              {/* Size with Icon */}
              {plot.size && (
                <p className="flex items-center">
                  <img src={sizeIcon} alt="Size Icon" className="w-5 h-5 mr-2" />
                  {plot.size} m²
                </p>
              )}

              {/* Price */}
              <p className="font-sans text-greenAccount-daylightText dark:text-greenAccount-darkText">
                <span className="mr-5">{currency === "USD" ? "$" : "€"}</span>
                <span>{displayPrice.toLocaleString()}</span>
              </p>
            </div>

            {/* Image Column */}
            <div className="flex items-center justify-center flex-grow">
              <img
                src={projectTypeImages[plot.projectType]}
                alt={`${plot.projectType} Illustration`}
                className="w-41 h-41 object-contain" // Increase width/height as needed
              />
            </div>
          </div>
  
        </div>
      </div>
    </div>
  );
  
  
};

export default PlotDetails;
