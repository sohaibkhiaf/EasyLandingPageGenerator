import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

const APP_NAME = import.meta.env.VITE_APP_NAME || "Easy Landing Page Generator" ;
const NO_APP_NAME_PREFIX= "NOAPPNAME:";

createInertiaApp({
    title: (title) => { 
        if (!title) {
            return APP_NAME;
        }
        if (title.startsWith(NO_APP_NAME_PREFIX)) {
            return title.replace(NO_APP_NAME_PREFIX, '');
        }
        return `${title} — ${APP_NAME}`;
    },
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
    progress: {
        color: '#ffffff',
    },
})


