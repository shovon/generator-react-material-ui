var React = require('react');
// var Reflux = require('reflux');

// Imported Stores
// var ReallyFancyStore = require('ReallyFancyStore');

module.exports = React.createClass({

  // This is how mixins are added. Mixins are plain JS objects which are used to manage state among other things.
  // The mixin below (Reflix.ListenerMixin), add the 'listenTo' method which allows a component to register with a store. Every time the store calls it's 'trigger(event)' method, all components registered will be updated.
  // mixins: [Reflux.ListenerMixin],

  // Life-cycle methods - Mounting (http://facebook.github.io/react/docs/working-with-the-browser.html#mounting)
  // -----------------------------

  // Should return an object. Invoked before a component is mounted. Stateful components should implement this and return the initial state data.
  // getInitialState: function(){ return {}},

  // Invoked immediately after mounting occurs. Initialization that requires DOM nodes should go here.
  // This is an example of how to register this component to listen to all updates to the 'ReallyFancyStore'.
  // The registered function used should consume all arguments/objects emitted by the store.
  
  // componentDidMount: function() {
  //   this.listenTo(ReallyFancyStore, this.onStatusChange);
  // },
  // onStatusChange: function(status) {
  //   this.setState({
  //     currentStatus: status
  //   });
  // },
  
  // Invoked immediately before mounting occurs.
  // componentWillMount: function(){},

  // Life-cycle methods - Updating (http://facebook.github.io/react/docs/working-with-the-browser.html#updating)
  // -----------------------------
  
  // Invoked immediately before updating occurs. You cannot call this.setState() here.
  // componentWillUpdate: function(nextProps, nextState){},
  
  // Invoked immediately after updating occurs.
  // componentDidUpdate: function(prevProps, prevState){},
  
  // Life-cycle methods - Unmounting (http://facebook.github.io/react/docs/working-with-the-browser.html#unmounting)
  // -------------------------------
  
  // Invoked immediately before a component is unmounted and destroyed. Cleanup should go here.
  // componentWillUnmount: function(){},
  
  // Generally available component methods (http://facebook.github.io/react/docs/working-with-the-browser.html#mounted-methods)
  // -------------------------------------
  // this.forceUpdate() - Can be invoked on any mounted component when you know that some deeper aspect of the component's state has changed without using this.setState().
  // this.setState(someObject) - Can be used to set component state (causes the component to be re-rendered)
  // this.getDOMNode() - Returns a DOMElement. Can be invoked on any mounted component in order to obtain a reference to its rendered DOM node.

  // Renders the actual component
  render: function () {
    return (
      <div className='<%= className %>-page'>
        <%= title %>
      </div>
    );
  }

});
