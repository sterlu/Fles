import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';

const About = () => (
  <div className="about-wrapper">
    <h1>O projektu <b>Fleš Njuz</b></h1>
    <p>
      Instalacija Fleš nastala je inspirisana fenomenom lažnih vesti.
      <br />
      <br />
      Prvo je formirana baza sa prikupljenih 750.000 tekstova sa informativnih portala u Srbiji.
      Zatim je formiran nov informativni portal (tzv. VI portal lažnih vesti) gde su generisani novi
      tekstovi pomoću dubinskog učenja, a iz pomenute baze tekstova. Portal je osmišljen sa svim
      funkcijama koje ima prosečan informativni portal, tako da posetioci mogu da ostavljaju
      komentare, dele članke po mreži, lajkuju i sl. Radi apsolutne verodostojnosti/istinosti
      informativnog portala, tj. njegovog stvarnog postojanja, odštampan je primerak novina sa
      presekom vesti u jednom danu.
      <br />
      <br />
      Rad je odgovor na vreme i okruženje u kom živimo, u vreme postistine, kada smo svakodnevno
      zasuti nepreglednom količinom informaciji od kojih je veliki broj lažan. Zbog zasutosti i
      opsednutošću tehnologijom većina konzumenata ne nalazi prostor za samorefleksiju niti može da
      prepozna šta je lažna vest, a šta ne. Takođe, na širem planu, rad preispituje samu istinost
      vesti, jer koliko istinosti ima u bilo kojoj uređenoj vesti koju plasiraju ili su plasirali
      mediji.
    </p>

    <a href="https://muzejnt.rs/sutra/portfolio-item/fles/">
      https://muzejnt.rs/sutra/portfolio-item/fles/
    </a>

    <br />
    <br />

    <Link to="/">Nazad</Link>
  </div>
);

export default About;
