var React = require('react');
var ImageStore = require('../../stores/ImageStore');
var helpers = require('../../helpers');
var Fluxxor = require('Fluxxor');
var ImageView = require('../ImageView');

// TEMPLATE: only auto-generate store-related stuff when the user requests it.
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  // TEMPLATE: Have the `ImageStore` string be auto-generated rather than
  //   hard-coded.
  // TEMPLATE: only auto-generate store-related stuff when the user requests it.
  mixins: [helpers.FluxMixin, StoreWatchMixin('ImageStore')],

  // TEMPLATE: this method should only exist if the user requested a store.
  getStateFromFlux: function () {
    // TEMPLATE: Have the `ImageStore` string be auto-generated rather than
    //   hard-coded.
    return this.getFlux().store('ImageStore').getState();
  },

  render: function () {
    // TEMPLATE: remove this code.
    var images = this.state.images.slice(0, this.state.images.length);
    images.sort(function (a, b) {
      return b.datetime - a.datetime;
    });

    return (
      <div className='home-view'>
        {/* TEMPLATE: remove the rendering code below. */}
        {images.slice(0, 5).map(function (image) {
          return (
            <ImageView key={image.id} image={image} />
          );
        })}
      </div>
    );
  }

});