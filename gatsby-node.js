'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceNodes = sourceNodes;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sourceNodes(_ref, configOptions) {
  var actions = _ref.actions,
      createNodeId = _ref.createNodeId;
  var createNode = actions.createNode;

  // Gatsby adds a configOption that's not needed for this plugin, delete it

  delete configOptions.plugins; // eslint-disable-line no-param-reassign

  // Helper function that processes a picture to match Gatsby's node structure
  var processDog = function processDog(theDog) {
    var nodeId = createNodeId('dog-' + theDog.id);
    var nodeContent = JSON.stringify(theDog);
    var nodeContentDigest = _crypto2.default.createHash('md5').update(nodeContent).digest('hex');

    var nodeData = Object.assign({}, theDog, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'DogApiPic',
        content: nodeContent,
        contentDigest: nodeContentDigest
      }
    });

    return nodeData;
  };

  // Convert the options object into a query string
  var apiOptions = _queryString2.default.stringify(configOptions);

  // Join apiOptions with `The Dog API` API URL
  var dogApiUrl = 'https://api.thedogapi.com/v1/images/?' + apiOptions;

  // Gatsby expects sourceNodes to return a promise
  return (0, _nodeFetch2.default)(dogApiUrl, {
    method: 'GET',
    headers: {
      'x-api-key': configOptions['x-api-key']
    }
  })
  // Parse the response as JSON
  .then(function (res) {
    return res.json();
  })
  // Process the JSON data into a node
  .then(function (data) {
    data.forEach(function (theDog) {
      var nodeData = processDog(theDog);
      createNode(nodeData);
    });
  });
}