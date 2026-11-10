import MainPageHeader from "../Components/MainPageHeader.jsx";
import Footer from "../Components/Footer.jsx";
import styles from "../../css/Layouts/MainPageLayout.module.css";
import { Head } from "@inertiajs/react";
import {URL as conn_URL} from '../connection.js';


function MainPageLayout({children}) {

    // get current language
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // extract page direction
    let currentDirection = currentLanguage == 'ar' ? 'rtl': 'ltr';

    // set page direction and language
    document.documentElement.dir = currentDirection;
    document.documentElement.lang = currentLanguage;

    return (
        <>
            <Head>
                <link rel="icon" type="image/png"
                    href={conn_URL+ "elpg_blue_background.png"} />
            </Head>

            <MainPageHeader />

            <main className={styles.main}>
                {children}
            </main>

            <Footer />
        </>
    );
}

export default MainPageLayout;
