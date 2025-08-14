import { createRouter, createWebHistory } from "vue-router";
import Catalog from "@/views/Catalog.vue";
import Categories from "@/views/Categories.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
