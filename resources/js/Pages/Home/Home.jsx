import { Head, Link, usePage } from "@inertiajs/react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Home/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faCircleExclamation, faFolder, faFolderPlus, faSackDollar, faStore } from "@fortawesome/free-solid-svg-icons";
import ProjectItem from "../../Components/ProjectItem";
import { faGrav } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";


function Home ({totalOrders, totalSales, projects}) {

    // get current language
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textWelcome = currentLanguage == 'en' ? 'Welcome'
        : (currentLanguage == 'fr' ? 'Bienvenue' : 'مرحبا بك');
    const textHome = currentLanguage == 'en' ? 'Home'
        : (currentLanguage == 'fr' ? 'Accueil' : 'الرئيسية');
    const textOverview = currentLanguage == 'en' ? 'Overview'
        : (currentLanguage == 'fr' ? 'Aperçu' : 'نظرة عامة');
    const textTotalSales = currentLanguage == 'en' ? 'Total sales'
        : (currentLanguage == 'fr' ? 'Ventes totales' : 'إجمالي المبيعات');
    const textTotalOrders = currentLanguage == 'en' ? 'Total orders'
        : (currentLanguage == 'fr' ? 'Total des commandes' : 'إجمالي الطلبيات');
    const textCurr = currentLanguage == 'en' ? 'DZD'
        : (currentLanguage == 'fr' ? 'DA' : 'د.ج');
    const textYourProjects = currentLanguage == 'en' ? 'Your projects'
        : (currentLanguage == 'fr' ? 'Vos projets' : 'مشاريعك');
    const textCreateProject = currentLanguage == 'en' ? 'Create a new project'
        : (currentLanguage == 'fr' ? 'Créer un nouveau projet' : 'إنشاء مشروع جديد');
    const textYouveNoProjects = currentLanguage == 'en' ? 'You have no projects yet'
        : (currentLanguage == 'fr' ? 'Vous n’avez pas encore de projets' : 'ليست لديك أي مشاريع حاليا');
    const textStore = currentLanguage == 'en' ? 'Store'
        : (currentLanguage == 'fr' ? 'Boutique' : 'متجر');
    const textLandingPage = currentLanguage == 'en' ? 'Landing page'
        : (currentLanguage == 'fr' ? 'Page de destination' : 'صفحة هبوط');


    // style considering direction
    let totalOrdersCStyle = {};
    let addProjectBtnStyle = {};
    if (currentLanguage == 'ar'){
        totalOrdersCStyle = {
            borderRight: "var(--border-style)",
        };
        addProjectBtnStyle = {
            left: "0",
        };
    }else {
        totalOrdersCStyle = {
            borderLeft: "var(--border-style)",
        };
        addProjectBtnStyle = {
            right: "0",
        };
    }

    // hooks initialization
    const {auth} = usePage().props;
    const route = useRoute();
    const optionsRef = useRef(null);
    const buttonRef = useRef(null);

    // total sales money format
    totalSales = new Intl.NumberFormat('en-US').format(totalSales);

    // show project creation options
    const toggleCreatePjtOptions = () => {
        if (optionsRef.current.style.display == "block") {
            optionsRef.current.style.display = "none";
            buttonRef.current.style.color = "#ffffff";
            buttonRef.current.style.backgroundColor = "var(--light-blue)";
            buttonRef.current.style.border = "0";
            buttonRef.current.addEventListener('mouseenter', function () {
                buttonRef.current.style.backgroundColor = "var(--dark-blue)";
            });
            buttonRef.current.addEventListener('mouseleave', function () {
                buttonRef.current.style.backgroundColor = "var(--light-blue)";
            });
        }else {
            optionsRef.current.style.display = "block";
            buttonRef.current.style.color = "var(--normal-black)";
            buttonRef.current.style.backgroundColor = "#ffffff";
            buttonRef.current.style.border = "var(--border-style)";
            buttonRef.current.addEventListener('mouseenter', function () {
                buttonRef.current.style.backgroundColor = "var(--hover-color)";
            });
            buttonRef.current.addEventListener('mouseleave', function () {
                buttonRef.current.style.backgroundColor = "#ffffff";
            });
        }
    }

    return (
        <div className={styles.homeC}>

            <Head title={textHome}/>

            <h2 className={styles.homeHeader}>
                {textWelcome} {auth.user.firstName} <FontAwesomeIcon icon={faGrav}/>
            </h2>

            <h4 className={styles.overviewHeader}>{textOverview}</h4>

            <div className={styles.doubleItemC}>
                <div className={styles.totalSalesC}>
                    <div><FontAwesomeIcon icon={faSackDollar}/> {textTotalSales}</div>
                    <p>{totalSales} {textCurr}</p>
                </div>

                <div className={styles.totalOrdersC} style={totalOrdersCStyle}>
                    <div><FontAwesomeIcon icon={faBoxOpen}/> {textTotalOrders}</div>
                    <p>{totalOrders}</p>
                </div>
            </div>

            <h4 className={styles.yourProjectsHeader}>{textYourProjects}</h4>

            <div className={styles.yourProjectsC}>
                <div className={styles.yourProjects}>

                    {projects.data.length > 0 ?
                    (projects.data.map((project) => (
                        <ProjectItem key={project.id} project={project} />))
                    )
                    :
                    (<div className={styles.noProjectsMsg}>
                        <FontAwesomeIcon icon={faCircleExclamation} /> {textYouveNoProjects}
                    </div>)
                    }

                </div>

                <div className={styles.addProjectBtnC} style={addProjectBtnStyle}>

                    <button className={styles.addProjectBtn} onClick={toggleCreatePjtOptions}
                        ref={buttonRef}>
                        {textCreateProject} <FontAwesomeIcon icon={faFolderPlus} />
                    </button>

                    <div className={styles.addProjectOptionsC} ref={optionsRef}>
                        <Link className={styles.landingPageBtn} href={route('create')}>
                            {textLandingPage} <FontAwesomeIcon icon={faFolder} />
                        </Link>
                        <Link className={styles.storeBtn} href={route('store')}>
                            {textStore} <FontAwesomeIcon icon={faStore} />
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}

Home.layout = page => <HomeLayout tab="home" children={page} />

export default Home;
