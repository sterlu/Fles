from textgenrnn import textgenrnn
import pg8000
import re
import random

title = textgenrnn(weights_path='blic_naslovi_full_weights.hdf5',
                   vocab_path='blic_naslovi_full_vocab.json',
                   config_path='blic_naslovi_full_config.json')

pre = textgenrnn(weights_path='blic_naslovi_hype_weights.hdf5',
                 vocab_path='blic_naslovi_hype_vocab.json',
                 config_path='blic_naslovi_hype_config.json')

conn = pg8000.connect(database='scraped_news', user='nikolavukovic')
cursor = conn.cursor()


def random_cat():
    categories = ['hronika', 'svet', 'društvo', 'zabava', 'sport', 'vesti', 'kultura']
    return categories[random.randint(0, len(categories)-1)]


for i in range(0, 50):
    pre_title = pre.generate(1, temperature=0.8, return_as_list=True)[0].upper()
    main_title = title.generate(1, temperature=0.4, return_as_list=True)[0]
    if len(pre_title) < 6:  # filter out short titles
        print('REJECTING: ' + pre_title)
        continue
    if pre_title[-1] != ':' and pre_title[-1] != '?' and pre_title[-1] != '!':
        pre_title = pre_title + ':'
    pre_title = re.sub(r'^[^\w]*', r'', pre_title)  # remove non-letters from beginning
    main_title = re.sub(r'^[^\w]*', r'', main_title)  # remove non-letters from beginning
    main_title = main_title[0].upper() + main_title[1:]  # capitalize
    generated_title = pre_title + ' ' + main_title
    generated_title = generated_title.replace(' , ', ', ') \
        .replace(', ,', ',') \
        .replace(' ” ', '') \
        .replace(':::', ':') \
        .replace('::', ':') \
        .replace(' : ', ': ') \
        .replace(' ?', '?') \
        .replace(' !', '!') \
        .replace(' - ', '-') \
        .replace(' u u ', ' u ') \
        .replace(' u bih ', ' u BIH ') \
        .replace(' U bih ', ' U BIH ') \
        .replace(' eu', ' EU') \
        .replace('vučić', 'Vučić') \
        .replace('tramp', 'Tramp') \
        .replace('srbij', 'Srbij') \
        .replace('nemačk', 'Nemačk') \
        .replace('hrvatsk', 'Hrvatsk') \
        .replace('pariz', 'Pariz') \
        .replace('beograd', 'Beograd') \
        .replace('subotica', 'Subotica') \
        .replace('pančev', 'Pančev') \
        .replace('kosov', 'Kosov') \
        .replace('niš', 'Niš') \
        .replace('beč', 'Beč') \
        .replace('sarajev', 'Sarajev') \
        .replace('sirij', 'Sirij') \
        .replace('split', 'Split') \
        .replace('sfrj', 'SFRJ') \
        .replace('putin', 'Putin') \
        .replace('đoković', 'Đoković') \
        .replace('jelena', 'Jelena') \
        .replace('jugoslavij', 'Jugoslavij') \
        .replace('dačić', 'Dačić') \
        .replace('leskov', 'Leskov')
    generated_title = re.sub(r'\( ([^\)]*) \)', r'\1', generated_title)  # ( asdf ) -> (asdf)
    generated_title = re.sub(r'(\d) \. (\d)', r'\1.\2', generated_title)  # 118 . 9 -> 118.9
    generated_title = re.sub(r'(\d) , (\d)', r'\1,\2', generated_title)  # 3 , 2 -> 3,2
    generated_title = generated_title.replace(' . ', '. ')
    if generated_title[-2:] == '' u'' \
            or generated_title[-2:] == ' u' \
            or generated_title[-3:] == ' od' \
            or generated_title[-3:] == ' sa' \
            or generated_title[-3:] == ' je' \
            or generated_title[-3:] == ' da' \
            or generated_title[-4:] == ' kod':
        generated_title = generated_title + '...'
    if generated_title[-5:] == 'video':
        generated_title = generated_title[0:-5] + '(VIDEO)'
    if generated_title[-4:] == 'foto':
        generated_title = generated_title[0:-4] + '(FOTO)'
    print('\t' + generated_title)
    cursor.execute('INSERT INTO generated (title, category) VALUES (%s, %s)', (generated_title, random_cat()))

conn.commit()
