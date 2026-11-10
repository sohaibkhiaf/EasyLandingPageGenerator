import { Head, Link } from "@inertiajs/react";
import ProjectHeader from "../Components/ProjectHeader";
import {useRoute} from "../../../vendor/tightenco/ziggy";
import styles from "../../css/Layouts/ProjectLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faBrush, faFolder, faImage, faTable, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import {URL as conn_URL} from '../connection.js';


function ProjectLayout({children, tab}) {

    // get current language
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // extract page direction
    let currentDirection = currentLanguage == 'ar' ? 'rtl': 'ltr';

    // set page direction and language
    document.documentElement.dir = currentDirection;
    document.documentElement.lang = currentLanguage;

    // initialize text considering preferred language
    const textDashboard = currentLanguage == 'en' ? 'Dashboard'
        : (currentLanguage == 'fr' ? 'Tableau de bord' : 'لوحة التحكم');
    const textProject = currentLanguage == 'en' ? 'Project'
        : (currentLanguage == 'fr' ? 'Projet' : 'المشروع');
    const textVisuals = currentLanguage == 'en' ? 'Visuals'
        : (currentLanguage == 'fr' ? 'Visuels' : 'الصور');
    const textTheme = currentLanguage == 'en' ? 'Theme'
        : (currentLanguage == 'fr' ? 'Thème' : 'الشكل');
    const textShipping = currentLanguage == 'en' ? 'Shipping'
        : (currentLanguage == 'fr' ? 'Livraison' : 'التوصيل');
    const textOrders = currentLanguage == 'en' ? 'Orders'
        : (currentLanguage == 'fr' ? 'Commandes' : 'الطلبيات');

    // selected tab inline style
    const selectedTabStyle = {
        backgroundColor: "var(--hover-color)",
        color: "var(--dark-black)",
    };

    // hooks initialization
    const route = useRoute();

    return (
        <>
        <Head>
            <link rel="icon" type="image/png"
                href={conn_URL+ "elpg_blue_background.png"} />
        </Head>

        <ProjectHeader project={children.props.project.data} />

        <div className={styles.layoutC}>
            <aside className={styles.aside}>

                {/* side links */}
                <div className={styles.tabsC}>
                    <Link className={styles.tab} style={tab === "dashboard" ? selectedTabStyle : {} }
                        href={route('project.dashboard', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faTable}/> {textDashboard}
                    </Link>
                    <Link className={styles.tab} style={tab === "project" ? selectedTabStyle : {} }
                        href={route('project.project', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faFolder}/> {textProject}
                    </Link>
                    <Link className={styles.tab} style={tab === "visuals" ? selectedTabStyle : {} }
                        href={route('project.visuals', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faImage}/> {textVisuals}
                    </Link>
                    <Link className={styles.tab} style={tab === "theme" ? selectedTabStyle : {} }
                        href={route('project.theme', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faBrush} /> {textTheme}
                    </Link>
                    <Link className={styles.tab} style={tab === "shipping" ? selectedTabStyle : {} }
                        href={route('project.shipping', {project: children.props.project.data.id} )}>
                        <FontAwesomeIcon icon={faTruckFast} /> {textShipping}
                    </Link>
                    <Link className={styles.tab} style={tab === "orders" ? selectedTabStyle : {} }
                        href={route('project.orders', {project: children.props.project.data.id, status: "1"} )}>
                        <FontAwesomeIcon icon={faBoxOpen} /> {textOrders}
                    </Link>
                </div>

            </aside>

            {/* main content */}
            <main className={styles.main}>
                {children}
            </main>
        </div>
        </>

    );

}

export default ProjectLayout;
