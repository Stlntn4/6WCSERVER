import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/home.vue";
import StudentForm from "../components/studentForm.vue";
import AdminForm from "../components/adminForm.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/student", name: "StudentForm", component: StudentForm },
  { path: "/admin", name: "AdminForm", component: AdminForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
