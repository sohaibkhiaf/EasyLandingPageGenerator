import styles from "../../css/Components/CartSidePanel.module.css";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMobileButton, faTruck, faUser, faMap, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../connection.js';
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {useRoute} from "../../../vendor/tightenco/ziggy";
import CartItem from "./CartItem.jsx";
import { useStoreContext } from "../StoreContext.jsx";


function CartSidePanel({ shippings, project, theme }) {

    // get current default language
    let currentLanguage = localStorage.getItem('DEFAULT_LANGUAGE_'+project.id)
        || project.default_language;

    // this sets fallback language= en
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textCurr = currentLanguage == 'en' ? 'DZD'
        : (currentLanguage == 'fr' ? 'DA' : 'د.ج');
    const textFullName = currentLanguage == 'en' ? 'Full name'
        : (currentLanguage == 'fr' ? 'Nom complet' : 'الإسم الكامل');
    const textPhoneNumber = currentLanguage == 'en' ? 'Phone number'
        : (currentLanguage == 'fr' ? 'Numéro de téléphone' : 'رقم الهاتف');
    const textRegion = currentLanguage == 'en' ? 'Region'
        : (currentLanguage == 'fr' ? 'Wilaya' : 'الولاية');
    const textSelectRegion = currentLanguage == 'en' ? 'Select region'
        : (currentLanguage == 'fr' ? 'Sélectionner la wilaya' : 'حدد الولاية');
    const textAddress = currentLanguage == 'en' ? 'Address'
        : (currentLanguage == 'fr' ? 'Adresse' : 'العنوان');
    const textShippingType = currentLanguage == 'en' ? 'Shipping type'
        : (currentLanguage == 'fr' ? 'Type de livraison' : 'نوع التوصيل');
    const textSelectShippingType = currentLanguage == 'en' ? 'Select shipping type'
        : (currentLanguage == 'fr' ? 'Sélectionner le type de livraison' : 'حدد نوع التوصيل');
    const textPickUpDesk = currentLanguage == 'en' ? 'Pick-up desk'
        : (currentLanguage == 'fr' ? 'Retrait au bureau' : 'إلى مكتب التوصيل');
    const textHomeDelivery = currentLanguage == 'en' ? 'Home delivery'
        : (currentLanguage == 'fr' ? 'Livraison à domicile' : 'إلى المنزل');
    const textSubtotal = currentLanguage == 'en' ? 'Subtotal'
        : (currentLanguage == 'fr' ? 'Sous-total' : 'المبلغ');
    const textShipping = currentLanguage == 'en' ? 'Shipping'
        : (currentLanguage == 'fr' ? 'Livraison' : 'التوصيل');
    const textTotal = currentLanguage == 'en' ? 'Total'
        : (currentLanguage == 'fr' ? 'Total' : 'المجموع');
    const textPayOnDelivery = currentLanguage == 'en' ? 'Pay on delivery'
        : (currentLanguage == 'fr' ? 'Paiement à la livraison' : 'إدفع عند الإستلام');
    const textCartEmpty = currentLanguage == 'en' ? 'Your cart is empty'
        : (currentLanguage == 'fr' ? 'Votre panier est vide' : 'سلتك فارغة');

    // store context
    const { cartItems, cartSubtotal, cartShippingCost, updateShippingCost,
        cartTotal, updateTotal, cartShippingType, updateShippingType, cartClientFullName,
        updateFullName, cartClientPhone, updatePhone, cartClientAddress, updateAddress,
        cartClientRegion, updateRegion, cartTotalItems, 
        cartSidePanel: panel, closeCartSidePanel: closePanel, } 
            = useStoreContext();

    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing, reset} = useForm({
        client_name: cartClientFullName,
        client_phone: cartClientPhone,
        client_address: cartClientAddress,
        shipping_type: cartShippingType,
        region: cartClientRegion,
        items: cartItems, 
    });

    // shipping cost 
    useEffect(() => {
        // check data validity
        if (data.shipping_type && data.region) {
            if (data.shipping_type == "home"){
                updateShippingCost(shippings[data.region-1].home);
            }else if (data.shipping_type == "desk") {
                updateShippingCost(shippings[data.region-1].desk);
            }
        }else {
            updateShippingCost(0);
        }
    }, [data.shipping_type, data.region]);

    // cart items
    useEffect(() => {
        setData('items', cartItems);
    }, [cartTotal]);

    // order function
    const submit = (e) => {
        e.preventDefault();
        fbq("track", "Purchase");

        post(route('store.order', {project: project.id}), {
            preserveScroll: true,
        });
    };

    // style considering direction
    let invoiceBorderStyle = {};
    if (currentLanguage == 'ar'){
        invoiceBorderStyle = {borderRight: "var(--border-style)",};
    }else {
        invoiceBorderStyle = {borderLeft: "var(--border-style)",};
    }

    // user styles 
    let createOrderBtnStyle = {backgroundColor: theme.action_color, };
    let createOrderBtnDisabledStyle = {backgroundColor: "background-color: var(--hover-color)"};
    const createOrderBtnHover = (e) => {
        e.target.style.backgroundColor = theme.action_hover_color;
    };
    const createOrderBtnNormal = (e) => {
        e.target.style.backgroundColor = theme.action_color;
    };

    // style considering direction 
    let openPanelCStyle = {}; 
    let closedPanelCStyle = {}; 
    if (currentLanguage == 'ar'){ 
        openPanelCStyle = { left: "0", }
        closedPanelCStyle = {left: "0", 
            transform: "translateX(-100%)",}
    }else {
        openPanelCStyle = {right: "0", }
        closedPanelCStyle = {right: "0", 
            transform: "translateX(100%)",}
    } 

    return (
    <div className={panel ? styles.openPanelC : styles.closedPanelC} 
        style={panel ? openPanelCStyle :closedPanelCStyle} 
        onClick={e=> e.stopPropagation()}>
        {/* close button */}
        <div className={styles.closeBtnC}>
            <FontAwesomeIcon icon={faCircleXmark} className={styles.closeBtn} 
                onClick={() => closePanel() }/>
        </div>

        {panel && 
        <div className={styles.cartPanelC}>

            {/* client information container */}
            <div className={styles.informationC}>
                
                {/* information form */}
                <form className={styles.formC} onSubmit={submit}>

                    {/* client name */}
                    <div className={styles.clientNameC}>
                        <label htmlFor="client_name">
                            {textFullName} <FontAwesomeIcon icon={faUser} />
                        </label>
                        <input type="text" name="client_name" value={data.client_name}
                            onChange={(e) => {
                                setData('client_name',e.target.value );
                                updateFullName(e.target.value)}}
                            placeholder={textFullName}/>
                        {errors.client_name && <p>{errors.client_name}</p>}
                    </div>

                    {/* client phone */}
                    <div className={styles.clientPhoneC}>
                        <label htmlFor="client_phone">
                            {textPhoneNumber} <FontAwesomeIcon icon={faMobileButton} />
                        </label>
                        <input type="text" name="client_phone" value={data.client_phone}
                            onChange={(e) => { 
                                setData('client_phone',e.target.value);
                                updatePhone(e.target.value);}}
                            placeholder={textPhoneNumber}/>
                        {errors.client_phone && <p>{errors.client_phone}</p>}
                    </div>

                    {/* client region */}
                    <div className={styles.regionC}>
                        <label htmlFor="region">
                            {textRegion} <FontAwesomeIcon icon={faMap} />
                        </label>
                        <select name="region" value={data.region}
                            onChange={(e) => {
                                setData('region', e.target.value);
                                updateRegion(e.target.value);}}>
                            <option value="">{textSelectRegion}</option>
                            {shippings.map((shipping) => 
                                shipping.enabled ? 
                                (<option key={shipping.region.id} value={shipping.region.id}>
                                    {shipping.region.fg_name} - {shipping.region.ar_name}
                                </option>
                                ): (<option key={shipping.region.id} value="" disabled>
                                    {shipping.region.fg_name} - {shipping.region.ar_name}
                                </option>)
                                )}
                        </select>
                        {errors.region && <p>{errors.region}</p>}
                    </div>

                    {/* client address */}
                    <div className={styles.clientAddressC}>
                        <label htmlFor="client_address">
                            {textAddress} <FontAwesomeIcon icon={faLocationDot} />
                        </label>
                        <input type="text" name="client_address"  value={data.client_address}
                            onChange={(e) => {setData('client_address',e.target.value);
                                updateAddress(e.target.value);}}
                            placeholder={textAddress} />
                        {errors.client_address && <p>{errors.client_address}</p>}
                    </div>

                    {/* shipping type */}
                    <div className={styles.shippingTypeC}>
                        <label htmlFor="shipping_type">
                            {textShippingType} <FontAwesomeIcon icon={faTruck} />
                        </label>
                        <select name="shipping_type" value={data.shipping_type}
                            onChange={(e) => {setData('shipping_type', e.target.value);
                                updateShippingType(e.target.value);
                            }}>
                            <option value="">{textSelectShippingType}</option>
                            <option value="desk">{textPickUpDesk}</option>
                            <option value="home">{textHomeDelivery}</option>
                        </select>
                        {errors.shipping_type && <p>{errors.shipping_type}</p>}
                    </div>

                    {/* invoice/ pay button */}
                    <div className={styles.payBtnC}>
                        {/* invoice */}
                        {cartShippingType && cartClientRegion ?
                        (<div className={styles.invoiceC}>
                            <p className={styles.subtotal}>
                                {textSubtotal} {new Intl.NumberFormat('en-US')
                                    .format(cartSubtotal)} {textCurr}
                            </p>
                            <p className={styles.shipping} style={invoiceBorderStyle}>
                                {textShipping} {new Intl.NumberFormat('en-US')
                                    .format(cartShippingCost)} {textCurr}
                            </p>
                            <p className={styles.total} style={invoiceBorderStyle}>
                                {textTotal} {new Intl.NumberFormat('en-US')
                                    .format(cartTotal)} {textCurr}
                            </p>
                        </div>)
                        :
                        (<></>)
                        }
                        {/* action button */}
                        <button className={styles.payBtn} disabled={processing || cartTotalItems ==0 }
                            onMouseEnter={processing || cartTotalItems ==0 ? null: 
                                createOrderBtnHover} 
                            onMouseLeave={processing || cartTotalItems ==0 ? null : 
                                createOrderBtnNormal}
                            style={processing || cartTotalItems ==0 ? 
                                createOrderBtnDisabledStyle :createOrderBtnStyle}>
                            {textPayOnDelivery}
                        </button>
                    </div>

                </form>
            </div>
            
            {/* cart items */}
            <div className={styles.itemsC}>
                {cartItems.length > 0 ? 
                (cartItems.map((item) => (
                    <CartItem key={item.product_id} item={item} 
                        project={project} />
                ))) 
                :
                (<div>
                    <FontAwesomeIcon icon={faExclamationCircle}/> {textCartEmpty}
                </div>)}
            </div>
        </div>
        }
    </div>
    );
}

export default CartSidePanel;

