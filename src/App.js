import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './screens/Header';
import Home from './screens/Home';
import About from './screens/About';
import Employee from './screens/Employee';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Header/>
       <Routes>
       <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/employee' element={<Employee/>} />
    
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
