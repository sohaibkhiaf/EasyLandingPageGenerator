import { Head, useForm } from "@inertiajs/react";
import StoreLayout  from "../../Layouts/StoreLayout";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Store/Store.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCopy, faEarthEurope, faStore, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {STORE_URL as store_URL} from '../../connection.js';


function Store({project}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= en
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textStore = currentLanguage == 'en' ? 'Store'
        : (currentLanguage == 'fr' ? 'Boutique' : 'المتجر');
    const textStoreName = currentLanguage == 'en' ? 'Store name'
        : (currentLanguage == 'fr' ? 'Nom de la boutique' : 'إسم المتجر');
    const textHeadline = currentLanguage == 'en' ? 'Headline'
        : (currentLanguage == 'fr' ? 'Titre principal' : 'العنوان الرئيسي');
    const textSubheadline = currentLanguage == 'en' ? 'Subheadline'
        : (currentLanguage == 'fr' ? 'Sous-titre' : 'العنوان الفرعي');
    const textUpdate = currentLanguage == 'en' ? 'Update'
        : (currentLanguage == 'fr' ? 'Mettre à jour' : 'تحديث');
    const textDeleteStore = currentLanguage == 'en' ? 'Delete store'
        : (currentLanguage == 'fr' ? 'Supprimer la boutique' : 'حذف المتجر');
    const textMetaPixel = currentLanguage == 'en' ? 'Meta pixel ID'
        : (currentLanguage == 'fr' ? 'ID du Pixel Meta': 'معرّف ميتا بيكسل');
    const textDefaultLanguage = currentLanguage == 'en' ? 'Default store language'
            : (currentLanguage == 'fr' ? 'Langue par défaut de la boutique' : 'اللغة الافتراضية للمتجر');
    const textSelectDefaultLanguage = currentLanguage == 'en' ? 'Select default language'
            : (currentLanguage == 'fr' ? 'Sélectionnez la langue par défaut' : 'حدد اللغة الافتراضية');
    const textSlug = currentLanguage == 'en' ? 'Slug'
        : (currentLanguage == 'fr' ? 'Lien' : 'الرابط');
    const textDeleteConfirm = currentLanguage == 'en'
        ? 'Are you sure you want to delete this store? All orders related to this store will be lost.'
        : (currentLanguage == 'fr'
            ? 'Êtes-vous sûr de vouloir supprimer cette boutique ? Toutes les commandes liées à cette boutique seront perdues.'
            : 'هل أنت متأكد من أنك تريد حذف هذا المتجر ؟ كل الطلبيات المتعلقة بالمتجر سيتم حذفها.');
    const textStoreNameHint = currentLanguage == 'en' ? 'Store name'
        : (currentLanguage == 'fr' ? 'Nom de la boutique' : 'إسم المتجر');
    const textHeadlineHint = currentLanguage == 'en' ? 'Headline'
        : (currentLanguage == 'fr' ? 'Titre principal de la boutique' : 'العنوان الرئيسي للمتجر');
    const textSubheadlineHint = currentLanguage == 'en' ? 'Subheadline'
        : (currentLanguage == 'fr' ? 'Sous-titre de la boutique' : 'العنوان الفرعي للمتجر');
    const textMetaPixelHint = currentLanguage == 'en' ? 'Meta pixel ID'
        : (currentLanguage == 'fr' ? 'ID du Pixel Meta': 'معرّف ميتا بيكسل');

    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing} = useForm({
        name: project.data.name,
        slug: project.data.slug,
        headline: project.data.headline,
        subheadline: project.data.subheadline,
        meta_pixel_id: project.data.meta_pixel_id,
        default_language: project.data.default_language,
    });

    // update store function
    const updateStore = (e, projectId) => {
        e.preventDefault();
        post(route('store.update', {project: projectId}));
    };

    // delete store function
    const deleteStore = (e, projectId) => {
        e.preventDefault();
        if (window.confirm(textDeleteConfirm)){
            post(route('store.delete', {project: projectId}));
        }
    };

    // copy slug function
    const copySlug = (e) => {
        e.preventDefault();

        let slug = document.getElementById('slug-input').value;
        navigator.clipboard.writeText(slug);
    };

    return (
        <div className={styles.storeC}>

            <Head title={textStore}/>

            <h2 className={styles.storeHeader}>
                {textStore} <FontAwesomeIcon icon={faStore} />
            </h2>

            <form className={styles.storeForm}>

                <div className={styles.nameC}>
                    <label htmlFor="name">{textStoreName}</label>
                    <input type="text" name="name" value={data.name}
                        placeholder={textStoreNameHint}
                        onChange={(e) => setData('name', e.target.value)}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div className={styles.slugC}>
                    <label htmlFor="slug">
                        {textSlug} <FontAwesomeIcon icon={faCopy} onClick={copySlug}
                                        className={styles.copyIcon} />
                    </label>
                    <input type="text" name="slug" id="slug-input"
                        value={store_URL+project.data.slug} disabled/>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.headlineC}>
                        <label htmlFor="headline">{textHeadline}</label>
                        <input type="text" name="headline" value={data.headline}
                            placeholder={textHeadlineHint}
                            onChange={(e) => setData('headline', e.target.value)}/>
                        {errors.headline && <p>{errors.headline}</p>}
                    </div>
                </div>

                <div className={styles.subheadlineC}>
                    <label htmlFor="subheadline">{textSubheadline}</label>
                    <textarea name="subheadline" value={data.subheadline}
                        placeholder={textSubheadlineHint}
                        onChange={(e) => setData('subheadline', e.target.value)}/>
                    {errors.subheadline && <p>{errors.subheadline}</p>}
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
                        disabled={processing || !storeChanged(data, project)}
                        onClick={(e) => updateStore(e, project.data.id)}>
                        {textUpdate} <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                    <button className={styles.deleteBtn}
                        onClick={(e) => deleteStore(e, project.data.id)}>
                        {textDeleteStore} <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>

            </form>

        </div>
    );
}

function storeChanged(data, project) {
    return (data.name != project.data.name
        || data.headline != project.data.headline
        || data.subheadline != project.data.subheadline
        || data.slug != project.data.slug
        || data.meta_pixel_id != project.data.meta_pixel_id
        || data.default_language != project.data.default_language
    );
}

Store.layout = page => <StoreLayout tab="store" children={page} />

export default Store;
