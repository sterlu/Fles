import sys

errorLog = open("stderr.txt", "w", 1)
errorLog.write("---Starting Error Log---\n")
sys.stderr = errorLog
stdoutLog = open("stdout.txt", "w", 1)
stdoutLog.write("---Starting Standard Out Log---\n")
sys.stdout = stdoutLog

import tensorflow
from textgenrnn import textgenrnn
t = textgenrnn(name="naslovi")
t.reset()

t.train_from_file('naslovi.input.prepared', 
                  new_model=True,
                  word_level=True,
                  num_epochs=3,
                  gen_epochs=1,
                  max_length=8,
                  batch_size=2048,
                  max_words=130000,
                  rnn_size=256,
                  rnn_layers=4,
                  dropout=0.2
)

# num_epochs: Number of epochs to train for (default: 50)
# gen_epochs: Number of epochs to run between generating sample outputs; good for measuring model progress (default: 1)
# batch_size: Batch size for training; may want to increase if running on a GPU for faster training (default: 128)
# train_size: Random proportion of sequence samples to keep: good for controlling overfitting. The rest will be used to train as the validation set. (default: 1.0/all). To disable training on the validation set (for speed), set validation=False.
# dropout: Random number of tokens to ignore each epoch. Good for controlling overfitting/making more resilient against typos, but setting too high will cause network to converge prematurely. (default: 0.0)
# is_csv: Use with train_from_file if the source file is a one-column CSV (e.g. an export from BigQuery or Google Sheets) for proper quote/newline escaping.
# word_level: Whether to train the model at the word level (default: False)
# rnn_layers: Number of recurrent LSTM layers in the model (default: 2)
# rnn_size: Number of cells in each LSTM layer (default: 128)
# rnn_bidirectional: Whether to use Bidirectional LSTMs, which account for sequences both forwards and backwards. Recommended if the input text follows a specific schema. (default: False)
# max_length: Maximum number of previous characters/words to use before predicting the next token. This value should be reduced for word-level models (default: 40)
# max_words: Maximum number of words (by frequency) to consider for training (default: 10000)
# dim_embeddings: Dimensionality of the character/word embeddings (default: 100)