// '$plotId' syntax is what allows Remix to match URLs dynamically based on plotId parameter!

// import { LoaderFunction } from "@remix-run/node";
// import { json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import PlotDetails from "~/components/land-plot-details/land-plot-details"; // Import PlotDetails component
// import { plots } from "~/data/plots"; // Import plots data

// export const loader: LoaderFunction = async ({ params }) => {
//   const { plotId } = params; // Get dynamic plotId from URL

//   // Find plot by ID
//   const plot = plots.find((p) => p.id === plotId);

//   // If plot not found: 404 response
//   if (!plot) {
//     throw new Response("Plot not found", { status: 404 });
//   }

//   return json({ plot });
// };

// // PlotDetailsPage function: 
// // - responsible for fetching plot data via useLoaderData hook, which retrieves data fetched in loader function.
// // - renders PlotDetails component, passing plot data as prop.
// export default function PlotDetailsPage() {
//   // Use loader data to fetch specific plot
//   const { plot } = useLoaderData<typeof loader>();

//   // Render PlotDetails component w/ fetched data
//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <PlotDetails plot={plot} />
//       </div>
//     </div>
//   );
// }

// Version 2

// import { json, LoaderFunction } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import { plots } from "~/data/plots";
// import PlotDetails from "~/components/land-plot-details/land-plot-details"; // Import PlotDetails component

// export const loader: LoaderFunction = async ({ params }) => {
//   const { plotId } = params; // Extract plotId from URL params
//   const plot = plots.find((p) => p.id === plotId);

//   if (!plot) {
//     throw new Response("Plot not found", { status: 404 });
//   }

//   return json({ plot });
// };

// const PlotDetailsPage = () => {
//   const { plot } = useLoaderData<{ plot: typeof plots[0] }>(); // Get plot data using loader

//   return <PlotDetails plot={plot} />;
// };

// export default PlotDetailsPage;



// Version 3: Using External Data

// import { LoaderFunction, useLoaderData } from "@remix-run/node";
// import PlotDetails from "~/components/land-plot-details/land-plot-details";

// interface Plot {
//   id: string;
//   title: string;
//   size: number;
//   price: number;
//   location: string;
//   description: string;
//   projectType: string[];
//   owner: string;
//   contact: string;
// }

// // Loader function to fetch detailed plot data from an external API
// export const loader: LoaderFunction = async ({ params }) => {
//   const { plotId } = params; // Extract plotId from URL params
//   if (!plotId) {
//     throw new Response("Plot ID is required", { status: 400 });
//   }

//   // Fetch detailed plot data from an external API
//   const response = await fetch(`https://api.example.com/plots/${plotId}`);
//   if (!response.ok) {
//     throw new Response("Failed to load plot details", { status: response.status });
//   }

//   const plot: Plot = await response.json(); // Parse the response to JSON
//   return plot; // Return the plot data
// };

// // Component to render the detailed plot view
// export default function PlotDetailsPage() {
//   const plot = useLoaderData<Plot>(); // Access data from loader

//   return (
//     <div className="plot-details-page">
//       <PlotDetails plot={plot} />
//     </div>
//   );
// }
