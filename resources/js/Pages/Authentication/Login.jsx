import { Head, Link, useForm } from "@inertiajs/react";
import {useRoute} from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Authentication/Login.module.css";
import AuthenticationLayout from "../../Layouts/AuthenticationLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";


function Login() {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textLogin = currentLanguage == 'en' ? 'Login'
        : (currentLanguage == 'fr' ? 'Se connecter' : 'تسجيل الدخول');
    const textEmail = currentLanguage == 'en' ? 'Email'
        : (currentLanguage == 'fr' ? 'E-mail' : 'البريد الإلكتروني');
    const textPassword = currentLanguage == 'en' ? 'Password'
        : (currentLanguage == 'fr' ? 'Mot de passe' : 'كلمة المرور');
    const textRegister = currentLanguage == 'en' ? 'Register'
        : (currentLanguage == 'fr' ? 'S’inscrire' : 'إنشاء حساب');
    const textDontHaveAcc = currentLanguage == 'en' ? 'Don’t have an Account ?'
        : (currentLanguage == 'fr' ? 'Tu n’as pas de compte ?' : 'ليس لديك حساب؟');
    const textRemember = currentLanguage == 'en' ? 'Remember me'
        : (currentLanguage == 'fr' ? 'Se souvenir de moi' : 'تذكرني');
    const textEmailHint = currentLanguage == 'en' ? 'Your email address'
        : (currentLanguage == 'fr' ? 'Votre adresse e-mail' : 'عنوان بريدك الإلكتروني');
    const textPasswordHint = currentLanguage == 'en' ? 'Password'
        : (currentLanguage == 'fr' ? 'Mot de passe' : 'كلمة المرور');


    // hooks initialization
    const route = useRoute();
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // login function
    const login = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
        <Head title={textLogin}/>

        <div className={styles.loginC}>

            <h2 className={styles.loginHeader}>
                {textLogin} <FontAwesomeIcon icon={faRightToBracket} />
            </h2>

            <form className={styles.loginForm} onSubmit={login}>

                <div className={styles.emailC}>
                    <label htmlFor="email">
                        {textEmail} <FontAwesomeIcon icon={faEnvelope} />
                    </label>
                    <input type="email" name="email" placeholder={textEmailHint} value={data.email}
                        onChange={(e) => setData('email', e.target.value)}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div className={styles.passwordC}>
                    <label htmlFor="password">
                        {textPassword} <FontAwesomeIcon icon={faLock} />
                    </label>
                    <input type="password" name="password" placeholder={textPasswordHint}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}/>
                    {errors.password && <p>{errors.password}</p>}
                </div>

                <div className={styles.rememberC}>
                    <input type="checkbox" name="remember" checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)} />
                    <span>{textRemember}</span>
                </div>

                <div className={styles.loginBtnC}>
                    <button className={styles.loginBtn} disabled={processing}>{textLogin}</button>
                </div>

                <div className={styles.registerLinkC}>
                    {textDontHaveAcc} <Link className={styles.registerLink}
                        href={route('register')}>{textRegister}</Link>
                </div>

            </form>
        </div>
        </>

    );
}


Login.layout = page => <AuthenticationLayout children={page} />

export default Login;

