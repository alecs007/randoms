import { useState } from "react";
import "./App.css";
import Hero from "./Hero/Hero";
function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  return (
    <>
      <Hero isGenerating={isGenerating} setIsGenerating={setIsGenerating} />
    </>
  );
}

export default App;
