var Fluxxor = require('Fluxxor');

// TEMPLATE: remove this.
var request = require('superagent');

// TEMPLATE: remove this.
IMAGES_KEY = 'imgur-images';

// TEMPLATE: remove this.
function createImageObject(image) {
  var obj = {};
  Object.keys(image).forEach(function (key) {
    obj[key] = image[key];
  });
  obj.savedLocal = obj.savedLocal || false;
  return obj;
}

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
    //     }.bind(this))

    // TEMPLATE: remove this.
    var localImages = localStorage.getItem(IMAGES_KEY);
    if (!localImages) {
      localImages = [];
      localStorage.setItem(IMAGES_KEY, localImages);
    } else {
      try {
        localImages = JSON.parse(localImages);
      } catch (e) {
        localImages = [];
        localStorage.setItem(IMAGES_KEY, localImages);
      }
    }
    this.images = localImages;

    // TEMPLATE: remove this.
    request
      .get('https://api.imgur.com/3/gallery/hot/viral/0.json')
      .set('Authorization', 'Client-ID 1de82be6684feb9')
      .end(function (error, res) {
        var parsed = JSON.parse(res.text).data.filter(function (image) {
          return image.type === 'image/jpeg';
        }).map(createImageObject);
        var set = {};
        this.images.forEach(function (image) {
          set[image.id] = image;
        });
        parsed.forEach(function (image) {
          set[image.id] = set[image.id] || image;
        });
        this.images = Object.keys(set).map(function (key) {
          return set[key];
        });
        localStorage.setItem(
          IMAGES_KEY,
          JSON.stringify(
            this.images.filter(function (image) {
              return image.savedLocal;
            })
          )
        );
        this.emit('change');
      }.bind(this));

    // You may also want to bind some actions.
    //
    // Example:
    //
    //     this.bindActions(
    //       'DO_SOMETHING', this.doSomething
    //     );

    // TEMPLATE: remove this.
    this.bindActions(
      'LIKED_IMAGE', this.onLikedImage
    );
  },

  // If you bound some actions in the `initialize` method, then it may be best
  // to have those actions refer to a method in this class. In this case, create
  // the method here.

  // TEMPLATE: remove this method.
  onLikedImage: function (payload) {
    this.images = this.images.map(function (image) {
      var obj = {};
      Object.keys(image).forEach(function (key) {
        obj[key] = image[key];
      });
      if (obj.id === payload.image.id) {
        obj.savedLocal = !obj.savedLocal;
      }
      return obj;
    });
    localStorage.setItem(
      IMAGES_KEY,
      JSON.stringify(
        this.images.filter(function (image) {
          return image.savedLocal;
        })
      )
    );
    this.emit('change');
  },

  getState: function () {
    return {
      // Whatever attributes you initialized in the `intialize` method, you
      // should have it be returned here, like so:
      //
      //     someAttribute: this.someAttribute

      // TEMPLATE: Remove the `images` property.
      images: this.images
    }
  }
});