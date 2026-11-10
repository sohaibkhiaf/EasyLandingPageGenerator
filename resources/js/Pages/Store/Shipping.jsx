import StoreLayout  from "../../Layouts/StoreLayout.jsx";
import ShippingForm from "../../Components/ShippingForm.jsx";
import { Head, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Store/Shipping.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faFire, faTruckFast } from "@fortawesome/free-solid-svg-icons";

function Shipping({project, shippings}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textShipping = currentLanguage == 'en' ? 'Shipping'
        : (currentLanguage == 'fr' ? 'Livraison' : 'التوصيل');
    const textActFree = currentLanguage == 'en' ? 'Activate Free Shipping'
        : (currentLanguage == 'fr' ? 'Activer la livraison gratuite' : 'تفعيل التوصيل المجاني');
    const textActPaid = currentLanguage == 'en' ? 'Activate Paid Shipping'
        : (currentLanguage == 'fr' ? 'Activer la livraison payante' : 'تفعيل التوصيل المدفوع');
    const textActFreeConfirm = currentLanguage == 'en'
        ? 'Are you sure you want to activate free shipping?'
        : (currentLanguage == 'fr'
            ? 'Êtes-vous sûr de vouloir activer la livraison gratuite ?'
            : 'هل أنت متأكد من أنك تريد تفعيل التوصيل المجاني ؟');
    const textActPaidConfirm = currentLanguage == 'en'
        ? 'Are you sure you want to activate paid shipping?'
        : (currentLanguage == 'fr'
            ? 'Êtes-vous sûr de vouloir activer la livraison payante ?'
            : 'هل أنت متأكد من أنك تريد تفعيل التوصيل المدفوع ؟');

    // hooks initialization
    const {post} = useForm();
    const route = useRoute();

    // activate free shipping
    const activate = (e, projectId) => {
        e.preventDefault();
        if (window.confirm(textActFreeConfirm)){
            post(route('shipping.free', {project: projectId}));
        }
    };

    // unactivate free shipping
    const unactivate = (e, projectId) => {
        e.preventDefault();
        if (window.confirm(textActPaidConfirm)){
            post(route('shipping.paid', {project: projectId}));
        }
    };

    return (
        <div className={styles.shippingC}>

            <Head title={textShipping}/>

            <h2 className={styles.shippingHeader}>
                {textShipping} <FontAwesomeIcon icon={faTruckFast} />
            </h2>

            <div className={styles.shippingPayementC}>
                {project.data.free_shipping ?
                (<button className={styles.paidBtn}
                    onClick={(e) => unactivate(e, project.data.id)}>
                        {textActPaid} <FontAwesomeIcon icon={faCoins} />
                    </button>
                )
                :
                (<button className={styles.freeBtn}
                    onClick={(e) => activate(e, project.data.id)}>
                        {textActFree} <FontAwesomeIcon icon={faFire} />
                    </button>
                )}
            </div>

            <div className={styles.shippingsC}>
                {shippings.data.map((shipping)=> (
                    <ShippingForm key={shipping.id} shipping={shipping} project={project}/>
                ))}
            </div>

        </div>
    );
}

Shipping.layout = page => <StoreLayout tab="shipping" children={page} />

export default Shipping;
