const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.get('/latest', async (req, res, next) => {
  const client = new Client({database: 'scraped_news', user: 'nikolavukovic'});
  try {
    client.connect();

    const news = await client.query(`SELECT * FROM generated ORDER BY created DESC LIMIT 14`);

    res.end(JSON.stringify({ articles: news.rows }));
    client.end();
  } catch (e) {
    console.error(e);
    client.end();
    next();
  }
});

module.exports = router;
