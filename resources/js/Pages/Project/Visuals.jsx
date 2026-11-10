import { Head, useForm } from "@inertiajs/react";
import styles from "../../../css/Project/Visuals.module.css";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import {URL as conn_URL} from '../../connection.js';


function Visuals({project}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textVisuals = currentLanguage == 'en' ? 'Visuals'
        : (currentLanguage == 'fr' ? 'Visuels' : 'الصور');
    const textUpdate = currentLanguage == 'en' ? 'Update'
        : (currentLanguage == 'fr' ? 'Mettre à jour' : 'تحديث');

    const textProjectIcon = currentLanguage == 'en'
        ? 'Project Icon (The icon file size must not be greater than 512 KB)'
        : (currentLanguage == 'fr'
            ? 'Icône du projet (la taille du fichier de l’icône ne doit pas dépasser 512 Ko)'
            : 'أيقونة المشروع (حجم الأيقونة يجب أن لا يتجاوز 512 كيلوبايت)');
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
    const [uploadedImages, setUploadedImages] = useState(project.data.multiple_images_urls);
    const {data, setData, post, errors, processing, reset} = useForm({
        icon: null,
        main: null,
        multiple: [],
        deleted: [],
    });

    // update visuals function
    const update = (e) => {
        e.preventDefault();
        post(route('visuals.update', {project: project.data.id}), {
            forceFormData: true, //Send this request as multipart/form-data instead of JSON.
            onFinish: () => reset('icon', 'main', 'multiple', 'deleted'),
        });
    };

    // icon preview
    const iconFileRef = useRef(null);
    const [iconPrev, setIconPrev] = useState(null);
    const openIconFilePicker = () => {
        iconFileRef.current.click();
    };
    const onIconFileChange = (e) => {
        const file = e.target.files[0];
        if (!file){ return; }
        setData('icon' , file);
        setIconPrev(URL.createObjectURL(file));
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
        <div className={styles.visualsC}>

            <Head title={textVisuals}/>

            <h2 className={styles.visualsHeader}>
                {textVisuals} <FontAwesomeIcon icon={faImage} />
            </h2>

            <form className={styles.visualsForm} onSubmit={update}
                encType="multipart/form-data">

                {/* icon */}
                <div className={styles.iconPickerC}>
                    <label htmlFor="icon">{textProjectIcon}</label>
                    <input type="file" accept="image/*" name="icon"
                        onChange={onIconFileChange} ref={iconFileRef} hidden/>
                    <div className={styles.iconC}>
                        {iconPrev == null ?
                        (project.data.icon_url == null ?
                            (<img src={conn_URL+"placeholder/shape.svg"} alt="icon"
                            onClick={openIconFilePicker}/>)
                            : (<img src={ conn_URL+ "uploads/" +project.data.icon_url} alt="icon"
                            onClick={openIconFilePicker}/>))
                        :
                        (<img src={iconPrev} alt="icon"
                            onClick={openIconFilePicker}/>)
                        }
                    </div>
                    {errors.icon && <p>{errors.icon}</p>}
                </div>

                {/* main image */}
                <div className={styles.mainImgPickerC}>
                    <label htmlFor="main">{textMainImg}</label>
                    <input type="file" accept="image/*" name="main"
                        onChange={onMainFileChange} ref={mainFileInputRef} hidden/>
                    <div className={styles.mainC}>
                        {mainPreview == null ?
                        (project.data.main_image_url == null ?
                            (<img src={conn_URL+ "placeholder/product.svg"} alt="main"
                            onClick={openMainFilePicker}/>)
                            : (<img src={ conn_URL+ "uploads/" +project.data.main_image_url} alt="main"
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

                <div className={styles.updateBtnC}>
                    <button className={styles.updateBtn} disabled={processing}>
                        {textUpdate} <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                </div>
            </form>
        </div>
    );
}

Visuals.layout = page => <ProjectLayout tab="visuals" children={page} />

export default Visuals;

