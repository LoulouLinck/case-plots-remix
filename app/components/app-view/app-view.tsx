// 'App' component will use the 'PlotsList' component to render all the plots.

import React from "react";
import PlotsList from "../land-plot-list/land-plot-list";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Land Plots</h1>
      <PlotsList />
    </div>
  );
};

export default App;