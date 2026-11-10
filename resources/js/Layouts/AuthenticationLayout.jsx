import { Head } from "@inertiajs/react";
import AuthenticationHeader from "../Components/AuthenticationHeader";
import styles from "../../css/Layouts/AuthenticationLayout.module.css";
import {URL as conn_URL} from '../connection.js';


function AuthenticationLayout({children}) {

    // get current language from local storage
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

            <AuthenticationHeader />

            <main className={styles.main}>
                {children}
            </main>

        </>
    );
}

export default AuthenticationLayout;
