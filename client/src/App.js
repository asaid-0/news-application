import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import UserComponent from './components/User/UserComponent'
import { ProtectedRoute } from './utils/ProtectedRoute';
import WithNavbar from './components/HOC/WithNavbar';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={WithNavbar(UserComponent)} />
          <ProtectedRoute exact path="/sources" component={WithNavbar(UserComponent)} />

          <Route exact path="/login" component={UserComponent} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
