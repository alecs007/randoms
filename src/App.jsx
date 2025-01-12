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
      <Hero setIsGenerating={setIsGenerating} isGenerating={isGenerating} />
      <Footer />
    </>
  );
}

export default App;
