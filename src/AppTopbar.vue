<template>
	<div class="layout-topbar">
		<button class="p-link layout-menu-button" @click="onMenuToggle">
			<span class="pi pi-bars"></span>
		</button>
		<div class="layout-topbar-icons">
			
			<span class="layout-topbar-item-text" style="font-size:1.2rem">{{company}}</span>
			
		</div>
	</div>
</template>

<script>
export default {
	props:{
		company:String
	},
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        }
    }
}
</script>