import logo from './logo.svg';
import './App.css';
import Form from "./components/Form"
import { Routes, Route, Link } from "react-router-dom";
import Articles from './components/Articles';
import Signup from "./components/Signup"
function App() {
  return (
    <div style={{backgroundColor:"#2d3748"}}>
     
     
     <Routes>
     {/* <Route path="/" element={<Form/>}/> */}
    <Route path="/" element={<Signup/>}/>
     <Route path="/login" element={<Form/>}/>
      <Route path="/article" element={<Articles/>}/>
      </Routes>
    </div>
  );
}

export default App;
