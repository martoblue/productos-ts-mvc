const { hydra } = require('../config/hydraConfig');

async function validateToken(token) {
  let message = hydra.createUMFMessage({
    to: 'auth-service:[POST]/auth/validatetoken',
    from: 'products-service',
    body: { token },
  });

  try {
    let response = hydra.makeAPIRequest(message);
    console.log(response);
    if (response.statusCode === 200) {
      return response.result;
    } else {
      throw new Error(response.statusMessage || 'Error processing validation request');
    }
  } catch (error) {
    console.error('Error communicating with API server', error);
    throw new Error('Authentication Service Error: ' + error.message);
  }
}

module.exports = { validateToken };
