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
// Retrieves filtered plot data based on query parameters (minPrice, maxPrice).
// Filters the plots from the dataset and returns them for use in the component.
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");

  let filteredPlots = [...plots];

  if (minPrice) {
    filteredPlots = filteredPlots.filter(
      (plot) => plot.price >= parseInt(minPrice)
    );
  }

  if (maxPrice) {
    filteredPlots = filteredPlots.filter(
      (plot) => plot.price <= parseInt(maxPrice)
    );
  }

  return json({ plots: filteredPlots });
};

export default function Index() {
  // 3. useLoaderData:
  // Fetches data returned by the loader function, specifically the filtered plots.
  const { plots } = useLoaderData<{ plots: Plot[] }>();

  // 4. useSearchParams:
  // Enables managing URL search parameters for price filtering dynamically.
  const [searchParams, setSearchParams] = useSearchParams();

  // 5. useState for Currency Toggle:
  // Handles the currency state, defaulting to "USD".
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");

  // 6. Conversion Rate:
  // Define the conversion rate from USD to EUR.
  const conversionRate = 0.93;

  // Updates the query parameters based on user input in the filter fields.
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    setSearchParams(params);
  };

  // 7. Currency Toggle Function:
  // Switches the currency state between USD and EUR when triggered.
  const handleCurrencyToggle = () => {
    setCurrency((prev) => (prev === "USD" ? "EUR" : "USD"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Plots</h1>

        {/* 8. Currency Toggle Section:
            - Adds a toggle button for switching between USD and EUR.
            - Displays the next currency to switch to.
        */}
        <div className="flex justify-end mb-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            onClick={handleCurrencyToggle}
          >
            Switch to {currency === "USD" ? "EUR" : "USD"}
          </button>
        </div>

        {/* 9. Price Filter Inputs:
            - Allows users to filter plots by price.
            - Updates search parameters using the handleFilterChange function.
        */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filter by Price</h2>
          <div className="flex gap-4">
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                Min Price ({currency})
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchParams.get("minPrice") || ""}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                Max Price ({currency})
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchParams.get("maxPrice") || ""}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>

        {/* 10. PlotsList Integration:
            - Passes filtered plots and currency details as props to the PlotsList component.
            - PlotsList renders the individual plots with currency-specific prices.
        */}
        <PlotsList plots={plots} currency={currency} conversionRate={conversionRate} />
      </div>
    </div>
  );
}
