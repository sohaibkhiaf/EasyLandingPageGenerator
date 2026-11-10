import styles from "../../css/Components/ProductSidePanel.module.css";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked, faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../connection.js';
import { faMinus, faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useStoreContext } from "../StoreContext.jsx";


function ProductSidePanel({ project, theme }) {

    // get current default language
    let currentLanguage = localStorage.getItem('DEFAULT_LANGUAGE_'+project.id)
        || project.default_language;

    // this sets fallback language= en
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textCurr = currentLanguage == 'en' ? 'DZD'
        : (currentLanguage == 'fr' ? 'DA' : 'د.ج');
    const textAvailable = currentLanguage == 'en' ? 'Available'
        : (currentLanguage == 'fr' ? 'Disponible' : 'متوفر');
    const textUnavailable = currentLanguage == 'en' ? 'Unavailable'
        : (currentLanguage == 'fr' ? 'Indisponible' : 'غير متوفر');
    const textAddToCart = currentLanguage == 'en'
        ? 'Add to cart' : (currentLanguage == 'fr'
            ? 'Ajouter au panier' : 'أضف إلى السلة');

    // store context
    const { cartItems,  updateCartItem, addCartItem, deleteCartItem, 
        productSidePanel : product, closeProductSidePanel: closePanel} 
        = useStoreContext();

    // images
    let mainImage;
    if (product != null && product.main_image_url) {
        mainImage = product.main_image_url;
    }
    const [preview, setPreview] = useState(mainImage);

    // preview image effect on mouse move
    const handleMouseMove = (e) => {
        e.preventDefault();
        const image = document.getElementById('preview-image');
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        image.style.transformOrigin = `${x}% ${y}%`;
        image.style.transform = "scale(1.5)";
    };

    // reset preview image scale on mouse leave
    const handleMouseLeave = (e) => {
        e.preventDefault();
        const image = document.getElementById('preview-image');
        image.style.transformOrigin = "center";
        image.style.transform = "scale(1)";
    };

    // preview image update
    const updatePreviewImage = (e, image) => {
        setPreview(image);
    };
    
    // find item in cart: null if not found
    let item = product != null? 
        cartItems.find(item => item.product_id == product.id) : null;

    // quantity functions
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

    // update main image preview on product change
    useEffect(() => {
        setPreview(mainImage);
    }, [product]);

    // user styles 
    let addToCartBtnStyle = {backgroundColor: theme.light_color, }; 
    const addToCartBtnHover = (e) => { 
        e.target.style.backgroundColor = theme.dark_color; 
    };
    const addToCartBtnNormal = (e) => {
        e.target.style.backgroundColor = theme.light_color; 
    };

    // styles 
    const previewImageStyle = { 
        opacity: "0.7", 
    };

    // style considering direction 
    let discountStyle = {}; 
    let openPanelCStyle = {}; 
    let closedPanelCStyle = {}; 
    if (currentLanguage == 'ar'){ 
        discountStyle = { marginLeft: "10px", };
        openPanelCStyle = { right: "0", }
        closedPanelCStyle = {right: "0", 
            transform: "translateX(100%)",}
    }else {
        discountStyle = { marginRight: "10px", }; 
        openPanelCStyle = {left: "0", }
        closedPanelCStyle = {left: "0", 
            transform: "translateX(-100%)",}
    } 

    return (
    <div className={product!= null ? styles.openPanelC : styles.closedPanelC} 
        style={product!= null ? openPanelCStyle: closedPanelCStyle}
        onClick={e=> e.stopPropagation()}>
        {/* close button */}
        <div className={styles.closeBtnC}>
            <FontAwesomeIcon icon={faCircleXmark} className={styles.closeBtn}
                onClick={() => closePanel()}/>
        </div>

        {/* product details */}
        {product != null &&
        <div className={styles.productPanelC}>

            {/* small screens version */}
            <div className={styles.nameOverImgC}>
                <Link className={styles.category}>{currentLanguage == 'ar' ? product.category_ar_name :
                (currentLanguage == 'fr' ? product.category_fr_name  : 
                product.category_en_name)}</Link>

                <h3 className={styles.name}>{product.name}</h3>
            </div>

            {/* product images */}
            <div className={styles.imagesC}>
                {/* preview image */}
                <div className={styles.previewImageC}
                    onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                    {mainImage != null ?
                    (<img id="preview-image" className={styles.previewImage}
                        src={conn_URL+ "uploads/"+preview} alt="preview"/>)
                    :
                    (<img id="preview-image" className={styles.previewImage}
                        src={conn_URL+ "placeholder/product.svg"} alt="preview"/>)}
                </div>

                <div className={styles.multipleImagesC}>
                    {/* main image */}
                    {mainImage != null ?
                    (<img className={styles.multipleImage}
                        src={conn_URL+ "uploads/"+mainImage} alt="main"
                        onClick={e => updatePreviewImage(e, mainImage)}
                        style={mainImage == preview ? previewImageStyle : {} }/>)
                    :
                    (<img className={styles.multipleImage}
                        src={conn_URL+ "placeholder/product.svg"} alt="main"
                        style={previewImageStyle}/>)
                    }

                    {/* multiple images */}
                    {product.multiple_images_urls && product.multiple_images_urls.map((image) => (
                        <img key={image.id} className={styles.multipleImage} alt="multiple"
                            src={conn_URL+ "uploads/"+image.image_url}
                            onClick={e => updatePreviewImage(e, image.image_url)}
                            style={image.image_url == preview ? previewImageStyle : {} } />
                    ))}
                </div>
            </div>

            {/* product details */}
            <div className={styles.detailsC}>

                {/* category */}
                <Link className={styles.category}>{currentLanguage == 'ar' ? product.category_ar_name :
                (currentLanguage == 'fr' ? product.category_fr_name  : 
                product.category_en_name)}</Link>

                {/* product name */}
                <h3 className={styles.name}>{product.name}</h3>

                {/* price / discount */}
                {product.discount == null ?
                (<div className={styles.price}>
                    {new Intl.NumberFormat('en-US')
                        .format(product.price)} {textCurr}
                </div>)
                :
                (<div className={styles.priceC}>
                    <div className={styles.discount} style={discountStyle}>
                        {new Intl.NumberFormat('en-US')
                            .format(product.discount)} {textCurr}
                    </div> 
                    <div className={styles.price}>
                        {new Intl.NumberFormat('en-US')
                            .format(product.price)} {textCurr}
                    </div>
                </div>)
                }

                {/* available / unavailable */}
                {product.stock > 0 ?
                (<p className={styles.available}>
                    <FontAwesomeIcon icon={faCircleCheck} /> {textAvailable} 
                </p>)
                :
                (<p className={styles.unavailable}>
                    <FontAwesomeIcon icon={faCircleExclamation} /> {textUnavailable} 
                </p>)}

                {/* add to cart button/ item quantity manipulation */}
                {item == null ? (
                    <div className={styles.addToCartBtnC}>
                        <button className={styles.addToCartBtn} onClick={addToCart}
                            onMouseEnter={addToCartBtnHover} onMouseLeave={addToCartBtnNormal}
                            style={addToCartBtnStyle}> 
                            {textAddToCart} <FontAwesomeIcon icon={faShoppingCart}/>
                            </button>
                    </div>
                )
                : (
                    <div className={styles.quantityC}>
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

                {/* description */}
                <p className={styles.description}>{product.description}</p>

            </div>

        </div>
        }
    </div>
    );
}

export default ProductSidePanel;

