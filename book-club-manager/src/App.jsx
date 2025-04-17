import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyLists from './pages/MyLists';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-lists" element={<MyLists />} />
      </Routes>
    </Router>
  );
};

export default App;