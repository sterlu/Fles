const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.get('/', async (req, res, next) => {
  const client = new Client({
    database: 'scraped_news'
  });
  try {
    client.connect();

    const news = await client.query(`SELECT * FROM generated ORDER BY created DESC LIMIT 14`);

    res.render('index', { title: 'Fleš Njuz', news: news.rows });
  } catch (e) {
    console.error(e);
    client.end();
    next();
  }
});

module.exports = router;
