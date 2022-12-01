const getUrls = async (URL, titles) => {
  const urls = []
  titles.forEach(card => {
    const tempURL = `${URL}${escape(card.title.replace(/ /g, "_"))}`;
    
    urls.push({
      url: tempURL
    })
  });
  return urls
};

module.exports= getUrls;