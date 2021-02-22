import { React, useState, useEffect } from 'react';

import { connect } from "react-redux";

import { addUser } from "./redux/actions";
import { getUserBaseOnToken } from "./API/auth"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Typography from './styles/Typography';
import Footer from './components/Footer'
import { LoginPage } from './pages/login'
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import { PublicRoute } from './components/routes/PublicRoute'
import { frontPage } from './pages/frontPage';
import { SelectStockPage } from './pages/selectStockPage';
import { RegisterPage } from './pages/registerPage';
import { Admin } from './pages/adminPage'
import { takeItemPage } from './pages/takeItemPage'
import styled from 'styled-components'



const Flex = styled.div`

display: flex;
flex-flow: column;
height:98vh;
max-height: 98vh;

.header {
  flex: 0 1 auto;
}
.content {
  flex: 1 1 auto;
}
.footer {
  flex: 0 1 auto;
}
`

function App({ dispatch }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token)
      getUserBaseOnToken(token).then((res) => {
        dispatch(addUser(res.data.data));
        setLoading(false);
      });
    else setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;


  return (
    <Flex>


      <GlobalStyles />
      <Typography />
      <Router>
        <div className="header">
          <Header />
        </div>
        <div className="content">
          <Switch>
            <PublicRoute exact path='/login' component={LoginPage} />
            <PublicRoute exact path='/stocktype' component={SelectStockPage} />
            <PublicRoute exact path='/takeitem' component={takeItemPage} />
            <PublicRoute exact path='/register' component={RegisterPage} />
            <PublicRoute exact path='/' component={frontPage} />
            <ProtectedRoute exact path='/admin' component={Admin} />
          </Switch>

        </div>
      </Router>
      <div className="footer">
        <Footer />
      </div>
    </Flex >

  );
}

export default connect()(App);
