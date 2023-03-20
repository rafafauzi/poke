import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./components/ListPage";
import DetailPage from "./components/DetailPage";
import MyListPage from "./components/MyListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/mylistpage" element={<MyListPage />} />
        <Route path="/pokemon/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
