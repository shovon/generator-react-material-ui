var React = require('react');
var Fluxxor = require('Fluxxor');
var helpers = require('../../helpers.js');
var ImageView = require('../ImageView');

var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  mixins: [helpers.FluxMixin, StoreWatchMixin('ImageStore')],

  getStateFromFlux: function () {
    return this.getFlux().store('ImageStore').getState();
  },

  render: function () {
    var images = this.state
      .images
      .slice(0, this.state.images.length);

    images.sort(function (a, b) {
      return b.datetime - a.datetime;
    })

    images = images
      .filter(function (image) {
        return image.savedLocal;
      })
      .slice(0, 5);

    return (
      <div className='favorites-view'>
        {images.map(function (image) {
          return (
            <ImageView key={image.id} image={image} />
          )
        })}
      </div>
    );
  }
});