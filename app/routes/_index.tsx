import { useState } from "react"; // Import useState hook.
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import PlotsList from "../components/land-plot-list/land-plot-list"; // Import PlotsList component
import { plots, type Plot } from "~/data/plots"; // Import the plots data
import CurrencyToggle from "../components/currency-toggle/currency-toggle"; // Import CurrencyToggle component
import PriceLocationFilters from "../components/price-location-filters/price-location-filters"; // Import PriceLocationFilters component

// 1. Meta Function:
// Provides metadata for the route, setting the title and description.
export const meta: MetaFunction = () => {
 return [
   { title: "Land Plots Listing" },
   { name: "description", content: "Browse available plots of land" },
 ];
};

// 2. Loader Function:
// Retrieves filtered plot data based on query parameters (minPrice, maxPrice, location, and currency).
// Filters the plots from the dataset and dynamically converts prices based on currency.
export const loader: LoaderFunction = async ({ request }) => {
 const url = new URL(request.url); // Parse the URL to get query parameters.
 const minPrice = url.searchParams.get("minPrice"); // Get minimum price filter value.
 const maxPrice = url.searchParams.get("maxPrice"); // Get maximum price filter value.
 const location = url.searchParams.get("location"); // Get location filter value.
 const currency = url.searchParams.get("currency") || "USD"; // Default currency is USD.

 const conversionRate = 0.9524; // Conversion rate from USD to EUR.

 // Define a function to convert USD prices to the selected currency.
 const convertToCurrency = (priceInUSD: number) =>
   currency === "EUR" ? priceInUSD * conversionRate : priceInUSD;

 // Preprocess plots to include converted prices based on the selected currency.
 let filteredPlots = plots.map((plot) => ({
   ...plot,
   convertedPrice: convertToCurrency(plot.price),
 }));

 // Filter by minimum price in the selected currency.
 if (minPrice) {
   const minPriceValue = parseFloat(minPrice);
   filteredPlots = filteredPlots.filter(
     (plot) => plot.convertedPrice >= minPriceValue
   );
 }

 // Filter by maximum price in the selected currency.
 if (maxPrice) {
   const maxPriceValue = parseFloat(maxPrice);
   filteredPlots = filteredPlots.filter(
     (plot) => plot.convertedPrice <= maxPriceValue
   );
 }

 // Filter by location if location query parameter is provided.
 // Convert both location and query to lowercase for case-insensitive matching.
 if (location) {
   const normalizeString = (str: string) =>
     str
       .normalize("NFD") // Decompose characters with diacritics (ä = a + diacritic)
       .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks (a + diacritic = a)
       .toLowerCase(); // Convert string to lowercase


   filteredPlots = filteredPlots.filter((plot) =>
     normalizeString(plot.location).includes(normalizeString(location))
   );
 }

 return json({ plots: filteredPlots }); // Return filtered plots as JSON used by the component.
};

