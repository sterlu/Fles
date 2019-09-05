from textgenrnn import textgenrnn
from flask import Flask, request, jsonify
from .utils import normalize_title

title_model = textgenrnn(weights_path='network/models/5/naslovi_weights.hdf5',
                         vocab_path='network/models/5/naslovi_vocab.json',
                         config_path='network/models/5/naslovi_config.json')


def generate(prefix="", n=1):
    titles = title_model.generate(n, temperature=0.8, return_as_list=True, prefix=prefix)
    return list(map(lambda t: normalize_title(t, '')[0], titles))


generate()

app = Flask(__name__)


@app.route('/suggest/')
def server_suggest():
    title_prefix = request.args.get("prefix", "")
    return jsonify(generate(title_prefix, 3))


app.run(port=5000)
