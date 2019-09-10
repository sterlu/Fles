const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.get('/latest', async (req, res, next) => {
  const client = new Client({database: 'scraped_news', user: 'postgres'});
  try {
    client.connect();

    const news = await client.query(`SELECT * FROM generated ORDER BY created DESC LIMIT 26`);
    const reported = await client.query(`SELECT * FROM reported ORDER BY created DESC LIMIT 30`);

    res.end(JSON.stringify({ articles: news.rows, reported: reported.rows }));
    client.end();
  } catch (e) {
    console.error(e);
    client.end();
    next();
  }
});

module.exports = router;

