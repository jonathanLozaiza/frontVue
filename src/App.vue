<template>
	<div :class="containerClass" @click="onWrapperClick">
		<AppTopBar company="Company" @menu-toggle="onMenuToggle" />

        <transition name="layout-sidebar">
            <div :class="sidebarClass" @click="onSidebarClick" v-show="isSidebarVisible()">
                <div class="layout-logo">
                    <router-link to="/">
                        <h1 style="color:white">{{company}}</h1>
                    </router-link>
                </div>

                <AppProfile v-if="flag" />
                <AppMenu v-if="flag" :model="menu" @menuitem-click="onMenuItemClick" />
                <AppMenu v-if="!flag" :model="menu2" @menuitem-click="onMenuItemClick" />
            </div>
        </transition>

		<div class="layout-main">
			<router-view />
		</div>

		<AppConfig :layoutMode="layoutMode" :layoutColorMode="layoutColorMode" @layout-change="onLayoutChange" @layout-color-change="onLayoutColorChange"/>

		<AppFooter company="Company" />
	</div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppProfile from './AppProfile.vue';
import AppMenu from './AppMenu.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';
import {getUser} from './service/userService';

export default {
    data() {
        return {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu : [
                {label: 'Cars', icon: 'pi pi-fw pi-caret-right', to: '/cars'},
                {label: 'Drivers', icon: 'pi pi-fw pi-caret-right', to: '/drivers'},
                {label: 'Exit', icon:"pi pi-power-off", command: () => {this.signOut()}}
            ],
            menu2 : [
                {label: 'login', icon:"pi pi-sign-in", to: '/'},
                {label: 'Register', icon:"pi pi-user-edit", to: '/signUp'}
            ],
            flag:true,
            company:'Company'
        }
    },
    mounted(){
        this.getUserAuth();
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        }
    },
    methods: {

        getUserAuth(){
            getUser().then(data => {
                if(data.error){
                    this.flag = false;
                }else{
                    this.flag = true;
                }
            })
        },

        signOut(){
            localStorage.removeItem('token');
            this.getUserAuth();
            this.$router.push('/');
        },

        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
					if(this.mobileMenuActive === true) {
						this.overlayMenuActive = true;
					}

                    this.overlayMenuActive = !this.overlayMenuActive;
					this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
		onLayoutChange(layoutMode) {
			this.layoutMode = layoutMode;
		},
		onLayoutColorChange(layoutColorMode) {
			this.layoutColorMode = layoutColorMode;
		},
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth > 1024;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
                else
                    return true;
            }
            else {
                return true;
            }
        },
    },
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$appState.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.ripple === false
            }];
        },
        sidebarClass() {
            return ['layout-sidebar', {
                'layout-sidebar-dark': this.layoutColorMode === 'dark',
                'layout-sidebar-light': this.layoutColorMode === 'light'
            }];
        },
        logo() {
            return (this.layoutColorMode === 'dark') ? "assets/layout/images/logo-white.svg" : "assets/layout/images/logo.svg";
        }
    },
    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        'AppTopBar': AppTopBar,
        'AppProfile': AppProfile,
        'AppMenu': AppMenu,
        'AppConfig': AppConfig,
        'AppFooter': AppFooter,
    }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
