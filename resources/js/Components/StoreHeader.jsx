import { Link, router, useForm, usePage } from "@inertiajs/react";
import styles from "../../css/Components/StoreHeader.module.css";
import { useEffect, useRef, useState } from "react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../connection.js';

function StoreHeader ({project}) {

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
    const textSwitchPjt = currentLanguage == 'en' ? 'Switch Project'
        : (currentLanguage == 'fr' ? 'Changer de projet' : 'تغيير المشروع');
    const textYourStore = currentLanguage == 'en' ? 'Your Store'
        : (currentLanguage == 'fr' ? 'Votre boutique' : 'صفحة المتجر');

    const textUnexError = currentLanguage == 'en' ? 'Unexpected error happened'
            : (currentLanguage == 'fr' ? 'Une erreur inattendue est survenue' : 'حصل خطأ ما');
    const textOrderStUpdated = currentLanguage == 'en' ? 'Order status updated'
            : (currentLanguage == 'fr' ? 'Statut de la commande mis à jour' : 'تم تحديث حالة الطلبية');
    const textOrderUpdated = currentLanguage == 'en' ? 'Order updated'
            : (currentLanguage == 'fr' ? 'Commande mise à jour' : 'تم تحديث الطلبية');
    const textOrderDeleted = currentLanguage == 'en' ? 'Order deleted'
            : (currentLanguage == 'fr' ? 'Commande supprimée' : 'تم حذف الطلبية');
    const textStoreUpdated = currentLanguage == 'en' ? 'Store updated'
            : (currentLanguage == 'fr' ? 'Boutique mis à jour' : 'تم تحديث المتجر');
    const textShippingUpdated = currentLanguage == 'en' ? 'Shipping settings updated'
            : (currentLanguage == 'fr' ? 'Paramètres de livraison mis à jour' : 'تم تحديث إعدادات الشحن');
    const textFreeShippingAct = currentLanguage == 'en' ? 'Free shipping activated'
            : (currentLanguage == 'fr' ? 'Livraison gratuite activée' : 'تم تفعيل الشحن المجاني');
    const textFreeShippingDeact = currentLanguage == 'en' ? 'Free shipping deactivated'
            : (currentLanguage == 'fr' ? 'Livraison gratuite désactivée' : 'تم إلغاء تفعيل الشحن المجاني');
    const textThemeUpdated = currentLanguage == 'en' ? 'Theme updated'
            : (currentLanguage == 'fr' ? 'Thème mis à jour' : 'تم تحديث الشكل');
    const textVisualsUpdated = currentLanguage == 'en' ? 'Visuals updated'
            : (currentLanguage == 'fr' ? 'Visuels mis à jour' : 'تم تحديث الصور');
    const textCategoryCreated = currentLanguage == 'en' ? 'Category created'
            : (currentLanguage == 'fr' ? 'Catégorie créée' : 'تم إنشاء تصنيف جديد');
    const textCategoryUpdated = currentLanguage == 'en' ? 'Category updated'
            : (currentLanguage == 'fr' ? 'Catégorie mise à jour' : 'تم تحديث التصنيف');
    const textCategoryDeleted = currentLanguage == 'en' ? 'Category deleted'
            : (currentLanguage == 'fr' ? 'Catégorie supprimée' : 'تم حذف التصنيف');
    const textAtLeastOne = currentLanguage == 'en' ? 'Store must have at least one categories'
            : (currentLanguage == 'fr' ? 'Le magasin doit avoir au moins une catégorie' : 'يجب أن يكون للمتجر تصنيف واحد على الأقل');
    const textMaxCtgReached = currentLanguage == 'en' ? 'Store already reached the maximum number of categories'
            : (currentLanguage == 'fr' ? 'Le magasin a déjà atteint le nombre maximum de catégories' : 'لقد وصل المتجر بالفعل إلى الحد الأقصى من التصنيفات');
    const textProductUpdated = currentLanguage == 'en' ? 'Product updated'
            : (currentLanguage == 'fr' ? 'Produit mis à jour' : 'تم تحديث المنتج');
    const textProductCreated = currentLanguage == 'en' ? 'Product created'
            : (currentLanguage == 'fr' ? 'Produit créé' : 'تم إنشاء المنتج');
    const textProductDeleted = currentLanguage == 'en' ? 'Product deleted'
            : (currentLanguage == 'fr' ? 'Produit supprimé' : 'تم حذف المنتج');

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
    };

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
            if (flash.error == 'AT_LEAST_ONE') {
                setError(textAtLeastOne);
            }
            if (flash.error == 'MAX_CATEGORIES_REACHED') {
                setError(textMaxCtgReached);
            }
            errorTimeoutId = setTimeout(() => {
                setError(null);
                // reset flash
                flash.error = null;
                flash.success = null;
            }, 3000);
        }

        if (flash.success) {
            if (flash.success == 'ORDER_STATUS_UPDATED') {
                setSuccess(textOrderStUpdated);
            }
            if (flash.success == 'ORDER_UPDATED') {
                setSuccess(textOrderUpdated);
            }
            if (flash.success == 'ORDER_DELETED') {
                setSuccess(textOrderDeleted);
            }
            if (flash.success == 'STORE_UPDATED') {
                setSuccess(textStoreUpdated);
            }
            if (flash.success == 'SHIPPING_UPDATED') {
                setSuccess(textShippingUpdated);
            }
            if (flash.success == 'FREE_SHIPPING_ACTIVATED') {
                setSuccess(textFreeShippingAct);
            }
            if (flash.success == 'FREE_SHIPPING_DEACTIVATED') {
                setSuccess(textFreeShippingDeact);
            }
            if (flash.success == 'THEME_UPDATED') {
                setSuccess(textThemeUpdated);
            }
            if (flash.success == 'VISUALS_UPDATED') {
                setSuccess(textVisualsUpdated);
            }
            if(flash.success == 'CATEGORY_CREATED'){
                setSuccess(textCategoryCreated);
            }
            if(flash.success == 'CATEGORY_UPDATED'){
                setSuccess(textCategoryUpdated);
            }
            if(flash.success == 'CATEGORY_DELETED'){
                setSuccess(textCategoryDeleted);
            }
            if(flash.success == 'PRODUCT_UPDATED'){
                setSuccess(textProductUpdated);
            }
            if(flash.success == 'PRODUCT_CREATED'){
                setSuccess(textProductCreated);
            }
            if(flash.success == 'PRODUCT_DELETED'){
                setSuccess(textProductDeleted);
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
                <img src={conn_URL+ "elpg_white_background.png"} alt="logo"
                    onClick={toMain} />
            </div>

            <div className={styles.multipleItemC}>
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
                <div className={styles.navOptionC}>
                    <Link className={styles.navOption} href={route('home')}>{textSwitchPjt}</Link>
                </div>
                <div className={styles.navOptionC}>
                    <a className={styles.navOption} target="_blank" href={route('store.page',
                        {slug: project.slug})}
                        rel="noopener noreferrer">{textYourStore}</a>
                </div>
                <hr />
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

export default StoreHeader;
