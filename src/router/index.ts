import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => { return import("@/views/HomeView.vue") }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => { return import("@/views/Dashboard.vue") }
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import("@/views/Callback.vue")
    },
    {
      path: '/support',
      name: 'support',
      component: () => import("@/views/Support.vue")
    },
    {
      path: '/error',
      name: 'error',
      component: () => import("@/views/Error.vue")
    },
    {
      path: '/assignedTasks',
      name: 'assignedTask-list',
      component: () => import("@/views/AssignedTask/AssignedTaskList.vue")
    },
    {
      path: '/tasks',
      name: 'task-list',
      component: () => import("@/views/Task/TaskList.vue")
    },
    {
      path: '/subtasks',
      name: 'subtask-list',
      component: () => import("@/views/Subtask/SubtaskList.vue")
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
    },
    {
      path: "/targetTypes",
      name: "targetType-list",
      component: () => { return import("@/views/TargetType/TargetTypeList.vue") }, 
      beforeEnter: authGuard
    },
    {
      path: "/targets",
      name: "target-list",
      component: () => { return import("@/views/Target/TargetList.vue") }, 
      beforeEnter: authGuard
    },
    {
      path: "/taskTypes",
      name: "taskType-list",
      component: () => { return import("@/views/TaskType/TaskTypeList.vue") }, 
      beforeEnter: authGuard
    },
  ],
});

export default router;
