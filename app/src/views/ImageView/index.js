var React = require('react');
var helpers = require('../../helpers');

// TEMPLATE: this is yet another "view" created by a generator. Take a look at
//   the example in `../HomeView/index.js`, as well as the overfall folder
//   structure of `../HomeView`, and potentially other "views" in the `../views`
//   folder.

// TEMPLATE: remove this.
var mui = require('material-ui');

// TEMPLATE: remove this.
var IconButton = mui.IconButton;

module.exports = React.createClass({
  mixins: [helpers.FluxMixin],

  // If you have any required properties, you may want to declare them here, by
  // declaring an object, and setting it as the `propTypes` property. Each
  // property of that object represents the required property.
  //
  // Example:
  //
  //     propTypes: {
  //       image: React.PropTypes.object.isRequired
  //     }

  // TEMPLATE: remove this.
  propTypes: {
    image: React.PropTypes.object.isRequired
  },

  render: function () {
    var image = this.props.image;
    var iconname =
      this.props.image.savedLocal ?
        'action-favorite' :
        'action-favorite-outline';
    return (
      <div className='image-view'>
        {/* TEMPLATE: remove the rendering code below. */}
        <p>
          <strong>
            {image.account_url !== null ? image.account_url : 'Anonymous'}
          </strong>
        </p>
        <div className='image-placeholder'>
          <div className='box'>
            <img src={image.link} />
          </div>
        </div>
        <p className='description'>{image.title}</p>
        <IconButton icon={iconname} onClick={this.onLiked} />
      </div>
    );
  },

  // If this view handles events, that affects the state of stores, then you
  // may consider adding an event handler, like so:
  //
  //     onSomeEvent: function () {
  //       this.getFlux().actions.someAction(this.props.someProperty);
  //     }

  // TEMPLATE: remove this.
  onLiked: function () {
    this.getFlux().actions.likedImage(this.props.image);
  }
});