import { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  return (
    <>
      <Header isGenerating={isGenerating} />
      <Hero isGenerating={isGenerating} setIsGenerating={setIsGenerating} />
      <Footer />
    </>
  );
}

export default App;
