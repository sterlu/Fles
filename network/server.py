from textgenrnn import textgenrnn
from flask import Flask, request, jsonify
from .utils import normalize_title

title_model = textgenrnn(weights_path='network/models/5/naslovi_weights.hdf5',
                         vocab_path='network/models/5/naslovi_vocab.json',
                         config_path='network/models/5/naslovi_config.json')


def generate(prefix="", n=1):
    titles = title_model.generate(n, temperature=0.6, return_as_list=True, prefix=prefix)
    return list(map(lambda t: normalize_title('', t)[1], titles))


generate()

app = Flask(__name__)


@app.route('/suggest/')
def server_suggest():
    title_prefix = request.args.get("prefix", "")
    return jsonify(generate(title_prefix, 3))


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
