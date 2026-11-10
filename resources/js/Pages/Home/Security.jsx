import { Head, useForm, usePage } from "@inertiajs/react";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Home/Security.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faLock, faRightFromBracket, faShield } from "@fortawesome/free-solid-svg-icons";
import DeviceItem from "../../Components/DeviceItem.jsx";

function Security ({devices}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textSecurity = currentLanguage == 'en' ? 'Security'
        : (currentLanguage == 'fr' ? 'Sécurité' : 'الأمان');
    const textPassword = currentLanguage == 'en' ? 'Password'
        : (currentLanguage == 'fr' ? 'Mot de passe' : 'كلمة المرور');
    const textCurrentPassword = currentLanguage == 'en' ? 'Current password'
        : (currentLanguage == 'fr' ? 'Mot de passe actuel' : 'كلمة المرور الحالية');
    const textNewPassword = currentLanguage == 'en' ? 'New password'
        : (currentLanguage == 'fr' ? 'Nouveau mot de passe' : 'كلمة المرور الجديدة');
    const textConfirmPassword = currentLanguage == 'en' ? 'Confirm password'
        : (currentLanguage == 'fr' ? 'Confirmer le mot de passe' : 'تأكيد كلمة المرور الجديدة');
    const textUpdate = currentLanguage == 'en' ? 'Update'
        : (currentLanguage == 'fr' ? 'Mettre à jour' : 'تحديث');
    const textYourDevices = currentLanguage == 'en' ? 'Your devices'
        : (currentLanguage == 'fr' ? 'Vos appareils' : 'الأجهزة المتصلة');
    const textLogOutOther = currentLanguage == 'en' ? 'Log out other devices'
        : (currentLanguage == 'fr' ? 'Déconnecter les autres appareils' : 'تسجيل الخروج من الأجهزة الأخرى');
    const textNewPasswordHint = currentLanguage == 'en' ? 'Strong password'
        : (currentLanguage == 'fr' ? 'Mot de passe fort' : 'كلمة مرور قوية');
    const textConfirmPasswordHint = currentLanguage == 'en' ? 'Confirm your password'
        : (currentLanguage == 'fr' ? 'Confirmez votre mot de passe' : 'تأكيد كلمة مرورك');
    const textCurrentPasswordHint = currentLanguage == 'en' ? 'Your current password'
        : (currentLanguage == 'fr' ? 'Votre mot de passe actuel' : 'كلمة مرورك الحالية');

    // styles considering direction
    let logOutBtnStyle = {};
    if (currentLanguage == 'ar'){
        logOutBtnStyle = {
            left: "0",
        }
    }else {
        logOutBtnStyle = {
            right: "0",
        }
    }

    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing} = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // change password function
    const changePassword = (e) => {
        e.preventDefault();
        post(route('security.password'));
    }

    // logout devices function
    const logoutDevices = (e) => {
        e.preventDefault();
        post(route('security.session'));
    }

    return (
        <div className={styles.securityC}>

            <Head title={textSecurity}/>

            <h2 className={styles.securityHeader}>
                {textSecurity} <FontAwesomeIcon icon={faShield} />
            </h2>

            <h4 className={styles.passwordHeader}>{textPassword}</h4>

            <form className={styles.passwordForm} onSubmit={changePassword}>

                <div className={styles.doubleFieldC}>
                    <div className={styles.currentPasswordC}>
                        <label htmlFor="current_password">
                            {textCurrentPassword} <FontAwesomeIcon icon={faLock} />
                        </label>
                        <input type="password" name="current_password"
                            value={data.current_password} placeholder={textCurrentPasswordHint}
                            onChange={(e) => setData('current_password', e.target.value)} />
                        {errors.current_password && <p>{errors.current_password}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.passwordC}>
                        <label htmlFor="password">
                            {textNewPassword} <FontAwesomeIcon icon={faLock} />
                        </label>
                        <input type="password" name="password"
                            value={data.password} placeholder={textNewPasswordHint}
                            onChange={(e) => setData('password', e.target.value)} />
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.passwordConfirmationC}>
                        <label htmlFor="password_confirmation">
                            {textConfirmPassword} <FontAwesomeIcon icon={faLock} />
                        </label>
                        <input type="password" name="password_confirmation"
                            value={data.password_confirmation} placeholder={textConfirmPasswordHint}
                            onChange={(e) => setData('password_confirmation', e.target.value)} />
                        {errors.password_confirmation && <p>{errors.password_confirmation}</p>}
                    </div>
                </div>

                <div className={styles.changePasswordBtnC}>
                    <button className={styles.changePasswordBtn}
                        disabled={processing}>{textUpdate} <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                </div>

            </form>

            <h4 className={styles.devicesHeader}>{textYourDevices}</h4>
            <div className={styles.devicesC}>
                <div className={styles.yourDevices}>
                    {devices.map((device, index) => (
                        <DeviceItem device={device} key={index}/>
                    ))}
                </div>
                <button className={styles.logOutBtn} disabled={processing || devices.length <= 1}
                    onClick={logoutDevices} style={logOutBtnStyle}>
                    {textLogOutOther} <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </div>

        </div>
    );
}

Security.layout = page => <HomeLayout tab="security" children={page}/>

export default Security;
