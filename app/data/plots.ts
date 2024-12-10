// Define the structure of a Plot object using an interface: ensures all plot objects follow same structure.
// Plot interface will be imported and defined as 'PlotType' in other files: avoids confusion w/ 'Plot' component.
export interface Plot {
  id: string;          // Unique identifier for the plot
  title: string;       // The title or name of the plot
  size: number;        // The size of the plot in square meters
  price: number;       // The price of the plot in USD
  location: string;    // Geographic location of the plot
  description: string; // A detailed description of the plot
}

// Export an array of plots, each following the Plot interface structure.
// These plots will serve as mock data for rendering components.
export const plots: Plot[] = [
  {
    id: "1",
    title: "Schwarzwald Naturgrundstück",
    size: 2500,
    price: 175000,
    location: "Schwarzwald, Baden-Württemberg",
    description: "Waldgrundstück mit hoher Artenvielfalt und altem Baumbestand",
  },
  {
    id: "2",
    title: "Lüneburger Heide Biotop",
    size: 3000,
    price: 145000,
    location: "Lüneburger Heide, Niedersachsen",
    description: "Heidefläche mit seltenen Pflanzenarten und Insektenpopulationen",
  },
  {
    id: "3",
    title: "Spreewald Feuchtgebiet",
    size: 1800,
    price: 160000,
    location: "Spreewald, Brandenburg",
    description: "Naturbelassenes Feuchtgebiet mit reichem Vogelvorkommen",
  },
  {
    id: "4",
    title: "Bayerischer Streuobstwiese",
    size: 2200,
    price: 190000,
    location: "Allgäu, Bayern",
    description: "Traditionelle Streuobstwiese mit alten Obstsorten und Wildblumen",
  },
  {
    id: "5",
    title: "Eifel Naturschutzfläche",
    size: 2800,
    price: 168000,
    location: "Eifel, Rheinland-Pfalz",
    description: "Artenreiches Grünland mit Quellgebieten und Schmetterlingshabitaten",
  },
];