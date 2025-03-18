import React from "react";
import { Plot as PlotType } from "~/data/plots"; // Ensure correct type is imported: from data stored in plots.ts
import locationIcon from "../img/location_icon.png";
import sizeIcon from "../img/size_icon.png";
import descriptionIcon from "../img/description_icon.png";

import mooreIllustration from "./img/moore_illustration.png";
import feldheckenIllustration from "./img/feldhecken_illustration.png";
import waelderIllustration from "./img/waelder-illustration.png";
import streuobstwiesenIllustration from "./img/streuobstwiesen_illusration.png";

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
  isOpen: boolean;
  onClose: () => void;
  plot: {
    id: string;
    title: string;
    size: number;
    price: number;
    location: string;
    description: string;
    projectType: PlotType["projectType"];
    owner: string;
    contact: string;
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

  let displayPrice = plot.price;
  if (currency === "EUR") {
    displayPrice = plot.price * conversionRate;
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      {/* Modal content */}
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Plot Details Content */}
        <div 
          className="p-6">
          {/* Title and Spacing Adjustment */}
          <h1 className="card-heading">{plot.title}</h1>
        </div>
          {/* Close button inside content */}
          <button
            className="X-button"
            onClick={onClose}
          >
            ✖
          </button>
          {/* Decorative line separator */}
          <hr className="decorative-line" />

        {/* Main content section */}
        <div className="column-layout">
          {/* Description with Icon */}
          {plot.description && (
            <p className="flex-center">
              <img src={descriptionIcon} alt="Description Icon" className="card-icon-size" />
              {plot.description}
            </p>
          )}

          {/* Location with Icon */}
          {plot.location && (
            <p className="flex-center">
              <img src={locationIcon} alt="Location Icon" className="card-icon-size" />
              {plot.location}
            </p>
          )}

          {/* Owner contact */}
          <p>
            <strong>Owner:</strong>{" "}
            <a href={`mailto:${plot.contact}`} className="mailto-link">
              {plot.owner}
            </a>
          </p>

          {/* Size, Price and Icons */}
          <div className="grid-details">
            {/* Size and Price Column */}
            <div className="column-layout">
              {/* Size with Icon */}
              {plot.size && (
                <p className="flex-center">
                  <img src={sizeIcon} alt="Size Icon" className="card-icon-size" />
                  {plot.size} m²
                </p>
              )}

              {/* Price with Symbols */}
              <p>
                <span className="mr-5">{currency === "USD" ? "$" : "€"}</span>
                <span>{displayPrice.toLocaleString()}</span>
              </p>
            </div>

            {/* Illustration Column */}
            <div className="flex-grow-center">
              <img
                src={projectTypeImages[plot.projectType]}
                alt={`${plot.projectType} Illustration`}
                className="w-41 h-41 object-contain"
              />
            </div>
          </div>
  
        </div>
      </div>
    </div>
  );
  
};

export default PlotDetails;
