import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { plots, type Plot } from "~/data/plots";

export const meta: MetaFunction = () => {
  return [
    { title: "Land Plots Listing" },
    { name: "description", content: "Browse available plots of land" },
  ];
};

// Loader Function: handles filtering based on query parameters for price and location.
export const loader: LoaderFunction = async ({ request }) => {
  // Extract query parameters from the request URL
  const url = new URL(request.url); // Parse the URL to get query parameters.
  const minPrice = url.searchParams.get("minPrice"); // Get minimum price filter value.
  const maxPrice = url.searchParams.get("maxPrice"); // Get maximum price filter value.
  const location = url.searchParams.get("location"); // Extend filtering logic to location.

   // Start with the full dataset of plots.
  let filteredPlots = [...plots];

   // Filter by minimum price if provided
  if (minPrice) {
    filteredPlots = filteredPlots.filter(
      (plot) => plot.price >= parseInt(minPrice)
    );
  }
   // Filter by maximum price if provided
  if (maxPrice) {
    filteredPlots = filteredPlots.filter(
      (plot) => plot.price <= parseInt(maxPrice)
    );
  }
   // Filter by location if location query parameter is provided.
   // Convert both location and query to lowercase for case-insensitive matching.
   if (location) {
    // Function normalising strings
    // Removes diacritical marks (ä, ü) and converts string to lowercase.
    const normalizeString = (str: string) =>
      str
        .normalize("NFD") // Decompose characters with diacritics (ä = a + diacritic)
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks (a + diacritic = a)
        .toLowerCase(); // Convert string to lowercase

    // Filter plots where normalised location value includes normalised input value.
    filteredPlots = filteredPlots.filter((plot) =>
      normalizeString(plot.location).includes(normalizeString(location))
    );
  }
 // Return filtered plots as JSON used by component.
  return json({ plots: filteredPlots });
};

// Main Index Component
export default function Index() {
  const { plots } = useLoaderData<{ plots: Plot[] }>(); // Load the filtered plots data.
  const [searchParams, setSearchParams] = useSearchParams(); // Manage URL search parameters.

  // Handles changes in filter input fields and updates the URL query parameters.
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Extract the input field's name and value.
    const params = new URLSearchParams(searchParams); // Create a new URLSearchParams object.
    
     // If the input value is not empty, set it in the URL parameters.
    if (value) {
      params.set(name, value);
    } else {
       // If the input value is empty, remove it from the URL parameters.
      params.delete(name);
    }
    
    setSearchParams(params); // Update the URL with the new parameters.
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Plots</h1>
        
        {/* Price Filter Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filter by Price & Location</h2>
          <div className="flex gap-4">
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                Min Price ($)
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                className="text-gray-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchParams.get("minPrice") || ""}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                Max Price ($)
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                className="text-gray-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchParams.get("maxPrice") || ""}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
               Location
             </label>
             <input
                type="text"
                id="location"
                name="location"
                className="text-gray-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchParams.get("location") || ""}
                onChange={handleFilterChange}
              />
           </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plots.map((plot) => (
            <div
              key={plot.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {plot.title}
                </h2>
                <p className="text-gray-600 mb-4">{plot.description}</p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span> {plot.location}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Size:</span> {plot.size} m²
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Price:</span> $
                    {plot.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
