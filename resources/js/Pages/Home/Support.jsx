import { Head, useForm } from "@inertiajs/react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import styles from "../../../css/Home/Support.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function Support() {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // initialize text considering preferred language
    const textFeedback = currentLanguage == 'en' ? 'Feedback'
        : (currentLanguage == 'fr' ? 'Feedback' : 'شاركنا رأيك');
    const textSubject = currentLanguage == 'en' ? 'Subject'
        : (currentLanguage == 'fr' ? 'Sujet' : 'الموضوع');
    const textContent = currentLanguage == 'en' ? 'Content'
        : (currentLanguage == 'fr' ? 'Contenu' : 'المحتوى');
    const textSummary = currentLanguage == 'en' ? 'Subject (brief summary)'
        : (currentLanguage == 'fr' ? 'Sujet (résumé bref)' : 'ملخص مختصر حول رأيك بخدمتنا');
    const textHelpUsGrow = currentLanguage == 'en'
        ? 'Suggest enhancements or services you’d like us to add in future versions'
        : (currentLanguage == 'fr'
            ? 'Suggérez des améliorations ou des services que vous aimeriez voir ajoutés dans les prochaines versions'
            : 'إقترح تحسينات أو خدمات تعتقد أنه يجب إضافتها في الإصدارات القادمة');
    const textSend = currentLanguage == 'en' ? 'Send'
        : (currentLanguage == 'fr' ? 'Envoyer' : 'إرسال');


    // hooks initialization
    const route = useRoute();
    const {data, setData, post, errors, processing, reset} = useForm({
        subject: '',
        content: '',
    });

    // send request function
    const send = (e) => {
        e.preventDefault();
        post(route('support.request'), {
            onFinish: reset('subject', 'content'),
        });
    }

    return (
        <div className={styles.supportC}>

            <Head title={textFeedback}/>

            <h2 className={styles.supportHeader}>
                {textFeedback} <FontAwesomeIcon icon={faComment} />
            </h2>

            <form className={styles.supportForm} onSubmit={send}>
                <div className={styles.subjectC}>
                    <label htmlFor="subject">{textSubject}</label>
                    <input type="text" name="subject" value={data.subject}
                        placeholder={textSummary}
                        onChange={(e) => setData('subject', e.target.value)}/>
                    {errors.subject && <p>{errors.subject}</p>}
                </div>

                <div className={styles.contentC}>
                    <label htmlFor="content">{textContent}</label>
                    <textarea name="content" value={data.content}
                        placeholder={textHelpUsGrow}
                        onChange={(e) => setData('content', e.target.value)}/>
                    {errors.content && <p>{errors.content}</p>}
                </div>

                <div className={styles.requestBtnC}>
                    <button className={styles.requestBtn} disabled={processing}>
                        {textSend} <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>

            </form>

        </div>
    );

}

Support.layout = page => <HomeLayout tab="support" children={page}/>

export default Support;

