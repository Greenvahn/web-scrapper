const axios = require("axios");
const cheerio = require("cheerio");

const getCardValues = async(urls) => {
  const values = []
   urls.forEach(async (url) => {
      const props = await axios(url)
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          const title = $(".wikitable > tbody", html)
            .find('tr th[colspan="4"]')
            .not('font[style="font-size:80%"]')
            .text();
          const type = $(".wikitable > tbody", html)
            .find('tr font[style="font-size:80%"]')
            .text();

            return {title: title, type: type}
        })
        .catch((err) => console.log(err.status));

        values.push(props)
        return values;
    });
  }

module.exports=  getCardValues;