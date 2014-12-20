var Fluxxor = require('Fluxxor');

module.exports = Fluxxor.createStore({

  initialize: function () {

    // This is where you would initialize properties of your store. If you are
    // initializing attributes asynchronously, then you may consider calling
    // `this.emit('change')`.
    //
    // Example:
    //
    //     this.someAttribute = [];
    //
    //     request('/some-resource', function (err, res) {
    //       this.someAttrubte = JSON.parse(res.data);
    //       this.emit('change');
    //     }.bind(this));

    // You may also want to bind some actions.
    //
    // Example:
    //
    //     this.bindActions(
    //       'DO_SOMETHING', this.doSomething
    //     );

  },

  // If you bound some actions in the `initialize` method, then it may be best
  // to have those actions refer to a method in this class. In this case, create
  // the method here. Example:
  //
  //     doSomething: function () {
  //       // Maybe do something with `this.someAttribute`?
  //
  //       // Call this if you've made some changes to this store.
  //       this.emit('change');
  //     },

  getState: function () {
    return {

      // Whatever attributes you initialized in the `intialize` method, you
      // should have it be returned here, like so:
      //
      //     someAttribute: this.someAttribute

    }
  }

});