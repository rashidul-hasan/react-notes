import React from 'react';
import {HashRouter as Router, Route, Link } from "react-router-dom"
import Home from "./Home";
import AddEdit from "./AddEdit";

class App extends React.Component{

  

  render() {

      return (
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/add-or-edit" exact component={AddEdit} />
        </Router>
      );
  }

  
}

export default App;