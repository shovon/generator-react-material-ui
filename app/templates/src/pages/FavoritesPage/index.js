var React = require('react');
var ImageStore = require('../../stores/ImageStore');
var FavoritesView = require('../../views/FavoritesView');
var Fluxxor = require('Fluxxor');

var stores = {
  ImageStore: new ImageStore()
};

var actions = {
  likedImage: function (image) {
    this.dispatch('LIKED_IMAGE', {image: image});
  }
};

var flux = new Fluxxor.Flux(stores, actions);

module.exports = React.createClass({
  render: function () {
    return (
      <div className='favourites-page'>
        <FavoritesView flux={flux} />
      </div>
    );
  }
});