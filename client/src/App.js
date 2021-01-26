import { React, useState, useMemo, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Typography from './styles/Typography';
import Footer from './components/Footer'
import { LoginPage } from './pages/login'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext, useUserContext } from './utils/UserContext';
import { frontPage } from './pages/frontPage';
import { SelectStockPage } from './pages/selectStockPage';
import { RegisterPage } from './pages/registerPage';
import { Admin } from './pages/adminPage'
import { takeItemPage } from './pages/takeItemPage'



function App() {

  // const [user, setUser] = useContext(UserContext)
  // const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])


  // console.log(user)

  return (
    <UserContext.Provider value={"chris"}>
      <GlobalStyles />
      <Typography />
      <Header />

      <Router>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/stocktype' component={SelectStockPage} />
          <Route exact path='/takeitem' component={takeItemPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/' component={frontPage} />
          <Route exact path='/admin' component={Admin} />
          {/* <ProtectedRoute exact path='/admin' component={Admin} /> */}
        </Switch>
      </Router>
      <Footer />
    </UserContext.Provider>



  );
}

export default App;
