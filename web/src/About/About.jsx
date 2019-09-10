import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';

const About = () => (
  <div className="about-wrapper">
    <h1>O projektu <b>Fleš Njuz</b></h1>
    <p>
      Fleš Njuz projekat je nastao za <a href="https://muzejnt.rs/sutra/" target="_blank">SUTRA
      Festival</a> inspirisanan fenomenom lažnih vesti. Prikazane vesti generiše neuronska mreža
      obučena uz pomoć 700.000 naslova sa domaćih informativnih portala.
    </p>
    <p>
      Rad je odgovor na vreme i okruženje u kom živimo, u vreme postistine, kada smo svakodnevno
      zasuti nepreglednom količinom informaciji od kojih je veliki broj lažan. Zbog zasutosti i
      opsednutošću tehnologijom većina konzumenata ne nalazi prostor za samorefleksiju niti može da
      prepozna šta je lažna vest, a šta ne. Takođe, na širem planu, rad preispituje samu istinost
      vesti, jer koliko istinosti ima u bilo kojoj uređenoj vesti koju plasiraju ili su plasirali
      mediji.
    </p>

    <p>
      Projekat su realizovali <a href="https://github.com/sterlu" target="_blank">Nikola
      Vuković</a> i <a href="http://lomz.net" target="_blank">Vukašin Stančević</a>. Kod je dostupan
      na <a href="https://github.com/sterlu/Fles/" target="_blank">onlajn</a>.
    </p>

    <Link to="/">Nazad</Link>
  </div>
);

export default About;
