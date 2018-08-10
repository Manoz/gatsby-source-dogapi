import crypto from 'crypto';
import fetch from 'node-fetch';
import queryString from 'query-string';

export function sourceNodes({ actions, createNodeId }, configOptions) {
  const { createNode } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins; // eslint-disable-line no-param-reassign

  // Helper function that processes a picture to match Gatsby's node structure
  const processDog = (theDog) => {
    const nodeId = createNodeId(`dog-${theDog.id}`);
    const nodeContent = JSON.stringify(theDog);
    const nodeContentDigest = crypto
      .createHash('md5')
      .update(nodeContent)
      .digest('hex');

    const nodeData = Object.assign({}, theDog, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'DogApiPic',
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    });

    return nodeData;
  };

  // Convert the options object into a query string
  const apiOptions = queryString.stringify(configOptions);

  // Join apiOptions with `The Dog API` API URL
  const dogApiUrl = `https://api.thedogapi.com/v1/images/?${apiOptions}`;

  // Gatsby expects sourceNodes to return a promise
  return (
    fetch(dogApiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': configOptions['x-api-key'],
      },
    })
      // Parse the response as JSON
      .then(res => res.json())
      // Process the JSON data into a node
      .then((data) => {
        data.forEach((theDog) => {
          const nodeData = processDog(theDog);
          createNode(nodeData);
        });
      })
  );
}
