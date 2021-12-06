const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio');
const { text } = require('cheerio/lib/api/manipulation');
const { response } = require('express');
const express = require('express')

const app = express();

const URL = 'https://www.euronews.com/'

axios(URL)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        const articles = []
        $('.m-object__title', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })

        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))