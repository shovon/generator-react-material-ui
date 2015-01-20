var React = require('react');
var helpers = require('../../helpers');
var Fluxxor = require('Fluxxor');

var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  mixins: [helpers.FluxMixin, StoreWatchMixin('<%= storename %>Store')],

  getStateFromFlux: function () {
    return this.getFlux().store('<%= storename %>Store').getState();
  },

  render: function () {
    return (
      <div className='<%= className %>-view'>
        <%= title %>
      </div>
    );
  }

});