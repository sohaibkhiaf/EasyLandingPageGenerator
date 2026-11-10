import MainPageLayout from "../../Layouts/MainPageLayout";
import styles from "../../../css/MainPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faBrush, faChartLine, faFire, faFolderPlus, faGear, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import { useEffect, useState } from "react";
import {URL as conn_URL} from "../../connection.js";


function MainPage() {

    // get current language
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    const textBuildHighConv = currentLanguage == 'en'
        ? 'Build high-converting landing pages in minutes'
        : (currentLanguage == 'fr' ? 'Créez des landing pages à forte conversion en quelques minutes'
        : 'أنشئ صفحات هبوط عالية التحويل خلال دقائق');
    const textCreateBeautiful = currentLanguage == 'en'
        ? 'Create beautiful landing pages, customize every detail, and start receiving orders instantly — no technical skills required.'
        : (currentLanguage == 'fr' ? 'Créez de superbes landing pages, personnalisez chaque détail et commencez à recevoir des commandes instantanément — sans compétences techniques.'
        : 'أنشئ صفحات هبوط جميلة، خصّص كل التفاصيل، وابدأ في استقبال الطلبيات فورًا — دون الحاجة إلى مهارات تقنية.');
    const textSimplePage = currentLanguage == 'en'
        ? 'Simple page builder'
        : (currentLanguage == 'fr' ? 'Créateur de pages simple'
        : 'مولد صفحات بسيط');
    const textDesignAndCustomize = currentLanguage == 'en'
        ? 'Design and customize your pages with ease'
        : (currentLanguage == 'fr' ? 'Concevez et personnalisez vos pages en toute simplicité'
        : 'صمّم وخصّص صفحاتك بكل سهولة');
    const textReadyToSell = currentLanguage == 'en'
        ? 'Ready to sell'
        : (currentLanguage == 'fr' ? 'Prêt à vendre'
        : 'جاهز للعمل');
    const textAcceptOrders = currentLanguage == 'en'
        ? 'Accept orders and manage customers from one place'
        : (currentLanguage == 'fr' ? 'Recevez des commandes et gérez vos clients depuis un seul endroit'
        : 'استقبل الطلبيات وأدر عملاءك من مكان واحد');
    const textNoUpfrontCost = currentLanguage == 'en'
        ? 'No upfront cost'
        : (currentLanguage == 'fr' ? 'Aucun frais initial'
        : 'بدون أي تكلفة مسبقة');
    const textStartFree = currentLanguage == 'en'
        ? 'Start free and grow as you succeed'
        : (currentLanguage == 'fr' ? 'Commencez gratuitement et évoluez à mesure de votre succès'
        : 'ابدأ مجانًا وتوسّع مع نجاحك');
    const textGetStarted = currentLanguage == 'en'
        ? 'Get Started'
        : (currentLanguage == 'fr' ? 'Commencer'
        : 'ابدأ الآن');
    const textHow = currentLanguage == 'en'
        ? 'How does it work?'
        : (currentLanguage == 'fr' ? 'Comment ça marche ?'
        : 'كيف يعمل؟');
    const textCreateProject = currentLanguage == 'en'
        ? '1. Create a project'
        : (currentLanguage == 'fr' ? '1. Créez un projet'
        : '1. إنشاء مشروع');
    const textSetupProject = currentLanguage == 'en'
        ? '2. Setup project & theme'
        : (currentLanguage == 'fr' ? '2. Configurez le projet et le thème'
        : '2. إعداد المشروع والقالب');
    const textHandleOrders = currentLanguage == 'en'
        ? '3. Handle incoming orders'
        : (currentLanguage == 'fr' ? '3. Gérez les commandes entrantes'
        : '3. إدارة الطلبيات الواردة');
    const textGetStats = currentLanguage == 'en'
        ? '4. Get statistics'
        : (currentLanguage == 'fr' ? '4. Consultez les statistiques'
        : '4. الإطلاع على الإحصائيات');


    // image links
    const images = [
        conn_URL + "images/stats.png",
        conn_URL + "images/orders.png",
        conn_URL + "images/boxes.png",
        conn_URL + "images/pack.png",
    ];

    // hooks
    const route = useRoute();
    const [headerImage, setHeaderImage] = useState(images[Math.floor(Math.random() * 4)]);

    // update image function
    const updateImage = () => {
        if (headerImage == images[0]){
            setHeaderImage(images[1]);
        }else if(headerImage == images[1]) {
            setHeaderImage(images[2]);
        }else if(headerImage == images[2]) {
            setHeaderImage(images[3]);
        }else if(headerImage == images[3]) {
            setHeaderImage(images[0]);
        }
    };

    // update image interval
    useEffect(() => {
        // set interval
        let intervalId = setInterval(() => {
            updateImage();
        }, 10000);

        // clean up
        return () => {
            clearInterval(intervalId);
        };
    }, [headerImage]);

    return (
        <div className={styles.mainC}>

            {/* header  */}
            <div className={styles.headerC}>

                {/* header: hero section */}
                <div className={styles.heroSectionC}>

                    <h2 className={styles.headline}>
                        {textBuildHighConv}
                    </h2>

                    <p className={styles.subheadline}>
                        {textCreateBeautiful}
                    </p>

                    {/* features / value points */}
                    <div className={styles.featuresC}>
                        <div className={styles.feature}>
                            <h4>
                                <FontAwesomeIcon icon={faBrush} /> {textSimplePage}
                            </h4>
                        </div>
                        <div className={styles.feature}>
                            <h4>
                                <FontAwesomeIcon icon={faBoxOpen} /> {textReadyToSell}
                            </h4>
                        </div>
                        <div className={styles.feature}>
                            <h4>
                                <FontAwesomeIcon icon={faFire} /> {textNoUpfrontCost}
                            </h4>
                        </div>
                    </div>

                    {/* call to action */}
                    <Link href={route('home')} className={styles.cta}>
                        {textGetStarted} <FontAwesomeIcon icon={faPlay} />
                    </Link>
                </div>

                {/* header: side image */}
                <div className={styles.sideImageC}>
                    <div className={styles.imageC}>
                        <img src={headerImage} alt="side image" />
                    </div>
                </div>

            </div>

            {/* how does it work */}
            <div className={styles.howC}>

                {/* question */}
                <h2 className={styles.howQuestion}>{textHow}</h2>

                {/* responses */}
                <div className={styles.stepsC}>
                    <div className={styles.step}>
                        <FontAwesomeIcon icon={faFolderPlus} className={styles.stepIcon} />
                        <p>{textCreateProject}</p>
                    </div>
                    <div className={styles.step}>
                        <FontAwesomeIcon icon={faGear} className={styles.stepIcon} />
                        <p>{textSetupProject}</p>
                    </div>
                    <div className={styles.step}>
                        <FontAwesomeIcon icon={faBoxOpen} className={styles.stepIcon} />
                        <p>{textHandleOrders}</p>
                    </div>
                    <div className={styles.step}>
                        <FontAwesomeIcon icon={faChartLine} className={styles.stepIcon} />
                        <p>{textGetStats}</p>
                    </div>
                </div>

            </div>

            {/* simple page builder feature */}
            <div className={styles.featureSimpleC}>
                <div className={styles.featureSimple}>
                    <h4>
                        {textSimplePage}
                    </h4>
                    <p>{textDesignAndCustomize}</p>
                </div>
                <div className={styles.featureImageC}>
                    <div className={styles.imageC}>
                        <img src={conn_URL+"images/stats.png"} alt="feature image" />
                    </div>
                </div>
            </div>


            {/* ready to sell feature */}
            <div className={styles.featureReadyC}>

                {/* mobile text (shown on small screens, hidden on large) */}
                <div className={`${styles.featureReady} ${styles.featureReadyMobile}`}>
                    <h4>
                        {textReadyToSell}
                    </h4>
                    <p>{textAcceptOrders}</p>
                </div>

                {/* image */}
                <div className={styles.featureImageC}>
                    <div className={styles.imageC}>
                        <img src={conn_URL + "images/boxes.png"} alt="feature image" />
                    </div>
                </div>

                {/* desktop text (shown on large screens when beside image) */}
                <div className={`${styles.featureReady} ${styles.featureReadyDesktop}`}>
                    <h4>
                        {textReadyToSell}
                    </h4>
                    <p>{textAcceptOrders}</p>
                </div>
            </div>

            {/* no upfront cost feature */}
            <div className={styles.featureCostC}>
                <div className={styles.featureCost}>
                    <h4>
                        {textNoUpfrontCost}
                    </h4>
                    <p>{textStartFree}</p>
                </div>
                <div className={styles.featureImageC}>
                    <div className={styles.imageC}>
                        <img src={conn_URL + "images/pack.png"} alt="feature image" />
                    </div>
                </div>
            </div>

        </div>
    );
}

MainPage.layout = page => <MainPageLayout children={page} />

export default MainPage;

