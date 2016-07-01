/*
  App
 */

import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';
import Catalyst from 'react-catalyst';
import Rebase  from 're-base';
var base = Rebase.createClass('https://catch-of-the-day-426f9.firebaseio.com');

var App = React.createClass({

  mixins: [
    Catalyst.LinkedStateMixin
  ],

  getInitialState : function() {
    return {
      fishes : {},
      order : {}
    }
  },

  shouldComponentUpdate : function(nextProps, nextState) {
    return (nextState.order === this.state.order ? true : false);
  },

  componentDidMount : function() {
    base.syncState(this.props.params.storeId + 'fishes/', {
      context : this,
      state : 'fishes'
    });
    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);
    if(localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  },

  componentWillUpdate : function(nextProps, nextState) {
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  },

  addToOrder : function(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order : this.state.order });
  },

  removeFromOrder : function(key) {
    delete this.state.order[key];
    this.setState({ order : this.state.order });
  },

  addFish : function(fish) {
    var timestamp = (new Date()).getTime();
    this.state.fishes['fish-' + timestamp] = fish;
    this.setState({ fishes : this.state.fishes });
  },

  removeFish : function(key) {
    if(confirm("Remove Item?")) {
      this.state.fishes[key] = null;
      this.setState({ fishes : this.state.fishes });
    }
  },

  loadSamples : function() {
    this.setState({
      fishes : require('../sample-fishes')
    })
  },

  renderFish : function(key) {
    return(
      <Fish addToOrder={this.addToOrder} key={key} index={key} details={this.state.fishes[key]}/>
    )
  },

  render : function() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order removeFromOrder={this.removeFromOrder} fishes={this.state.fishes} order={this.state.order}/>
        <Inventory linkState={this.linkState} fishes={this.state.fishes} loadSamples={this.loadSamples} addFish={this.addFish} removeFish={this.removeFish} {...this.props}/>
      </div>
    )
  }

});

export default App;
