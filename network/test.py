from textgenrnn import textgenrnn
import pg8000
import re

title = textgenrnn(weights_path='blic_naslovi_full_weights.hdf5',
               vocab_path='blic_naslovi_full_vocab.json',
               config_path='blic_naslovi_full_config.json')

hype = textgenrnn(weights_path='blic_naslovi_hype_weights.hdf5',
               vocab_path='blic_naslovi_hype_vocab.json',
               config_path='blic_naslovi_hype_config.json')

conn = pg8000.connect(database="scraped_news", user="nikolavukovic")
cursor = conn.cursor()

for i in range(0, 50):
    generated_title = hype.generate(1, temperature=0.8, return_as_list=True)[0].upper() + ' ' + title.generate(1, temperature=0.4, return_as_list=True)[0]
    generated_title = generated_title.replace(' , ', ', ').replace(' . ', '.').replace(',, ', ',,').replace(' ”', '”').replace(' : ', ': ').replace(' ?', '?')
    generated_title = generated_title.replace(' u bih ', ' u BIH ')
    generated_title = generated_title.replace('vučić', 'Vučić')
    generated_title = generated_title.replace('tramp', 'Tramp')
    generated_title = generated_title.replace('srbij', 'Srbij')
    generated_title = generated_title.replace('nemačk', 'Nemačk')
    generated_title = generated_title.replace('hrvatsk', 'Hrvatsk')
    generated_title = generated_title.replace('pariz', 'Pariz')
    generated_title = generated_title.replace('beograd', 'Beograd')
    generated_title = re.sub(r'\( ([^\)]*) \)', r'\1', generated_title) # ( asdf ) -> (asdf)
    generated_title = re.sub(r'^[^\w]*', r'', generated_title) # remove non-letters from beginning
    if generated_title[-2:] == " u" or generated_title[-2:] == " u":
    	generated_title = generated_title + "..."
    if generated_title[-5:] == "video":
    	generated_title = generated_title[0:-5] + "(VIDEO)"
    if generated_title[-4:] == "foto":
    	generated_title = generated_title[0:-4] + "(FOTO)"
    print(generated_title)
    cursor.execute("INSERT INTO generated (title) VALUES (%s)", (generated_title, ))

conn.commit()

