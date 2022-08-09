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
      path: '/assignedTasks',
      name: 'assignedTask-list',
      component: () => import("@/views/AssignedTaskTable.vue")
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
      name: "add-person",
      component: () => import("@/views/Person/PersonCreate.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/task/add",
      name: "add-task",
      component: () => import("@/views/Task/TaskCreate.vue"),
      beforeEnter: authGuard
    }
  ],
});

export default router;
