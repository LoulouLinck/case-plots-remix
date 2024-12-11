
import { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PlotDetails from "~/components/land-plot-details/land-plot-details"; // Import PlotDetails component
import { plots } from "~/data/plots"; // Import plots data

export const loader: LoaderFunction = async ({ params }) => {
  const { plotId } = params; // Get dynamic plotId from URL

  const plot = plots.find((p) => p.id === plotId);

  if (!plot) {
    throw new Response("Plot not found", { status: 404 });
  }

  return json({ plot });
};
// - renders PlotDetails component, passing plot data as prop.
export default function PlotDetailsPage() {
  const { plot } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <PlotDetails plot={plot} />
      </div>
    </div>
  );
}


