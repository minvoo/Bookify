import "./App.css";
import { Footer } from "./layouts/Footer/Footer";
import { Navbar } from "./layouts/Navbar/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";

export const App = () => {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
}