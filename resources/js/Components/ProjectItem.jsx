import { router } from "@inertiajs/react";
import styles from "../../css/Components/ProjectItem.module.css";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faStore } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../connection.js';


function ProjectItem({project}) {

    // get current language
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // hooks
    const route = useRoute();

    // navigate to dashboard function
    const toDashboard = (e) => {
        e.preventDefault();
        if (project.project_class == "store-page") {
            router.visit(route('store.dashboard', {project: project.id}), {
                method: 'get'
            });
        }else {
            router.visit(route('project.dashboard', {project: project.id}), {
                method: 'get'
            });
        }

    };

    // style considering direction
    let prjIconStyle = {};
    if (currentLanguage == 'ar'){
        prjIconStyle = {
            left: "0",
        }
    }else{
        prjIconStyle = {
            right: "0",
        }
    }

    return (
        <div className={styles.projectC}
            onClick={(e) => toDashboard(e)}>
            {project.icon_url == null ?
            (<img src={conn_URL+ "placeholder/shape.svg"}
                alt="icon" className={styles.projectImage}/>)
            :
            (<img src={conn_URL+ "uploads/"+project.icon_url} alt="icon"
                className={styles.projectImage}/>)}
            <p className={styles.projectName}>{project.name}</p>
            <p className={styles.projectCreateDate}>
                {new Date(project.created_at).toLocaleString()}
            </p>

            <FontAwesomeIcon icon={project.project_class == "store-page"? 
                faStore : faFolder} 
                className={styles.projectIcon}
                style={prjIconStyle}/>

        </div>
    );
}


export default ProjectItem;

