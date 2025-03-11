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
   <div className="mb-6 bg-greenAccount-beigeFeatures p-4 rounded-lg shadow-sm">
     <h2 className="text-lg font-medium text-greenAccount-daylightText mb-4">Filter by Price & Location</h2>
     <div className="flex gap-4">

       {/* Min Price Filter */}
       <div>
         <label htmlFor="minPrice" className="block text-sm font-medium text-greenAccount-daylightText">
           Min Price ({currency})
         </label>
         <input
           type="text"
           id="minPrice"
           name="minPrice"
           className="text-greenAccount-daylightText mt-1 block w-full rounded-md border-greenAccount-lightGreenFeatures shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
           className="mt-2 w-full"
         />
       </div>

       {/* Max Price Filter */}
       <div>
         <label htmlFor="maxPrice" className="block text-sm font-medium text-greenAccount-daylightText">
           Max Price ({currency})
         </label>
         <input
           type="text"
           id="maxPrice"
           name="maxPrice"
           className="text-greenAccount-daylightText mt-1 block w-full rounded-md border-greenAccount-lightGreenFeatures shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
           className="mt-2 w-full"
         />
       </div>

       {/* Location Filter */}
       <div>
         <label htmlFor="location" className="text-greenAccount-daylightText block text-sm font-medium">
           Location
         </label>
         <div className="relative">

           {/* Manual Input */}
           <input
               type="text"
               id="location"
               name="location"
               className="text-greenAccount-daylightText mt-1 block w-full rounded-md border-greenAccount-lightGreenFeatures shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
         <div className="absolute w-full mt-1 bg-white shadow-lg max-h-60 overflow-auto z-10 border border-gray-300 rounded-md">
           {allLocations
             .filter(location => location.toLowerCase().includes(searchParams.get("location").toLowerCase())) // Filter based on input
             .map((location, index) => (
               <div
                 key={index}
                 onClick={() => {
                   handleFilterChange({ target: { name: "location", value: location } });
                   setDropdownVisible(false);  // Close dropdown after selection
                 }}
                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
