import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: AppLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/dashboard/Dashboard.vue')
                },
                //drivers route
                {
                    path: '/drivers',
                    name: 'drivers',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/drivers/IndexDriver.vue')
                },
                {
                    path: '/drivers/create',
                    name: 'drivers.create',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/drivers/CreateDriver.vue')
                },
                {
                    path: '/drivers/:id',
                    name: 'drivers.show',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/drivers/ShowDriver.vue')
                },
                {
                    path: '/drivers/:id/edit',
                    name: 'drivers.edit',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/drivers/EditDriver.vue')
                },
                //users route
                {
                    path: '/users',
                    name: 'users',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/users/IndexUser.vue')
                },
                {
                    path: '/users/create',
                    name: 'users.create',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/users/CreateUser.vue')
                },
                {
                    path: '/users/:id',
                    name: 'users.show',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/users/ShowUser.vue')
                },
                {
                    path: '/users/:id/edit',
                    name: 'users.edit',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/users/EditUser.vue')
                },

                //vehicles route
                {
                    path: '/vehicles',
                    name: 'vehicles',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/vehicles/IndexVehicle.vue')
                },
                {
                    path: '/vehicles/create',
                    name: 'vehicles.create',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/vehicles/CreateVehicle.vue')
                },
                {
                    path: '/vehicles/:id',
                    name: 'vehicles.show',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/vehicles/ShowVehicle.vue')
                },
                {
                    path: '/vehicles/:id/edit',
                    name: 'vehicles.edit',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/vehicles/EditVehicle.vue')
                },

                //destinations route
                {
                    path: '/destinations',
                    name: 'destinations',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/destinations/IndexDestination.vue')
                },
                {
                    path: '/destinations/create',
                    name: 'destinations.create',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/destinations/CreateDestination.vue')
                },
                {
                    path: '/destinations/:id',
                    name: 'destinations.show',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/destinations/ShowDestination.vue')
                },
                {
                    path: '/destinations/:id/edit',
                    name: 'destinations.edit',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/destinations/EditDestination.vue')
                },

                //trips route
                {
                    path: '/trips',
                    name: 'trips',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/trips/IndexTrips.vue')
                },
                {
                    path: '/trips/create',
                    name: 'trips.create',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/trips/CreateTrips.vue')
                },
                {
                    path: '/trips/:id',
                    name: 'trips.show',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/trips/ShowTrips.vue')
                },
                {
                    path: '/trips/:id/edit',
                    name: 'trips.edit',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/trips/EditTrips.vue')
                },

                //deliveries route
                {
                    path: '/deliveries',
                    name: 'deliveries',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/deliveries/IndexDelivery.vue')
                    // children: [
                    //     {
                    //         path: '/deliveries',
                    //         component: () => import('@/views/pages/admin/deliveries/IndexDelivery.vue')
                    //     },
                    //     {
                    //         path: '/deliveries/list',
                    //         component: () => import('@/views/pages/admin/deliveries/IndexDelivery.vue')
                    //     },
                    //     {
                    //         path: '/deliveries/transactions',
                    //         component: () => import('@/views/pages/admin/drivers/IndexDriver.vue')
                    //     },
                    //     {
                    //         path: '/deliveries/logs',
                    //         component: () => import('@/views/pages/admin/devices/IndexDevice.vue')
                    //     }
                    // ]
                },
                {
                    path: '/transactions',
                    name: 'transactions',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/deliveries/IndexTransaction.vue')
                },
                {
                    path: '/notifications',
                    name: 'notifications',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/notifications/IndexNotification.vue')
                },
                {
                    path: '/audits',
                    name: 'audits',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/audits/IndexAuditLogs.vue')
                },
                {
                    path: '/deliveries/:id',
                    name: 'deliveries.show',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/deliveries/ShowDelivery.vue')
                },
                {
                    path: '/deliveries/:id/edit',
                    name: 'deliveries.edit',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/deliveries/EditDelivery.vue')
                },

                //profile route
                {
                    path: '/profile',
                    name: 'profile',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/profile/IndexProfile.vue')
                },
                {
                    path: '/profile/create',
                    name: 'profile.create',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/profile/CreateProfile.vue')
                },
                {
                    path: '/profile/:id',
                    name: 'profile.show',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/profile/ShowProfile.vue')
                },
                {
                    path: '/profile/:id/edit',
                    name: 'profile.edit',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('@/views/pages/admin/profile/EditProfile.vue')
                }
            ]
        },
        {
            path: '/',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            // meta: {
            //     hideForAuth: true
            // },
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            // User is authenticated, proceed to the route
            next();
        } else {
            // User is not authenticated, redirect to login
            next('/auth/login');
        }
    } else {
        // Non-protected route, allow access
        next();
    }

    // if (to.meta.hideForAuth) {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         // User is authenticated, proceed to the route
    //         next('/dashboard');
    //     } else {
    //         // User is not authenticated, redirect to login
    //         next('/dashboard');
    //     }
    // } else {
    //     // Non-protected route, allow access
    //     next('/dashboard');
    // }
});

export default router;
