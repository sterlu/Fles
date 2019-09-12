const { Pool } = require('pg');
const fetch = require('node-fetch');

const pool = new Pool({
  database: 'scraped_news'
});

const _isUpper = str => str && str === str.toUpperCase();

if (process.argv.length < 4)
  throw new Error('usage: node scrapefeed link tablename');

const scrapeNews = async (continuation = '') => {
  const response = await fetch(
    `https://feedly.com/v3/streams/contents`
    + `?streamId=feed%2F${encodeURIComponent(process.argv[2])}`
    + `&count=1000`
    + `&ranked=newest`
    + `&continuation=${continuation}`
  );
  const data = await response.json();
  console.log('fetched ' + data.items.length);
  console.log('continue from ', data.continuation);
  const promises = data.items.map(async ({ id, title, summary, originId, published }) => {
    let _title = title.split(' ');
    let hypeTitle = '';
    while (_isUpper(_title[0]) && !(_title[0].length === 1 && !_isUpper(_title[1]))) {
      hypeTitle += _title[0] + ' ';
      _title = _title.slice(1);
    }
    const normalizedTitle = _title.join(' ').replace(/[„“"']/g, '');
    hypeTitle = hypeTitle.replace(/[„“"']/g, '');
    await pool.query(`
         INSERT INTO ${process.argv[3]}
           (id, title, summary, url, published, pre_title) 
           VALUES ($1, $2, $3, $4, $5, $6)
        `, [id, normalizedTitle, summary && summary.content, originId, published, hypeTitle]);
  });
  Promise.all(promises).then(() => {
    if (data.continuation) scrapeNews(data.continuation);
  });
};

scrapeNews();
