import { useForm } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useRef } from "react";
import styles from "../../css/Components/OrderForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faArrowsRotate, faBoxOpen, faCoins, faLocationDot, faMobileButton, faTrashCan, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";


function OrderForm ({order, statuses}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // text considering preferred language
    const textOrderStatus = currentLanguage == 'en' ? 'Order Status'
        : (currentLanguage == 'fr' ? 'Statut' : 'حالة الطلبية');
    const textSubtotal = currentLanguage == 'en' ? 'Subtotal'
        : (currentLanguage == 'fr' ? 'Sous-total' : 'المبلغ');
    const textShipping = currentLanguage == 'en' ? 'Shipping'
        : (currentLanguage == 'fr' ? 'Livraison' : 'التوصيل');
    const textTotal = currentLanguage == 'en' ? 'Total'
        : (currentLanguage == 'fr' ? 'Total' : 'المبلغ الإجمالي');
    const textQuantity = currentLanguage == 'en' ? 'Quantity'
        : (currentLanguage == 'fr' ? 'Quantité' : 'الكمية');
    const textUnitPrice = currentLanguage == 'en' ? 'Unit Price'
        : (currentLanguage == 'fr' ? 'Prix unitaire' : 'ثمن الوحدة');
    const textShippingType = currentLanguage == 'en' ? 'Shipping Type'
        : (currentLanguage == 'fr' ? 'Type de livraison' : 'نوع التوصيل');
    const textHomeDelivery = currentLanguage == 'en' ? 'Home Delivery'
        : (currentLanguage == 'fr' ? 'Livraison à domicile' : 'التوصيل إلى المنزل');
    const textPickupDesk = currentLanguage == 'en' ? 'Pick-Up Desk'
        : (currentLanguage == 'fr' ? 'Retrait au bureau' : 'التوصيل إلى المكتب');
    const textClientFullName = currentLanguage == 'en' ? 'Client Full Name'
        : (currentLanguage == 'fr' ? 'Nom complet du client' : 'الإسم الكامل للزبون');
    const textClientPhoneNumber = currentLanguage == 'en' ? 'Client Phone Number'
        : (currentLanguage == 'fr' ? 'Numéro de téléphone du client' : 'رقم هاتف الزبون');
    const textClientAddress = currentLanguage == 'en' ? 'Client Address'
        : (currentLanguage == 'fr' ? 'Adresse du client' : 'عنوان الزبون');
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
    const textQuantityHint = currentLanguage == 'en' ? 'Required quantity'
            : (currentLanguage == 'fr' ? 'Quantité requise' : 'الكمية المطلوبة');
    const textUnitPriceHint = currentLanguage == 'en' ? 'Unit Price (DZD)'
        : (currentLanguage == 'fr' ? 'Prix unitaire (DA)' : 'ثمن الوحدة (د.ج)');
    const textClientFullNameHint = currentLanguage == 'en' ? 'Client Full Name'
        : (currentLanguage == 'fr' ? 'Nom complet du client' : 'الإسم الكامل للزبون');
    const textClientPhoneNumberHint = currentLanguage == 'en' ? 'Client Phone Number'
        : (currentLanguage == 'fr' ? 'Numéro de téléphone du client' : 'رقم هاتف الزبون');
    const textClientAddressHint = currentLanguage == 'en' ? 'Client Address'
        : (currentLanguage == 'fr' ? 'Adresse du client' : 'عنوان الزبون');
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
    const upRef = useRef(null);
    const downRef = useRef(null);
    const {data, setData, post, errors, processing} = useForm({
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        quantity: order.quantity,
        unit_price: order.unit_price,
        client_name: order.client_name,
        client_phone: order.client_phone,
        client_address: order.client_address,
        order_status_id: order.order_status.id,
        shipping_type: order.shipping_type,
    });

    // update order function 
    const updateOrder = (e , orderId) => {
        e.preventDefault();
        post(route('order.update', {order: orderId}), {
            preserveScroll: true,
        });
    };

    // delete order function 
    const deleteOrder = (e , orderId) => {
        e.preventDefault();
        if (window.confirm(textDeleteConfirm)){
            post(route('order.delete', {order: orderId}), {
                preserveScroll: true,
            });
        }
    };

    // toggle client info function
    const toggleClientInfo = (e) => {
        e.preventDefault();
        if (clientRef.current.style.display == "block"){
            clientRef.current.style.display = "none";
            downRef.current.style.display = "inline";
            upRef.current.style.display = "none";
        }else {
            clientRef.current.style.display = "block";
            downRef.current.style.display = "none";
            upRef.current.style.display = "inline";
        }
    }

    return (
        <div className={styles.orderC}>

            <div className={styles.orderIdentifier}>
                {textOrderIdentifier}: LP{order.id} 
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
                            <div className={styles.quantityC}>
                                <label htmlFor="quantity">
                                    {textQuantity} <FontAwesomeIcon icon={faBoxOpen} />
                                </label>
                                <input type="text" name="quantity" value={data.quantity}
                                    placeholder={textQuantityHint}
                                    onChange={(e) => setData('quantity', e.target.value)}/>
                                {errors.quantity && <p>{errors.quantity}</p> }
                            </div>

                            <div className={styles.unitPriceC}>
                                <label htmlFor="unit_price">
                                    {textUnitPrice} <FontAwesomeIcon icon={faCoins} />
                                </label>
                                <input type="text" name="unit_price" value={data.unit_price}
                                    placeholder={textUnitPriceHint}
                                    onChange={(e) => setData('unit_price', e.target.value)}/>
                                {errors.unit_price && <p>{errors.unit_price}</p> }
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

                            <div className={styles.toggleClientInformationC}>
                                <span className={styles.toggleClientInformation}
                                    onClick={e => toggleClientInfo(e)}>
                                    <FontAwesomeIcon className={styles.toggleIcon} icon={faUser} />
                                    <span className={styles.showClientInfoC} ref={downRef}>
                                        &nbsp;&nbsp;
                                        <FontAwesomeIcon className={styles.toggleIcon} icon={faAngleDown} />
                                    </span>
                                    <span className={styles.hideClientInfoC} ref={upRef}>
                                        &nbsp;&nbsp;
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
        || data.quantity != order.quantity
        || data.unit_price != order.unit_price
        || data.client_name != order.client_name
        || data.client_phone != order.client_phone
        || data.client_address != order.client_address
        || data.order_status_id != order.order_status.id
        || data.shipping_type != order.shipping_type
    );
}

export default OrderForm;
