import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Authentication/Register.module.css";
import AuthenticationLayout from "../../Layouts/AuthenticationLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFolderPlus, faLocationDot, faLock, faMap, faMobileButton, faUser } from "@fortawesome/free-solid-svg-icons";


function Register({regions}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textFirstName = currentLanguage == 'en' ? 'First Name'
        : (currentLanguage == 'fr' ? 'Prénom' : 'الإسم');
    const textLastName = currentLanguage == 'en' ? 'Last Name'
        : (currentLanguage == 'fr' ? 'Nom' : 'اللقب');
    const textEmail = currentLanguage == 'en' ? 'Email'
        : (currentLanguage == 'fr' ? 'E-mail' : 'البريد الإلكتروني');
    const textPassword = currentLanguage == 'en' ? 'Password'
        : (currentLanguage == 'fr' ? 'Mot de passe' : 'كلمة المرور');
    const textConfirmPassword = currentLanguage == 'en' ? 'Confirm Password'
        : (currentLanguage == 'fr' ? 'Confirmer le mot de passe' : 'تأكيد كلمة المرور');
    const textPhone = currentLanguage == 'en' ? 'Phone Number'
        : (currentLanguage == 'fr' ? 'Numéro de téléphone' : 'رقم الهاتف');
    const textAddress = currentLanguage == 'en' ? 'Address'
        : (currentLanguage == 'fr' ? 'Adresse' : 'العنوان');
    const textRegion = currentLanguage == 'en' ? 'Region'
        : (currentLanguage == 'fr' ? 'Région' : 'الولاية');
    const textSelectRegion = currentLanguage == 'en' ? 'Select Region'
        : (currentLanguage == 'fr' ? 'Sélectionner la région' : 'حدد الولاية');
    const textRegister = currentLanguage == 'en' ? 'Register'
        : (currentLanguage == 'fr' ? 'S’inscrire' : 'إنشاء حساب');
    const textRegisterAction = currentLanguage == 'en' ? 'Register'
        : (currentLanguage == 'fr' ? 'S’inscrire' : 'إنشاء');
    const textRemember = currentLanguage == 'en' ? 'Remember me'
        : (currentLanguage == 'fr' ? 'Se souvenir de moi' : 'تذكرني');
    const textAlreadyHaveAcc = currentLanguage == 'en' ? 'Already have an account ?'
        : (currentLanguage == 'fr' ? 'Vous avez déjà un compte ?' : 'لديك حساب بالفعل؟');
    const textLogin = currentLanguage == 'en' ? 'Login'
        : (currentLanguage == 'fr' ? 'Se connecter' : 'تسجيل الدخول');
    const textFirstNameHint = currentLanguage == 'en' ? 'First Name'
        : (currentLanguage == 'fr' ? 'Prénom' : 'الإسم الشخصي');
    const textLastNameHint = currentLanguage == 'en' ? 'Last Name'
        : (currentLanguage == 'fr' ? 'Nom de famille' : 'الإسم العائلي');
    const textEmailHint = currentLanguage == 'en' ? 'Your email address'
        : (currentLanguage == 'fr' ? 'Votre adresse e-mail' : 'عنوان بريدك الإلكتروني');
    const textPasswordHint = currentLanguage == 'en' ? 'Strong password'
        : (currentLanguage == 'fr' ? 'Mot de passe fort' : 'كلمة مرور قوية');
    const textPhoneHint = currentLanguage == 'en' ? 'Your mobile phone number'
        : (currentLanguage == 'fr' ? 'Votre numéro de téléphone mobile' : 'رقم هاتفك المحمول');
    const textConfirmPasswordHint = currentLanguage == 'en' ? 'Confirm your password'
        : (currentLanguage == 'fr' ? 'Confirmez votre mot de passe' : 'تأكيد كلمة مرورك');
    const textAddressHint = currentLanguage == 'en' ? 'Your address'
        : (currentLanguage == 'fr' ? 'Votre adresse' : 'عنوانك الشخصي');


    // hooks initialization
    const route = useRoute();
    const {data, setData, post, processing, errors, reset} = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        region_id: '',
        password: '',
        password_confirmation: '',
    });

    // register function
    const register = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
        <Head title={textRegister}/>

        <div className={styles.registerC}>

            <h2 className={styles.registerHeader}>
                {textRegister} <FontAwesomeIcon icon={faFolderPlus} />
            </h2>

            <form className={styles.registerForm} onSubmit={register}>

                <div className={styles.doubleFieldC}>

                    <div className={styles.firstNameC}>
                        <label htmlFor="first_name">
                            {textFirstName} <FontAwesomeIcon icon={faUser} />
                        </label>
                        <input type="text" name="first_name" placeholder={textFirstNameHint}
                            value={data.first_name} onChange={(e) => setData('first_name', e.target.value)}/>
                        {errors.first_name && <p>{errors.first_name}</p>}
                    </div>
                    <div className={styles.lastNameC}>
                        <label htmlFor="last_name">
                            {textLastName} <FontAwesomeIcon icon={faUser} />
                        </label>
                        <input type="text" name="last_name" placeholder={textLastNameHint}
                            value={data.last_name} onChange={(e) => setData('last_name', e.target.value)}/>
                        {errors.last_name && <p>{errors.last_name}</p>}
                    </div>

                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.emailC}>
                        <label htmlFor="email">
                            {textEmail} <FontAwesomeIcon icon={faEnvelope} />
                        </label>
                        <input type="email" name="email" placeholder={textEmailHint} value={data.email}
                            onChange={(e) => setData('email', e.target.value)}/>
                        {errors.email && <p>{errors.email}</p>}
                    </div>

                    <div className={styles.phoneC}>
                        <label htmlFor="phone">
                            {textPhone} <FontAwesomeIcon icon={faMobileButton} />
                        </label>
                        <input type="phone" name="phone" placeholder={textPhoneHint} value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}/>
                        {errors.phone && <p>{errors.phone}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.addressC}>
                        <label htmlFor="address">{textAddress}  <FontAwesomeIcon icon={faLocationDot} /></label>
                        <input type="phone" name="phone" placeholder={textAddressHint} value={data.address}
                            onChange={(e) => setData('address', e.target.value)}/>
                        {errors.address && <p>{errors.address}</p>}
                    </div>

                    <div className={styles.regionC}>
                        <label htmlFor="region">{textRegion} <FontAwesomeIcon icon={faMap} /></label>
                        <select name="region" value={data.region_id}
                            onChange={(e) => setData('region_id', e.target.value)}>
                            <option>{textSelectRegion}</option>
                            {regions.map((region) => (
                                <option key={region.id} value={region.id}>
                                    {region.fg_name} - {region.ar_name}
                                </option>
                            ))}
                        </select>
                        {errors.region_id && <p>{errors.region_id}</p>}
                    </div>
                </div>

                <div className={styles.passwordC}>
                    <label htmlFor="password">{textPassword} <FontAwesomeIcon icon={faLock} /></label>
                    <input type="password" name="password" placeholder={textPasswordHint} value={data.password}
                        onChange={(e) => setData('password', e.target.value)}/>
                    {errors.password && <p>{errors.password}</p>}
                </div>

                <div className={styles.passwordConfirmationC}>
                    <label htmlFor="password_confirmation">{textConfirmPassword} <FontAwesomeIcon icon={faLock} /></label>
                    <input type="password" name="password_confirmation" placeholder={textConfirmPasswordHint}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}/>
                    {errors.password_confirmation && <p>{errors.password_confirmation}</p>}
                </div>

                <div className={styles.rememberC}>
                    <label htmlFor="remember">
                        <input type="checkbox" name="remember" checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)} />
                        {textRemember}
                    </label>
                </div>

                <div className={styles.registerBtnC}>
                    <button className={styles.registerBtn} disabled={processing}>{textRegisterAction}</button>
                </div>

                <div className={styles.loginLinkC}>
                    {textAlreadyHaveAcc} <Link className={styles.loginLink} href={route('login')}>{textLogin}</Link>
                </div>

            </form>
        </div>
        </>

    );
}

Register.layout = page => <AuthenticationLayout children={page} />

export default Register;

