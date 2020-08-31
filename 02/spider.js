const originRequest = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

originRequest('https://www.dy2018.com/i/102349.html', function (error, response, body) {


  str = iconv.decode(body, 'gb2312');
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', str); // Print the HTML for the Google homepage.


});
