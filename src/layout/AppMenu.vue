<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Painel',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'Gestão',
        items: [
            { label: 'Usuarios', icon: 'pi pi-fw pi-user', to: '/users' },
            { label: 'Motoristas', icon: 'pi pi-fw pi-id-card', to: '/drivers' },
            { label: 'Veículos', icon: 'pi pi-fw pi-bars', to: '/vehicles' },
            { label: 'Destinos', icon: 'pi pi-fw pi-table', to: '/destinations' }
        ]
    },
    // {
    //     label: 'Dispositivos',
    //     items: [
    //         { label: 'Tipos de Dispositivos', icon: 'pi pi-fw pi-bars', to: '/typedevices' },
    //         { label: 'Dispositivos', icon: 'pi pi-fw pi-tablet', to: '/devices', badge: 'NEW' }
    //     ]
    // },
    {
        label: 'Operação',
        items: [
            { label: 'Viagens', icon: 'pi pi-fw pi-database', to: '/trips' },
            // { label: 'Transações', icon: 'pi pi-fw pi-database', to: '/transactions' },
            // { label: 'Auditoria de Registros', icon: 'pi pi-fw pi-history', to: '/audits' }
        ]
    },
    {
        label: 'Configurações',
        items: [
            { label: 'Perfil', icon: 'pi pi-fw pi-user', to: '/profile' }
            // { label: 'LogOut', icon: 'pi pi-fw pi-unlock', to: '/dashboards' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <!-- <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li> -->
    </ul>
</template>

<style lang="scss" scoped></style>
