import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue")
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import("@/views/Callback.vue")
    },
    {
      path: "/persons",
      name: "people",
      component: () => import("@/views/Person/PersonList.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/person/:id",
      name: "person-details",
      component: () => import("@/views/Person/Person.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/person/add",
      name: "add",
      component: () => import("@/views/Person/AddPerson.vue"),
      beforeEnter: authGuard
    }
  ],
});

export default router;
