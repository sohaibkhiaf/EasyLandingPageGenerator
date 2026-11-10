import StoreLayout  from "../../Layouts/StoreLayout.jsx";
import CategoryForm from "../../Components/CategoryForm.jsx";
import { Head, useForm } from "@inertiajs/react";
import styles from "../../../css/Store/Categories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRoute } from "../../../../vendor/tightenco/ziggy";

function Categories({project, categories}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textCategories = currentLanguage == 'en' ? 'Categories'
        : (currentLanguage == 'fr' ? 'Catégories' : 'التصنيفات');
    const textCreateConfirm = currentLanguage == 'en' ?
        'Are you sure you want to create a new category?'
            : (currentLanguage == 'fr' ?
            'Êtes-vous sûr de vouloir créer une nouvelle catégorie ?'
            : 'هل أنت متأكد أنك تريد إنشاء تصنيف جديد؟');
    const textCreateCategory = currentLanguage == 'en' ?
        'Create a new category'
            : (currentLanguage == 'fr' ?
            'Créer une nouvelle catégorie'
            : 'إنشاء تصنيف جديد');

    // hooks
    const {post} = useForm();
    const route = useRoute();

    // create category
    const createCategory = (e, projectId) => {
        e.preventDefault();
        if (window.confirm(textCreateConfirm)){
            post(route('category.create', {project: projectId}));
        }
    };

    return (
        <div className={styles.categoriesC}>

            <Head title={textCategories}/>

            <h2 className={styles.categoriesHeader}>
                {textCategories} <FontAwesomeIcon icon={faBarsStaggered} />
            </h2>

            <div className={styles.createCtgBtnC}>
                <button className={styles.createCtgBtn}
                    onClick={(e) => createCategory(e, project.data.id)}>
                        {textCreateCategory} <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            <div className={styles.ctgsC}>
                {categories.data.map((category, index)=> (
                    <CategoryForm key={category.id} category={category} project={project}
                        index={index}/>
                ))}
            </div>

        </div>
    );
}

Categories.layout = page => <StoreLayout tab="categories" children={page} />

export default Categories;
