import random
import pg8000
from textgenrnn import textgenrnn
from flask import Flask, request, jsonify
from .utils import normalize_title, random_cat

title_model = textgenrnn(weights_path='network/models/5/naslovi_weights.hdf5',
                         vocab_path='network/models/5/naslovi_vocab.json',
                         config_path='network/models/5/naslovi_config.json')

pre_model = textgenrnn(weights_path='network/models/5/prednaslovi_weights.hdf5',
                       vocab_path='network/models/5/prednaslovi_vocab.json',
                       config_path='network/models/5/prednaslovi_config.json')


def generate(prefix="", n=1):
    titles = title_model.generate(n, temperature=0.6, return_as_list=True, prefix=prefix)
    return list(map(lambda t: normalize_title('', t)[1], titles))


title_model.generate(1)
pre_model.generate(1)

app = Flask(__name__)


@app.route('/suggest/')
def server_suggest():
    title_prefix = request.args.get("prefix", "")
    return jsonify(generate(title_prefix, 3))


@app.route('/report/')
def server_report():
    title = request.args.get("title", "")
    initials = request.args.get("initials", "")[0:2]

    conn = pg8000.connect(database='scraped_news', user='postgres')
    cursor = conn.cursor()

    pre_title = ''
    if random.random() > 0.5:
        pre_title = pre_model.generate(1, temperature=0.6, return_as_list=True)[0].upper()
    if len(pre_title) < 6:
        pre_title = ''
    pre_title, main_title = normalize_title(pre_title, title, capitalize=True)

    cursor.execute('INSERT INTO reported (title, pre_title, category, initials) VALUES (%s, %s, %s, %s) RETURNING id',
                   (title, pre_title, random_cat(), initials))
    row_id = cursor.fetchone()[0]
    cursor.execute('SELECT pre_title, title, id, created, initials, category FROM reported WHERE id=%s', (row_id, ))
    new_row = cursor.fetchone()
    keys = [k[0].decode('ascii') for k in cursor.description]
    new_row = dict(zip(keys, new_row))
    print(new_row)
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'status': True, 'reported': new_row})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
