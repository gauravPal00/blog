import React from 'react';
import './App.css';
import { useState } from 'react';
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom'
import { Login } from './components/account/Login';
import {Home} from './components/home/Home' 
import { DataProvider } from './components/context/DataProvider';
import { Header } from './components/header/Header';
import { CreatePost } from './components/create/CreatePost';

const PrivateRoute = ({isAuthenticated,...props }) =>{

  return isAuthenticated ? <>
   <Header/>
  <Outlet/>
  </> : <Navigate replace to="/login" />
}

function App() {

  const [isAuthenticated,isUserAuthenticated] = useState(false)
  return (
    <div style={{marginTop:"64px"}}>
      <DataProvider>
        <BrowserRouter>
       
        <Routes>
          <Route exact path="/login" element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>

          <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route path='/' element={<Home/>} />
          </Route>

          <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route path='/create' element={<CreatePost/>} />
          </Route>

        </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
