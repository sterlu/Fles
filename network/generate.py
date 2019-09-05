from textgenrnn import textgenrnn
import random
import pg8000
from .utils import normalize_title

title = textgenrnn(weights_path='network/models/5/naslovi_weights.hdf5',
                   vocab_path='network/models/5/naslovi_vocab.json',
                   config_path='network/models/5/naslovi_config.json')

pre = textgenrnn(weights_path='network/models/5/prednaslovi_weights.hdf5',
                 vocab_path='network/models/5/prednaslovi_vocab.json',
                 config_path='network/models/5/prednaslovi_config.json')


def random_cat():
    categories = ['hronika', 'svet', 'društvo', 'zabava', 'sport', 'vesti', 'kultura']
    return categories[random.randint(0, len(categories) - 1)]


conn = pg8000.connect(database='scraped_news', user='postgres')
cursor = conn.cursor()

for i in range(0, 1):
    pre_title = ''
    main_title = ''
    while True:
        if random.random() > 0.5:
            pre_title = pre.generate(1, temperature=0.6, return_as_list=True)[0].upper()
            if len(pre_title) < 6:  # filter out short titles
                print('REJECTING: ' + pre_title)
                # continue
        main_title = title.generate(1, temperature=0.6, return_as_list=True)[0]
        pre_title, main_title = normalize_title(pre_title, main_title, capitalize=True)
        print(pre_title + ' ' + main_title)
        break

    cursor.execute('INSERT INTO generated (title, pre_title, category) VALUES (%s, %s, %s)',
                   (main_title, pre_title, random_cat()))
conn.commit()
cursor.close()
conn.close()
