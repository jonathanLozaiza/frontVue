import Vue from 'vue';
import Router from 'vue-router';
import SignIn from './components/SignIn.vue';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'signIn',
            component: SignIn
        },
        {
            path: '/cars',
            name: 'cars',
            component: () =>
                import ('./components/Car.vue')
        },
        {
            path: '/signUp',
            name: 'register',
            component: () =>
                import ('./components/Register.vue')
        },
        {
            path: '/drivers',
            name: 'drivers',
            component: () =>
                import ('./components/Driver.vue')
        }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});