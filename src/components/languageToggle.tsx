import * as React from "react"
import {useContext} from "react"
import { globalHistory as history } from '@reach/router'
import {Link} from "gatsby"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import useSound from 'use-sound';
import LanguageToggle from "../sounds/language-toggle.mp3"  
import {GlobalContext} from "../components/soundToggle.js" 

const LanguageToggle = () => { 
    const { language } = useI18next();
    const { t } = useTranslation();
    const { location} = history
    var pageName = location.pathname
    if (pageName == "/") {pageName=""}

  if (pageName.includes("/en")) {
    var englishPagePath = location.pathname;
  } else {
    var englishPagePath = `../../en${pageName}`;
  }
  var danskPath = pageName.split("/en/")[1];
  if (pageName.split("/en/")[1] ===undefined) {danskPath=""};

  if (pageName == "") {pageName="../../"}

  if (pageName.includes("/en")) {
  return (
    <nav className="languageSwitch" aria-label={t("LANGUAGE_ARIA_LABEL")}>
      <Link onClick={play} to={`../../../${danskPath}`} activeClassName="active" title="Dansk">DA</Link><p style={{fontSize:"21px"}}>|</p>
      <Link onClick={play} to={englishPagePath} activeClassName="active" title="English">EN</Link>
    </nav>
  )} else {
  return ( 
    <nav className="languageSwitch" aria-label={t("LANGUAGE_ARIA_LABEL")}>
      <Link onClick={play} to={pageName} activeClassName="active" title="Dansk">DA</Link><p style={{fontSize:"21px"}}>|</p>
      <Link onClick={play} to={englishPagePath} activeClassName="active" title="English">EN</Link>
    </nav>  
  )} 
}

export default LanguageToggle