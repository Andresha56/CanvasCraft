import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from './pages/Room/Room';
function App() {
  return (
    <>
   <Router>
    <Routes>
      <Route path='/' element={<Room/>}/>
      <Route path='/text/editor/:id' element={<Home/>}/>
    </Routes>
   </Router>
    </>
  );
}

export default App;
