import { router, useForm } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import styles from "../../css/Components/ProductItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faBarsStaggered, faBoxesStacked, faCoins, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../connection.js';
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";

function ProductItem({project, product}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textDeleteConfirm = currentLanguage == 'en'
        ? 'Are you sure you want to delete this product?'
        : (currentLanguage == 'fr'
            ? 'Êtes-vous sûr de vouloir supprimer ce produit ?'
            : 'هل أنت متأكد من أنك تريد حذف هذا المنتج؟');
    const textEnabled = currentLanguage == 'en' ? 'Enabled'
        : (currentLanguage == 'fr' ? 'Activé' : 'مفعل');
    const textDisabled = currentLanguage == 'en' ? 'Disabled'
        : (currentLanguage == 'fr' ? 'Désactivé' : 'غير مفعل');
    const textCurr = currentLanguage == 'en' ? 'DZD'
        : (currentLanguage == 'fr' ? 'DA' : 'د.ج');
    const textStock = currentLanguage == 'en' ? 'Stock='
        : (currentLanguage == 'fr' ? 'Stock=' : 'المخزون=');


    // hooks initialization
    const route = useRoute();
    const {post} = useForm();

    // edit product function
    const editProduct = (e) => {
        e.preventDefault();
        router.visit(route('store.products.edit', { project: project.data.id,
            product: product.id} ), {
            preserveScroll: true
        });
    }

    // delete product function
    const deleteProduct = (e) => {
        e.preventDefault();
        if (window.confirm(textDeleteConfirm)){
            post(route('product.delete', {product: product.id} ), {
                preserveScroll: true
            });
        }
    }

    // styles considering direction
    let actionsCStyle = {};
    if (currentLanguage == 'ar'){
        actionsCStyle = {
            left: "7px",
        }
    }else {
        actionsCStyle = {
            right: "7px",
        }
    };

    // category name language
    const category = currentLanguage == 'en'
        ? product.category.en_name : (currentLanguage == 'fr'
            ? product.category.fr_name : product.category.ar_name);

    // price+ discount money format
    let price = new Intl.NumberFormat('en-US').format(product.price);
    let discount = new Intl.NumberFormat('en-US').format(product.discount);

    return (
        <div className={styles.productC}>
            {/* main image */}
            <div className={styles.imageC}>
                {product.main_image_url == null ?
                (<img src={conn_URL+ "placeholder/product.svg"} alt="main-image"/>)
                :
                (<img src={conn_URL+"uploads/"+product.main_image_url} alt="main-image"/>)}
                <div className={styles.actionsC}
                    style={actionsCStyle}>
                    <FontAwesomeIcon icon={faTrash}
                        onClick={e => deleteProduct(e)}
                        className={styles.actionIcon} />
                    <FontAwesomeIcon icon={faPen}
                        onClick={e => editProduct(e)}
                        className={styles.actionIcon} />
                </div>
            </div>

            {/* name */}
            <div className={styles.nameC}>
                {product.name}
            </div>

            {/* description */}
            <div className={styles.descC}>
                {product.description}
            </div>

            {/* category */}
            <div className={styles.categoryC}>
                <FontAwesomeIcon icon={faBarsStaggered} /> {category}
            </div>

            {/* stock */}
            <div className={styles.stockC}>
                <FontAwesomeIcon icon={faBoxesStacked} /> {textStock} <span className={styles.stock}>
                    {product.stock}</span>
            </div>

            {/* price & discount */}
            {product.discount == null ?
            (<div className={styles.priceC}>
                <FontAwesomeIcon icon={faCoins} /> {price} {textCurr}
            </div>) :
            (<div className={styles.priceC}>
                <FontAwesomeIcon icon={faCoins} /> {discount} {textCurr} <span className={styles.discount}>
                    {price} {textCurr}</span>
            </div>) }

            {/* enabled? */}
            <div className={styles.enabledC}>
                {product.enabled ? 
                (<><FontAwesomeIcon icon={faCircleCheck} /> 
                    {textEnabled}</>)
                :(<><FontAwesomeIcon icon={faCircleXmark} /> 
                    {textDisabled}</>) }
            </div>

        </div>
    );
}

export default ProductItem;
