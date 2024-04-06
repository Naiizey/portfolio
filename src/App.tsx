import React, { MutableRefObject, useRef, useState, useEffect, useCallback } from 'react';

import Logo from './logo.tsx';
import pagesStyles from './page.module.scss';
import headerStyles from './header.module.scss';


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
  const clickPres = useRef<HTMLDivElement | null>(null);
  const clickExp = useRef<HTMLDivElement | null>(null);
  const clickProj = useRef<HTMLDivElement | null>(null);
  const clickTech = useRef<HTMLDivElement | null>(null);

  const refs = [clickAcc, clickPres, clickExp, clickProj, clickTech];

  //--------------------Scroll Points--------------------

  let scrollPoints = NodeList.prototype as any;
  let navCatergories = NodeList.prototype as any;

  setTimeout(() => {
    scrollPoints = document.querySelectorAll('*[class^="page_scrollPoints"] > li > button');
    navCatergories = document.querySelectorAll('header > nav > ul > li');
  });

  let currPage, oldPage;


  setTimeout(() => {['load', 'scroll'].forEach(function(e) {
    currPage = Math.round((window.scrollY) / (window.innerHeight - 1));

    oldPage = currPage;

    window.addEventListener(e, () => {
      currPage = Math.round((window.scrollY) / (window.innerHeight - 1));

      if(currPage > oldPage){
        scrollPoints[currPage].classList.add(pagesStyles.active);

        navCatergories[currPage].classList.add(headerStyles.active);

        if(scrollPoints[currPage - 1] !== undefined){
          scrollPoints[currPage - 1].classList.remove(pagesStyles.active);

          navCatergories[currPage - 1].classList.remove(headerStyles.active);
        }
      }
      else if(currPage < oldPage){
        scrollPoints[currPage].classList.add(pagesStyles.active);
        scrollPoints[currPage + 1].classList.remove(pagesStyles.active);

        navCatergories[currPage].classList.add(headerStyles.active);
        navCatergories[currPage + 1].classList.remove(headerStyles.active);
      }
      else{
        scrollPoints[currPage].classList.add(pagesStyles.active);

        navCatergories[currPage].classList.add(headerStyles.active);
      }

      oldPage = currPage;
    });
  })});

  //----------------Scroll Arrows--------------------

  window.addEventListener('keydown', (event) => {
    if(event.key === "ArrowDown"){
      if(oldPage < 4){
        refs[oldPage + 1].current?.scrollIntoView({ behavior: 'smooth'});
      }
    }
    else if(event.key === "ArrowUp"){
      if(oldPage > 0){
        refs[oldPage - 1].current?.scrollIntoView({ behavior: 'smooth'});
      }
    }
  });

  //------------------Scroll Mouse--------------------

  window.addEventListener('wheel', (event) => {
    if(event.deltaY > 0){
      if(oldPage < 4){
        refs[oldPage + 1].current?.scrollIntoView({ behavior: 'smooth'});
      }
    }
    else if(event.deltaY < 0){
      if(oldPage > 0){
        refs[oldPage - 1].current?.scrollIntoView({ behavior: 'smooth'});
      }
    }
  })

  //--------------Toggle DarkMode Key-----------------


  useEffect(() => {
    const lKeyDown = (event) => {
      if(event.key === "l"){
        toggleSwitch();
      }
    }

    window.addEventListener("keydown", lKeyDown);

    return () => {
      window.removeEventListener("keydown", lKeyDown)
    }
  }, [toggleSwitch]);

  //---------------------Schools-----------------------
  const items = [
    {
      id:1,
      title: 'Lycée Saint-Pierre Saint-Brieuc',
      diploma : 'Baccalauréat Général',
      specialties: ['Mathématiques', 'NSI ( numérique et sciences informatiques)', 'Physique-Chimie'],
      mentions: ['Mention européenne'],
      certificats: ['Cambridge English Certificate B2-C1']
    },
    {
      id:2,
      title: 'IUT de Lannion',
      diploma: 'BUT Informatique parcours A',
      specialties: ['Conception, développement et gestion de logiciels', 'Développement et conception de sites web', 'Gestion de bases de données']
    }
  ]

  const scrollTo = (ref: MutableRefObject<HTMLDivElement | null>) => {
    if (ref.current !== null) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //----------------RemoveScrollBar------------------

  setTimeout(() => {document.querySelector("html")?.classList.add(pagesStyles.removeScrollBar);});

  //--------------------Page-------------------------

  return (
    <div className={`${isOn ?pagesStyles.dark : pagesStyles.light} ${pagesStyles.upperDiv}`}>
      <header className={`${pagesStyles.header}`}>
        <Logo className={headerStyles.logo}></Logo>
        <nav
          className={headerStyles.menu}>
          <ul>
            <li onClick={() => scrollTo(clickAcc)}>Accueil</li>
            <li onClick={() => scrollTo(clickPres)}>Présentation</li>
            <li onClick={() => scrollTo(clickExp)}>Experiences</li>
            <li onClick={() => scrollTo(clickProj)}>Projets</li>
            <li onClick={() => scrollTo(clickTech)}>Technologies</li>
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
          <li>
            <button onClick={() => scrollTo(clickAcc)}></button>
          </li>
          <li>
            <button onClick={() => scrollTo(clickPres)}></button>
          </li>
          <li>
            <button onClick={() => scrollTo(clickExp)}></button>
          </li>
          <li>
            <button onClick={() => scrollTo(clickProj)}></button>
          </li>
          <li>
            <button onClick={() => scrollTo(clickTech)}></button>
          </li>
        </ul>
        <section ref={clickAcc} className={`${pagesStyles.accueil} ${pagesStyles.page}`} id="accueil">
          <div className="leftSide"></div>
          {/* <div className="rightSide"><Logo className={pagesStyles.accueilLogo}/></div> */}
        </section>
        <section ref={clickPres} className={`${pagesStyles.presentation} ${pagesStyles.page}`} id="presentation"></section>
        <section ref={clickExp} className={`${pagesStyles.experiences} ${pagesStyles.page}`} id="experiences"></section>
        <section ref={clickProj} className={`${pagesStyles.projects} ${pagesStyles.page}`} id="projets"></section>
        <section ref={clickTech} className={`${pagesStyles.technologies} ${pagesStyles.page}`} id="technologies"></section>
      </main>
    </div>
  );
}

export default App;