import { Head, Link } from "@inertiajs/react";
import HomeHeader from "../Components/HomeHeader";
import {useRoute} from "../../../vendor/tightenco/ziggy";
import styles from "../../css/Layouts/HomeLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHouse, faShield, faUserTie } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../connection.js';


function HomeLayout({tab, children}) {

    // get current language
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // extract page direction
    let currentDirection = currentLanguage == 'ar' ? 'rtl': 'ltr';

    // set page direction and language
    document.documentElement.dir = currentDirection;
    document.documentElement.lang = currentLanguage;

    // initialize text considering preferred language
    const textHome = currentLanguage == 'en' ? 'Home'
        : (currentLanguage == 'fr' ? 'Accueil' : 'الرئيسية');
    const textAccount = currentLanguage == 'en' ? 'Account'
        : (currentLanguage == 'fr' ? 'Compte' : 'الحساب');
    const textSecurity = currentLanguage == 'en' ? 'Security'
        : (currentLanguage == 'fr' ? 'Sécurité' : 'الأمان');
    const textFeedback = currentLanguage == 'en' ? 'Feedback'
        : (currentLanguage == 'fr' ? 'Feedback' : 'شاركنا رأيك');

    // selected tab inline style
    const selectedTabStyle = {
        backgroundColor: "var(--hover-color)",
        color: "var(--dark-black)",
    };

    // hooks initialization
    const route = useRoute();

    return (
        <>
        <Head>
            <link rel="icon" type="image/png"
                href={conn_URL+ "elpg_blue_background.png"} />
        </Head>

        <HomeHeader />

        <div className={styles.layoutC}>
            <aside className={styles.aside}>

                {/* side links */}
                <div className={styles.tabsC}>
                    <Link className={styles.tab} href={route('home')}
                        style={tab === "home" ? selectedTabStyle : {} }>
                        <FontAwesomeIcon icon={faHouse} /> {textHome}
                    </Link>
                    <Link className={styles.tab} href={route('account')}
                        style={tab === "account" ? selectedTabStyle : {} }>
                        <FontAwesomeIcon icon={faUserTie} /> {textAccount}
                    </Link>
                    <Link className={styles.tab} href={route('security')}
                        style={tab === "security" ? selectedTabStyle : {} }>
                        <FontAwesomeIcon icon={faShield} /> {textSecurity}
                    </Link>
                    <Link className={styles.tab} href={route('support')}
                        style={tab === "support" ? selectedTabStyle : {} }>
                        <FontAwesomeIcon icon={faComment} /> {textFeedback}
                    </Link>
                </div>

            </aside>

            {/* main content */}
            <main className={styles.main}>
                {children}
            </main>
        </div>

        </>
    );
}

export default HomeLayout;
