import styles from "../../css/Components/CartItem.module.css";
import {URL as conn_URL} from "../connection.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useStoreContext } from "../StoreContext.jsx";

function CartItem({ item, project }) {

    // get current default language
    let currentLanguage = localStorage.getItem('DEFAULT_LANGUAGE_'+project.id)
        || project.default_language;

    // this sets fallback language= en
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textCurr = currentLanguage == 'en' ? 'DZD'
        : (currentLanguage == 'fr' ? 'DA' : 'د.ج');
    const textSubtotal = currentLanguage == 'en' ? 'Subtotal'
        : (currentLanguage == 'fr' ? 'Sous-total' : 'المجموع');
    const textPrice = currentLanguage == 'en' ? 'Price'
        : (currentLanguage == 'fr' ? 'Prix' : 'السعر');

    // store context
    const { cartItems,  updateCartItem, addCartItem, deleteCartItem } 
        = useStoreContext();
    
    // quantity functions
    const deleteItem = () => {
        deleteCartItem(project.id, item);
    }
    const increaseQuantity = () => {
        if (item.quantity < item.max_quantity){
            item.quantity += 1;
            item.subtotal = item.quantity * item.unit_price;
            updateCartItem(project.id, item);
        }
    }
    const descreaseQuantity = () => {
        if (item.quantity <= 1){
            deleteCartItem(project.id, item);
        }else {
            item.quantity -= 1;
            item.subtotal = item.quantity * item.unit_price;
            updateCartItem(project.id, item);
        }
    }

    // styles considering direction
    let deleteItemBtnStyle = {};
    if (currentLanguage == 'ar') {
        deleteItemBtnStyle = {
            left: "5px",
        };
    }else {
        deleteItemBtnStyle = {
            right: "5px",
        };
    }

    return (
    <div className={styles.itemC}>
        {/* image  */}
        <div className={styles.itemImageC}>
            {item.image_url != null ? 
            (<img src={conn_URL+"uploads/"+item.image_url} alt="item-image" 
                className={styles.itemImage} />) 
            : 
            (<img src={conn_URL+"placeholder/product.svg"} alt="item-image" 
                className={styles.itemImage} />)}
            
        </div>

        {/* item details */}
        <div className={styles.itemDetailsC}>
            <div className={styles.productName}>{item.product_name}</div>
            <div className={styles.quantityC}>
                <button className={styles.decreaseQuantity} 
                    onClick={descreaseQuantity}>
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
            <div className={styles.unitPrice}>
                {textPrice}= {new Intl.NumberFormat('en-US')
                    .format(item.unit_price)} {textCurr}</div> 
            <div className={styles.subtotal}>
                {textSubtotal}= {new Intl.NumberFormat('en-US')
                    .format(item.subtotal)} {textCurr}</div> 
            <div className={styles.deleteItem} onClick={deleteItem}
                style={deleteItemBtnStyle}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>
    </div>
    );
}

export default CartItem;
