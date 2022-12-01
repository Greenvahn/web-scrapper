const axios = require("axios");
const cheerio = require("cheerio");

const URL =
  "https://www.ign.com/wikis/the-elder-scrolls-legends/Every_Card_List";
const URL2 =
  "https://elderscrollslegends.wiki.fextralife.com/file/Elder-Scrolls-Legends/";

const getTitles = async () => {
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

  const core = [];
  cardtitles.forEach((element) => {
    const url_cardname = element.title
      .replace(/ /g, "_")
      .replace(/’/g, "")
      .toLowerCase();
    core.push({
      title: element.title,
      url: `${URL2}${url_cardname}.png`,
    });
  });

  return core;
};

module.exports= getTitles;
