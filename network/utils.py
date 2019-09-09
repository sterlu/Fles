import re
import random


def _clean_string(__input):
    _input = __input.replace(' , ', ', ') \
        .replace(', ,', ',') \
        .replace(' ” ', '') \
        .replace(':::', ':') \
        .replace('::', ':') \
        .replace(' : ', ': ') \
        .replace(' ?', '?') \
        .replace(' !', '!') \
        .replace(' - ', '-') \
        .replace(' u u ', ' u ') \
        .replace(' . . .', '...') \
        .replace('(kurir tv)', '')
    _input = re.sub(r'\( ([^\)]*) \)', r'(\1)', _input)  # ( asdf ) -> (asdf)
    _input = re.sub(r'(\d) \. (\d)', r'\1.\2', _input)  # 118 . 9 -> 118.9
    _input = re.sub(r'(\d) , (\d)', r'\1,\2', _input)  # 3 , 2 -> 3,2
    return _input


def normalize_title(pre_title, main_title, capitalize=False):
    if len(pre_title) and pre_title[-1].isalpha():
        pre_title = pre_title + ':'
    pre_title = pre_title.replace('( FOTO ) ', '').replace('( VIDEO ) ', '')
    pre_title = _clean_string(pre_title)
    main_title = re.sub(r'^[^\w]*', r'', main_title)  # remove non-letters from beginning
    main_title = _clean_string(main_title)
    if capitalize:
        main_title = main_title[0].upper() + main_title[1:]  # capitalize
        main_title = main_title.replace(' u bih ', ' u BIH ') \
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
            .replace('prištin', 'Prištin') \
            .replace('banjaluk', 'Banjaluk') \
            .replace('leskov', 'Leskov')
    if main_title[-2:] == '' u'' \
            or main_title[-2:] == ' u' \
            or main_title[-3:] == ' od' \
            or main_title[-3:] == ' sa' \
            or main_title[-3:] == ' je' \
            or main_title[-3:] == ' da' \
            or main_title[-4:] == ' kod':
        main_title = main_title + '...'
    if main_title[-5:] == 'video':
        main_title = main_title[0:-5] + '(VIDEO)'
    if main_title[-4:] == 'foto':
        main_title = main_title[0:-4] + '(FOTO)'

    return pre_title, main_title


def random_cat():
    categories = ['hronika', 'svet', 'društvo', 'zabava', 'sport', 'vesti', 'kultura']
    return categories[random.randint(0, len(categories) - 1)]
