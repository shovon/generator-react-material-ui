var React = require('react');
var ImageStore = require('../../stores/<%= storename %>');
var helpers = require('../../helpers');
var Fluxxor = require('Fluxxor');

var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  // TEMPLATE: Have the `ImageStore` string be auto-generated rather than
  //   hard-coded.
  // TEMPLATE: only auto-generate store-related stuff when the user requests it.
  mixins: [helpers.FluxMixin, StoreWatchMixin('<%= storename %>')],

  // TEMPLATE: this method should only exist if the user requested a store.
  getStateFromFlux: function () {
    return this.getFlux().store('<%= storename %>').getState();
  },

  render: function () {
    return (
      <div className='<%= name %>-view'>
        <pre><%= name %></pre>
      </div>
    );
  }

});