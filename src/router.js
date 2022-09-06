import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import DashboardView from "@/views/DashboardView.vue";
import DatatableView from "@/views/DatatableView.vue";
import ErrorView from "@/views/ErrorView.vue";
import FormView from "@/views/FormView.vue";
import LoadingDialogView from "@/views/LoadingDialogView.vue";
import profilePopupView from "@/views/ProfilePopupView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: [{
        path: '/', name: 'Home', component: HomeView
    },
        {
            path: '/dashboard', name: 'Dashboard', component: DashboardView
        }, {
            path: '/datatable', name: 'Datatable', component: DatatableView
        }, {
            path: '/error-log', name: 'ErrorLog', component: ErrorView
        }, {
            path: '/form', name: 'Form', component: FormView
        }, {
            path: '/loading-dialog', name: 'LoadingDialog', component: LoadingDialogView
        }, {
            path: '/profile-popup', name: 'ProfilePopup', component: profilePopupView
        },
    ]
})

export default router
