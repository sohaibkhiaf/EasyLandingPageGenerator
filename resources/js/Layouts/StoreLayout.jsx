import { Head, Link } from "@inertiajs/react";
import StoreHeader from "../Components/StoreHeader";
import {useRoute} from "../../../vendor/tightenco/ziggy";
import styles from "../../css/Layouts/StoreLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faBoxOpen, faBrush, faImage, faStore, faTable, faTag, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../connection.js';


function StoreLayout({children, tab}) {

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
    const textDashboard = currentLanguage == 'en' ? 'Dashboard'
        : (currentLanguage == 'fr' ? 'Tableau de bord' : 'لوحة التحكم');
    const textStore = currentLanguage == 'en' ? 'Store'
        : (currentLanguage == 'fr' ? 'Boutique' : 'المتجر');
    const textVisuals = currentLanguage == 'en' ? 'Visuals'
        : (currentLanguage == 'fr' ? 'Visuels' : 'الصور');
    const textTheme = currentLanguage == 'en' ? 'Theme'
        : (currentLanguage == 'fr' ? 'Thème' : 'الشكل');
    const textCategories = currentLanguage == 'en' ? 'Categories'
        : (currentLanguage == 'fr' ? 'Catégories' : 'التصنيفات');
    const textProducts = currentLanguage == 'en' ? 'Products'
        : (currentLanguage == 'fr' ? 'Produits' : 'المنتجات');
    const textShipping = currentLanguage == 'en' ? 'Shipping'
        : (currentLanguage == 'fr' ? 'Livraison' : 'التوصيل');
    const textOrders = currentLanguage == 'en' ? 'Orders'
        : (currentLanguage == 'fr' ? 'Commandes' : 'الطلبيات');

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

        <StoreHeader project={children.props.project.data} />

        <div className={styles.layoutC}>
            <aside className={styles.aside}>

                {/* side links */}
                <div className={styles.tabsC}>
                    <Link className={styles.tab} style={tab === "dashboard" ? selectedTabStyle : {} }
                        href={route('store.dashboard', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faTable}/> {textDashboard}
                    </Link>
                    <Link className={styles.tab} style={tab === "store" ? selectedTabStyle : {} }
                        href={route('store.store', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faStore}/> {textStore}
                    </Link>
                    <Link className={styles.tab} style={tab === "visuals" ? selectedTabStyle : {} }
                        href={route('store.visuals', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faImage}/> {textVisuals}
                    </Link>
                    <Link className={styles.tab} style={tab === "theme" ? selectedTabStyle : {} }
                        href={route('store.theme', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faBrush} /> {textTheme}
                    </Link>
                    <Link className={styles.tab} style={tab === "categories" ? selectedTabStyle : {} }
                        href={route('store.categories', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faBarsStaggered} /> {textCategories}
                    </Link>
                    <Link className={styles.tab} style={tab === "products" ? selectedTabStyle : {} }
                        href={route('store.products', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faTag} /> {textProducts}
                    </Link>
                    <Link className={styles.tab} style={tab === "shipping" ? selectedTabStyle : {} }
                        href={route('store.shipping', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faTruckFast} /> {textShipping}
                    </Link>
                    <Link className={styles.tab} style={tab === "orders" ? selectedTabStyle : {} }
                        href={route('store.orders', {project: children.props.project.data.id, status: "1"} )}>
                        <FontAwesomeIcon icon={faBoxOpen} /> {textOrders}
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

export default StoreLayout;
