import logo from './logo.svg';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import NewPass from './pages/NewPassword/NewPass';

function App() {
  return (
    <div className="App">      
       
        <Routes>
          <Route path='/' element={<Login />}  />
          <Route path='/home' element={<Home />}  />
          <Route path='/register' element={<Register />}  />
          <Route path='/setNewPassword' element={<NewPass />}  />
        </Routes>
    </div>
  );
}

export default App;
