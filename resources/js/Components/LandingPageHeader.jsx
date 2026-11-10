import { router, usePage } from "@inertiajs/react";
import styles from "../../css/Components/LandingPageHeader.module.css";
import { useEffect, useRef, useState } from "react";
import {URL as conn_URL} from '../connection.js';


function LandingPageHeader({project, theme}) {

    // get current language
    let currentLanguage = localStorage.getItem('DEFAULT_LANGUAGE_'+project.id)
        || project.default_language;

    // this sets fallback language= en
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textOrderCreated = currentLanguage == 'en' ? 'Order created successfully'
            : (currentLanguage == 'fr' ? 'Commande créée avec succès' : 'تم إرسال طلبك بنجاح');
    const textUnexError = currentLanguage == 'en' ? 'Unexpected error happened'
            : (currentLanguage == 'fr' ? 'Une erreur inattendue est survenue' : 'حصل خطأ ما أثناء إنشاء طلبك');

    // change language function
    const changeLanguage = (e) => {
        e.preventDefault();

        // set default language in local storage
        localStorage.setItem('DEFAULT_LANGUAGE_'+project.id, e.target.value);

        // reload page
        router.reload();
    }

    // smart header on scroll
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setVisible(false); // scrolling down
            } else {
                setVisible(true); // scrolling up
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // user styles
    let headerStyle = {
        backgroundColor: theme.light_color,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
    }

    // hooks
    const {flash} = usePage().props;
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    // handle flash message change
    useEffect(() => {

        let errorTimeoutId;
        let successTimeoutId;

        if (flash.error) {
            if (flash.error == 'UNEXPECTED_ERROR') {
                setError(textUnexError);
            }
            errorTimeoutId = setTimeout(() => {
                setError(null);
                // reset flash
                flash.error = null;
                flash.success = null;
            }, 3000);
        }

        if (flash.success) {
            if (flash.success == 'ORDER_CREATED') {
                setSuccess(textOrderCreated);
            }
            successTimeoutId= setTimeout(() => {
                setSuccess(null);
                // reset flash
                flash.success = null;
                flash.error = null;
            }, 3000);
        }

        return () => {
            if (errorTimeoutId) {
                clearTimeout(errorTimeoutId);
            }
            if (successTimeoutId) {
                clearTimeout(successTimeoutId);
            }
        };

    }, [flash.success, flash.error]);

    // user styles
    let successMessageStyle = {backgroundColor: theme.light_color};

    return (
        <header className={styles.header}
            style={headerStyle}>
            <div className={styles.iconC}>
                {project.icon_url != null ?
                (<img src={conn_URL+ "uploads/"+project.icon_url} alt="icon" />)
                :
                (<img src={conn_URL + "placeholder/shape.svg"} alt="icon" />)}
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
            {success && <div style={successMessageStyle} 
                className={styles.flashSuccess}>{success}</div> }
        </header>
    );
}

export default LandingPageHeader;
