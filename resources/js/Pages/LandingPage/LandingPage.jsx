import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {useRoute} from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/LandingPage.module.css";
import LandingPageLayout from "../../Layouts/LandingPageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked, faCircleExclamation, faLocationDot, faMobileButton, faMoneyBillWave, faTruck, faUser, faMap, faFire, faCoins, faBoxOpen, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../../connection.js';


function LandingPage({project, shippings , theme}){

    // get current default language
    let currentLanguage = localStorage.getItem('DEFAULT_LANGUAGE_'+project.data.id)
        || project.data.default_language;

    // this sets fallback language= en
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textCurr = currentLanguage == 'en' ? 'DZD'
        : (currentLanguage == 'fr' ? 'DA' : 'د.ج');
    const textAvailable = currentLanguage == 'en' ? 'Available'
        : (currentLanguage == 'fr' ? 'Disponible' : 'متوفر');
    const textUnavailable = currentLanguage == 'en' ? 'Unavailable'
        : (currentLanguage == 'fr' ? 'Indisponible' : 'غير متوفر');
    const textFreeShipping = currentLanguage == 'en' ? 'Free shipping'
        : (currentLanguage == 'fr' ? 'Livraison gratuite' : 'توصيل مجاني');
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
    const textQuantity = currentLanguage == 'en' ? 'Quantity'
        : (currentLanguage == 'fr' ? 'Quantité' : 'الكمية');
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

    // price / discount
    let price = project.data.discount == null ?project.data.price : project.data.discount;

    // images
    let mainImage;
    if (project.data.main_image_url) {
        mainImage = project.data.main_image_url;
    }

    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing, reset} = useForm({
        client_name: '',
        client_phone: '',
        client_address: '',
        shipping_type: '',
        quantity: 1,
        region: '',
    });
    // states
    const [total, setTotal] = useState(price);
    const [subtotal, setSubtotal] = useState(price);
    const [shipping, setShipping] = useState(0);
    const [invoice, setInvoice] = useState(false); // show/ hide invoice
    const [preview, setPreview] = useState(mainImage);

    // update total, shipping and total state
    useEffect(() => {
        // check data validity
        if (data.shipping_type && data.region && data.quantity) {
            let shipping = 0;
            if (!project.data.free_shipping){
                if (data.shipping_type == "home"){
                    shipping = shippings.data[data.region-1].home;
                }else if (data.shipping_type == "desk") {
                    shipping = shippings.data[data.region-1].desk;
                }
            }
            let subtotal = price * data.quantity;
            let total = subtotal + shipping;

            setSubtotal(new Intl.NumberFormat('en-US').format(subtotal));
            setShipping(new Intl.NumberFormat('en-US').format(shipping));
            setTotal(new Intl.NumberFormat('en-US').format(total));
            setInvoice(true);
        }else {
            setInvoice(false);
        }

    }, [data.shipping_type, data.region, data.quantity]);

    // order function
    const submit = (e) => {
        e.preventDefault();

        fbq("track", "Purchase");

        post(route('page.order', {project: project.data.id}), {
            preserveScroll: true,
            onFinish: () => reset('client_name', 'client_phone', 'client_address'),
        });
    };

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

    // user styles
    let createOrderBtnStyle = {backgroundColor: theme.data.action_color, };
    const createOrderBtnHover = (e) => {
        e.target.style.backgroundColor = theme.data.action_hover_color;
    };
    const createOrderBtnNormal = (e) => {
        e.target.style.backgroundColor = theme.data.action_color;
    };

    // styles
    const previewImageStyle = {
        opacity: "0.7",
    };

    // style considering direction
    let discountStyle = {};
    let invoiceBorderStyle = {};
    if (currentLanguage == 'ar'){
        discountStyle = {
            marginLeft: "10px",
        };
        invoiceBorderStyle = {
            borderRight: "var(--border-style)",
        };
    }else {
        discountStyle = {
            marginRight: "10px",
        };
        invoiceBorderStyle = {
            borderLeft: "var(--border-style)",
        };
    }

    return (
        <div className={styles.landingPageC}>

            <Head title={"NOAPPNAME:"+project.data.name} />

            <div className={styles.nameOverImgC}>
                {/* category */}
                <Link className={styles.category}>{project.data.category}</Link>

                {/* project name */}
                <h3 className={styles.name}>{project.data.name}</h3>
            </div>

            {/* project images */}
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
                    {project.data.multiple_images_urls && project.data.multiple_images_urls.map((image) => (
                        <img key={image.id} className={styles.multipleImage} alt="multiple"
                            src={conn_URL+ "uploads/"+image.image_url}
                            onClick={e => updatePreviewImage(e, image.image_url)}
                            style={image.image_url == preview ? previewImageStyle : {} } />
                    ))}
                </div>
            </div>

            <div className={styles.detailsC}>

                {/* category */}
                <Link className={styles.category}>{project.data.category}</Link>

                {/* project name */}
                <h3 className={styles.name}>{project.data.name}</h3>

                {/* price / discount */}
                {project.data.discount == null ?
                (<div className={styles.price}>
                    {new Intl.NumberFormat('en-US')
                        .format(project.data.price)} {textCurr}
                </div>)
                :
                (<div className={styles.priceC}>
                    <div className={styles.discount} style={discountStyle}>
                        {new Intl.NumberFormat('en-US')
                            .format(project.data.discount)} {textCurr}
                    </div>
                    <div className={styles.price}>
                        {new Intl.NumberFormat('en-US').format(project.data.price)} {textCurr}
                    </div>
                </div>)
                }

                {/* available / unavailable */}
                {project.data.stock > 0 ?
                (<p className={styles.available}>
                    <FontAwesomeIcon icon={faCircleCheck} /> {textAvailable} 
                </p>)
                :
                (<p className={styles.unavailable}>
                    <FontAwesomeIcon icon={faCircleExclamation} /> {textUnavailable} 
                </p>)}

                {/* free shipping */}
                {project.data.free_shipping ?
                (<p className={styles.freeShipping}>
                    <FontAwesomeIcon icon={faFire} /> {textFreeShipping} 
                </p>)
                :
                (<></>)}

                {/* description */}
                <p className={styles.description}>{project.data.description}</p>

                {/* order form  */}
                <form className={styles.formC} onSubmit={submit}>

                    {/* client name, client phone */}
                    <div className={styles.doubleFieldC}>
                        <div className={styles.clientNameC}>
                            <label htmlFor="client_name">
                                {textFullName} <FontAwesomeIcon icon={faUser} />
                            </label>
                            <input type="text" name="client_name" value={data.client_name}
                                onChange={(e) => setData('client_name',e.target.value )}
                                placeholder={textFullName}/>
                            {errors.client_name && <p>{errors.client_name}</p>}
                        </div>

                        <div className={styles.clientPhoneC}>
                            <label htmlFor="client_phone">
                                {textPhoneNumber} <FontAwesomeIcon icon={faMobileButton} />
                            </label>
                            <input type="text" name="client_phone" value={data.client_phone}
                                onChange={(e) => setData('client_phone',e.target.value )}
                                placeholder={textPhoneNumber}/>
                            {errors.client_phone && <p>{errors.client_phone}</p>}
                        </div>
                    </div>

                    {/* client region */}
                    <div className={styles.regionC}>
                        <label htmlFor="region">
                            {textRegion} <FontAwesomeIcon icon={faMap} />
                        </label>
                        <select name="region" value={data.region}
                            onChange={(e) => setData('region', e.target.value)}>
                            <option value="">{textSelectRegion}</option>
                            {shippings.data.map((shipping) => 
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
                            onChange={(e) => setData('client_address',e.target.value )}
                            placeholder={textAddress} />
                        {errors.client_address && <p>{errors.client_address}</p>}
                    </div>

                    {/* order quantity, shipping type */}
                    <div className={styles.doubleFieldC}>
                        <div className={styles.quantityC}>
                            <label htmlFor="quantity">
                                {textQuantity} <FontAwesomeIcon icon={faBoxOpen} />
                            </label>
                            <select name="quantity" value={data.quantity}
                                onChange={(e) => setData('quantity', e.target.value)}>
                                {Array.from({length: project.data.max_quantity}).map((_,index) => (
                                    <option key={index} value={index+1}>{index+1}</option>
                                ))}
                            </select>
                            {errors.quantity && <p>{errors.quantity}</p>}
                        </div>
                        <div className={styles.shippingTypeC}>
                            <label htmlFor="shipping_type">
                                {textShippingType} <FontAwesomeIcon icon={faTruck} />
                            </label>
                            <select name="shipping_type" value={data.shipping_type}
                                onChange={(e) => setData('shipping_type', e.target.value)}>
                                <option value="">{textSelectShippingType}</option>
                                <option value="desk">{textPickUpDesk}</option>
                                <option value="home">{textHomeDelivery}</option>
                            </select>
                            {errors.shipping_type && <p>{errors.shipping_type}</p>}
                        </div>
                    </div>

                    {/* pay button */}
                    <div className={styles.payBtnC}>
                        {/* invoice */}
                        {invoice ?
                        (<div className={styles.invoiceC}>
                            <p className={styles.subtotal}>
                                {textSubtotal} {subtotal} {textCurr}
                            </p>
                            <p className={styles.shipping} style={invoiceBorderStyle}>
                                {textShipping} {shipping} {textCurr}
                            </p>
                            <p className={styles.total} style={invoiceBorderStyle}>
                                {textTotal} {total} {textCurr}
                            </p>
                        </div>)
                        :
                        (<></>)
                        }
                        <button className={styles.payBtn} disabled={processing}
                            onMouseEnter={createOrderBtnHover} onMouseLeave={createOrderBtnNormal}
                            style={createOrderBtnStyle}>
                            {textPayOnDelivery} 
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
}

LandingPage.layout = page => <LandingPageLayout children={page}/>


export default LandingPage;

