const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    name: "notes",
    path: "/notes",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/NotesList.vue") },
    ],
  },
  {
    path: "/notes/:index(\\d+)/",
    component: () => import("layouts/MarkdownEditorLayout.vue"),
    children: [
      { name: 'note', path: "", component: () => import("pages/MarkdownEditor.vue") }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
