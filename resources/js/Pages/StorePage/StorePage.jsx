import { Head, Link } from "@inertiajs/react";
import styles from "../../../css/StorePage.module.css";
import StorePageLayout from "../../Layouts/StorePageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from "../../connection.js";
import ImageSlider from "../../Components/ImageSlider.jsx";
import ProductSlider from "../../Components/ProductSlider.jsx";
import { useStoreContext } from "../../StoreContext.jsx";

function StorePage({ project, shippings, theme }) {

    // get current default language
    let currentLanguage = localStorage.getItem('DEFAULT_LANGUAGE_'+project.data.id)
        || project.data.default_language;

    // this sets fallback language= en
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textShopNow = currentLanguage == 'en' ? 'Shop now'
        : (currentLanguage == 'fr' ? 'Achetez maintenant' : 'تسوق الآن');

    // store context 
    const {closeCartSidePanel, closeProductSidePanel} = useStoreContext();

    // close panels on page body click
    document.documentElement.addEventListener('click', function (e) {
        closeCartSidePanel();
        closeProductSidePanel();
    });

    // user styles
    let shopNowBtnStyle = {backgroundColor: theme.data.light_color, };
    const shopNowBtnHover = (e) => {
        e.target.style.backgroundColor = theme.data.dark_color;
    };
    const shopNowBtnNormal = (e) => {
        e.target.style.backgroundColor = theme.data.light_color;
    };

    // scroll down function
    const scrollDown = (e) => {
        e.preventDefault();
        window.scrollBy({
            top: 580,
            behavior: 'smooth',
        });
    };

    return (
    <div className={styles.storePageC}>

        <Head title={"NOAPPNAME:"+project.data.name} />

        {/* header  */}
        <div className={styles.headerC}>
            {/* hero section */}
            <div className={styles.heroSectionC}>
                {/* headline */}
                <h2 className={styles.headline}>
                    {project.data.headline}
                </h2>

                {/* subheadline */}
                <p className={styles.subheadline}>
                    {project.data.subheadline}
                </p>

                {/* call to action */}
                <Link href="#" className={styles.shopNowBtn} 
                    onClick={e=> scrollDown(e)}
                    onMouseEnter={shopNowBtnHover} onMouseLeave={shopNowBtnNormal} 
                    style={shopNowBtnStyle}>
                    {textShopNow} <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
            </div>

            {/* image slider */}
            <div className={styles.imageSliderC}>
                <ImageSlider images={project.data.multiple_images_urls} />
            </div>
        </div>

        {/* categories & products */}
        {project.data.categories.map((category) => 
            category.enabled ?
            (<div key={category.id} className={styles.ctgProductsC}>
                {/* category name */}
                <h3 className={styles.ctgName}>
                    {currentLanguage == 'ar' ? category.ar_name : 
                    ( currentLanguage == 'fr'? category.fr_name : 
                    category.en_name)}</h3>
                {/* products */}
                <ProductSlider products={category.products} 
                    project={project.data} theme={theme.data}/>
            </div>)
            :
            (<div key={category.id} hidden></div>)
        )}
    </div>
    );
}

StorePage.layout = page => <StorePageLayout children={page} />

export default StorePage;
