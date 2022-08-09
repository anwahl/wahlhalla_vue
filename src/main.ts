import { createApp } from "vue";
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { createAuth0 } from '@auth0/auth0-vue';
import App from "@/App.vue";
import router from "./router";
import "./assets/main.css";

const app = createApp(App);

app
    .use(router)
    .use(createAuth0({
            domain: import.meta.env.VITE_AUTH0_DOMAIN,
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_AUDIENCE
        })
    )
    .use(BootstrapVue3)
    .mount("#app");
