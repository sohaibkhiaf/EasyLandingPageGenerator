import { Head, useForm } from "@inertiajs/react";
import ProjectLayout  from "../../Layouts/ProjectLayout";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Project/Project.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCopy, faEarthEurope, faFolder, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {PAGE_URL as page_URL} from '../../connection.js';


function Project({project}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textProject = currentLanguage == 'en' ? 'Project'
        : (currentLanguage == 'fr' ? 'Projet' : 'المشروع');
    const textProjectName = currentLanguage == 'en' ? 'Project name'
        : (currentLanguage == 'fr' ? 'Nom du projet' : 'إسم المشروع');
    const textCategory = currentLanguage == 'en' ? 'Category'
        : (currentLanguage == 'fr' ? 'Catégorie' : 'التصنيف');
    const textProjectDesc = currentLanguage == 'en' ? 'Project description'
        : (currentLanguage == 'fr' ? 'Description du projet' : 'وصف المشروع');
    const textPrice = currentLanguage == 'en' ? 'Price (DZD)'
        : (currentLanguage == 'fr' ? 'Prix (DA)' : 'السعر (د.ج)');
    const textDiscount = currentLanguage == 'en' ? 'Discount (DZD)'
        : (currentLanguage == 'fr' ? 'Remise (DA)' : 'التخفيض (د.ج)');
    const textStock = currentLanguage == 'en' ? 'Stock'
        : (currentLanguage == 'fr' ? 'Stock' : 'المخزون');
    const textMaxQuantity = currentLanguage == 'en'? 'Maximum order quantity'
        : (currentLanguage == 'fr'? 'Quantité maximale par commande' : 'الكمية القصوى للطلبية');
    const textUpdate = currentLanguage == 'en' ? 'Update'
        : (currentLanguage == 'fr' ? 'Mettre à jour' : 'تحديث');
    const textDeletePjt = currentLanguage == 'en' ? 'Delete project'
        : (currentLanguage == 'fr' ? 'Supprimer le projet' : 'حذف المشروع');
    const textMetaPixel = currentLanguage == 'en' ? 'Meta Pixel ID'
        : (currentLanguage == 'fr' ? 'ID du Pixel Meta': 'معرّف ميتا بيكسل');
    const textDefaultLanguage = currentLanguage == 'en' ? 'Default landing page language'
            : (currentLanguage == 'fr' ? 'Langue par défaut de la page de destination' : 'اللغة الافتراضية لصفحة الهبوط');
    const textSelectDefaultLanguage = currentLanguage == 'en' ? 'Select default language'
            : (currentLanguage == 'fr' ? 'Sélectionnez la langue par défaut' : 'حدد اللغة الافتراضية');
    const textSlug = currentLanguage == 'en' ? 'Slug'
        : (currentLanguage == 'fr' ? 'Lien' : 'الرابط');
    const textDeleteConfirm = currentLanguage == 'en'
        ? 'Are you sure you want to delete this project? All orders related to this project will be lost.'
        : (currentLanguage == 'fr'
            ? 'Êtes-vous sûr de vouloir supprimer ce projet ? Toutes les commandes liées à ce projet seront perdues.'
            : 'هل أنت متأكد من أنك تريد حذف هذا المشروع ؟ كل الطلبيات المتعلقة بالمشروع سيتم حذفها.');
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
    const textMaxQuantityHint = currentLanguage == 'en'? 'Maximum order quantity'
        : (currentLanguage == 'fr'? 'Quantité maximale par commande' : 'الكمية القصوى للطلبية');


    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing} = useForm({
        name: project.data.name,
        description: project.data.description,
        category: project.data.category,
        price: project.data.price,
        stock: project.data.stock,
        max_quantity: project.data.max_quantity,
        discount: project.data.discount,
        meta_pixel_id: project.data.meta_pixel_id,
        default_language: project.data.default_language,
    });

    // update project function
    const updatePjt = (e, projectId) => {
        e.preventDefault();
        post(route('project.update', {project: projectId}));
    };

    // delete project function
    const deletePjt = (e, projectId) => {
        e.preventDefault();
        if (window.confirm(textDeleteConfirm)){
            post(route('project.delete', {project: projectId}));
        }
    };

    // copy slug function
    const copySlug = (e) => {
        e.preventDefault();

        let slug = document.getElementById('slug-input').value;
        navigator.clipboard.writeText(slug);
    };

    return (
        <div className={styles.projectC}>

            <Head title={textProject}/>

            <h2 className={styles.projectHeader}>
                {textProject} <FontAwesomeIcon icon={faFolder} />
            </h2>

            <form className={styles.projectForm}>

                <div className={styles.nameC}>
                    <label htmlFor="name">{textProjectName}</label>
                    <input type="text" name="name" value={data.name}
                        placeholder={textProjectNameHint}
                        onChange={(e) => setData('name', e.target.value)}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div className={styles.slugC}>
                    <label htmlFor="slug">
                        {textSlug} <FontAwesomeIcon icon={faCopy} onClick={copySlug}
                                        className={styles.copyIcon} />
                    </label>
                    <input type="text" name="slug" id="slug-input" dir="ltr"
                        value={page_URL+project.data.slug} disabled/>
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

                <div className={styles.descC}>
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

                    <div className={styles.doubleFieldC}>
                        <div className={styles.discountC}>
                            <label htmlFor="discount">{textDiscount}</label>
                            <input type="text" name="discount"
                                placeholder={textDiscountHint} value={data.discount}
                                onChange={(e) => setData('discount', e.target.value)} />
                            {errors.discount && <p>{errors.discount}</p>}
                        </div>
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

                <div className={styles.doubleFieldC}>
                    <div className={styles.metaPixelC}>
                        <label htmlFor="meta_pixel_id">{textMetaPixel}</label>
                        <input type="text" name="meta_pixel_id" value={data.meta_pixel_id}
                            placeholder={textMetaPixelHint}
                            onChange={(e) => setData('meta_pixel_id', e.target.value)}/>
                        {errors.meta_pixel_id && <p>{errors.meta_pixel_id}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.defaultLanguageC}>
                        <label htmlFor="default_language">
                            {textDefaultLanguage} <FontAwesomeIcon icon={faEarthEurope} />
                        </label>
                        <select name="default_language" value={data.default_language}
                            onChange={(e) => setData('default_language', e.target.value)}>
                            <option value="">{textSelectDefaultLanguage}</option>
                            <option value="ar">العربية</option>
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                        </select>
                        {errors.region_id && <p>{errors.region_id}</p>}
                    </div>
                </div>

                <div className={styles.actionBtnsC}>
                    <button className={styles.updateBtn}
                        disabled={processing || !projectChanged(data, project)}
                        onClick={(e) => updatePjt(e, project.data.id)}>
                        {textUpdate} <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                    <button className={styles.deleteBtn}
                        onClick={(e) => deletePjt(e, project.data.id)}>
                        {textDeletePjt} <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>

            </form>

        </div>
    );
}

function projectChanged(data, project) {
    return (data.name != project.data.name
        || data.category != project.data.category
        || data.description != project.data.description
        || data.price != project.data.price
        || data.discount != project.data.discount
        || data.stock != project.data.stock
        || data.max_quantity != project.data.max_quantity
        || data.meta_pixel_id != project.data.meta_pixel_id
        || data.default_language != project.data.default_language
    );
}

Project.layout = page => <ProjectLayout tab="project" children={page} />

export default Project;
