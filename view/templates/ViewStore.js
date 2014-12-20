var React = require('react');
var <%= storename %> = require('../../stores/<%= storename %>');
var helpers = require('../../helpers');
var Fluxxor = require('Fluxxor');

var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  mixins: [helpers.FluxMixin, StoreWatchMixin('<%= storename %>')],

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