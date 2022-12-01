const getTitles = require("./getTitles");
const getUrls = require("./getUrls");
const getCardValues = require("./getCardValues")
const axios = require("axios");
const cheerio = require("cheerio");
// const express = require("express");

const getProperties = async () => {

  const titles = await getTitles();
  const urls = await getUrls("https://en.uesp.net/wiki/Legends:", titles);
  // const props = await getCardValues(urls);

  console.log("urls", urls)
  // console.log("props", props)


  const data = titles.reduce(async(result, card) => {
    result.push({
      title: card.title,
      image: card.url,
      // props: await getCardValues(urls)
    });
    return result;
  }, []);

  return data;
};

module.exports = getProperties;
