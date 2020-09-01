const originRequest = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

for(let i=100553;i<100573;i++){
  originRequest(
    `https://www.dy2018.com/i/${i}.html`, 
    {
      url: `https://www.dy2018.com/i/${i}.html`, 
      encoding: null
    },
    function (error, response, body) {
      body = iconv.decode(body, 'gb2312');
      const $ = cheerio.load(body)
      console.log('标题:', $('.title_all h1').text()); // Print the HTML for the Google homepage.
    });
  
}














