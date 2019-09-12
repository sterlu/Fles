# Fleš Njuz 


Informativni portal baziran na veštačkoj inteligenciji. Drugim rečima: fejk njuz generator.

Pročitajte više [ovde](https://medium.com/@SterLu/750-hiljada-naslova-a-onda-je-tek-počela-akcija-cbd04aeeb7d1).

Podaci i modeli su dostupni [ovde](https://drive.google.com/drive/folders/1WQYL0MzltMvi9DtL8euaZveMwCd2tYpH?usp=sharing).


## Setup
- install dependencies
```bash
pip3 install -r network/requirements.txt
cd web
npm install
```
- Set up Postgre database `scraped_news` using `web/db.sql` 


## Run
Start server:
```bash
cd web
npm run start
```

Start suggestions API:
```bash
python3 -m network.server
```

Build frontend:
```bash
cd web
npm run build
```
Alternatively, start live dev server:
```bash
cd web
npm run dev
```
