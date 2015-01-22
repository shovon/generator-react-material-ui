var Reflux = require('reflux');

// Imported Actions
// var ReallyCoolActions = require('ReallyCoolActions');

// Or ... create them here.
// var MoreReallyCoolActions = Reflux.createActions(["fireBall","magicMissile"]);

// Creating Stores - (https://github.com/spoike/refluxjs#creating-data-stores)
module.exports = Reflux.createStore({
  
  // This hook is called when the store is first loaded.
  init: function(){},

  // Mixins for stores are plain JS objects (ie. they can be anything - a great way to extend stores).
  // ------
  
  // mixins: [],

  // Registering actions is a one-liner...
  // -------------------------------------
  // listenables: MoreReallyCoolActions,

  // Listening to actions
  // --------------------
  // Imagine we did register the MoreReallyCoolActions above... 
  // The action 'fireBall' would expect a method called 'onFireBall' and likewise a method for 'magicMissile' would be called 'onMagicMissile'.
  // Therefore, the 'listenables' capability above expects stores to have camel-case functions prefixed by 'on' for all actions it is concerned with.
  // Like so:
  
  // onFireBall: function(){
  //   // whoooosh!
  // },
  // onMagicMissile: function(){
  //   // bzzzzapp!
  // }
  
  // Emitting events
  // ---------------
  
  // Events are emitted with the 'trigger(args...)' method.
  // For example:
  //    this.trigger(someEvent)

  // Generally available methods - (https://github.com/spoike/refluxjs#action-hooks)
  // ---------------------------
  // preEmit(event) - Called before the event is sent to components
  // shouldEmit([preEmit() output]) - Returns a boolean. Determines if an event should be triggered.

});
