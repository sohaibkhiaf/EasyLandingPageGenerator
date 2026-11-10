import styles from "../../css/Components/StorePageHeader.module.css";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { URL as conn_URL } from '../connection.js';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStoreContext } from "../StoreContext.jsx";


function StorePageHeader({project, theme }) {

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
    const textCurr = currentLanguage == 'en' ? 'DZD'
        : (currentLanguage == 'fr' ? 'DA' : 'د.ج');

    // store context
    const {cartSubtotal: subtotal, cartTotalItems : totalItems, 
        openCartSidePanel, closeCartSidePanel, emptyCart} = useStoreContext();

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
            if (totalItems >0 ) {setVisible(true); return};
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
    }, [totalItems]);

    // user styles
    let headerStyle = {
        backgroundColor: theme.light_color,
        transform: visible || (totalItems> 0) ? 
            "translateY(0)" : "translateY(-100%)",
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
                emptyCart(project.id);
                closeCartSidePanel();
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

    // cart notification style
    let notificationStyle = {};
    let SubtotalAmtStyle = {};
    if (currentLanguage == 'ar'){
        notificationStyle = {right: "0"};
        SubtotalAmtStyle = {marginRight: "5px"};
    }else {
        notificationStyle = {left: "17px"};
        SubtotalAmtStyle = {marginLeft: "5px"};
    }

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

            <div className={styles.multipleItemsC}>
                {/* language */}
                <select name="language" onChange={changeLanguage}
                    value={currentLanguage}>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                    <option value="fr">Français</option>
                </select>

                {/* cart */}
                <div className={styles.cartC} onClick={e => {
                    e.stopPropagation(); openCartSidePanel();}}>
                    {/* icon */}
                    <FontAwesomeIcon icon={faShoppingCart} 
                        className={styles.cartIcon} />
                    {/* total */}
                    <span className={styles.subtotal} style={SubtotalAmtStyle}>
                        {new Intl.NumberFormat('en-US').format(subtotal)} {textCurr}
                    </span>
                    {/* notification */}
                    {totalItems >0? <div className={styles.notification} 
                        style={notificationStyle}>{totalItems}</div> : <></>}
                </div>
            </div>

            {/* display flash messages  */}
            {error && <div className={styles.flashError}>{error}</div> }
            {success && <div style={successMessageStyle} 
                className={styles.flashSuccess}>{success}</div> }

        </header>
    );
}

export default StorePageHeader;
