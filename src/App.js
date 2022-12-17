import { BrowserRouter as Router , Routes , Route  } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import CardDetail from "./page/CardDetail";
import Home from "./page/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card-detail/:id" element={<CardDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
