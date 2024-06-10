import React, { MutableRefObject, useRef, useState, useEffect, useCallback } from 'react';

import Logo from './logo.tsx';
import LogoG from './logoG.tsx';
import LogoF from './logoF.tsx';

import AHrefed from './aHrefed.component.tsx';

import portrait from './images/Accueil/portrait.webp';

import pagesStyles from './page.module.scss';
import headerStyles from './header.module.scss';
import accueilStyles from './accueil.module.scss';
import projets_experiencesStyles from './projets_experiences.module.scss';

import projets from './projets.json';
import experiences from './experiences.json';
import technologies from './technologies.json';
import skills from './skills.json';
import passions from './passions.json';

import Carousel from './carousel.component.tsx';
import SmallCardsList from './smallCardsList.component.tsx';

function App() {

  //-----------------Dark Mode Default--------------------

  let darkMode = false;

  if(window.matchMedia){
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      darkMode = true;
    }
  }

  //----------------Dark Mode Toggle--------------------

  const [isOn, setIsOn] = useState(darkMode);

  const toggleSwitch = useCallback(() => setIsOn(!isOn), [isOn]);

  //--------------------Refs--------------------

  const clickAcc = useRef<HTMLDivElement | null>(null);
  const clickProj = useRef<HTMLDivElement | null>(null);
  const clickExp = useRef<HTMLDivElement | null>(null);
  const clickTech = useRef<HTMLDivElement | null>(null);
  const clickSkill = useRef<HTMLDivElement | null>(null);
  const clickHobs = useRef<HTMLDivElement | null>(null);
  // const clickCont = useRef<HTMLDivElement | null>(null);

  const refs = [clickAcc, clickProj, clickExp, clickTech, clickSkill, clickHobs/*, clickCont*/];

  //--------------------Scroll Points--------------------

  let scrollPoints = useRef(NodeList.prototype as any);
  let navCategories = useRef(NodeList.prototype as any);

  let currPage: number, oldPage: number;

  useEffect(() => {
    scrollPoints.current = document.querySelectorAll('*[class^="page_scrollPoints"] > li > button');
    navCategories.current = document.querySelectorAll('header > nav > ul > li');

    currPage = Math.round((window.scrollY) / (window.innerHeight - 1));

    oldPage = currPage;

    ['load', 'scroll'].forEach(function(e) {
      currPage = Math.round((window.scrollY) / (window.innerHeight - 1));

      oldPage = currPage;

      window.addEventListener(e, () => {
        currPage = Math.round((window.scrollY) / (window.innerHeight - 1));

        if(currPage > oldPage){
          scrollPoints.current[currPage].classList.add(pagesStyles.active);

          navCategories.current[currPage].classList.add(headerStyles.active);

          if(scrollPoints.current[currPage - 1] !== undefined){
            scrollPoints.current[currPage - 1].classList.remove(pagesStyles.active);

            navCategories.current[currPage - 1].classList.remove(headerStyles.active);
          }
        }
        else if(currPage < oldPage){
          scrollPoints.current[currPage].classList.add(pagesStyles.active);
          scrollPoints.current[currPage + 1].classList.remove(pagesStyles.active);

          navCategories.current[currPage].classList.add(headerStyles.active);
          navCategories.current[currPage + 1].classList.remove(headerStyles.active);
        }
        else{
          scrollPoints.current[currPage].classList.add(pagesStyles.active);

          navCategories.current[currPage].classList.add(headerStyles.active);
        }

        oldPage = currPage;
      });
    });
  }, [])

  //----------------Handle resize--------------------

  window.addEventListener('resize', () => {
    if(refs[currPage]){
      scrollTo(refs[currPage]);
    }
  })

  //----------------Scroll Arrows--------------------

  const uOrDArrowKeyDown = (event) => {
    if(event.key === "ArrowDown"){
      event.preventDefault();
      if(oldPage < (refs.length - 1)){
        scrollTo(refs[oldPage + 1]);
      }
    }
    else if(event.key === "ArrowUp"){
      event.preventDefault();
      if(oldPage > 0){
        scrollTo(refs[oldPage - 1]);
      }
    }
  }

  window.addEventListener('keydown', uOrDArrowKeyDown);

  //------------------Scroll Mouse--------------------

  const wheel = (event) => {
    if(event.deltaY > 0){
      if(oldPage < refs.length - 1){
        scrollTo(refs[oldPage + 1]);
      }
    }
    else if(event.deltaY < 0){
      if(oldPage > 0){
        scrollTo(refs[oldPage - 1]);
      }
    }
  }

  window.addEventListener('wheel', wheel)

  //--------------Toggle DarkMode Key-----------------


  useEffect(() => {
    const lKeyDown = (event) => {
      if(event.key === "t"){
        toggleSwitch();
      }
    }

    window.addEventListener("keydown", lKeyDown);

    return () => {
      window.removeEventListener("keydown", lKeyDown)
    }
  }, [toggleSwitch]);

  //---------------------Schools-----------------------

  const handleBlackandWhiteImages = (array) => {
    array.map(item => {
      if(isOn){
        item.images = [
          `${item.name}W`
        ];
      }
      else if(!isOn){
        item.images = [
          `${item.name}B`
        ];
      }

      return array;
    });
  };

  handleBlackandWhiteImages(experiences);

  useEffect(() => {
    handleBlackandWhiteImages(experiences);
  }, [isOn]);

  //-------------------Technologies--------------------

  handleBlackandWhiteImages(technologies);

  useEffect(() => {
    handleBlackandWhiteImages(technologies);
  }, [isOn]);

  //---------------------ScrollTo----------------------

  const scrollTo = (ref: MutableRefObject<HTMLDivElement | null>) => {
    if (ref?.current) {
      ref?.current.scrollIntoView({block: 'end', behavior: 'smooth'});
    }
  }

  //----------------RemoveScrollBar------------------

  setTimeout(() => {document.querySelector("html")?.classList.add(pagesStyles.removeScrollBar);});

  //-----------------ScrollCarousel------------------

  const [scrollCarousel, setScrollCarousel] = useState([]);

  useEffect(() => {
    const ref = refs.filter(filteredRef => filteredRef.current?.id.includes(scrollCarousel[0]))[0];

    scrollTo(ref)
  }, [scrollCarousel, refs]);

  //--------------------Page-------------------------

  return (
    <div className={`${isOn ?pagesStyles.dark : pagesStyles.light} ${pagesStyles.upperDiv}`}>
      <header className={`${pagesStyles.header}`}>
        <Logo className={headerStyles.logo}></Logo>
        <nav
          className={headerStyles.menu}>
          <ul>
            <li onClick={() => scrollTo(clickAcc)}>Accueil</li>
            <li onClick={() => scrollTo(clickProj)}>Projets</li>
            <li onClick={() => scrollTo(clickExp)}>Experiences</li>
            <li onClick={() => scrollTo(clickTech)}>Technologies</li>
            <li onClick={() => scrollTo(clickSkill)}>Compétences</li>
            <li onClick={() => scrollTo(clickHobs)}>Passions</li>
          </ul>
        </nav>
        <button
          className={headerStyles.switch}
          data-ison={isOn}
          onClick={toggleSwitch}
          onKeyDown={(event) => {if(event.key === 'l'){
            ;
          }}}>
          <div className={headerStyles.handle}/>
        </button>
      </header>
      <main className={`${pagesStyles.main} ${pagesStyles.main}`}>
        <ul className={`${pagesStyles.scrollPoints}`}>
          {
            refs.map((ref, index) => (
              <li key={index}>
                <button onClick={() => scrollTo(ref)}></button>
              </li>
            ))
          }
        </ul>
        <section ref={clickAcc} className={`${accueilStyles.accueil} ${pagesStyles.page}`} id="accueil">
          <div className={accueilStyles.leftSide}>
            <article>
              <h2>Bonjour, moi c'est Florian Guillou !</h2>
              <h3>Alternant chez RnPVision en développement FullStack & étudiant à l'IUT de Lannion</h3>
              <p>
                Mon alternance est en lien avec le domaine de la géomatique et plus précisemment du SIG,
                système d'informations géographiques. <AHrefed href="http://rnpvision.com/" text="RnPVision"/> est
                une entreprise qui développe en SAAS un SIG web basé sur <AHrefed href="https://www.veremes.com/produits/vmap" text="VMap2"/>.
              </p>
              <p>
                Je suis également en BUT 3ème année à l'<AHrefed href="https://iut-lannion.univ-rennes.fr/" text="IUT
                de Lannion"/>, jusque fin août 2024 où j'étudie la réalisation d'application, de la conception à la validation en
                passant évidemment par le développement.
              </p>
              <p>
                En plus de l'informatique en général, j'apprécie la photographie que je peux désormais proprement matérialiser après l'acquisition
                d'un superbe <AHrefed href="https://fujifilm-x.com/fr-fr/products/cameras/x-t5/" text="Fujifilm X-T5"/> ! Quelques photos
                sont d'ailleurs disponible ici : <AHrefed href="https://photos.floriangll.fr" text="photos.floriangll.fr"/>
              </p>
              <p>
                J'apprécie également l'automobile avec un attrait notamment pour les véhicules des années 70/80/90
              </p>
            </article>
          </div>
          <div className={accueilStyles.rightSide}>
            <div className={accueilStyles.logoTwoLevels}>
              <LogoG className={accueilStyles.logoG}/>
              <img src={portrait} alt="portrait"/>
              <LogoF className={accueilStyles.logoF}/>
            </div>
          </div>
        </section>
        <section
          ref={clickProj}
          className={`${projets_experiencesStyles.projets} ${pagesStyles.page}`}
          id="projets"
        >
          <Carousel name={"projets"} items={projets} imagesFolder="./images/Projets/" pageIndex={refs.indexOf(clickProj)} scrollCarousel={scrollCarousel} setScrollCarousel={setScrollCarousel} uOrDArrowKeyDown={uOrDArrowKeyDown} wheel={wheel}/>
        </section>
        <section
          ref={clickExp}
          className={`${projets_experiencesStyles.experiences} ${pagesStyles.page}`}
          id="experiences"
        >
          <Carousel name={"experiences"} items={experiences} imagesFolder="./images/Experiences/" pageIndex={refs.indexOf(clickExp)} scrollCarousel={scrollCarousel} setScrollCarousel={setScrollCarousel} uOrDArrowKeyDown={uOrDArrowKeyDown} wheel={wheel}/>
        </section>
        <section
          ref={clickTech}
          className={`${pagesStyles['center-items']} ${pagesStyles.page}`}
          id="technologies"
        >
          <SmallCardsList items={technologies} imagesFolder="./images/Technologies/" setScrollCarousel={setScrollCarousel}/>
        </section>
        <section
          ref={clickSkill}
          className={`${pagesStyles['center-items']} ${pagesStyles.page}`}
          id="skills"
          >
          <SmallCardsList items={skills} imagesFolder="./images/Skills/" setScrollCarousel={setScrollCarousel}/>
        </section>
        <section
          ref={clickHobs}
          className={`${pagesStyles['center-items']} ${pagesStyles.page}`}
          id="passions"
        >
          <Carousel name={"passions"} items={passions} imagesFolder={"./images/Passions/"} pageIndex={refs.indexOf(clickHobs)} scrollCarousel={scrollCarousel} setScrollCarousel={setScrollCarousel} uOrDArrowKeyDown={uOrDArrowKeyDown} wheel={wheel}/>
        </section>
      </main>
    </div>
  );
}

export default App;