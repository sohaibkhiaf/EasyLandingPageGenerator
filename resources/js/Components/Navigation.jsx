import { Link } from "@inertiajs/react";
import styles from "../../css/Components/Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


function Navigation ({links, current}) {

    // get current language from local storage
    let currentLanguage = localStorage.getItem('LANGUAGE');

    // this sets fallback language= ar
    if (!currentLanguage){ currentLanguage = 'en'; }

    // nav arrows
    const angleLeft = currentLanguage == 'ar' ? <FontAwesomeIcon icon={faAngleRight} />
        : <FontAwesomeIcon icon={faAngleLeft} />;
    const angleRight = currentLanguage == 'ar' ? <FontAwesomeIcon icon={faAngleLeft} />
        : <FontAwesomeIcon icon={faAngleRight} />;

    return (
        <div className={styles.navigationC}>
            {links.map((link, index) =>
                link.url ?
                (<Link className={ current === index ? styles.navigationLink+" "+styles.active
                    : styles.navigationLink}
                    key={link.label}
                    href={link.url }>
                    {index === 0 ? angleLeft : ( index === links.length-1 ? angleRight : link.label ) }
                </Link>)
                :(<span className={styles.navigationDisabled}
                    key={link.label}>
                    {index === 0 ? angleLeft : angleRight}
                </span>)
            )}
        </div>
    );

}

export default Navigation;
