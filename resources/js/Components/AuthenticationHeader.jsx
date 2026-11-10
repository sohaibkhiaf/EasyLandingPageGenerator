import { useEffect, useState } from "react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import styles from "../../css/Components/AuthenticationHeader.module.css";
import { router, usePage } from "@inertiajs/react";
import {URL as conn_URL} from '../connection.js';


function AuthenticationHeader () {

    // get current language
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= en
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textUnexError = currentLanguage == 'en' ? 'Invalid credentials'
            : (currentLanguage == 'fr' ? 'Identifiants invalides' : 'لقد قمت بإدخال معلومات غير صحيحة');

    // hooks
    const route = useRoute();

    // change language function
    const changeLanguage = (e) => {
        e.preventDefault();
        // set language in local storage
        localStorage.setItem('LANGUAGE', e.target.value);

        router.post(route('language.change'), {
            language: e.target.value,
        });
    }

    // handle logo click
    const toMain = (e) => {
        router.visit(route('main.page'), {
            method: 'get'
        });
    }


    // hooks
    const {flash} = usePage().props;
    const [error, setError] = useState(null);

    // handle flash message change
    useEffect(() => {

        let errorTimeoutId;

        if (flash.error) {
            if (flash.error == 'INVALID_CREDENTIALS') {
                setError(textUnexError);
            }
            errorTimeoutId = setTimeout(() => {
                setError(null);
                flash.error = null;
            }, 3000);
        }

        return () => {
            if (errorTimeoutId) {
                clearTimeout(errorTimeoutId);
            }
        };

    }, [flash.error]);

    return (
        <header className={styles.header}>
            <div className={styles.logoC}>
                <img src={conn_URL +"elpg_white_background.png"} alt="logo"
                    onClick={toMain} />
            </div>

            <div className={styles.langC}>
                <select name="language" onChange={changeLanguage}
                    value={currentLanguage}>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                    <option value="fr">Français</option>
                </select>
            </div>

            {/* display flash messages  */}
            {error && <div className={styles.flashError}>{error}</div> }
        </header>
    );
}

export default AuthenticationHeader;
