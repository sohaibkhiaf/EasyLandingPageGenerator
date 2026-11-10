import { Head, useForm } from "@inertiajs/react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Home/CreateProject.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import {URL as conn_URL} from '../../connection.js';


function CreateProject() {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textCreateLdgPage = currentLanguage == 'en'
        ? 'Create landing page'
        : (currentLanguage == 'fr'
            ? 'Créer une page de destination'
            : 'إنشاء صفحة هبوط جديدة');
    const textProjectName = currentLanguage == 'en' ? 'Project name'
        : (currentLanguage == 'fr' ? 'Nom du projet' : 'إسم المشروع');
    const textCategory = currentLanguage == 'en' ? 'Category'
        : (currentLanguage == 'fr' ? 'Catégorie' : 'التصنيف');
    const textProjectDesc = currentLanguage == 'en' ? 'Project description'
        : (currentLanguage == 'fr' ? 'Description du projet' : 'وصف المشروع');
    const textPrice = currentLanguage == 'en' ? 'Price'
        : (currentLanguage == 'fr' ? 'Prix' : 'السعر');
    const textDiscount = currentLanguage == 'en' ? 'Discount (optional)'
        : (currentLanguage == 'fr' ? 'Remise (optionnel)' : 'التخفيض (إختياري)');
    const textStock = currentLanguage == 'en' ? 'Stock'
        : (currentLanguage == 'fr' ? 'Stock' : 'المخزون');
    const textMetaPixel = currentLanguage == 'en' ? 'Meta pixel ID'
        : (currentLanguage == 'fr' ? 'ID du Pixel Meta': 'معرّف ميتا بيكسل');
    const textCreate = currentLanguage == 'en' ? 'Create'
        : (currentLanguage == 'fr' ? 'Créer' : 'إنشاء');
    const textProjectIcon = currentLanguage == 'en'
        ? 'Project icon (The icon file size must not be greater than 512 KB)'
        : (currentLanguage == 'fr'
            ? 'Icône du projet (la taille du fichier de l’icône ne doit pas dépasser 512 Ko)'
            : 'أيقونة المشروع (حجم الأيقونة يجب أن لا يتجاوز 512 كيلوبايت)');
    const textSlug = currentLanguage == 'en' ? 'Slug'
        : (currentLanguage == 'fr' ? 'Lien' : 'الرابط');
    const textSlugUnchangeable = currentLanguage == 'en'
        ? 'The slug cannot be changed later'
        : (currentLanguage == 'fr'
            ? 'Le slug ne peut pas être modifié ultérieurement'
            : 'لا يمكن تغيير الرابط لاحقًا');
    const textProjectNameHint = currentLanguage == 'en'
        ? 'Your product name' : (currentLanguage == 'fr'
            ? 'Nom de votre produit' : 'اسم منتجك');
    const textCategoryHint = currentLanguage == 'en'
        ? 'Your product category' : (currentLanguage == 'fr'
            ? 'Catégorie de votre produit' : 'تصنيف منتجك');
    const textProjectDescHint = currentLanguage == 'en'
        ? 'A detailed description of the product' : (currentLanguage == 'fr' 
            ? 'Une description détaillée du produit' : 'وصف شامل للمنتج');
    const textPriceHint = currentLanguage == 'en' ? 'Price (DZD)'
        : (currentLanguage == 'fr' ? 'Prix (DA)' : 'السعر (د.ج)');
    const textDiscountHint = currentLanguage == 'en' ? 'Discount (DZD)'
        : (currentLanguage == 'fr' ? 'Remise (DA)' : 'التخفيض (د.ج)');
    const textStockHint = currentLanguage == 'en' ? 'Stock'
        : (currentLanguage == 'fr' ? 'Stock' : 'المخزون');
    const textMetaPixelHint = currentLanguage == 'en' ? 'Meta pixel ID'
        : (currentLanguage == 'fr' ? 'ID du Pixel Meta': 'معرّف ميتا بيكسل');


    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing} = useForm({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        meta_pixel_id: '',
        discount: '',
        slug: '',
        icon: null,
    });
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    // create project function
    const create = (e) => {
        e.preventDefault();
        post(route('project.create'), {
            forceFormData: true, //Send this request as multipart/form-data instead of JSON.
        });
    }

    // icon picker function
    const openFilePicker = () => {
        // trigger file input click event
        fileInputRef.current.click();
    };

    // file change callback
    const onFileChange = (e) => {
        // read file input
        const file = e.target.files[0];

        // check file validity
        if (!file){
            return;
        }

        // set form data
        setData('icon' , file);

        // set preview state
        setPreview(URL.createObjectURL(file));
    };


    return (
        <div className={styles.createPjtC}>

            <Head title={textCreateLdgPage}/>

            <h2 className={styles.createPjtHeader}>
                {textCreateLdgPage} <FontAwesomeIcon icon={faFolderPlus} />
            </h2>

            <form className={styles.createPjtForm} onSubmit={create} encType="multipart/form-data">

                <div className={styles.iconPickerC}>
                    <label htmlFor="icon">{textProjectIcon}</label>
                    <input type="file" accept="image/*" name="icon"
                        onChange={onFileChange} ref={fileInputRef} hidden/>
                    <div className={styles.iconC}>
                        <img src={preview || conn_URL+ "placeholder/shape.svg"} alt="icon"
                            onClick={openFilePicker}/>
                    </div>
                    {errors.icon && <p>{errors.icon}</p>}
                </div>

                <div className={styles.nameC}>
                    <label htmlFor="name">{textProjectName}</label>
                    <input type="text" name="name" value={data.name}
                        placeholder={textProjectNameHint}
                        onChange={(e) => setData('name', e.target.value)}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div className={styles.slugC}>
                    <label htmlFor="slug">
                        {textSlug} ({conn_URL+ "slug"+ (data.slug ==''? '' : '/'+data.slug)})
                    </label>
                    <input type="text" name="slug" value={data.slug}
                        placeholder={conn_URL+ "slug/example"} dir="ltr"
                        onChange={(e) => setData('slug', e.target.value)}/>
                    <p className={styles.slugWarning}>{textSlugUnchangeable}</p>
                    {errors.slug && <p>{errors.slug}</p>}
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.categoryC}>
                        <label htmlFor="category">{textCategory}</label>
                        <input type="text" name="category" value={data.category}
                            placeholder={textCategoryHint}
                            onChange={(e) => setData('category', e.target.value)}/>
                        {errors.category && <p>{errors.category}</p>}
                    </div>
                </div>

                <div className={styles.descriptionC}>
                    <label htmlFor="description">{textProjectDesc}</label>
                    <textarea name="description" value={data.description}
                        placeholder={textProjectDescHint}
                        onChange={(e) => setData('description', e.target.value)}/>
                    {errors.description && <p>{errors.description}</p>}
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
                        <input type="text" name="discount" value={data.discount}
                            placeholder={textDiscountHint}
                            onChange={(e) => setData('discount', e.target.value)}/>
                        {errors.discount && <p>{errors.discount}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.stockC}>
                        <label htmlFor="stock">{textStock}</label>
                        <input type="text" name="stock" value={data.stock}
                            placeholder={textStockHint}
                            onChange={(e) => setData('stock', e.target.value)}/>
                        {errors.stock && <p>{errors.stock}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.metaPixelC}>
                        <label htmlFor="meta_pixel_id">{textMetaPixel}</label>
                        <input type="text" name="meta_pixel_id" value={data.meta_pixel_id}
                            placeholder={textMetaPixelHint}
                            onChange={(e) => setData('meta_pixel_id', e.target.value)}/>
                        {errors.meta_pixel_id && <p>{errors.meta_pixel_id}</p>}
                    </div>
                </div>

                <div className={styles.createBtnC}>
                    <button className={styles.createBtn} disabled={processing}>
                        {textCreate} <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </form>

        </div>
    );
}

CreateProject.layout = page => <HomeLayout children={page} />

export default CreateProject;

