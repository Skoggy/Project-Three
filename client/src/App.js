import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Typography from './styles/Typography';
import Footer from './components/Footer'
import { LoginPage } from './pages/login'
import { MainPage } from './pages/mainPage'



function App() {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Header />
      <Router>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/main' component={MainPage} />
      </Router>
      <Footer />

    </>
  );
}

export default App;
