// 'App' component will use the 'PlotsList' component to render all the plots.

import React from "react";
import PlotsList from "../land-plot-list/land-plot-list";
import { plots } from "~/data/plots"; // Import the plots data

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Land Plots</h1>
        Pass the plots array as a prop
      */}
      <PlotsList plots={plots} />
    </div>
  );
};

export default App;