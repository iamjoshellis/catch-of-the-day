/*
  <Inventory/>
 */

import React from 'react';
import AddFishForm from './AddFishForm';
import Rebase from 're-base';
var base = Rebase.createClass('https://catch-of-the-day-426f9.firebaseio.com');


var Inventory = React.createClass({

  getInitialState : function() {
    return {
      uid : ''
    }
  },

  renderInventory : function(key) {
    var linkState = this.props.linkState;
    return (
      <div className="fish-edit" key={key}>
        <input type="text" valueLink={linkState('fishes.' + key + '.name')}/>
        <input type="number" valueLink={linkState('fishes.' + key + '.price')}/>
        <select valueLink={linkState('fishes.' + key + '.status')}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" valueLink={linkState('fishes.' + key + '.desc')}></textarea>
        <input type="text" valueLink={linkState('fishes.' + key + '.image')} />
        <button onClick={this.props.removeFish.bind(null, key)}>Remove Item</button>
      </div>
    )
  },

  render : function() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm {...this.props}/>
        <button onClick={this.props.loadSamples}>Load Sample Inventory</button>
      </div>
    )
  },

  propTypes : {
    addFish : React.PropTypes.func.isRequired,
    fishes : React.PropTypes.object.isRequired,
    linkState : React.PropTypes.func.isRequired,
    loadSamples : React.PropTypes.func.isRequired,
    removeFish : React.PropTypes.func.isRequired
  }

});

export default Inventory;
