import { Head, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import ProjectLayout  from "../../Layouts/ProjectLayout";
import styles from "../../../css/Project/Theme.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faBrush, faEnvelope, faMobileButton } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

function Theme({theme}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textTheme = currentLanguage == 'en' ? 'Theme'
        : (currentLanguage == 'fr' ? 'Thème' : 'الشكل');
    const textLightColor = currentLanguage == 'en' ? 'Light color'
        : (currentLanguage == 'fr' ? 'Couleur claire' : 'اللون الفاتح');
    const textDarkColor = currentLanguage == 'en' ? 'Dark color'
        : (currentLanguage == 'fr' ? 'Couleur sombre' : 'اللون الداكن');
    const textBodyColor = currentLanguage == 'en' ? 'Body color'
        : (currentLanguage == 'fr' ? 'Couleur du corps' : 'لون الهيكل');
    const textBackgroundColor = currentLanguage == 'en' ? 'Background color'
        : (currentLanguage == 'fr' ? 'Couleur de fond' : 'لون الخلفية');
    const textActionColor = currentLanguage == 'en' ? 'Action color'
        : (currentLanguage == 'fr' ? 'Couleur d’action' : 'لون الإجراء');
    const textActionHoverColor = currentLanguage == 'en' ? 'Action hover color'
        : (currentLanguage == 'fr' ? 'Couleur d’action au survol' : 'لون الإجراء عند التمرير');
    const textFacebookLink = currentLanguage == 'en' ? 'Facebook link'
        : (currentLanguage == 'fr' ? 'Lien Facebook' : 'رابط فيسبوك');
    const textInstagramLink = currentLanguage == 'en' ? 'Instagram link'
        : (currentLanguage == 'fr' ? 'Lien Instagram' : 'رابط إنستغرام');
    const textTiktokLink = currentLanguage == 'en' ? 'Tiktok link'
        : (currentLanguage == 'fr' ? 'Lien TikTok' : 'رابط تيكتوك');
    const textContactEmail = currentLanguage == 'en' ? 'Contact email'
        : (currentLanguage == 'fr' ? 'E-mail de contact' : 'إيمايل الإتصال');
    const textContactPhone = currentLanguage == 'en' ? 'Contact phone'
        : (currentLanguage == 'fr' ? 'Téléphone de contact' : 'رقم هاتف الإتصال');
    const textColors = currentLanguage == 'en' ? 'Colors'
        : (currentLanguage == 'fr' ? 'Couleurs' : 'الألوان');
    const textLinks = currentLanguage == 'en' ? 'Links'
        : (currentLanguage == 'fr' ? 'Liens' : 'الروابط');
    const textContactInfo = currentLanguage == 'en' ? 'Contact information'
        : (currentLanguage == 'fr' ? 'Informations de contact' : 'معلومات الإتصال');
    const textUpdate = currentLanguage == 'en' ? 'Update'
        : (currentLanguage == 'fr' ? 'Mettre à jour' : 'تحديث');
    const textColorCodeHint = currentLanguage == 'en' ? 'Color hex code'
            : (currentLanguage == 'fr' ? 'Code hexadécimal de couleur' : 'كود اللون');
    const textFacebookLinkHint = currentLanguage == 'en' ? 'Facebook link'
        : (currentLanguage == 'fr' ? 'Lien Facebook' : 'رابط فيسبوك');
    const textInstagramLinkHint = currentLanguage == 'en' ? 'Instagram link'
        : (currentLanguage == 'fr' ? 'Lien Instagram' : 'رابط إنستغرام');
    const textTiktokLinkHint = currentLanguage == 'en' ? 'Tiktok link'
        : (currentLanguage == 'fr' ? 'Lien TikTok' : 'رابط تيكتوك');
    const textContactEmailHint = currentLanguage == 'en' ? 'Contact email'
        : (currentLanguage == 'fr' ? 'E-mail de contact' : 'إيمايل الإتصال');
    const textContactPhoneHint = currentLanguage == 'en' ? 'Contact phone'
        : (currentLanguage == 'fr' ? 'Téléphone de contact' : 'رقم هاتف الإتصال');
    
    // styles considering direction
    let colorPickerStyle = {};
    if (currentLanguage == 'ar'){
        colorPickerStyle = {
            left: "8px",
        };
    }else {
        colorPickerStyle = {
            right: "8px",
        };
    }

    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing} = useForm({
        light_color: theme.data.light_color,
        dark_color: theme.data.dark_color,
        body_color: theme.data.body_color,
        background_color: theme.data.background_color,
        action_color: theme.data.action_color,
        action_hover_color: theme.data.action_hover_color,

        facebook_link: theme.data.facebook_link,
        instagram_link: theme.data.instagram_link,
        tiktok_link: theme.data.tiktok_link,
        contact_email: theme.data.contact_email,
        contact_phone: theme.data.contact_phone,
    });

    // update theme function
    const update = (e, themeId) => {
        e.preventDefault();
        post(route('theme.update', {theme: themeId}));
    };

    return (
        <div className={styles.themeC}>

            <Head title={textTheme}/>

            <h2 className={styles.themeHeader}>
                {textTheme} <FontAwesomeIcon icon={faBrush} />
            </h2>

            <form className={styles.themeForm} onSubmit={(e) => update(e, theme.data.id)}>

                <h4 className={styles.colorsHeader}>{textColors}</h4>

                <div className={styles.doubleFieldC}>
                    <div className={styles.lightColorC}>
                        <label htmlFor="light_color">{textLightColor}</label>
                        <input type="text" name="light_color" placeholder={textColorCodeHint}
                            value={data.light_color}
                            onChange={e => setData('light_color', e.target.value)}/>
                        <input type="color"  value={data.light_color}
                            onChange={(e) => setData('light_color', e.target.value)}
                            style={colorPickerStyle}/>
                        {errors.light_color && <p>{errors.light_color}</p>}
                    </div>

                    <div className={styles.darkColorC}>
                        <label htmlFor="dark_color">{textDarkColor}</label>
                        <input type="text" name="dark_color" placeholder={textColorCodeHint}
                            onChange={e => setData('dark_color', e.target.value)}
                            value={data.dark_color} />
                        <input type="color"  value={data.dark_color}
                            onChange={(e) => setData('dark_color', e.target.value)}
                            style={colorPickerStyle} />
                        {errors.dark_color && <p>{errors.dark_color}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.bodyColorC}>
                        <label htmlFor="body_color">{textBodyColor}</label>
                        <input type="text" name="body_color" placeholder={textColorCodeHint}
                            onChange={e => setData('body_color', e.target.value)}
                            value={data.body_color} />
                        <input type="color" value={data.body_color}
                            onChange={(e) => setData('body_color', e.target.value)}
                            style={colorPickerStyle} />
                        {errors.body_color && <p>{errors.body_color}</p>}
                    </div>

                    <div className={styles.backgroundColorC}>
                        <label htmlFor="background_color">{textBackgroundColor}</label>
                        <input type="text" name="background_color" placeholder={textColorCodeHint}
                            onChange={e => setData('background_color', e.target.value)}
                            value={data.background_color} />
                        <input type="color" value={data.background_color}
                            onChange={(e) => setData('background_color', e.target.value)}
                            style={colorPickerStyle} />
                        {errors.background_color && <p>{errors.background_color}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.actionColorC}>
                        <label htmlFor="action_color">{textActionColor}</label>
                        <input type="text" name="action_color" placeholder={textColorCodeHint}
                            onChange={e => setData('action_color', e.target.value)}
                            value={data.action_color} />
                        <input type="color"  value={data.action_color}
                            onChange={(e) => setData('action_color', e.target.value)}
                            style={colorPickerStyle} />
                        {errors.action_color && <p>{errors.action_color}</p>}
                    </div>

                    <div className={styles.actionHoverColorC}>
                        <label htmlFor="action_hover_color">{textActionHoverColor}</label>
                        <input type="text" name="action_hover_color" placeholder={textColorCodeHint}
                            onChange={e => setData('action_hover_color', e.target.value)}
                            value={data.action_hover_color} />
                        <input type="color"  value={data.action_hover_color}
                            onChange={(e) => setData('action_hover_color', e.target.value)}
                            style={colorPickerStyle} />
                        {errors.action_hover_color && <p>{errors.action_hover_color}</p>}
                    </div>
                </div>

                <h4 className={styles.linksHeader}>{textLinks}</h4>

                <div className={styles.doubleFieldC}>
                    <div className={styles.fbLinkC}>
                        <label htmlFor="facebook_link">
                            {textFacebookLink} <FontAwesomeIcon icon={faFacebook} />
                        </label>
                        <input type="text" name="facebook_link" placeholder={textFacebookLinkHint}
                            onChange={(e) => setData('facebook_link', e.target.value)}
                            value={data.facebook_link} />
                        {errors.facebook_link && <p>{errors.facebook_link}</p>}
                    </div>

                    <div className={styles.instagramLinkC}>
                        <label htmlFor="instagram_link">
                            {textInstagramLink} <FontAwesomeIcon icon={faInstagram} />
                        </label>
                        <input type="text" name="instagram_link" placeholder={textInstagramLinkHint}
                            onChange={(e) => setData('instagram_link', e.target.value)}
                            value={data.instagram_link} />
                        {errors.instagram_link && <p>{errors.instagram_link}</p>}
                    </div>
                </div>

                <div className={styles.doubleFieldC}>
                    <div className={styles.tiktokLinkC}>
                        <label htmlFor="tiktok_link">
                            {textTiktokLink} <FontAwesomeIcon icon={faTiktok} />
                        </label>
                        <input type="text" name="tiktok_link" placeholder={textTiktokLinkHint}
                            onChange={(e) => setData('tiktok_link', e.target.value)}
                            value={data.tiktok_link} />
                        {errors.tiktok_link && <p>{errors.tiktok_link}</p>}
                    </div>
                </div>

                <h4 className={styles.contactInfoHeader}>{textContactInfo}</h4>

                <div className={styles.doubleFieldC}>
                    <div className={styles.contactEmailC}>
                        <label htmlFor="contact_email">
                            {textContactEmail} <FontAwesomeIcon icon={faEnvelope} />
                        </label>
                        <input type="text" name="contact_email" placeholder={textContactEmailHint}
                            onChange={(e) => setData('contact_email', e.target.value)}
                            value={data.contact_email} />
                        {errors.contact_email && <p>{errors.contact_email}</p>}
                    </div>
                    <div className={styles.contactPhoneC}>
                        <label htmlFor="contact_phone">
                            {textContactPhone} <FontAwesomeIcon icon={faMobileButton} />
                        </label>
                        <input type="text" name="contact_phone" placeholder={textContactPhoneHint}
                            onChange={(e) => setData('contact_phone', e.target.value)}
                            value={data.contact_phone} />
                        {errors.contact_phone && <p>{errors.contact_phone}</p>}
                    </div>
                </div>

                <div className={styles.updateBtnC}>
                    <button className={styles.updateBtn}
                        disabled={processing || !themeChanged(data, theme)}>
                        {textUpdate} <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                </div>

            </form>

        </div>
    );
}


function themeChanged(data, theme) {
    return (data.light_color != theme.data.light_color
        || data.dark_color != theme.data.dark_color
        || data.body_color != theme.data.body_color
        || data.background_color != theme.data.background_color
        || data.action_color != theme.data.action_color
        || data.action_hover_color != theme.data.action_hover_color
        || data.facebook_link != theme.data.facebook_link
        || data.instagram_link != theme.data.instagram_link
        || data.tiktok_link != theme.data.tiktok_link
        || data.contact_email != theme.data.contact_email
        || data.contact_phone != theme.data.contact_phone
    );
}


Theme.layout = page => <ProjectLayout tab="theme" children={page} />

export default Theme;
