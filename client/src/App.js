import { React } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Typography from './styles/Typography';
import Footer from './components/Footer'
import { LoginPage } from './pages/login'
import ProtectedRoute from './components/ProtectedRoute'
import { UserProvider } from './utils/UserContext';
import { frontPage } from './pages/frontPage';
import { SelectStockPage } from './pages/selectStockPage';
import { RegisterPage } from './pages/registerPage';
import { Admin } from './pages/adminPage'
import { takeItemPage } from './pages/takeItemPage'
import styled from 'styled-components'




function App() {

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


  return (
    <Flex>

      <UserProvider>
        <GlobalStyles />
        <Typography />
        <Router>
          <div className="header">
            <Header />
          </div>
          <div className="content">

            <Switch>
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/stocktype' component={SelectStockPage} />
              <Route exact path='/takeitem' component={takeItemPage} />
              <Route exact path='/register' component={RegisterPage} />
              <Route exact path='/' component={frontPage} />
              <ProtectedRoute exact path='/admin' component={Admin} />
            </Switch>

          </div>
        </Router>
        <div className="footer">
          <Footer />
        </div>
      </UserProvider>

    </Flex >

  );
}

export default App;
