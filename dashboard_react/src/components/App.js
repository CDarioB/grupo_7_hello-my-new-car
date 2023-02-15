import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SideBar from './SideBar';
import TopBar from './TopBar';
import MainContent from './MainContent';
import Footer from './Footer';
import ProductDetail from './ProductDetail'
import NotFound from './NotFound';

function App() {
  return (
    <React.Fragment>
      <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBar />
            <Switch>
              <Route exact path="/">
                <MainContent />
              </Route>
              <Route path="/ProductDetail/:id">
                <ProductDetail />
              </Route>
              <Route component={NotFound} />
            </Switch>
            
            <Footer />
          </div>
        </div>


      </div>
    </React.Fragment>
  );
}

export default App;
