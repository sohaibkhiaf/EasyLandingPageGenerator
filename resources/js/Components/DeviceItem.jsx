import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faClock, faDisplay, faGlobe, } from "@fortawesome/free-solid-svg-icons";
import styles from "../../css/Components/DeviceItem.module.css";


function DeviceItem({device}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    const textOn = currentLanguage == 'en' ? 'on'
        : (currentLanguage == 'fr' ? 'sur' : 'على');

    return (
        <div className={styles.deviceC}>
            <p className={styles.platform}>
                <FontAwesomeIcon icon={faDisplay}/> {device.browser} {textOn} {device.platform} {device.is_current ?
                <><FontAwesomeIcon className={styles.currentDeviceIcon} icon={faCircle} /></>
                :<></> }
            </p>
            <p className={styles.ip}><FontAwesomeIcon icon={faGlobe}/> {device.ip}</p>
            <p className={styles.lastActivity}>
                <FontAwesomeIcon icon={faClock}/> {device.last_activity}
            </p>
        </div>
    );
}

export default DeviceItem;

