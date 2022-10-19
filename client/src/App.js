import logo from './logo.svg';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <div className="App">
        <h1>HELLO FROM APP.JS</h1>
       
        <Routes>
          <Route path='/' element={<Login />}  />
          <Route path='/register' element={<Register />}  />
        </Routes>
    </div>
  );
}

export default App;
