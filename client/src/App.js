import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import UserComponent from './components/User/UserComponent'
import { ProtectedRoute } from './helpers/ProtectedRoute';
import WithNavbar from './components/HOC/WithNavbar';
import SourcesComponent from './components/Sources/SourcesComponent';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsComponent from './components/News/NewsComponent';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={WithNavbar(NewsComponent)} />
          <ProtectedRoute exact path="/sources" component={WithNavbar(SourcesComponent)} />

          <Route exact path="/login" component={UserComponent} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
