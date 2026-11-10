import { useForm } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useRef } from "react";
import styles from "../../css/Components/OrderForm2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faArrowsRotate, faBoxOpen, faCoins, faLocationDot, faMobileButton, faShoppingCart, faTrashCan, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";


function OrderForm2 ({order, statuses}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // text considering preferred language
    const textOrderStatus = currentLanguage == 'en' ? 'Order status'
        : (currentLanguage == 'fr' ? 'Statut' : 'حالة الطلبية');
    const textSubtotal = currentLanguage == 'en' ? 'Subtotal'
        : (currentLanguage == 'fr' ? 'Sous-total' : 'المبلغ');
    const textShipping = currentLanguage == 'en' ? 'Shipping'
        : (currentLanguage == 'fr' ? 'Livraison' : 'التوصيل');
    const textTotal = currentLanguage == 'en' ? 'Total'
        : (currentLanguage == 'fr' ? 'Total' : 'المبلغ الإجمالي');
    const textShippingType = currentLanguage == 'en' ? 'Shipping type'
        : (currentLanguage == 'fr' ? 'Type de livraison' : 'نوع التوصيل');
    const textHomeDelivery = currentLanguage == 'en' ? 'Home delivery'
        : (currentLanguage == 'fr' ? 'Livraison à domicile' : 'التوصيل إلى المنزل');
    const textPickupDesk = currentLanguage == 'en' ? 'Pick-up desk'
        : (currentLanguage == 'fr' ? 'Retrait au bureau' : 'التوصيل إلى المكتب');
    const textClientFullName = currentLanguage == 'en' ? 'Client full name'
        : (currentLanguage == 'fr' ? 'Nom complet du client' : 'الإسم الكامل للزبون');
    const textClientPhoneNumber = currentLanguage == 'en' ? 'Client phone number'
        : (currentLanguage == 'fr' ? 'Numéro de téléphone du client' : 'رقم هاتف الزبون');
    const textClientAddress = currentLanguage == 'en' ? 'Client address'
        : (currentLanguage == 'fr' ? 'Adresse du client' : 'عنوان الزبون');
    const textProductName = currentLanguage == 'en' ? 'Product name'
        : (currentLanguage == 'fr' ? 'Nom de produit' : 'إسم المنتج');
    const textQuantity = currentLanguage == 'en' ? 'Quantity'
        : (currentLanguage == 'fr' ? 'Quantité' : 'الكمية');
    const textUnitPrice = currentLanguage == 'en' ? 'Unit price'
        : (currentLanguage == 'fr' ? 'Prix unitaire' : 'ثمن الوحدة');
    const textOrderItems = currentLanguage == 'en' ? 'Order items'
        : (currentLanguage == 'fr' ? 'Articles de la commande' : 'عناصر الطلبية');
    const textUpdate = currentLanguage == 'en' ? 'Update'
        : (currentLanguage == 'fr' ? 'Mettre à jour' : 'تحديث');
    const textDelete = currentLanguage == 'en' ? 'Delete'
        : (currentLanguage == 'fr' ? 'Supprimer' : 'حذف');
    const textSubtotalHint = currentLanguage == 'en' ? 'Subtotal (DZD)'
        : (currentLanguage == 'fr' ? 'Sous-total (DA)' : 'المبلغ (د.ج)');
    const textShippingHint = currentLanguage == 'en' ? 'Shipping (DZD)'
        : (currentLanguage == 'fr' ? 'Livraison (DA)' : 'التوصيل (د.ج)');
    const textTotalHint = currentLanguage == 'en' ? 'Total (DZD)'
        : (currentLanguage == 'fr' ? 'Total (DA)' : 'المبلغ الإجمالي (د.ج)');
    const textClientFullNameHint = currentLanguage == 'en' ? 'Client full name'
        : (currentLanguage == 'fr' ? 'Nom complet du client' : 'الإسم الكامل للزبون');
    const textClientPhoneNumberHint = currentLanguage == 'en' ? 'Client phone number'
        : (currentLanguage == 'fr' ? 'Numéro de téléphone du client' : 'رقم هاتف الزبون');
    const textClientAddressHint = currentLanguage == 'en' ? 'Client address'
        : (currentLanguage == 'fr' ? 'Adresse du client' : 'عنوان الزبون');
    const textProductNameHint = currentLanguage == 'en' ? 'Product name'
        : (currentLanguage == 'fr' ? 'Nom de produit' : 'إسم المنتج');
    const textQuantityHint = currentLanguage == 'en' ? 'Required quantity'
            : (currentLanguage == 'fr' ? 'Quantité requise' : 'الكمية المطلوبة');
    const textUnitPriceHint = currentLanguage == 'en' ? 'Unit price (DZD)'
        : (currentLanguage == 'fr' ? 'Prix unitaire (DA)' : 'ثمن الوحدة (د.ج)');
    const textDeleteConfirm = currentLanguage == 'en'
        ? 'Are you sure you want to delete this order?'
        : (currentLanguage == 'fr'
            ? 'Êtes-vous sûr de vouloir supprimer cette commande ?'
            : 'هل أنت متأكد من أنك تريد حذف هذه الطلبية ؟');
    const textOrderIdentifier = currentLanguage == 'en' ? 'Order identifier'
        : (currentLanguage == 'fr' ? 'Identifiant de la commande' : 'معرف الطلبية');

    // styles considering language
    let orderClientFormCStyle = {};
    if (currentLanguage == 'ar'){
        orderClientFormCStyle = {
            borderRight: "var(--border-style)",
        };
    }else {
        orderClientFormCStyle = {
            borderLeft: "var(--border-style)",
        };
    };

    // hooks initialization
    const formRef = useRef(null);
    const route = useRoute();
    const clientRef = useRef(null);
    const clientUpRef = useRef(null);
    const clientDownRef = useRef(null);
    const itemsRef = useRef(null);
    const itemsUpRef = useRef(null);
    const itemsDownRef = useRef(null);
    const {data, setData, post, errors, processing} = useForm({
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        client_name: order.client_name,
        client_phone: order.client_phone,
        client_address: order.client_address,
        order_status_id: order.order_status.id,
        shipping_type: order.shipping_type,
        items: order.order_items,
    });

    // update order function
    const updateOrder = (e , orderId) => {
        e.preventDefault();
        post(route('order2.update', {order: orderId}), {
            preserveScroll: true,
        });
    };

    const deleteOrder = (e , orderId) => {
        e.preventDefault();
        if (window.confirm(textDeleteConfirm)){
            post(route('order2.delete', {order: orderId}), {
                preserveScroll: true,
            });
        }
    };

    // toggle client info function
    const toggleClientInfo = (e) => {
        e.preventDefault();
        if (clientRef.current.style.display == "block"){
            clientRef.current.style.display = "none";
            clientDownRef.current.style.display = "inline";
            clientUpRef.current.style.display = "none";
        }else {
            clientRef.current.style.display = "block";
            clientDownRef.current.style.display = "none";
            clientUpRef.current.style.display = "inline";
        }
    }

    // toggle order items function
    const toggleOrderItems = (e) => {
        e.preventDefault();
        if (itemsRef.current.style.display == "block"){
            itemsRef.current.style.display = "none";
            itemsDownRef.current.style.display = "inline";
            itemsUpRef.current.style.display = "none";
        }else {
            itemsRef.current.style.display = "block";
            itemsDownRef.current.style.display = "none";
            itemsUpRef.current.style.display = "inline";
        }
    }

    // update order items functions
    const updateProductNameByIndex = (value, index) => {
        let items = data.items;
        items[index].product_name = value;
        setData('items', items);
    }
    const updateQtyByIndex = (value, index) => {
        let items = data.items;
        items[index].quantity = value;
        setData('items', items);
    }
    const updateUnitPriceByIndex = (value, index) => {
        let items = data.items;
        items[index].unit_price = value;
        setData('items', items);
    }
    const updateSubtotalByIndex = (value, index) => {
        let items = data.items;
        items[index].subtotal = value;
        setData('items', items);
    }

    return (
        <div className={styles.orderC}>

            <div className={styles.orderIdentifier}>
                {textOrderIdentifier}: SP{order.id} 
            </div>

            <form className={styles.form} ref={formRef}>

                <div className={styles.editOrderInnerC}>
                    <div className={styles.orderPayementFormC}>
                        <div className={styles.doubleFieldC}>
                            <div className={styles.subtotalC}>
                                <label htmlFor="subtotal">
                                    {textSubtotal} <FontAwesomeIcon icon={faCoins} />
                                </label>
                                <input type="text" name="subtotal" value={data.subtotal}
                                    placeholder={textSubtotalHint}
                                    onChange={(e) => setData('subtotal', e.target.value)}/>
                                {errors.subtotal && <p>{errors.subtotal}</p> }
                            </div>

                            <div className={styles.shippingC}>
                                <label htmlFor="shipping">
                                    {textShipping} <FontAwesomeIcon icon={faCoins} />
                                </label>
                                <input type="text" name="shipping" value={data.shipping}
                                    placeholder={textShippingHint}
                                    onChange={(e) => setData('shipping', e.target.value)}/>
                                {errors.shipping && <p>{errors.shipping}</p> }
                            </div>
                        </div>

                        <div className={styles.doubleFieldC}>
                            <div className={styles.totalC}>
                                <label htmlFor="total">
                                    {textTotal} <FontAwesomeIcon icon={faCoins} />
                                </label>
                                <input type="text" name="total" value={data.total}
                                    placeholder={textTotalHint}
                                    onChange={(e) => setData('total', e.target.value)}/>
                                {errors.total && <p>{errors.total}</p> }
                            </div>

                            <div className={styles.shippingTypeC}>
                                <label htmlFor="shipping_type">
                                    {textShippingType} <FontAwesomeIcon icon={faTruck} />
                                </label>
                                <select name="shipping_type" value={data.shipping_type}
                                    onChange={(e) => setData('shipping_type', e.target.value)}>
                                    <option value="home">{textHomeDelivery}</option>
                                    <option value="desk">{textPickupDesk}</option>
                                </select>
                                {errors.shipping_type && <p>{errors.shipping_type}</p>}
                            </div>
                        </div>

                        <div className={styles.doubleFieldC}>
                            <div className={styles.statusC}>
                                <label htmlFor="status">
                                    {textOrderStatus} <FontAwesomeIcon icon={faArrowsRotate} />
                                </label>
                                <select name="status" value={data.order_status_id}
                                    onChange={(e) => setData('order_status_id', e.target.value)}>
                                    {statuses.data.map((status) => (
                                        <option key={status.id} value={status.id}>
                                            {currentLanguage == 'en' ?(status.en_message)
                                            : (currentLanguage == 'fr' ? status.fr_message
                                            : status.ar_message ) }
                                        </option>
                                    ))}
                                </select>
                                {errors.order_status_id && <p>{errors.order_status_id}</p>}
                            </div>

                            <div className={styles.toggleBtnsC}>
                                <span className={styles.toggleClientInformation}
                                    onClick={e => toggleClientInfo(e)}>
                                    <FontAwesomeIcon className={styles.toggleIcon} icon={faUser} />
                                    <span className={styles.showClientInfoC} ref={clientDownRef}>
                                        <FontAwesomeIcon className={styles.toggleIcon} icon={faAngleDown} />
                                    </span>
                                    <span className={styles.hideClientInfoC} ref={clientUpRef}>
                                        <FontAwesomeIcon className={styles.toggleIcon} icon={faAngleUp} />
                                    </span>
                                </span>

                                <span className={styles.toggleOrderItems}
                                    onClick={e => toggleOrderItems(e)}>
                                    <FontAwesomeIcon className={styles.toggleIcon} icon={faShoppingCart} />
                                    <span className={styles.showOrderItemsC} ref={itemsDownRef}>
                                        <FontAwesomeIcon className={styles.toggleIcon} icon={faAngleDown} />
                                    </span>
                                    <span className={styles.hideOrderItemsC} ref={itemsUpRef}>
                                        <FontAwesomeIcon className={styles.toggleIcon} icon={faAngleUp} />
                                    </span>
                                </span>
                            </div>

                        </div>
                    </div>

                    <div ref={clientRef} className={styles.orderClientFormC}
                        style={orderClientFormCStyle}>
                        <div className={styles.nameC}>
                            <label htmlFor="client_name">
                                {textClientFullName} <FontAwesomeIcon icon={faUser} />
                            </label>
                            <input type="text" name="client_name" value={data.client_name}
                                placeholder={textClientFullNameHint}
                                onChange={(e) => setData('client_name', e.target.value)}/>
                            {errors.client_name && <p>{errors.client_name}</p> }
                        </div>

                        <div className={styles.phoneC}>
                            <label htmlFor="client_phone">
                                {textClientPhoneNumber} <FontAwesomeIcon icon={faMobileButton} />
                            </label>
                            <input type="text" name="client_phone" value={data.client_phone}
                                placeholder={textClientPhoneNumberHint}
                                onChange={(e) => setData('client_phone', e.target.value)}/>
                            {errors.client_phone && <p>{errors.client_phone}</p> }
                        </div>

                        <div className={styles.addressC}>
                            <label htmlFor="client_address">
                                {textClientAddress} <FontAwesomeIcon icon={faLocationDot} />
                            </label>
                            <input type="text" name="client_address" value={data.client_address}
                                placeholder={textClientAddressHint}
                                onChange={(e) => setData('client_address', e.target.value)}/>
                            {errors.client_address && <p>{errors.client_address}</p> }
                        </div>
                    </div>

                </div>

                <div className={styles.editOrderInnerC}>
                    <div ref={itemsRef} className={styles.orderItemsFormC}>
                        <label htmlFor="">{textOrderItems} <FontAwesomeIcon icon={faShoppingCart} /></label>
                        {order.order_items.map((item, index) => (
                            <div key={item.id} style={index+1 != order.order_items.length
                                ?{marginBottom: "20px"} : {}}>

                                <div className={styles.doubleFieldC}>
                                    <div className={styles.productNameC}>
                                        <label htmlFor="product_name">
                                            {textProductName} <FontAwesomeIcon icon={faBoxOpen} />
                                        </label>
                                        <input type="text" name="product_name" value={data.items[index].product_name}
                                            placeholder={textProductNameHint}
                                            onChange={(e) => updateProductNameByIndex(e.target.value, index)}/>
                                        {errors['items.'+index+'.product_name'] &&
                                            <p>{errors['items.'+index+'.product_name']}</p>}
                                    </div>

                                    <div className={styles.quantityC}>
                                        <label htmlFor="quantity">
                                            {textQuantity} <FontAwesomeIcon icon={faBoxOpen} />
                                        </label>
                                        <input type="text" name="quantity" value={data.items[index].quantity}
                                            placeholder={textQuantityHint}
                                            onChange={(e) => updateQtyByIndex(e.target.value, index)}/>
                                        {errors['items.'+index+'.quantity'] &&
                                            <p>{errors['items.'+index+'.quantity']}</p>}
                                    </div>
                                </div>

                                <div className={styles.doubleFieldC}>
                                    <div className={styles.unitPriceC}>
                                        <label htmlFor="unit_price">
                                            {textUnitPrice} <FontAwesomeIcon icon={faCoins} />
                                        </label>
                                        <input type="text" name="unit_price" value={data.items[index].unit_price}
                                            placeholder={textUnitPriceHint}
                                            onChange={(e) => updateUnitPriceByIndex(e.target.value, index)}/>
                                        {errors['items.'+index+'.unit_price'] &&
                                            <p>{errors['items.'+index+'.unit_price']}</p>}
                                    </div>

                                    <div className={styles.subtotalC}>
                                        <label htmlFor="subtotal">
                                            {textSubtotal} <FontAwesomeIcon icon={faCoins} />
                                        </label>
                                        <input type="text" name="subtotal" value={data.items[index].subtotal}
                                            placeholder={textSubtotalHint}
                                            onChange={(e) => updateSubtotalByIndex(e.target.value, index)}/>
                                        {errors['items.'+index+'.subtotal'] &&
                                            <p>{errors['items.'+index+'.subtotal']}</p>}
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

                <div className={styles.actionBtnsC}>
                    <button className={styles.updateBtn}
                        onClick={(e) => updateOrder(e, order.id)}
                        disabled={processing || !orderChanged(data, order)}>
                        {textUpdate} <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                    <button className={styles.deleteBtn}
                        onClick={(e) => deleteOrder(e, order.id)}>
                        {textDelete} <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </form>

        </div>
    );
}


function orderChanged(data, order) {
    return (data.subtotal != order.subtotal
        || data.shipping != order.shipping
        || data.total != order.total
        || data.client_name != order.client_name
        || data.client_phone != order.client_phone
        || data.client_address != order.client_address
        || data.order_status_id != order.order_status.id
        || data.shipping_type != order.shipping_type
        || compareArrays(data.items, order.order_items)
    );
}

function compareArrays(arr1, arr2) {
    let changed =false;
    arr1.map((i, index) => {
        if (i.product_name != arr2[index].product_name
            || i.subtotal != arr2[index].subtotal
            || i.quantity != arr2[index].quantity
            || i.unit_price != arr2[index].unit_price ) {
                changed = true;
            }
    });
    return changed;
}

export default OrderForm2;
