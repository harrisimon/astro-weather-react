// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {

  const variable1 = event.queryStringParameters.variable1;
  const variable2 = event.queryStringParameters.variable2;
  console.log(variable1, variable2)
const url = `http://www.7timer.info/bin/api.pl?lon=${variable1}&lat=${variable2}&product=astro&output=json`; // Replace with your API's HTTP URL

try {
  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: data,
  };
} catch (error) {
  return {
    statusCode: 500,
    body: JSON.stringify({ error: 'Failed to fetch data' }),
  };
}
}

module.exports = { handler }
