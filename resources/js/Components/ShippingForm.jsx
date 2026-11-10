import { useForm } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useEffect } from "react";
import styles from "../../css/Components/ShippingForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faComputer, faHouse } from "@fortawesome/free-solid-svg-icons";

function ShippingForm({shipping, project}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textDesk = currentLanguage == 'en' ? 'Pick-Up Desk'
        : (currentLanguage == 'fr' ? 'Retrait au bureau' : 'التوصيل إلى المكتب');
    const textHome = currentLanguage == 'en' ? 'Home Delivery'
        : (currentLanguage == 'fr' ? 'Livraison à domicile' : 'التوصيل إلى المنزل');
    const textDeskHint = currentLanguage == 'en' ? 'Pick-Up Desk (DZD)'
        : (currentLanguage == 'fr' ? 'Retrait au bureau (DA)' : 'التوصيل إلى المكتب (د.ج)');
    const textHomeHint = currentLanguage == 'en' ? 'Home Delivery (DZD)'
        : (currentLanguage == 'fr' ? 'Livraison à domicile (DA)' : 'التوصيل إلى المنزل (د.ج)');
    const textEnabled = currentLanguage == 'en' ? 'Enabled'
        : (currentLanguage == 'fr' ? 'Activé' : 'مفعل');
    const textUpdate = currentLanguage == 'en' ? 'Update'
        : (currentLanguage == 'fr' ? 'Mettre à jour' : 'تحديث');

    const textRegion =
        currentLanguage == 'ar' ?
            shipping.region.id + "- "+ shipping.region.ar_name+ " - " + shipping.region.fg_name
            : shipping.region.id + "- "+ shipping.region.fg_name+ " - " + shipping.region.ar_name;

    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing} = useForm({
        desk: shipping.desk,
        home: shipping.home,
        enabled: shipping.enabled,
    });

    // update shipping function
    const update = (e, shippingId) => {
        e.preventDefault();
        post(route('shipping.update', {shipping: shippingId} ), {
            preserveScroll: true
        });
    }

    // set inputs on data change
    useEffect(() => {
        setData('desk', shipping.desk);
        setData('home', shipping.home);
    }, [shipping.desk, shipping.home]);

    return (
        <div className={styles.shippingC}>
            <div className={styles.shippingRegion}>
                {textRegion}
            </div>
            <form className={styles.shippingForm} onSubmit={(e) => update(e, shipping.id)}>
                <div className={styles.deskC}>
                    <label htmlFor="desk">
                        {textDesk} <FontAwesomeIcon icon={faComputer} />
                    </label>
                    <input type="text" name="desk" value={data.desk}
                        placeholder={textDeskHint} disabled={project.data.free_shipping}
                        onChange={(e) => setData('desk', e.target.value)}/>
                    {errors.desk && <p>{errors.desk}</p>}
                </div>
                <div className={styles.homeC}>
                    <label htmlFor="home">
                        {textHome} <FontAwesomeIcon icon={faHouse} />
                    </label>
                    <input type="text" name="home" value={data.home}
                        placeholder={textHomeHint}  disabled={project.data.free_shipping}
                        onChange={(e) => setData('home', e.target.value)}/>
                    {errors.home && <p>{errors.home}</p>}
                </div>

                <div className={styles.enabledC}>
                    <label htmlFor="enabled">
                        <input type="checkbox" name="enabled" checked={data.enabled}
                        onChange={(e) => setData('enabled', e.target.checked)} />
                        {textEnabled}
                    </label>
                </div>

                <div className={styles.updateBtnC}>
                    <button disabled={processing || !shippingChanged(data, shipping)}
                        className={styles.updateBtn}>
                        {textUpdate} <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                </div>

            </form>
        </div>
    );
}


function shippingChanged(data, shipping) {
    return (data.desk != shipping.desk
        || data.home != shipping.home
        || data.enabled != shipping.enabled);
}


export default ShippingForm;
