var React = require('react');
var helpers = require('../../helpers');

module.exports = React.createClass({

  render: function () {
    return (
      <div className='<%= name %>-view'>
        <pre><%= name %></pre>
      </div>
    );
  }

});