// netlify/functions/proxy.js

const fetch = require('node-fetch');

exports.handler = async (event, context, lat, long) => {
  const url = `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=astro&output=json`; // Replace with your API's HTTP URL

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
