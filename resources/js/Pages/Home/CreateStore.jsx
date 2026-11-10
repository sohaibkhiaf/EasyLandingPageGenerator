import { Head, useForm } from "@inertiajs/react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Home/CreateStore.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStore } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import {URL as conn_URL} from '../../connection.js';


function CreateStore() {
    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textMetaPixel = currentLanguage == 'en' ? 'Meta pixel ID'
        : (currentLanguage == 'fr' ? 'ID du Pixel Meta': 'معرّف ميتا بيكسل');
    const textCreate = currentLanguage == 'en' ? 'Create'
        : (currentLanguage == 'fr' ? 'Créer' : 'إنشاء');
    const textSlug = currentLanguage == 'en' ? 'Slug'
        : (currentLanguage == 'fr' ? 'Lien' : 'الرابط');
    const textSlugUnchangeable = currentLanguage == 'en'
        ? 'The slug cannot be changed later'
        : (currentLanguage == 'fr'
            ? 'Le slug ne peut pas être modifié ultérieurement'
            : 'لا يمكن تغيير الرابط لاحقًا');
    const textCreateStore = currentLanguage == 'en' ? 'Create store'
        : (currentLanguage == 'fr' ? 'Créer une boutique' : 'إنشاء متجر جديد');
    const textStoreName = currentLanguage == 'en' ? 'Store name'
        : (currentLanguage == 'fr' ? 'Nom de la boutique' : 'إسم المتجر');
    const textHeadline = currentLanguage == 'en' ? 'Headline'
        : (currentLanguage == 'fr' ? 'Titre principal' : 'العنوان الرئيسي');
    const textSubheadline = currentLanguage == 'en' ? 'Subheadline'
        : (currentLanguage == 'fr' ? 'Sous-titre' : 'العنوان الفرعي');
    const textStoreIcon = currentLanguage == 'en'
        ? 'Store icon (The icon file size must not be greater than 512 KB)'
        : (currentLanguage == 'fr'
            ? "Icône de la boutique (la taille ne doit pas dépasser 512 Ko)"
            : 'أيقونة المتجر (حجم الأيقونة يجب أن لا يتجاوز 512 كيلوبايت)');
    const textMetaPixelHint = currentLanguage == 'en' ? 'Meta pixel ID'
        : (currentLanguage == 'fr' ? 'ID du Pixel Meta': 'معرّف ميتا بيكسل');
    const textStoreNameHint = currentLanguage == 'en'
        ? 'Your store name' : (currentLanguage == 'fr'
            ? 'Nom de votre boutique': 'إسم متجرك');
    const textHeadlineHint = currentLanguage == 'en'
        ? 'Headline': (currentLanguage == 'fr'
            ? 'Titre principal' : 'العنوان الرئيسي لمتجرك');
    const textSubheadlineHint = currentLanguage == 'en'
        ? 'Subheadline' : (currentLanguage == 'fr'
            ? 'Sous-titre' : 'العنوان الفرعي لمتجرك');


    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing} = useForm({
        name: '',
        slug: '',
        headline: '',
        subheadline: '',
        meta_pixel_id: '',
        icon: null,
    });
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    // create store function
    const create = (e) => {
        e.preventDefault();
        post(route('store.create'), {
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
        <div className={styles.createStoreC}>

            <Head title={textCreateStore}/>

            <h2 className={styles.createStoreHeader}>
                {textCreateStore} <FontAwesomeIcon icon={faStore} />
            </h2>

            <form className={styles.createStoreForm} onSubmit={create}
                encType="multipart/form-data">

                <div className={styles.iconPickerC}>
                    <label htmlFor="icon">{textStoreIcon}</label>
                    <input type="file" accept="image/*" name="icon"
                        onChange={onFileChange} ref={fileInputRef} hidden/>
                    <div className={styles.iconC}>
                        <img src={preview || conn_URL+ "placeholder/shape.svg"} alt="icon"
                            onClick={openFilePicker}/>
                    </div>
                    {errors.icon && <p>{errors.icon}</p>}
                </div>

                <div className={styles.nameC}>
                    <label htmlFor="name">{textStoreName}</label>
                    <input type="text" name="name" value={data.name}
                        placeholder={textStoreNameHint}
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

                <div className={styles.createBtnC}>
                    <button className={styles.createBtn} disabled={processing}>
                        {textCreate} <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </form>

        </div>
    );
}

CreateStore.layout = page => <HomeLayout children={page} />

export default CreateStore;

