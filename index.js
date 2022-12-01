// const PORT = 8000
// const axios = require("axios");
// const cheerio = require("cheerio");
// const express = require('express');
const path = require("path");
const fs = require("fs");
const getTitles = require('./utils/getTitles')
const getProperties = require('./utils/getProperties');

const pathFile = path.join(__dirname, "data/");

// const app = express();

// const URL = "https://www.ign.com/wikis/the-elder-scrolls-legends/Every_Card_List";
// const URL2 = "https://elderscrollslegends.wiki.fextralife.com/file/Elder-Scrolls-Legends/";
// const URL3 = "https://en.uesp.net/wiki/Legends:";

const updateFile = (filename, newData) => {
  // const newData = `${existingData},${newProfile.firstName}|${newProfile.lastName}|${newProfile.age}`;
  fs.writeFileSync(pathFile+filename, newData, { enconding: "utf-8" });
  console.log(`Successfully written on ${pathFile}`);
};

const getCards = async () => {
  const basedata = await getProperties()
  updateFile('data.json', JSON.stringify(basedata));
};

getCards();

// app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