// Main Index Component
export default function Index() {
 // 3. useLoaderData:
 // Fetches data returned by the loader function, specifically the filtered plots.
 const { plots } = useLoaderData<{ plots: Plot[] }>();

 // 4. useSearchParams:
 // Enables managing URL search parameters for price and location filtering dynamically.
 const [searchParams, setSearchParams] = useSearchParams();

 // 5. useState for Currency Toggle:
 // Handles the currency state, defaulting to "USD".
 const [currency, setCurrency] = useState<"USD" | "EUR">("USD");

 // 6. Conversion Rate:
 // Define the conversion rate from USD to EUR.
 const conversionRate = 0.9524;

 // Generate all unique locations from the plots data
 const allLocations = Array.from(new Set(plots.map((plot) => plot.location)));

 // State for managing user input and filtered locations list
 const [locationInput, setLocationInput] = useState("");
 const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
 const [isDropdownVisible, setDropdownVisible] = useState(false); // Manage visibility of the dropdown

 // Handle input change: update location input and filter available locations
 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const input = e.target.value;
   setLocationInput(input);

   // Filter the available locations based on the typed input
   if (input) {
     const filtered = allLocations.filter((location) =>
       location.toLowerCase().includes(input.toLowerCase())
     );
     setFilteredLocations(filtered);
   } else {
     setFilteredLocations(allLocations); // Show all locations if no input
   }

   // Update search params (location filter)
   const params = new URLSearchParams(searchParams);
   if (input) {
     params.set("location", input);
   } else {
     params.delete("location");
   }
   setSearchParams(params); // Update search params
 };

 // Handle selection of a location from the suggestions
 const handleLocationSelect = (location: string) => {
   setLocationInput(location);
   setFilteredLocations([]); // Hide the dropdown after selection
   setDropdownVisible(false); // Hide the dropdown

   // Update search params with selected location
   const params = new URLSearchParams(searchParams);
   params.set("location", location);
   setSearchParams(params); // Update search params
 };

 // Updates the query parameters based on user input in the filter fields.
 const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   const params = new URLSearchParams(searchParams);

   if (name === "location-select") {
     if (value) {
       params.set("location", value); // Set location using the dropdown
     } else {
       params.delete("location"); // Remove location filter if empty
     }
   } else {
     if (value) {
       params.set(name, value); // Set the query parameter for the corresponding input
     } else {
       params.delete(name); // Remove the query parameter if value is empty
     }
   }

   params.set("currency", currency);

   setSearchParams(params); // Update the URL search parameters.
 };

 // 7. Currency Toggle Function:
 const handleCurrencyToggle = () => {
   const newCurrency = currency === "USD" ? "EUR" : "USD";
   setCurrency(newCurrency);

   const params = new URLSearchParams(searchParams);
   params.set("currency", newCurrency);
   setSearchParams(params); // Reflect the new currency in the query params.
 };

 return (
   <div className="min-h-screen bg-greenAccount-daylightBg text-greenAccount-daylightText py-8 px-4 sm:px-6 lg:px-8">
     <div className="max-w-7xl mx-auto">
       {/* Header Section */}
       <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold mb-8">
           <span className="text-greenAccount-lightGreenFeatures">Available </span>
           <span className="text-[#f1ecd1]">Plots</span>
         </h1>
         {/* Currency Toggle Component */}
         <CurrencyToggle currency={currency} onToggle={handleCurrencyToggle} />
       </div>

       {/* Price and Location Filters Component */}
       <PriceLocationFilters
         searchParams={searchParams}
         handleFilterChange={handleFilterChange}
         allLocations={allLocations}
         handleInputChange={handleInputChange}
         locationInput={locationInput}
         filteredLocations={filteredLocations}
         setDropdownVisible={setDropdownVisible}
         isDropdownVisible={isDropdownVisible}
         currency={currency} // Pass the currency to the filters
       />

       {/* Plots List */}
       <div
         className="bg-cover bg-center p-8 rounded-lg"
         style={{
           backgroundImage:
             "url('https://cdn.prod.website-files.com/65a509e09ca04e38935eece9/66dffd2b0f8017c53512c6cd_rosenhaeger-wiese_green-account.webp')",
         }}
       >
         {plots.length === 0 ? (
           <div className="text-center text-[#f1ecd1] font-bold text-4xl">
             <p>No plot match your criteria.</p>
           </div>
         ) : (
           <PlotsList plots={plots} currency={currency} conversionRate={conversionRate} />
         )}
       </div>
      
       {/* Footer Section */}
    <footer className="mt-12 py-2 bg-greenAccount-daylightBg text-greenAccount-daylightText text-center">
        <p className="mb-8 text-greenAccount-beigeFeatures">Mehr über unsere Projekte:</p>
        <div className="flex justify-center gap-20">
          <a
            href="https://www.greenaccount.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400"
          >
            <img
             src="https://cdn.prod.website-files.com/65a509e09ca04e38935eece9/67374627f0e4692152ec1d18_greenaccount_logo_2C_positive_RGB.webp"
             alt="Green Account Logo"
             className="h-9"
            />
          </a>
          <a
            href="https://www.kompensationsmarkt.de/oekopunkte"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400"
          >
             <img
             src="https://cdn.prod.website-files.com/66ac8afd737ef2f88a8bc848/66b22541e8812b121abb37e7_Logo_gro%C3%9F.webp"
             alt="Green Account Logo"
             className="h-9"
            />
          </a>
        </div>
      </footer>

     </div>
   </div>
 );
}