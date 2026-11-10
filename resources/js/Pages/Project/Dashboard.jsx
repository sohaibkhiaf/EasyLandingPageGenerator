import { Head } from "@inertiajs/react";
import ProjectLayout  from "../../Layouts/ProjectLayout";
import styles from "../../../css/Project/Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faSackDollar, faTable } from "@fortawesome/free-solid-svg-icons";

function Dashboard({statsToday, statsYesterday, statsWeek, statsMonth, statsYear, statsAllTime}) {

    // get current language
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textDashboard = currentLanguage == 'en' ? 'Dashboard'
        : (currentLanguage == 'fr' ? 'Tableau de bord' : 'لوحة التحكم');
    const textOrders = currentLanguage == 'en' ? 'Orders'
        : (currentLanguage == 'fr' ? 'Commandes' : 'الطلبيات');
    const textEarnings = currentLanguage == 'en' ? 'Earnings'
        : (currentLanguage == 'fr' ? 'Revenus' : 'المداخيل');
    const textCurr = currentLanguage == 'en' ? 'DZD'
        : (currentLanguage == 'fr' ? 'DA' : 'د.ج');
    const textToday = currentLanguage == 'en' ? 'Today'
        : (currentLanguage == 'fr' ? 'Aujourd’hui' : 'اليوم');
    const textYesterday = currentLanguage == 'en' ? 'Yesterday'
        : (currentLanguage == 'fr' ? 'Hier' : 'الأمس');
    const textThisWeek = currentLanguage == 'en' ? 'This Week'
        : (currentLanguage == 'fr' ? 'Cette semaine' : 'هذا الأسبوع');
    const textThisMonth = currentLanguage == 'en' ? 'This Month'
        : (currentLanguage == 'fr' ? 'Ce mois-ci' : 'هذا الشهر');
    const textThisYear = currentLanguage == 'en' ? 'This Year'
        : (currentLanguage == 'fr' ? 'Cette année' : 'هذه السنة');
    const textAllTime = currentLanguage == 'en' ? 'All Time'
        : (currentLanguage == 'fr' ? 'Depuis toujours' : 'كل الأوقات');

    // style considering direction
    let earningsCStyle = {};
    if (currentLanguage == 'ar'){
        earningsCStyle = {
            borderRight: "var(--border-style)",
        };
    }else {
        earningsCStyle = {
            borderLeft: "var(--border-style)",
        };
    }

    // money format
    let earningsToday = new Intl.NumberFormat('en-US').format(statsToday.earnings);
    let earningsYesterday = new Intl.NumberFormat('en-US').format(statsYesterday.earnings);
    let earningsWeek = new Intl.NumberFormat('en-US').format(statsWeek.earnings);
    let earningsYear= new Intl.NumberFormat('en-US').format(statsYear.earnings);
    let earningsMonth = new Intl.NumberFormat('en-US').format(statsMonth.earnings);
    let earningsAllTime = new Intl.NumberFormat('en-US').format(statsAllTime.earnings);

    return (
        <div className={styles.dashboardC}>

            <Head title={textDashboard}/>

            <h2 className={styles.dashboardHeader}>
                {textDashboard} <FontAwesomeIcon icon={faTable} />
            </h2>

            <div className={styles.statsC}>
                <div className={styles.ordersC}>
                    <div className={styles.ordersHeader}>
                        <FontAwesomeIcon icon={faBoxOpen} /> {textOrders}
                    </div>
                    <div className={styles.statsLabelC}>
                        <p>{textToday}</p>
                        <p>{statsToday.orders_count}</p>
                    </div>
                    <div className={styles.statsLabelC}>
                        <p>{textYesterday}</p>
                        <p>{statsYesterday.orders_count}</p>
                    </div>
                    <div className={styles.statsLabelC}>
                        <p>{textThisWeek}</p>
                        <p>{statsWeek.orders_count}</p>
                    </div>
                    <div className={styles.statsLabelC}>
                        <p>{textThisMonth}</p>
                        <p>{statsMonth.orders_count}</p>
                    </div>
                    <div className={styles.statsLabelC}>
                        <p>{textThisYear}</p>
                        <p>{statsYear.orders_count}</p>
                    </div>
                    <div className={styles.statsLabelC}>
                        <p>{textAllTime}</p>
                        <p>{statsAllTime.orders_count}</p>
                    </div>
                </div>

                <div className={styles.earningsC}
                    style={earningsCStyle} >
                    <div className={styles.earningsHeader}>
                        <FontAwesomeIcon icon={faSackDollar} /> {textEarnings}
                    </div>
                    <div className={styles.statsLabelC}>
                        <p>{textToday}</p>
                        <p>{earningsToday} {textCurr}</p>
                    </div>

                    <div className={styles.statsLabelC}>
                        <p>{textYesterday}</p>
                        <p>{earningsYesterday} {textCurr}</p>
                    </div>

                    <div className={styles.statsLabelC}>
                        <p>{textThisWeek}</p>
                        <p>{earningsWeek} {textCurr}</p>
                    </div>

                    <div className={styles.statsLabelC}>
                        <p>{textThisMonth}</p>
                        <p>{earningsMonth} {textCurr}</p>
                    </div>

                    <div className={styles.statsLabelC}>
                        <p>{textThisYear}</p>
                        <p>{earningsYear} {textCurr}</p>
                    </div>

                    <div className={styles.statsLabelC}>
                        <p>{textAllTime}</p>
                        <p>{earningsAllTime} {textCurr}</p>
                    </div>

                </div>
            </div>

        </div>
    );
}

Dashboard.layout = page => <ProjectLayout tab="dashboard" children={page} />

export default Dashboard;
