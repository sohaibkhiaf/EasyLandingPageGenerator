import styles from "../../css/Components/ProductItem2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMinus, faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../connection.js';
import { useStoreContext } from "../StoreContext.jsx";

function ProductItem2({ product, project, theme }) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('DEFAULT_LANGUAGE_'+project.id);

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textCurr = currentLanguage == 'en' ? 'DZD'
        : (currentLanguage == 'fr' ? 'DA' : 'د.ج');
    const textAddToCart = currentLanguage == 'en'
        ? 'Add to cart' : (currentLanguage == 'fr'
            ? 'Ajouter au panier' : 'أضف إلى السلة');

    // store context
    const {
        cartItems, updateCartItem, addCartItem, deleteCartItem,
        openProductSidePanel: openPanel} = useStoreContext(project.id);

    // user styles 
    let addToCartBtnStyle = {backgroundColor: theme.light_color, };
    const addToCartBtnHover = (e) => {
        e.target.style.backgroundColor = theme.dark_color;
    };
    const addToCartBtnNormal = (e) => {
        e.target.style.backgroundColor = theme.light_color;
    };

    // price+ discount money format
    let price = new Intl.NumberFormat('en-US').format(product.price);
    let discount = new Intl.NumberFormat('en-US').format(product.discount);

    // find in cart: null if not found 
    let item = cartItems.find(item => item.product_id == product.id);

    // quantity manipulation functions
    const addToCart = () => {
        item = { product_id: product.id, 
            product_name: product.name, 
            quantity: 1,
            unit_price: product.discount == null ? product.price : product.discount,
            subtotal:  product.discount == null ? product.price * 1 : product.discount * 1,
            image_url: product.main_image_url,
            max_quantity: product.max_quantity, };
            addCartItem(project.id, item);
    }
    const increaseQuantity = () => {
        if (item.quantity < item.max_quantity){
            item.quantity += 1;
            item.subtotal = item.quantity * item.unit_price;
            updateCartItem(project.id, item);
        }
    }
    const decreaseQuantity = () => {
        if (item.quantity <= 1){
            deleteCartItem(project.id, item);
        }else {
            item.quantity -= 1;
            item.subtotal = item.quantity * item.unit_price;
            updateCartItem(project.id, item);
        }
    }

    return (
        <div className={styles.productC}>
            {/* main image */}
            <div className={styles.imageC}>
                {product.main_image_url == null ?
                (<img src={conn_URL+ "placeholder/product.svg"} alt="main-image" 
                    onClick={(e) => {
                        e.stopPropagation();
                        openPanel( product);} }/>)
                :
                (<img src={conn_URL+"uploads/"+product.main_image_url} alt="main-image" 
                    onClick={(e) => {
                        e.stopPropagation();
                        openPanel(product);}}/>)}
            </div>

            {/* name */}
            <div className={styles.nameC}>
                {product.name}
            </div>

            {/* description */}
            <div className={styles.descC}>
                {product.description}
            </div>

            {/* price & discount */}
            {product.discount == null ?
            (<div className={styles.priceC}>
                <FontAwesomeIcon icon={faCoins} /> {price} {textCurr}
            </div>) :
            (<div className={styles.priceC}>
                <FontAwesomeIcon icon={faCoins} /> {discount} {textCurr} 
                <span className={styles.discount}>
                {price} {textCurr}</span>
            </div>) }

            {/* add to cart / quantity manipulation */}
            {item == null ? (
                <div className={styles.addToCartBtnC} onClick={e=> e.stopPropagation()}>
                    <button className={styles.addToCartBtn} onClick={addToCart}
                        onMouseEnter={addToCartBtnHover} onMouseLeave={addToCartBtnNormal}
                        style={addToCartBtnStyle}> 
                        {textAddToCart} <FontAwesomeIcon icon={faShoppingCart}/>
                        </button>
                </div>
            )
            : (
                <div className={styles.quantityC} 
                    onClick={e=> e.stopPropagation()}>
                    <button className={styles.decreaseQuantity} 
                        onClick={decreaseQuantity}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </button> 
                    <span className={styles.itemQuantity}>
                        {item.quantity}
                    </span> 
                    <button className={styles.increaseQuantity} 
                        onClick={increaseQuantity}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductItem2;
