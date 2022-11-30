// const PORT = 8000
const axios = require("axios");
const cheerio = require("cheerio");
// const express = require('express');
const path = require("path");
const fs = require("fs");

const pathFile = path.join(__dirname, "data/data.json");

// const app = express();

const URL = "https://www.ign.com/wikis/the-elder-scrolls-legends/Every_Card_List";
const URL2 = "https://elderscrollslegends.wiki.fextralife.com/file/Elder-Scrolls-Legends/";
const URL3 = "https://en.uesp.net/wiki/Legends:";

const updateFile = (newData) => {
  // const newData = `${existingData},${newProfile.firstName}|${newProfile.lastName}|${newProfile.age}`;
  fs.writeFileSync(pathFile, newData, { enconding: "utf-8" });
  console.log(`Successfully written on ${pathFile}`);
};

const getCards = async () => {
  const cardtitles = await axios(URL)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const res = [];

      $(".tyJCtd.mGzaTb.baZpAe", html)
        .find("ul li")
        .each(function () {
          res.push({
            title: $(this).text(),
          });
        });

      return res;
    })
    .catch((err) => console.log(err));

    

        cardtitles.forEach(async (element) => {
            const tempURL = `${URL3}${escape(element.title.replace(/ /g,"_"))}`
            // console.log("tempURL", tempURL)
            const values = await axios(tempURL)
            .then((response) => {
              const html = response.data;
              const $ = cheerio.load(html);
              const res = [];

              const title = $(".wikitable > tbody", html).find('tr th[colspan="4"]').not('font[style="font-size:80%"]').text();
              const type = $(".wikitable > tbody", html).find('tr font[style="font-size:80%"]').text();

              console.log("title -->", title)
              console.log("type -->", type)

            })
            .catch((err) => console.log(err.status, element.title));
        });

    // cardAtributes();
    
    
    
    const core = []
    cardtitles.forEach(element => {
        const url_cardname = element.title.replace(/ /g,"_").replace(/’/g,"").toLowerCase();
        core.push({
            title: element.title,
            url: `${URL2}${url_cardname}.png`
        })
    });

  updateFile(JSON.stringify(core));
};

getCards();

// app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
