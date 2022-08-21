import { createApp } from "vue";
import Loading from "@/components/Loading.vue";
import ErrorComponent from "@/components/Error.vue";
import { createAuth0 } from '@auth0/auth0-vue';
import App from "@/App.vue";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import "./assets/main.css";

const app = createApp(App);

if (import.meta.env.VITE_ENV === "production") {
    app.use(createAuth0({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUDIENCE
    })) 
}

app.config.errorHandler = (err, instance, info) => {
    // @ts-ignore
    router.push({ name: 'error', params: { error: JSON.stringify(err.message) }  });
    console.error(err);
};

app
    .use(router)
    .component("ErrorComponent", ErrorComponent)
    .component("Loading", Loading)
    .mount("#app");
