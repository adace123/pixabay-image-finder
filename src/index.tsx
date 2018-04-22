import * as React from "react";
import { render } from "react-dom";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

const App = () => (
  <div>
    <Navbar />
    <Search />
  </div>
);

render(<App />, document.getElementById("root"));
