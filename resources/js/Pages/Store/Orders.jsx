import { Head, Link } from "@inertiajs/react";
import StoreLayout  from "../../Layouts/StoreLayout";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import OrderForm2 from "../../Components/OrderForm2";
import styles from "../../../css/Store/Orders.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faBoxOpen, faCircleExclamation, faClock, faGears, faRotateLeft, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../Components/Navigation";

function Orders({project, orders, statuses, status}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize order status icon + text considering preferred language
    let textOrders;
    let statusIcon;

    switch (status.data.id) {

        case 1:
            textOrders = currentLanguage == 'en' ? 'Pending Orders'
                : (currentLanguage == 'fr' ? 'Commandes en attente' : 'الطلبيات قيد الإنتظار');
            statusIcon = <FontAwesomeIcon icon={faClock} />
            break;

        case 2:
            textOrders = currentLanguage == 'en' ? 'Processing Orders'
                : (currentLanguage == 'fr' ? 'Commandes en cours de traitement' : 'الطلبيات قيد المعالجة');
            statusIcon = <FontAwesomeIcon icon={faGears} />
            break;

        case 3:
            textOrders = currentLanguage == 'en' ? 'Delivering Orders'
                : (currentLanguage == 'fr' ? 'Commandes en cours de livraison' : 'الطلبيات قيد الإرسال');
            statusIcon = <FontAwesomeIcon icon={faTruckFast} />
            break;

        case 4:
            textOrders = currentLanguage == 'en' ? 'Delivered Orders'
                : (currentLanguage == 'fr' ? 'Commandes livrées' : 'الطلبيات التي تم تسليمها');
            statusIcon = <FontAwesomeIcon icon={faBoxOpen} />
            break;

        case 5:
            textOrders = currentLanguage == 'en' ? 'Canceled Orders'
                : (currentLanguage == 'fr' ? 'Commandes annulées' : 'الطلبيات التي تم إلغاؤها');
            statusIcon = <FontAwesomeIcon icon={faBan} />
            break;

        case 6:
            textOrders = currentLanguage == 'en' ? 'Returned Orders'
                : (currentLanguage == 'fr' ? 'Commandes retournées' : 'الطلبيات التي تم إرجاعها');
            statusIcon = <FontAwesomeIcon icon={faRotateLeft} />
            break;

        default:
            break;
    }

    const textNoOrders = currentLanguage == 'en' ? 'No orders to show'
        : (currentLanguage == 'fr' ? 'Aucune commande à afficher' : 'لا توجد طلبيات لعرضها');

    // hooks initialization
    const route = useRoute();

    // selected status style
    const selectedStatusStyle = {
        backgroundColor: "var(--hover-color)",
        color: "var(--dark-black)",
    }

    return (
        <div className={styles.ordersC}>

            <Head title={textOrders}/>

            <h2 className={styles.ordersHeader}>
                {textOrders} {statusIcon}
            </h2>

            {/* status navigation  */}
            <ul className={styles.statusesList}>
                {statuses.data.map((s) => (
                    <li key={s.id} className={styles.statusListItem}>
                        <Link href={route('store.orders', {project: project.data.id ,status : s.id})}
                            style={status.data.id == s.id ? selectedStatusStyle : {}}
                            className={styles.statusLink}>
                            { currentLanguage == 'en' ? s.en_message
                                : (currentLanguage == 'fr' ? s.fr_message
                                : s.ar_message ) }
                        </Link>
                    </li>)
                )}
            </ul>

            {/* orders */}
            <div className={styles.handleOrdersC}>
                {orders.data.length >0 ?
                orders.data.map((order) => (
                    <OrderForm2 order={order} statuses={statuses} key={order.id} />
                ))
                :
                (<p className={styles.noOrdersMsg}>
                    <FontAwesomeIcon icon={faCircleExclamation} /> {textNoOrders}
                </p>)}
            </div>

            {/* orders navigation  */}
            {orders.data.length >0 ?
            (<Navigation links={orders.meta.links} current={orders.meta.current_page} />)
            :
            (<></>) }

        </div>
    );
}

Orders.layout = page => <StoreLayout tab="orders" children={page} />

export default Orders;

