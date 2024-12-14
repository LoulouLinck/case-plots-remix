import { useState } from "react"; // Import useState hook.
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import PlotsList from "../components/land-plot-list/land-plot-list"; // Import PlotsList component
import { plots, type Plot } from "~/data/plots"; // Import the plots data

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

  // Updates the query parameters based on user input in the filter fields.
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // Ensure the current currency is reflected in the query params.
    params.set("currency", currency);

    setSearchParams(params); // Update the URL search parameters.
  };

  // 7. Currency Toggle Function:
  // Switches the currency state between USD and EUR when triggered.
  // Updates the URL to include the selected currency.
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
    
            {/* 8. Currency Toggle Section:
            - Adds a toggle button for switching between USD and EUR.
            - Displays the next currency to switch to.
            */}
        <div className="flex justify-end mb-6">
          <button
            className="bg-[#95c11f] text-white px-[1.25rem] py-[0.6rem] rounded-tl-[1rem] rounded-tr-[0.25rem] rounded-bl-[0.25rem] rounded-br-[1rem] shadow hover:bg-[#7ca519]"            
            onClick={handleCurrencyToggle}>
             <strong>Switch to {currency === "USD" ? "EUR" : "USD"}</strong> 
          </button>
        </div>
        </div>


        {/* 9. Price and Location Filter Inputs:
            - Allows users to filter plots by price and location.
            - Updates search parameters using the handleFilterChange function.
            - Includes sliders for quick price selection in addition to numeric input.
        */}
        <div className="mb-6 bg-greenAccount-beigeFeatures p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-greenAccount-daylightText mb-4">Filter by Price & Location</h2>
          <div className="flex gap-4">
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-greenAccount-daylightText">
                Min Price ({currency})
              </label>
              <input
                type="text"
                id="minPrice"
                name="minPrice"
                className="text-greenAccount-daylightText mt-1 block w-full rounded-md border-greenAccount-lightGreenFeatures shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchParams.get("minPrice") || ""}
                onInput={(e) => {
                  // Restrict to numerical input
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                }}
                onChange={handleFilterChange}
              />
              {/* Slider for Min Price */}
              <input
                type="range"
                id="minPriceSlider"
                name="minPrice"
                min="0"
                max="200000"
                step="1000"
                value={searchParams.get("minPrice") || "0"}
                onChange={handleFilterChange}
                className="mt-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-greenAccount-daylightText">
                Max Price ({currency})
              </label>
              <input
                type="text"
                id="maxPrice"
                name="maxPrice"
                className="text-greenAccount-daylightText mt-1 block w-full rounded-md border-greenAccount-lightGreenFeatures shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchParams.get("maxPrice") || ""}
                onInput={(e) => {
                  // Restrict to numerical input
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                }}
                onChange={handleFilterChange}
              />
              {/* Slider for Max Price */}
              <input
                type="range"
                id="maxPriceSlider"
                name="maxPrice"
                min="0"
                max="200000"
                step="1000"
                value={searchParams.get("maxPrice") || "1000000"}
                onChange={handleFilterChange}
                className="mt-2 w-full"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="text-greenAccount-daylightText block text-sm font-medium">
                Location
              </label>
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
              />
            </div>
          </div>
        </div>

        {/* 10. PlotsList Integration:
            - Passes filtered plots and currency details as props to the PlotsList component.
            - PlotsList renders the individual plots with currency-specific prices.
        */}
        <div 
        className="bg-cover bg-center p-8 rounded-lg"
        style={{
          backgroundImage: "url('https://cdn.prod.website-files.com/65a509e09ca04e38935eece9/66dffd2b0f8017c53512c6cd_rosenhaeger-wiese_green-account.webp')"
        }}
      >
        <PlotsList plots={plots} currency={currency} conversionRate={conversionRate} />
      </div>
      {/* Footer Section */}
      <footer className="mt-12 py-2 bg-greenAccount-daylightBg text-greenAccount-daylightText text-center">
          <p className="mb-8 text-greenAccount-daylightCard">Mehr über unsere Projekte:</p>
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