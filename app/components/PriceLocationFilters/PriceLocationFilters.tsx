import React, { useState } from "react";

interface PriceLocationFiltersProps {
 searchParams: URLSearchParams;
 handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 allLocations: string[];
 handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 locationInput: string;
 filteredLocations: string[];
 setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
 isDropdownVisible: boolean;
 currency: string;
}

const PriceLocationFilters: React.FC<PriceLocationFiltersProps> = ({
 searchParams,
 handleFilterChange,
 allLocations,
 handleInputChange,
 locationInput,
 filteredLocations,
 setDropdownVisible,
 isDropdownVisible,
 currency,
}) => {

 return (
   <div className="filters-section-wrapper">
     <h2 className="filter-section-heading">Filter by Price & Location</h2>

     <div className="flex gap-4">
       {/* Min Price Filter */}
       <div>
         <label htmlFor="minPrice" className="filter-heading">
           Min Price ({currency})
         </label>
         <input
           type="text"
           id="minPrice"
           name="minPrice"
           className="filter-input"
           placeholder="130000"
           value={searchParams.get("minPrice") || ""}
           onFocus={(e) => {
             if (!searchParams.get("minPrice")) e.currentTarget.placeholder = "";
           }}
           onBlur={(e) => {
             if (!e.currentTarget.value) e.currentTarget.placeholder = "130000";
           }}
           onInput={(e) => {
             e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
           }}
           onChange={handleFilterChange}
         />
         {/* Slider Min Price */}
         <input
           type="range"
           id="minPriceSlider"
           name="minPrice"
           min="130000"
           max="190000"
           step="1000"
           value={searchParams.get("minPrice") || "0"}
           onChange={handleFilterChange}
           className="slider-styling"
         />
       </div>

       {/* Max Price Filter */}
       <div>
         <label htmlFor="maxPrice" className="filter-heading">
           Max Price ({currency})
         </label>
         <input
           type="text"
           id="maxPrice"
           name="maxPrice"
           className="filter-input"
           placeholder="190000"
           value={searchParams.get("maxPrice") || ""}
           onFocus={(e) => {
             if (!searchParams.get("maxPrice")) e.currentTarget.placeholder = "";
           }}
           onBlur={(e) => {
             if (!e.currentTarget.value) e.currentTarget.placeholder = "190000";
           }}
           onInput={(e) => {
             e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
           }}
           onChange={handleFilterChange}
         />
         {/* Slider Max Price */}
         <input
           type="range"
           id="maxPriceSlider"
           name="maxPrice"
           min="130000"
           max="190000"
           step="1000"
           value={searchParams.get("maxPrice") || "1000000"}
           onChange={handleFilterChange}
           className="slider-styling"
         />
       </div>

       {/* Location Filter */}
       <div>
         <label htmlFor="location" className="filter-heading">
           Location
         </label>
         
         {/* Keeps dropdown anchored to input field  */}
         <div className="relative"> 

           {/* Manual Input */}
           <input
               type="text"
               id="location"
               name="location"
               className="filter-input"
               value={searchParams.get("location") || ""}
               onInput={(e) => {
                 e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZäöüÄÖÜß\s]/g, "");
               }}
               onChange={handleFilterChange}
               onFocus={() => setDropdownVisible(true)}  // Show dropdown on focus
         onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}  // Hide dropdown after clicking away
         placeholder="Enter location"
       />

           {/* Location Dropdown */}
           {isDropdownVisible && searchParams.get("location") && (
         <div className="location-dropdown">
           {allLocations
             .filter(location => location.toLowerCase().includes(searchParams.get("location").toLowerCase())) // Filter based on input
             .map((location, index) => (
               <div
                 key={index}
                 onClick={() => {
                   handleFilterChange({ target: { name: "location", value: location } });
                   setDropdownVisible(false);  // Close dropdown after selection
                 }}
                 className="location-dropdown-hover"
               >
                 {location}
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>
     </div>
   </div>
 );
};

export default PriceLocationFilters;
