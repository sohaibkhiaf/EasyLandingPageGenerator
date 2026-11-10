import { Head, useForm } from "@inertiajs/react";
import StoreLayout  from "../../Layouts/StoreLayout";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Store/CreateProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../../connection.js';
import { useRef, useState } from "react";


function CreateProduct({project, categories}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textEditProduct = currentLanguage == 'en' ? 'Create Product'
        : (currentLanguage == 'fr' ? 'Créer un produit' : 'إنشاء منتج');
    const textProductName = currentLanguage == 'en' ? 'Product name'
        : (currentLanguage == 'fr' ? 'Nom du produit' : 'إسم المنتج');
    const textCategory = currentLanguage == 'en' ? 'Category'
        : (currentLanguage == 'fr' ? 'Catégorie' : 'التصنيف');
    const textSelectCategory = currentLanguage == 'en' ? 'Select category'
        : (currentLanguage == 'fr' ? 'Sélectionner une catégorie' : 'إختر التصنيف');
    const textProductDesc = currentLanguage == 'en' ? 'Product description'
        : (currentLanguage == 'fr' ? 'Description du produit' : 'وصف المنتج');
    const textPrice = currentLanguage == 'en' ? 'Price'
        : (currentLanguage == 'fr' ? 'Prix' : 'السعر');
    const textDiscount = currentLanguage == 'en' ? 'Discount (optional)'
        : (currentLanguage == 'fr' ? 'Remise (optionnel)' : 'التخفيض (إختياري)');
    const textStock = currentLanguage == 'en' ? 'Stock'
        : (currentLanguage == 'fr' ? 'Stock' : 'المخزون');
    const textEnabled = currentLanguage == 'en' ? 'Enabled'
        : (currentLanguage == 'fr' ? 'Activé' : 'مفعل');
    const textMaxQuantity = currentLanguage == 'en'? 'Maximum order quantity'
        : (currentLanguage == 'fr'? 'Quantité maximale par commande' : 'الكمية القصوى للطلبية');
    const textCreate = currentLanguage == 'en' ? 'Create'
        : (currentLanguage == 'fr' ? 'Créer' : 'إنشاء');
    const textMainImg = currentLanguage == 'en'
        ? 'Main Image (The main image file size must not be greater than 2048 KB)'
        : (currentLanguage == 'fr'
            ? 'Image principale (la taille du fichier de l’image principale ne doit pas dépasser 2048 Ko)'
            : 'الصورة الأساسية (حجم الصورة الأساسية يجب أن لا يتجاوز 2048 كيلوبايت)');
    const textMultipleImgs = currentLanguage == 'en'
        ? 'Multiple Images (The image file size must not be greater than 1024 KB)'
        : (currentLanguage == 'fr'
            ? 'Images multiples (la taille du fichier de l’image ne doit pas dépasser 1024 Ko)'
            : 'الصور المتعددة (حجم الصورة يجب أن لا يتجاوز 1024 كيلوبايت)');
    const textProductNameHint = currentLanguage == 'en' ? 'Product name'
        : (currentLanguage == 'fr' ? 'Nom du produit' : 'إسم المنتج');
    const textProductDescHint = currentLanguage == 'en' ? 'Full product description'
        : (currentLanguage == 'fr' ? 'Description complète du produit' : 'وصف شامل للمنتج');
    const textPriceHint = currentLanguage == 'en' ? 'Price (DZD)'
        : (currentLanguage == 'fr' ? 'Prix (DA)' : 'السعر (د.ج)');
    const textDiscountHint = currentLanguage == 'en' ? 'Discount (DZD)'
        : (currentLanguage == 'fr' ? 'Remise (DA)' : 'التخفيض (د.ج)');
    const textStockHint = currentLanguage == 'en' ? 'Stock'
        : (currentLanguage == 'fr' ? 'Stock' : 'المخزون');
    const textMaxQuantityHint = currentLanguage == 'en'? 'Maximum order quantity'
        : (currentLanguage == 'fr'? 'Quantité maximale par commande' : 'الكمية القصوى للطلبية');

    // styles considering direction
    let deleteImageIconStyle = {};
    if (currentLanguage == 'ar'){
        deleteImageIconStyle = {
            left: "7px",
        }
    }else {
        deleteImageIconStyle = {
            right: "7px",
        }
    };


    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing, reset} = useForm({
        name: '',
        description: '',
        category_id: '',
        price: '',
        stock: '',
        max_quantity: '',
        discount: '',
        enabled: true,

        main: null,
        multiple: [],
    });

    // create product function
    const createPrd = (e) => {
        e.preventDefault();
        post(route('product.create', {project: project.data.id}), {
            forceFormData: true, //Send this request as multipart/form-data instead of JSON.
        });
    };


    // main preview
    const mainFileInputRef = useRef(null);
    const [mainPreview, setMainPreview] = useState(null);
    const openMainFilePicker = () => {
        mainFileInputRef.current.click();
    };
    const onMainFileChange = (e) => {
        const file = e.target.files[0];
        if (!file){ return; }
        setData('main' , file);
        setMainPreview(URL.createObjectURL(file));
    };

    // multiple preview
    const multipleFileInputRef = useRef(null);
    const [multiplePreviews, setMultiplePreviews] = useState([]);
    const openMultipleFilePicker = () => {
        multipleFileInputRef.current.click();
    };
    const onMultipleFileChange = (e) => {
        let oldFiles = data.multiple;
        let files = [...oldFiles, ...e.target.files ];
        e.target.value = null;
        setData('multiple' , Array.from(files));
        if (files.length == 0){ return; }
        const urls = files.map(file => URL.createObjectURL(file));
        setMultiplePreviews(urls);
    };
    const deletePickedImg = (e, index) => {
        let files = data.multiple.toSpliced(index, 1);
        setData('multiple' , Array.from(files));
        const urls = files.map(file => URL.createObjectURL(file));
        setMultiplePreviews(urls);
    };

    return (
        <div className={styles.createPrdC}>

            <Head title={textEditProduct}/>

            <h2 className={styles.createPrdHeader}>
                {textEditProduct} <FontAwesomeIcon icon={faPlus} />
            </h2>

            <form className={styles.createPrdForm} encType="multipart/form-data">

                <div className={styles.nameC}>
                    <label htmlFor="name">{textProductName}</label>
                    <input type="text" name="name" value={data.name}
                        placeholder={textProductNameHint}
                        onChange={(e) => setData('name', e.target.value)}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.categoryC}>
                        <label htmlFor="category_id">
                            {textCategory}
                        </label>
                        <select name="category_id" value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}>
                            <option>{textSelectCategory}</option>
                            {categories.data.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {currentLanguage == 'ar' ? category.ar_name
                                    : (currentLanguage == 'fr' ?category.fr_name : category.en_name)}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p>{errors.category}</p>}
                    </div>
                </div>

                <div className={styles.descC}>
                    <label htmlFor="description">{textProductDesc}</label>
                    <textarea name="description"
                        placeholder={textProductDescHint} value={data.description}
                        onChange={(e) => setData('description', e.target.value)}/>
                    {errors.description && <p>{errors.description}</p>}
                </div>

                <div className={styles.enabledC}>
                    <label htmlFor="enabled">
                        <input type="checkbox" name="enabled" checked={data.enabled}
                        onChange={(e) => setData('enabled', e.target.checked)}/>
                        {textEnabled}
                    </label>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.priceC}>
                        <label htmlFor="price">{textPrice}</label>
                        <input type="text" name="price"
                            placeholder={textPriceHint} value={data.price}
                            onChange={(e) => setData('price', e.target.value)}/>
                        {errors.price && <p>{errors.price}</p>}
                    </div>
                    <div className={styles.discountC}>
                        <label htmlFor="discount">{textDiscount}</label>
                        <input type="text" name="discount"
                            placeholder={textDiscountHint} value={data.discount}
                            onChange={(e) => setData('discount', e.target.value)} />
                        {errors.discount && <p>{errors.discount}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.stockC}>
                        <label htmlFor="stock">{textStock}</label>
                        <input type="text" name="stock" placeholder={textStockHint}
                            onChange={(e) => setData('stock', e.target.value)}
                            value={data.stock}/>
                        {errors.stock && <p>{errors.stock}</p>}
                    </div>
                    <div className={styles.maxQuantityC}>
                        <label htmlFor="max_quantity">{textMaxQuantity}</label>
                        <input type="text" name="max_quantity" placeholder={textMaxQuantityHint}
                            onChange={(e) => setData('max_quantity', e.target.value)}
                            value={data.max_quantity}/>
                        {errors.max_quantity && <p>{errors.max_quantity}</p>}
                    </div>
                </div>

                {/* main image */}
                <div className={styles.mainImgPickerC}>
                    <label htmlFor="main">{textMainImg}</label>
                    <input type="file" accept="image/*" name="main"
                        onChange={onMainFileChange} ref={mainFileInputRef} hidden/>
                    <div className={styles.mainC}>
                        {mainPreview == null ?
                        (<img src={conn_URL+ "placeholder/product.svg"} alt="main"
                            onClick={openMainFilePicker}/>)
                        :
                        (<img src={mainPreview} alt="main"
                            onClick={openMainFilePicker}/>)
                        }
                    </div>
                    {errors.main && <p>{errors.main}</p>}
                </div>

                {/* multiple images */}
                <div className={styles.multipleImgsPickerC}>
                    <label htmlFor="multiple">{textMultipleImgs}</label>
                    <input type="file" accept="image/*" name="multiple" multiple
                        onChange={onMultipleFileChange} ref={multipleFileInputRef} hidden/>
                    <div className={styles.multipleC}>

                        {/* picked  */}
                        {multiplePreviews.map((prev, index) => (
                            <div key={index} className={styles.imageC}>
                                <img src={prev} alt="multiple"/>
                                <FontAwesomeIcon icon={faTrash}
                                    onClick={e => deletePickedImg(e, index)}
                                    className={styles.deleteImg}
                                    style={deleteImageIconStyle} />
                            </div>
                        ))
                        }

                        {/* picker */}
                        <img src={conn_URL+"placeholder/upload.png"} alt="multiple"
                            onClick={openMultipleFilePicker}
                            className={styles.pickerImg}/>
                    </div>
                    {errors.multiple && <p>{errors.multiple}</p>}
                </div>

                <div className={styles.createBtnC}>
                    <button className={styles.createBtn}
                        disabled={processing}
                        onClick={(e) => createPrd(e)}>
                        {textCreate} <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

            </form>

        </div>
    );
}


CreateProduct.layout = page => <StoreLayout children={page} />

export default CreateProduct;
