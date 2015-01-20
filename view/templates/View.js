var React = require('react');
var helpers = require('../../helpers');

// It looks like when generating this view, you chose not to generate a store.
// If you wish to add a store, then you would `require` your store:
//
//     var FooStore = require('../../stores/FooStore');
//
// You would then get the mixin to add functionality to our view that will best
// interact with our store:
//
//     var Fluxxor = require('Fluxxor');
//     
//     var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({

  // To hook a store up to this view, you would add the FluxMixin and
  // StoreWatchMixin:
  //
  //     mixins: [ helpers.FluxMixin, StoreWatchMixin('FooStore') ]
  //
  // Next, you would add a method that gets the state from the store.
  //
  //     getStateFromFlux: function () {
  //       return this.getFlux().store('FooStore').getState();
  //     },

  render: function () {
    return (
      <div className='<%= name %>-view'>
        <pre><%= name %></pre>
      </div>
    );
  }

});