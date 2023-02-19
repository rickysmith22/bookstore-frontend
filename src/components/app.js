import React, { useState, useEffect } from 'react';
import { useRoutes } from 'hookrouter'
import NavigationBar from '../components/navigation/NavBar'
import AddBook from './pages/add-book'
import Home from './pages/home'
import SignUp from '../components/pages/auth/signUp'
import Login from '../components/pages/auth/login'
import Cookies from 'js-cookie'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if(Cookies.get('username')) {
      setLoggedIn(true)
    }
  })

    const logout = () => {
      Cookies.remove('username')
      setLoggedIn(false)
    }

  const routes = {
    "/": () => <Home loggedIn={loggedIn} />,
    "/add-book": () => <AddBook />,
    "/signup": () => <SignUp />,
    '/login': () => <Login />
  }
  const routeResult = useRoutes(routes)
  return (
    <div>
      <NavigationBar logout={logout}/>
      {routeResult}
    </div>
  )
}