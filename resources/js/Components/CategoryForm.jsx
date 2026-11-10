import { useForm } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useEffect } from "react";
import styles from "../../css/Components/CategoryForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faEarthAmerica, faEarthAmericas, faEarthAsia, faEarthEurope, faLanguage, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function CategoryForm({category, index}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textArName = currentLanguage == 'en' ? 'Arabic name'
        : (currentLanguage == 'fr' ? 'Nom en arabe' : 'الإسم العربي');
    const textEnName = currentLanguage == 'en' ? 'English name'
        : (currentLanguage == 'fr' ? 'Nom en anglais' : 'الإسم الإنجليزي');
    const textFrName = currentLanguage == 'en' ? 'French name'
        : (currentLanguage == 'fr' ? 'Nom en français' : 'الإسم الفرنسي');
    const textEnabled = currentLanguage == 'en' ? 'Enabled'
        : (currentLanguage == 'fr' ? 'Activé' : 'مفعل');
    const textUpdate = currentLanguage == 'en' ? 'Update'
        : (currentLanguage == 'fr' ? 'Mettre à jour' : 'تحديث');
    const textHeader = currentLanguage == 'en' ? category.en_name
        : (currentLanguage == 'fr' ? category.fr_name : category.ar_name);
    const textDeleteCtg = currentLanguage == 'en' ? 'Delete category'
        : (currentLanguage == 'fr' ? 'Supprimer la catégorie' : 'حذف التصنيف');
    const textDeleteConfirm = currentLanguage == 'en'
        ? 'Are you sure you want to delete this category? All products related to this category will be lost.'
        : (currentLanguage == 'fr'
            ? 'Êtes-vous sûr de vouloir supprimer cette catégorie ? Tous les produits liés à cette catégorie seront perdus.'
            : 'هل أنت متأكد من أنك تريد حذف هذا التصنيف ؟ كل المنتجات المتعلقة بالتصنيف سيتم حذفها.');
    const textArNameHint = currentLanguage == 'en' ? 'Arabic name'
        : (currentLanguage == 'fr' ? 'Nom en arabe' : 'الإسم العربي للتصنيف');
    const textEnNameHint = currentLanguage == 'en' ? 'English name'
        : (currentLanguage == 'fr' ? 'Nom en anglais' : 'الإسم الإنجليزي للتصنيف');
    const textFrNameHint = currentLanguage == 'en' ? 'French name'
        : (currentLanguage == 'fr' ? 'Nom en français' : 'الإسم الفرنسي للتصنيف');

    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing} = useForm({
        ar_name: category.ar_name,
        en_name: category.en_name,
        fr_name: category.fr_name,
        enabled: category.enabled,
    });

    // update category function
    const updateCtg = (e, categoryId) => {
        e.preventDefault();
        post(route('category.update', {category: categoryId} ), {
            preserveScroll: true
        });
    }

    // delete category function
    const deleteCtg = (e, categoryId) => {
        e.preventDefault();
        if (window.confirm(textDeleteConfirm)){
            post(route('category.delete', {category: categoryId} ), {
                preserveScroll: true
            });
        }

    }

    // set inputs on data change
    useEffect(() => {
        setData('ar_name', category.ar_name);
        setData('en_name', category.en_name);
        setData('fr_name', category.fr_name);
    }, [category.ar_name, category.en_name, category.fr_name]);

    return (
        <div className={styles.categoryC}>
            <div className={styles.categoryHeader}>
                {index+1}- {textHeader}
            </div>
            <form className={styles.categoryForm}>
                <div className={styles.nameC}>
                    <label htmlFor="ar_name">
                        {textArName} <FontAwesomeIcon icon={faEarthAsia} />
                    </label>
                    <input type="text" name="ar_name" value={data.ar_name}
                        placeholder={textArNameHint}
                        onChange={(e) => setData('ar_name', e.target.value)}/>
                    {errors.ar_name && <p>{errors.ar_name}</p>}
                </div>
                <div className={styles.nameC}>
                    <label htmlFor="en_name">
                        {textEnName} <FontAwesomeIcon icon={faEarthAmericas} />
                    </label>
                    <input type="text" name="en_name" value={data.en_name}
                        placeholder={textEnNameHint}
                        onChange={(e) => setData('en_name', e.target.value)}/>
                    {errors.en_name && <p>{errors.en_name}</p>}
                </div>
                <div className={styles.nameC}>
                    <label htmlFor="fr_name">
                        {textFrName} <FontAwesomeIcon icon={faEarthEurope} />
                    </label>
                    <input type="text" name="fr_name" value={data.fr_name}
                        placeholder={textFrNameHint}
                        onChange={(e) => setData('fr_name', e.target.value)}/>
                    {errors.fr_name && <p>{errors.fr_name}</p>}
                </div>

                <div className={styles.enabledC}>
                    <label htmlFor="enabled">
                        <input type="checkbox" name="enabled" checked={data.enabled}
                        onChange={(e) => setData('enabled', e.target.checked)}/>
                        {textEnabled}
                    </label>
                </div>

                <div className={styles.actionBtnsC}>
                    <button disabled={processing || !categoryChanged(data, category)}
                        className={styles.updateBtn}
                        onClick={(e) => updateCtg(e, category.id)}>
                        {textUpdate} <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                    <button className={styles.deleteBtn}
                        onClick={(e) => deleteCtg(e, category.id)}>
                        {textDeleteCtg} <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>

            </form>
        </div>
    );
}


function categoryChanged(data, category) {
    return (data.ar_name != category.ar_name
        || data.en_name != category.en_name
        || data.fr_name != category.fr_name
        || data.enabled != category.enabled);
}


export default CategoryForm;
