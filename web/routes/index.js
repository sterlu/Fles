const express = require('express');
const router = express.Router();
const { Client } = require('pg');


/* GET home page. */
router.get('/', async (req, res, next) => {
  const client = new Client({
    database: 'scraped_news'
  });
  try {
    client.connect();

    const news = await client.query(`SELECT * FROM generated ORDER BY random() LIMIT 14`);
    console.log(news.rows);

    res.render('index', { title: 'Fleš Vesti', news: news.rows });
  } catch (e) {
    console.error(e);
    client.end();
    next();
  }
});

module.exports = router;
