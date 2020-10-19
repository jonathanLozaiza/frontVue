<template>
	<div class="layout-profile">
		<div>
			<img src="assets/layout/images/profile.png" alt="" />
		</div>
		<button class="p-link layout-profile-link" @click="onClick">
			<span class="username">{{user.name}}</span>
			<i class="pi pi-fw pi-cog"></i>
		</button>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
				<li><button class="p-link"><i class="pi pi-fw pi-tag"></i><span>{{user.role}}</span></button></li>
                <li><button class="p-link"><i class="pi pi-fw pi-user"></i><span>Account</span></button></li>
            </ul>
        </transition>
		
	</div>
</template>

<script>
	import {getUser} from './service/userService'

	export default {
		data() {
			return {
				expanded: false,
				user:null
			}
		},
		mounted(){
			this.getUserAuth();
		},
		methods: {
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
			},

			getUserAuth(){
            getUser().then(data => {
                this.user = data.data.data.user;
            })
        },
		}
	}
</script>

<style scoped>

</style>