import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Typography from './styles/Typography';
import Footer from './components/Footer'
import { LoginPage } from './pages/login'
import MainPage from './pages/mainPage'
import User from './components/User'
import ProtectedRoute from './components/ProtectedRoute'




function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Header />
      <User />
      <Router>
        <Route exact path='/' component={LoginPage} />
        <ProtectedRoute exact path='/main' component={MainPage} isAuth={isAuth} />
      </Router>
      <Footer />

    </>
  );
}

export default App;
