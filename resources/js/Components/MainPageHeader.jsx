import { Link, router, useForm, usePage } from "@inertiajs/react";
import styles from "../../css/Components/MainPageHeader.module.css";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import {URL as conn_URL} from '../connection.js';

function MainPageHeader() {

    // get current language
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textLogout = currentLanguage == 'en' ? 'Log out'
        : (currentLanguage == 'fr' ? 'Se déconnecter' : 'تسجيل الخروج');
    const textConfirmLogout = currentLanguage == 'en' ? 'Are you sure you want to log out ?'
        : (currentLanguage == 'fr' ? 'Êtes-vous sûr de vouloir vous déconnecter ?' : 'هل أنت متأكد من أنك تريد تسجيل الخروج ؟');
    const textManageAccount = currentLanguage == 'en' ? 'Manage Account'
        : (currentLanguage == 'fr' ? 'Gérer le compte' : 'إدارة الحساب');
    const textCreateNewProject = currentLanguage == 'en' ? 'Create a new Project'
        : (currentLanguage == 'fr' ? 'Créer un nouveau projet' : 'إنشاء مشروع جديد');
    const textLogin = currentLanguage == 'en' ? 'Login'
        : (currentLanguage == 'fr' ? 'Se connecter' : 'تسجيل الدخول');
    const textRegister = currentLanguage == 'en' ? 'Register'
        : (currentLanguage == 'fr' ? 'S’inscrire' : 'إنشاء حساب');
    const textLoggedOut = currentLanguage == 'en' ? 'Logged out successfully'
        : (currentLanguage == 'fr' ? 'Déconnexion réussie' : 'لقد قمت بتسجيل الخروج بنجاح');

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

    // hooks
    const route = useRoute();
    const {auth} = usePage().props;

    const {post} = useForm();
    const optionsRef = useRef(null);

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

    // hooks
    const {flash} = usePage().props;
    const [success, setSuccess] = useState(null);

    // handle flash message change
    useEffect(() => {

        let successTimeoutId;

        if (flash.success) {
            if (flash.success == 'LOGOUT_SUCCESS') {
                setSuccess(textLoggedOut);
            }
            successTimeoutId= setTimeout(() => {
                setSuccess(null);
                flash.success = null;
            }, 3000);
        }

        return () => {
            if (successTimeoutId) {
                clearTimeout(successTimeoutId);
            }
        };

    }, [flash.success]);


    return (
        <header className={styles.header}
            style={visible ? {transform: "translateY(0)"} : {transform: "translateY(-100%)"} }>
            <div className={styles.logoC}>
                <img src={conn_URL +"elpg_white_background.png"} alt="logo"
                    onClick={toMain}/>
            </div>

            <div className={styles.multipleItemsC}>
                {auth.user == null && <>
                <Link href={route('register')} className={styles.registerBtn}>
                    {textRegister} <FontAwesomeIcon icon={faUserPlus} />
                </Link>
                <Link href={route('login')} className={styles.loginBtn}>
                    {textLogin} <FontAwesomeIcon icon={faArrowRightToBracket} />
                </Link></>}

                <select name="language" onChange={changeLanguage}
                    value={currentLanguage}>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                    <option value="fr">Français</option>
                </select>

                {auth.user && <FontAwesomeIcon icon={faUser} onClick={toggleOptionsVisibility}
                    className={styles.accountIcon} />}
            </div>

            {auth.user &&
            <div className={styles.optionsC}
                ref={optionsRef} style={optionsStyle}
                onClick={e => e.stopPropagation()}>
                <div className={styles.userC}>
                    <div className={styles.avatarC}>
                        <img src={conn_URL +"placeholder/avatar.svg"} alt="avatar" />
                    </div>
                    <div className={styles.infoC}>
                        <p className={styles.userFullName}>{auth.user.firstName} {auth.user.lastName}</p>
                        <p className={styles.userEmail}>{auth.user.email}</p>
                    </div>
                </div>
                <hr />
                <div className={styles.navOptionC}>
                    <Link className={styles.navOption} href={route('home')}>{textManageAccount}</Link>
                </div>
                <div className={styles.navOptionC}>
                    <Link className={styles.navOption} href={route('create')}>{textCreateNewProject}</Link>
                </div>
                <hr />
                <form className={styles.logoutForm} onSubmit={logout}>
                    <button className={styles.logoutBtn}>{textLogout}</button>
                </form>
            </div>
            }

            {/* display flash messages  */}
            {success && <div className={styles.flashSuccess}>{success}</div> }

        </header>
    );
}

export default MainPageHeader;

