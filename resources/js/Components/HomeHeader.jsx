import { router, useForm, usePage } from "@inertiajs/react";
import styles from "../../css/Components/HomeHeader.module.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import {URL as conn_URL} from '../connection.js';

function HomeHeader () {

    // get current language
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textLogout = currentLanguage == 'en' ? 'Log out'
        : (currentLanguage == 'fr' ? 'Se déconnecter' : 'تسجيل الخروج');
    const textConfirmLogout = currentLanguage == 'en' ? 'Are you sure you want to log out ?'
        : (currentLanguage == 'fr' ? 'Êtes-vous sûr de vouloir vous déconnecter ?' : 'هل أنت متأكد من أنك تريد تسجيل الخروج ؟');
    const textAccountUpdated = currentLanguage == 'en' ? 'Account information updated'
            : (currentLanguage == 'fr' ? 'Informations du compte mises à jour' : 'تم تحديث معلومات حسابك');
    const textUnexError = currentLanguage == 'en' ? 'Unexpected error happened'
            : (currentLanguage == 'fr' ? 'Une erreur inattendue est survenue' : 'حصل خطأ ما');
    const textLoginSuccess = currentLanguage == 'en' ? 'Welcome again,'
            : (currentLanguage == 'fr' ? 'Bon retour,' : 'مرحبا بك مجددا, ');
    const textProjectCreated = currentLanguage == 'en' ? 'New project created'
            : (currentLanguage == 'fr' ? 'Nouveau projet créé' : 'تم إنشاء مشروع جديد');
    const textProjectDeleted = currentLanguage == 'en' ? 'Project deleted'
            : (currentLanguage == 'fr' ? 'Projet supprimé' : 'تم حذف المشروع');
    const textRegisterSuccess = currentLanguage == 'en' ? 'Welcome,'
            : (currentLanguage == 'fr' ? 'Bienvenue,' : 'مرحبا بك, ');
    const textPasswordUpdated = currentLanguage == 'en' ? 'Password updated'
            : (currentLanguage == 'fr' ? 'Mot de passe mis à jour' : 'تم تحديث كلمة المرور');
    const textInvalidPassword = currentLanguage == 'en' ? 'Invalid current password'
            : (currentLanguage == 'fr' ? 'Mot de passe actuel invalide' : 'كلمة المرور الحالية غير صحيحة');
    const textDevicesLoggedOut = currentLanguage == 'en' ? 'Other devices logged out'
            : (currentLanguage == 'fr' ? 'Autres appareils déconnectés' : 'تم تسجيل الخروج من جميع الأجهزة الأخرى');
    const textSupportReqCreated = currentLanguage == 'en' ? 'Your feedback sent'
            : (currentLanguage == 'fr' ? 'Votre avis a été envoyé' : 'تم إرسال مراجعتك');
    const textMaxPjtExceeded = currentLanguage == 'en' ? 'Maximum project number already exceeded'
        : (currentLanguage == 'fr' ? 'Nombre maximum de projets déjà atteint' : 'تم بالفعل الوصول إلى الحد الأقصى للمشاريع');
    const textStoreCreated = currentLanguage == 'en' ? 'New store created'
            : (currentLanguage == 'fr' ? 'Nouveau boutique créé' : 'تم إنشاء متجر جديد');
    const textStoreDeleted = currentLanguage == 'en' ? 'Store deleted'
            : (currentLanguage == 'fr' ? 'Boutique supprimé' : 'تم حذف المتجر');

    // set options alignement considering direction
    let optionsStyle = {};
    if (currentLanguage == 'ar'){
        optionsStyle = {
            left: "10px",
            opacity: 0,
            transform: "translateY(-10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            pointerEvents: "none",
        };
    }else {
        optionsStyle = {
            right: "10px",
            opacity: 0,
            transform: "translateY(-10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            pointerEvents: "none",
        };
    }

    // hooks initialization
    const {flash, auth} = usePage().props;
    const {post} = useForm();
    const optionsRef = useRef(null);
    const route = useRoute();

    // logout function
    const logout = (e) => {
        e.preventDefault();
        if (window.confirm(textConfirmLogout)){
            post(route('logout'));
        }
    };

    // toggle options function
    const toggleOptionsVisibility = (e) => {
        e.preventDefault();

        // stop event from continuing to parent elements
        e.stopPropagation();

        // toggle
        if (optionsRef.current.style.opacity  == "0"){
            optionsRef.current.style.opacity = "1";
            optionsRef.current.style.transform = "translateY(0)";
            optionsRef.current.style.pointerEvents = "auto";
        }else{
            optionsRef.current.style.opacity = "0";
            optionsRef.current.style.transform = "translateY(-10px)";
            optionsRef.current.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            optionsRef.current.style.pointerEvents = "none";
        }
    }

    // hide options function
    const hideOptions = (e) => {
        e.preventDefault();
        optionsRef.current.style.opacity = "0";
        optionsRef.current.style.transform = "translateY(-10px)";
        optionsRef.current.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        optionsRef.current.style.pointerEvents = "none";
    };

    // change language function
    const changeLanguage = (e) => {
        e.preventDefault();
        // set language in local storage
        localStorage.setItem('LANGUAGE', e.target.value);

        router.post(route('language.change'), {
            language: e.target.value,
        });
    }

    // hide options on document elements clicked
    document.documentElement.addEventListener('click', function (e) {
        if (optionsRef.current && optionsRef.current.style.opacity  == "1"){
            hideOptions(e);
        }
    });

    // handle logo click
    const toMain = (e) => {
        router.visit(route('main.page'), {
            method: 'get'
        });
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

    // handle flash message change
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        let errorTimeoutId;
        let successTimeoutId;

        if (flash.error) {
            if (flash.error == 'UNEXPECTED_ERROR') {
                setError(textUnexError);
            }
            if (flash.error == 'INVALID_PASSWORD') {
                setError(textInvalidPassword);
            }
            if (flash.error == 'MAX_PROJECTS_EXCEEDED') {
                setError(textMaxPjtExceeded);
            }
            errorTimeoutId = setTimeout(() => {
                setError(null);
                flash.error = null;
                flash.success = null;
            }, 3000);
        }

        if (flash.success) {
            if (flash.success == 'ACCOUNT_UPDATED') {
                setSuccess(textAccountUpdated);
            }
            if (flash.success == 'LOGIN_SUCCESS') {
                setSuccess(textLoginSuccess+ " "+auth.user.firstName);
            }
            if (flash.success == 'PROJECT_CREATED') {
                setSuccess(textProjectCreated);
            }
            if (flash.success == 'PROJECT_DELETED') {
                setSuccess(textProjectDeleted);
            }
            if (flash.success == 'STORE_CREATED') {
                setSuccess(textStoreCreated);
            }
            if (flash.success == 'STORE_DELETED') {
                setSuccess(textStoreDeleted);
            }
            if (flash.success == 'REGISTER_SUCCESS') {
                setSuccess(textRegisterSuccess+ " "+auth.user.firstName);
            }
            if (flash.success == 'PASSWORD_UPDATED') {
                setSuccess(textPasswordUpdated);
            }
            if (flash.success == 'DEVICES_LOGGED_OUT') {
                setSuccess(textDevicesLoggedOut);
            }
            if (flash.success == 'SUPPORT_REQUEST_CREATED') {
                setSuccess(textSupportReqCreated);
            }
            successTimeoutId= setTimeout(() => {
                setSuccess(null);
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


    return (
        <header className={styles.header}
            style={visible ? {transform: "translateY(0)"} : {transform: "translateY(-100%)"} }>
            <div className={styles.logoC}>
                <img src={conn_URL + "elpg_white_background.png"} alt="logo"
                    onClick={toMain}/>
            </div>

            <div className={styles.multipleItemsC}>
                <select name="language" onFocus={hideOptions} onChange={changeLanguage}
                    value={currentLanguage}>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                    <option value="fr">Français</option>
                </select>

                <FontAwesomeIcon icon={faUser} onClick={toggleOptionsVisibility}
                    className={styles.accountIcon} />
            </div>

            <div className={styles.optionsC} ref={optionsRef}
                style={optionsStyle}
                onClick={e => e.stopPropagation() }>
                <div className={styles.userC}>
                    <div className={styles.avatarC}>
                        <img src={conn_URL+ "placeholder/avatar.svg"} alt="avatar" />
                    </div>
                    <div className={styles.infoC}>
                        <p className={styles.userFullName}>{auth.user.firstName} {auth.user.lastName}</p>
                        <p className={styles.userEmail}>{auth.user.email}</p>
                    </div>
                </div>
                <form className={styles.logoutForm} onSubmit={logout}>
                    <button className={styles.logoutBtn}>{textLogout}</button>
                </form>
            </div>

            {/* display flash messages  */}
            {error && <div className={styles.flashError}>{error}</div> }
            {success && <div className={styles.flashSuccess}>{success}</div> }
        </header>
    );
}

export default HomeHeader;
