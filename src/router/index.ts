import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import PatientsView from "@/views/PatientsView.vue";
import PatientDetailView from "@/views/PatientDetailView.vue";
import NewAppointmentView from "@/views/NewAppointmentView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes = [
    { path: '/login', name: 'login', component: LoginView},
    { path: '/', redirect: '/dashboard'},
    { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
    { path: '/patients', name: 'patients', component: PatientsView, meta: { requiresAuth: true } },
    { path: '/patients/:id', name: 'patient-detail', component: PatientDetailView, meta: { requiresAuth: true } },
    { path: '/appointments/new', name: 'new-appointment', component: NewAppointmentView, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView } // Catch-all
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _from, next) => {
    const requiresAuth = to.meta.requiresAuth
    const loggedIn = false // place holder before pinia auth state being stored and handled
    if (requiresAuth && !loggedIn) next({name : 'login'})
    else if (to.name === 'login' && loggedIn) next({ name: 'dashboard'})
    else next()
})

export default router
