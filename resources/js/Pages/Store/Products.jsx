import StoreLayout  from "../../Layouts/StoreLayout.jsx";
import { Head, router } from "@inertiajs/react";
import styles from "../../../css/Store/Products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import ProductItem from "../../Components/ProductItem.jsx";

function Products ({project, products}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textProducts = currentLanguage == 'en' ? 'Products'
        : (currentLanguage == 'fr' ? 'Produits' : 'المنتجات');
    const textCreateProduct = currentLanguage == 'en' ?
        'Create a new product'
            : (currentLanguage == 'fr' ?
            'Créer un nouveau produit'
            : 'إنشاء منتج جديد');
    const textNoProducts = currentLanguage == 'en' ? 'You have no products yet'
        : (currentLanguage == 'fr' ? 'Vous n’avez pas encore de produits' : 'ليست لديك أي منتجات حاليا');

    // hooks
    const route = useRoute();

    // create product
    const createProduct = (e, projectId) => {
        e.preventDefault();
        router.visit(route('store.products.create', {project: projectId}));
    };

    return (
        <div className={styles.productsC}>

            <Head title={textProducts}/>

            <h2 className={styles.productsHeader}>
                {textProducts} <FontAwesomeIcon icon={faTag} />
            </h2>

            <div className={styles.createPrdBtnC}>
                <button className={styles.createPrdBtn}
                    onClick={(e) => createProduct(e, project.data.id)}>
                        {textCreateProduct} <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            <div className={styles.prdsC}>
                {products.data.length > 0 ? products.data.map((product)=> (
                    <ProductItem key={product.id} product={product} project={project}/>
                ))
                :
                (<div className={styles.noProductsMsg}>
                    <FontAwesomeIcon icon={faCircleExclamation} /> {textNoProducts}
                </div>)}
            </div>

        </div>
    );
}

Products.layout = page => <StoreLayout tab="products" children={page} />

export default Products;

