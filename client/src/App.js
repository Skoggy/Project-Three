import { React, useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Typography from './styles/Typography';
import Footer from './components/Footer'
import { LoginPage } from './pages/login'
import MainPage from './pages/mainPage'
// import User from './components/User'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './utils/UserContext';
import { frontPage } from './pages/frontPage';
import { SelectStockPage } from './pages/selectStockPage';
import { RegisterPage } from './pages/registerPage';
import { Admin } from './pages/adminPage'
import { takeItemPage } from './pages/takeItemPage'



function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null)
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])




  return (
    <>
      <GlobalStyles />
      <Typography />
      <Header />

      <Router>

        <UserContext.Provider value={providerValue}>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/stocktype' component={SelectStockPage} />
          <Route exact path='/takeitem' component={takeItemPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/' component={frontPage} />
          <Route exact path='/admin' component={Admin} />
          {/* <ProtectedRoute exact path='/main' component={MainPage} /> */}

        </UserContext.Provider>
      </Router>
      <Footer />

    </>
  );
}

export default App;
