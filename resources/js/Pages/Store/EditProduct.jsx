import { Head, useForm } from "@inertiajs/react";
import StoreLayout  from "../../Layouts/StoreLayout";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Store/EditProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faPen, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../../connection.js';
import { useRef, useState } from "react";


function EditProduct({ product, categories}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textEditProduct = currentLanguage == 'en' ? 'Edit Product'
        : (currentLanguage == 'fr' ? 'Modifier le produit' : 'تعديل المنتج');
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
    const textEnabled = currentLanguage == 'en' ? 'Enabled'
        : (currentLanguage == 'fr' ? 'Activé' : 'مفعل');
    const textDiscount = currentLanguage == 'en' ? 'Discount (optional)'
        : (currentLanguage == 'fr' ? 'Remise (optionnel)' : 'التخفيض (إختياري)');
    const textStock = currentLanguage == 'en' ? 'Stock'
        : (currentLanguage == 'fr' ? 'Stock' : 'المخزون');
    const textMaxQuantity = currentLanguage == 'en'? 'Maximum order quantity'
        : (currentLanguage == 'fr'? 'Quantité maximale par commande' : 'الكمية القصوى للطلبية');
    const textUpdate = currentLanguage == 'en' ? 'Update'
        : (currentLanguage == 'fr' ? 'Mettre à jour' : 'تحديث');
    const textDeletePrd = currentLanguage == 'en' ? 'Delete product'
        : (currentLanguage == 'fr' ? 'Supprimer le produit' : 'حذف المنتج');
    const textDeleteConfirm = currentLanguage == 'en'
        ? 'Are you sure you want to delete this product?'
        : (currentLanguage == 'fr'
            ? 'Êtes-vous sûr de vouloir supprimer ce produit ?'
            : 'هل أنت متأكد من أنك تريد حذف هذا المنتج ؟');
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
    const [uploadedImages, setUploadedImages] = useState(product.data.multiple_images_urls);
    const {data, setData, post, errors, processing, reset} = useForm({
        name: product.data.name,
        description: product.data.description,
        category_id: product.data.category.id,
        price: product.data.price,
        stock: product.data.stock,
        max_quantity: product.data.max_quantity,
        discount: product.data.discount,
        enabled: product.data.enabled ,

        main: null,
        multiple: [],
        deleted: [],
    });

    // update product function
    const updatePrd = (e, productId) => {
        e.preventDefault();
        post(route('product.update', {product: productId}), {
            forceFormData: true, //Send this request as multipart/form-data instead of JSON.
        });
    };

    // delete product function
    const deletePrd = (e, productId) => {
        e.preventDefault();
        if (window.confirm(textDeleteConfirm)){
            post(route('product.delete', {product: productId}));
        }
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

    // delete uploaded image
    const deleteUploadedImg = (e, index) => {
        let deletedImage = uploadedImages[index];
        if (data.deleted.indexOf(deletedImage) == -1){
            let deleted = [...data.deleted, deletedImage.id];
            setData('deleted', Array.from(deleted));
            const images = uploadedImages.toSpliced(index, 1);
            setUploadedImages(images);
        }
    };

    return (
        <div className={styles.editPrdC}>

            <Head title={textEditProduct}/>

            <h2 className={styles.editPrdHeader}>
                {textEditProduct} <FontAwesomeIcon icon={faPen} />
            </h2>

            <form className={styles.editPrdForm} encType="multipart/form-data">

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
                    <textarea name="description" value={data.description}
                        placeholder={textProductDescHint}
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
                        <input type="text" name="price" value={data.price}
                            placeholder={textPriceHint}
                            onChange={(e) => setData('price', e.target.value)}/>
                        {errors.price && <p>{errors.price}</p>}
                    </div>

                    <div className={styles.discountC}>
                        <label htmlFor="discount">{textDiscount}</label>
                        <input type="text" name="discount"
                            placeholder={textDiscountHint} value={data.discount != null ? data.discount : ''}
                            onChange={(e) => setData('discount', e.target.value)} />
                        {errors.discount && <p>{errors.discount}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.stockC}>
                        <label htmlFor="stock">{textStock}</label>
                        <input type="text" name="stock" placeholder={textStockHint}
                            onChange={(e) => setData('stock', e.target.value)}
                            value={data.stock} />
                        {errors.stock && <p>{errors.stock}</p>}
                    </div>
                    <div className={styles.maxQuantityC}>
                        <label htmlFor="max_quantity">{textMaxQuantity}</label>
                        <input type="text" name="max_quantity" placeholder={textMaxQuantityHint}
                            onChange={(e) => setData('max_quantity', e.target.value)}
                            value={data.max_quantity} />
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
                        (product.data.main_image_url == null ?
                            (<img src={conn_URL+ "placeholder/product.svg"} alt="main"
                            onClick={openMainFilePicker}/>)
                            : (<img src={ conn_URL+ "uploads/" +product.data.main_image_url} alt="main"
                            onClick={openMainFilePicker}/>))
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
                        {/* uploaded  */}
                        {uploadedImages && uploadedImages.map((img, index) => (
                            <div key={index} className={styles.imageC}>
                                <img src={conn_URL+"uploads/"+img.image_url} alt="multiple"/>
                                <FontAwesomeIcon icon={faTrash}
                                    onClick={e => deleteUploadedImg(e, index)}
                                    className={styles.deleteImg}
                                    style={deleteImageIconStyle} />
                            </div>
                        ))}

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

                <div className={styles.actionBtnsC}>
                    <button className={styles.updateBtn}
                        disabled={processing || !productChanged(data, product)}
                        onClick={(e) => updatePrd(e, product.data.id)}>
                        {textUpdate} <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                    <button className={styles.deleteBtn}
                        onClick={(e) => deletePrd(e, product.data.id)}>
                        {textDeletePrd} <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>

            </form>

        </div>
    );
}

function productChanged(data, product) {
    return (data.name != product.data.name
        || data.category_id != product.data.category.id
        || data.description != product.data.description
        || data.price != product.data.price
        || data.discount != product.data.discount
        || data.enabled != product.data.enabled
        || data.stock != product.data.stock
        || data.max_quantity != product.data.max_quantity
        || data.main != null
        || data.multiple.length > 0
        || data.deleted.length > 0
    );
}

EditProduct.layout = page => <StoreLayout children={page} />

export default EditProduct;
