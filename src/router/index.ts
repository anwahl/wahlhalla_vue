import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue")
    },
    {
      path: "/persons",
      name: "people",
      component: () => import("@/views/Person/PersonList.vue")
    },
    {
      path: "/person/:id",
      name: "person-details",
      component: () => import("@/views/Person/Person.vue")
    },
    {
      path: "/person/add",
      name: "add",
      component: () => import("@/views/Person/AddPerson.vue")
    }
  ],
});

export default router;
