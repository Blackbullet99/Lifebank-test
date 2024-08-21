import { useState } from "react";
import "./App.css";
import ItemList from "./components/ItemList/ItemList";

function App() {
  return (
    <div className="items">
      <h1>Movies</h1>
      <ItemList />
    </div>
  );
}

export default App;
