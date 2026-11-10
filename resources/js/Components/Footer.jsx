import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faCircleQuestion, faEnvelope, faFingerprint, faListCheck, faMobileButton, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../css/Components/Footer.module.css";
import { useRef } from "react";


function Footer({project, theme}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');
    if (project) { currentLanguage = localStorage.getItem('DEFAULT_LANGUAGE_'+project.id)
        || project.default_language;}

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    const textContactInformation = currentLanguage == 'en' ? 'Contact information'
        : (currentLanguage == 'fr' ? 'Informations de contact' : 'معلومات الإتصال');
    const textFollowUs = currentLanguage == 'en' ? 'Follow us'
        : (currentLanguage == 'fr' ? 'Suivez-nous' : 'تابعنا');
    const textFacebook = currentLanguage == 'en' ? 'Facebook'
        : (currentLanguage == 'fr' ? 'Facebook' : 'فيسبوك');
    const textInstagram = currentLanguage == 'en' ? 'Instagram'
        : (currentLanguage == 'fr' ? 'Instagram' : 'إنستغرام');
    const textTiktok = currentLanguage == 'en' ? 'TikTok'
        : (currentLanguage == 'fr' ? 'TikTok' : 'تيكتوك');
    const textRightsReserved = currentLanguage == 'en' ? 'All rights reserved'
        : (currentLanguage == 'fr' ? 'Tous droits réservés' : 'كل الحقوق محفوظة');
    const textAboutUs = currentLanguage == 'en' ? 'About us'
        : (currentLanguage == 'fr' ? 'À propos de nous' : 'حولنا');
    const textFeatures = currentLanguage == 'en' ? 'Features'
        : (currentLanguage == 'fr' ? 'Fonctionnalités' : 'المزايا');
    const textConditions = currentLanguage == 'en' ? 'Conditions'
        : (currentLanguage == 'fr' ? 'Conditions' : 'الشروط');
    const textTermsOfUse = currentLanguage == 'en' ? 'Terms of use'
        : (currentLanguage == 'fr' ? 'Conditions d’utilisation' : 'شروط الإستخدام');
    const textPrivacyPolicy = currentLanguage == 'en' ? 'Privacy Policy'
        : (currentLanguage == 'fr' ? 'Politique de confidentialité' : 'سياسات الخصوصية');
    const textUnavailable = currentLanguage === 'en' ? 'Unavailable'
        : currentLanguage === 'fr' ? 'Indisponible': 'غير متوفر';

    // hooks
    const fbRef = useRef(null);
    const instaRef = useRef(null);
    const emailLinkRef = useRef(null);
    const phoneLinkRef = useRef(null);
    const fbLinkRef = useRef(null);
    const instaLinkRef = useRef(null);
    const tkLinkRef = useRef(null);
    const aboutLinkRef = useRef(null);
    const featuresLinkRef = useRef(null);
    const pricingLinkRef = useRef(null);
    const termsLinkRef = useRef(null);
    const privacyLinkRef = useRef(null);

    // theme
    let email = "elpgenerator@gmail.com";
    let phone = "0540296200";
    let facebook = "https://www.facebook.com/elpgenerator";
    let instagram = "https://www.instagram.com/elpgenerator";
    let tiktok = null;
    if (theme) {
        email = (theme.contact_email.trim().length>0)?theme.contact_email: null;
        phone = (theme.contact_phone.trim().length>0)?theme.contact_phone: null;
        facebook = (theme.facebook_link.trim().length>0)?theme.facebook_link: null;
        instagram = (theme.instagram_link.trim().length>0)?theme.instagram_link: null;
        tiktok = (theme.tiktok_link.trim().length>0)?theme.tiktok_link: null;
    }

    // project
    let projectName = "Easy Landing Page Generator";
    let projectNameStyle = {
        color: "var(--light-blue)",
    }
    if (project) {
        projectName = project.name;
        projectNameStyle = {
            color: theme.light_color,
        }
    }


    // link color
    const linkMouseOver = (e, ref) => {
        if (theme) {
            ref.current.style.color = theme.light_color;
        }else {
            ref.current.style.color = "var(--light-blue)";
        }
    }
    const linkMouseOut = (e, ref) => {
        ref.current.style.color = "var(--normal-black)";
    }

    // social media icon color
    const instaMouseOver = (e) => {
        if (theme) {
            instaRef.current.style.color = theme.light_color;
        }else {
            instaRef.current.style.color = "var(--light-blue)";
        }
    }
    const instaMouseOut = (e) => {
        instaRef.current.style.color = "var(--normal-black)";
    }
    const fbMouseOver = (e) => {
        if (theme) {
            fbRef.current.style.color = theme.light_color;
        }else {
            fbRef.current.style.color = "var(--light-blue)";
        }
    }
    const fbMouseOut = (e) => {
        fbRef.current.style.color = "var(--normal-black)";
    }

    return (
        <div className={styles.footerC}>

            <div className={styles.boxC}>
                <div className={styles.box}>
                    <h3>{textContactInformation}</h3>
                    {email != null?
                    (<a onMouseOver={e => linkMouseOver(e, emailLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, emailLinkRef)}
                        ref={emailLinkRef}>
                        <FontAwesomeIcon icon={faEnvelope}/> {email}</a>)
                    : (<a onMouseOver={e => linkMouseOver(e, emailLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, emailLinkRef)}
                        ref={emailLinkRef}>
                        <FontAwesomeIcon icon={faEnvelope} /> <em>{textUnavailable}</em></a>)
                    }
                    {phone != null?
                    (<a onMouseOver={e => linkMouseOver(e, phoneLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, phoneLinkRef)}
                        ref={phoneLinkRef}>
                        <FontAwesomeIcon icon={faMobileButton} /> {phone}</a>)
                    : (<a onMouseOver={e => linkMouseOver(e, phoneLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, phoneLinkRef)}
                        ref={phoneLinkRef}>
                        <FontAwesomeIcon icon={faMobileButton} /> <em>{textUnavailable}</em></a>)
                    }
                </div>

                <div className={styles.box}>
                    <h3>{textFollowUs}</h3>

                    {facebook != null?
                    (<a onMouseOver={e => linkMouseOver(e, fbLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, fbLinkRef)}
                        ref={fbLinkRef}
                        href={facebook} target="_blank">
                        <FontAwesomeIcon icon={faFacebook} /> {textFacebook}
                    </a>)
                    :(<a onMouseOver={e => linkMouseOver(e, fbLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, fbLinkRef)}
                        ref={fbLinkRef}
                        href="#">
                        <FontAwesomeIcon icon={faFacebook} /> <em>{textUnavailable}</em>
                    </a>)}

                    {instagram != null?
                    (<a onMouseOver={e => linkMouseOver(e, instaLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, instaLinkRef)}
                        ref={instaLinkRef}
                        href={instagram} target="_blank">
                        <FontAwesomeIcon icon={faInstagram} /> {textInstagram}
                    </a>)
                    :(<a onMouseOver={e => linkMouseOver(e, instaLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, instaLinkRef)}
                        ref={instaLinkRef}
                        href="#">
                        <FontAwesomeIcon icon={faInstagram} /> <em>{textUnavailable}</em>
                    </a>)}

                    {tiktok != null?
                    (<a onMouseOver={e => linkMouseOver(e, tkLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, tkLinkRef)}
                        ref={tkLinkRef}
                        href={tiktok} target="_blank">
                        <FontAwesomeIcon icon={faTiktok} /> {textTiktok}
                    </a>)
                    :(<a onMouseOver={e => linkMouseOver(e, tkLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, tkLinkRef)}
                        ref={tkLinkRef}
                        href="#">
                        <FontAwesomeIcon icon={faTiktok} /> <em>{textUnavailable}</em>
                    </a>)}

                </div>

                <div className={styles.box}>
                    {<h3>ELPG</h3>}
                    <a onMouseOver={e => linkMouseOver(e, aboutLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, aboutLinkRef)}
                        ref={aboutLinkRef}>
                        <FontAwesomeIcon icon={faCircleQuestion} /> {textAboutUs}</a>
                    <a onMouseOver={e => linkMouseOver(e, featuresLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, featuresLinkRef)}
                        ref={featuresLinkRef}>
                        <FontAwesomeIcon icon={faStar} /> {textFeatures}</a>
                </div>

                <div className={styles.box}>
                    {<h3>{textConditions}</h3>}
                    <a onMouseOver={e => linkMouseOver(e, termsLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, termsLinkRef)}
                        ref={termsLinkRef}>
                        <FontAwesomeIcon icon={faListCheck} /> {textTermsOfUse}</a>
                    <a onMouseOver={e => linkMouseOver(e, privacyLinkRef)} 
                        onMouseOut={e => linkMouseOut(e, privacyLinkRef)}
                        ref={privacyLinkRef}>
                        <FontAwesomeIcon icon={faFingerprint} /> {textPrivacyPolicy}</a>
                </div>
            </div>

            <div className={styles.socialMedia}>
                {instagram && <a href={instagram} target="_blank"
                    onMouseOver={instaMouseOver} onMouseOut={instaMouseOut}>
                    <FontAwesomeIcon icon={faInstagram} className={styles.icon} 
                        ref={instaRef}/>
                </a>}

                {facebook && <a href={facebook} target="_blank"
                    onMouseOver={fbMouseOver} onMouseOut={fbMouseOut}>
                    <FontAwesomeIcon icon={faFacebook}  className={styles.icon} 
                        ref={fbRef}/>
                </a>}
            </div>

            <div className={styles.credit}>
                &copy; 2026 <span style={projectNameStyle}>{projectName},</span> {textRightsReserved}
            </div>

        </div>

    );
}

export default Footer;

