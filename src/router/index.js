import { createRouter, createWebHistory } from "vue-router";
import Catalog from "@/views/Catalog.vue";
import Categories from "@/views/Categories.vue";
import ErrorPage from "@/views/ErrorPage.vue";

const routes = [
  { path: "/", name: "Categories", component: Categories },
  {
    path: "/category/:categorySlug",
    component: Catalog,
    props: true,
  },
  {
    path: "/category/:categorySlug/:subcategorySlug",
    component: Catalog,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
