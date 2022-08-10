import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
import { useAuth0 } from '@auth0/auth0-vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => { return import("@/views/HomeView.vue") }
    },
    {
      path: "/login",
      name: "login",
      component: () => { return import("@/components/LoginButton.vue") }
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/components/LogoutButton.vue")
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
      name: "people-list",
      component: () => { return import("@/views/Person/PersonList.vue") }, 
      beforeEnter: authGuard
    },
    {
      path: "/person/:id",
      name: "person-details",
      component: () => import("@/views/Person/Person.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/person/create",
      name: "person-create",
      component: () => import("@/views/Person/PersonCreate.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/task/create",
      name: "task-create",
      component: () => import("@/views/Task/TaskCreate.vue"),
      beforeEnter: authGuard
    }
  ],
});

export default router;
