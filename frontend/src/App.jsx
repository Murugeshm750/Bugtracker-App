
import './App.css'
import UserRegister from '../components/UserRegister'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Header from '../components/Header'
import Home from '../components/Home'
import UserLogin from '../components/UserLogin'
import { useState } from 'react'



function App({ routes }) {

  const [current, setCurrent] = useState('h')
  const keyChange = (e) => {
    console.log('click', e);
    setCurrent(e.key)
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Header
        keyChange={keyChange}
        current={current}
      />}>
        <Route index element={<Home />} />
        <Route path='login' element={<UserLogin 
        keyChange={keyChange}
        setCurrent={setCurrent}
        />} />
        <Route path='register' element={<UserRegister
          keyChange={keyChange}
          current={current}
          setCurrent={setCurrent}
        />} />
      </Route>
    )
  )

  return (
      <RouterProvider router={router}>
      </RouterProvider>
        
  
  )
}

export default App
