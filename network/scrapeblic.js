const {Pool} = require('pg');
const fetch = require('node-fetch');

const pool = new Pool({
    database: 'scraped_news'
})

const _isUpper = str => str && str === str.toUpperCase()

const scrapeBlic = async (continuation = '') => {
    const response = await fetch(
        `https://feedly.com/v3/streams/contents`
            + `?streamId=feed%2Fhttps%3A%2F%2Fwww.blic.rs%2Frss%2Fdanasnje-vesti` 
            + `&count=1000`
            + `&ranked=newest`
            + `&continuation=${continuation}`
    )
    const data = await response.json()
    console.log('continue from ', data.continuation)
    console.log(data.items.length)
    const promises = data.items.map(async ({id, title, summary, originId, published}) => {
        let _title = title.split(' ');
        let hypeTitle = ''
        while (_isUpper(_title[0]) && !(_title[0].length === 1 && !_isUpper(_title[1]))) {
            hypeTitle += _title[0] + ' '
            _title = _title.slice(1)
        }
        const normalizedTitle = _title.join(' ').replace(/[„“"']/g, '');
        hypeTitle = hypeTitle.replace(/[„“"']/g, '');
        try {
            await pool.query(`
		     INSERT INTO blichronika
		       (id, title, summary, url, published, hype_title) 
		       VALUES ($1, $2, $3, $4, $5, $6)
		    `, [id, normalizedTitle, summary && summary.content, originId, published, hypeTitle]);
        } catch (e) {
        }
    })
    Promise.all(promises).then(() => {
        if (data.continuation) scrapeBlic(data.continuation)
    })
}

scrapeBlic();
