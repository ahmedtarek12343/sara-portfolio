import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Header from "./components/Home/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
