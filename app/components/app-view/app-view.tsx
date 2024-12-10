// 'App' component will use the 'PlotsList' component to render all the plots.

import React from "react";
import PlotsList from "../land-plot-list/land-plot-list";
import { plots } from "~/data/plots"; // Import the plots data

// Define App component.
// Serves as main entry point and organises layout of whole app.
const App: React.FC = () => {
  return (
    // Wrapper div for 'App' component.
    // To be used a parent layout/styling wrapper for entire page.
    <div className="app">
      
   {/* // App heading */}
      <h1>Land Plots</h1>

      {/*
        Render PlotsList component inside App component.
        PlotsList: child component responsible for rendering individual plots.
        Pass the plots array as a prop
      */}
      <PlotsList plots={plots} />
    </div>
  );
};

export default App;