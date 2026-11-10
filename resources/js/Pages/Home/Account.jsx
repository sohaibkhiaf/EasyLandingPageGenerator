import { Head, useForm, usePage } from "@inertiajs/react";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Home/Account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faEnvelope, faLocationDot, faMap, faMobileButton, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";


function Account ({regions}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textFirstName = currentLanguage == 'en' ? 'First name'
        : (currentLanguage == 'fr' ? 'Prénom' : 'الإسم');
    const textLastName = currentLanguage == 'en' ? 'Last name'
        : (currentLanguage == 'fr' ? 'Nom' : 'اللقب');
    const textEmail = currentLanguage == 'en' ? 'Email'
        : (currentLanguage == 'fr' ? 'E-mail' : 'البريد الإلكتروني');
    const textPhone = currentLanguage == 'en' ? 'Mobile phone number'
        : (currentLanguage == 'fr' ? 'Numéro de téléphone' : 'رقم الهاتف');
    const textAddress = currentLanguage == 'en' ? 'Address'
        : (currentLanguage == 'fr' ? 'Adresse' : 'العنوان');
    const textRegion = currentLanguage == 'en' ? 'Region'
        : (currentLanguage == 'fr' ? 'Région' : 'الولاية');
    const textSelectRegion = currentLanguage == 'en' ? 'Select region'
        : (currentLanguage == 'fr' ? 'Sélectionner la région' : 'حدد الولاية');
    const textAccount = currentLanguage == 'en' ? 'Account'
        : (currentLanguage == 'fr' ? 'Compte' : 'الحساب');
    const textUpdateInfo = currentLanguage == 'en' ? 'Update information'
        : (currentLanguage == 'fr' ? 'Mettre à jour les informations' : 'تحديث البيانات الشخصية');
    const textAccountInfo = currentLanguage == 'en' ? 'Account information'
        : (currentLanguage == 'fr' ? 'Informations du compte' : 'معلومات الحساب');
    const textFirstNameHint = currentLanguage == 'en' ? 'First Name'
        : (currentLanguage == 'fr' ? 'Prénom' : 'الإسم الشخصي');
    const textLastNameHint = currentLanguage == 'en' ? 'Last Name'
        : (currentLanguage == 'fr' ? 'Nom de famille' : 'الإسم العائلي');
    const textEmailHint = currentLanguage == 'en' ? 'Your email address'
        : (currentLanguage == 'fr' ? 'Votre adresse e-mail' : 'عنوان بريدك الإلكتروني');
    const textPhoneHint = currentLanguage == 'en' ? 'Your mobile phone number'
        : (currentLanguage == 'fr' ? 'Votre numéro de téléphone mobile' : 'رقم هاتفك المحمول');
    const textAddressHint = currentLanguage == 'en' ? 'Your address'
        : (currentLanguage == 'fr' ? 'Votre adresse' : 'عنوانك الشخصي');

    // hooks initialization
    const {auth} = usePage().props;
    const route = useRoute();
    const {data, setData, post, errors, processing} = useForm({
        email: auth.user.email,
        first_name: auth.user.firstName,
        last_name: auth.user.lastName,
        phone: auth.user.phone,
        address: auth.user.address,
        region_id: auth.user.region_id,
    });

    // update information changes function
    const updateInformation = (e) => {
        e.preventDefault();
        post(route('account.update'));
    }

    return (
        <div className={styles.accountC}>

            <Head title={textAccount}/>

            <h2 className={styles.accountHeader}>
                {textAccount} <FontAwesomeIcon icon={faUserTie} />
            </h2>

            <h4 className={styles.accountInfoHeader}>{textAccountInfo}</h4>

            <form className={styles.accountInfoForm} onSubmit={updateInformation}>

                <div className={styles.doubleFieldC}>
                    <div className={styles.firstNameC}>
                        <label htmlFor="first_name">
                            {textFirstName} <FontAwesomeIcon icon={faUser} />
                        </label>
                        <input type="text" name="first_name" value={data.first_name}
                            placeholder={textFirstNameHint}
                            onChange={(e) => setData('first_name', e.target.value)}/>
                        {errors.first_name && <p>{errors.first_name}</p>}
                    </div>

                    <div className={styles.lastNameC}>
                        <label htmlFor="last_name">
                            {textLastName} <FontAwesomeIcon icon={faUser} />
                        </label>
                        <input type="text" name="last_name" value={data.last_name}
                            placeholder={textLastNameHint}
                            onChange={(e) => setData('last_name', e.target.value)}/>
                        {errors.last_name && <p>{errors.last_name}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.addressC}>
                        <label htmlFor="address">
                            {textAddress}  <FontAwesomeIcon icon={faLocationDot} />
                        </label>
                        <input type="phone" name="phone" placeholder={textAddressHint} value={data.address}
                            onChange={(e) => setData('address', e.target.value)}/>
                        {errors.address && <p>{errors.address}</p>}
                    </div>

                    <div className={styles.regionC}>
                        <label htmlFor="region">
                            {textRegion} <FontAwesomeIcon icon={faMap} />
                        </label>
                        <select name="region" value={data.region_id}
                            onChange={(e) => setData('region_id', e.target.value)}>
                            <option>{textSelectRegion}</option>
                            {regions.data.map((region) => (
                                <option key={region.id} value={region.id}>
                                    {region.fg_name} - {region.ar_name}
                                </option>
                            ))}
                        </select>
                        {errors.region_id && <p>{errors.region_id}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.emailC}>
                        <label htmlFor="email" className={styles.emailLabel}>
                            {textEmail} <FontAwesomeIcon icon={faEnvelope} />
                        </label>
                        <input className={styles.emailInput} type="email" name="email" value={data.email}
                            placeholder={textEmailHint} onChange={(e) => setData('email', e.target.value)}/>
                        {errors.email && <p className={styles.emailError}>{errors.email}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.phoneC}>
                        <label className={styles.phoneLabel} htmlFor="phone">
                            {textPhone} <FontAwesomeIcon icon={faMobileButton} />
                        </label>
                        <input type="phone" name="phone" value={data.phone}
                            placeholder={textPhoneHint} className={styles.phoneInput}
                            onChange={(e) => setData('phone', e.target.value)} />
                        {errors.phone && <p className={styles.phoneError}>{errors.phone}</p>}
                    </div>
                </div>

                <div className={styles.updateBtnC}>
                    <button className={styles.updateBtn}
                        disabled={processing || !accountInfoChanged(data, auth)}>
                        {textUpdateInfo} <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                </div>

            </form>

        </div>
    );
}

function accountInfoChanged(data, auth) {
    return (data.first_name != auth.user.firstName
        || data.last_name != auth.user.lastName
        || data.email != auth.user.email
        || data.phone != auth.user.phone
        || data.address != auth.user.address
        || data.region_id != auth.user.region_id);
}

Account.layout = page => <HomeLayout tab="account" children={page}/>

export default Account;
