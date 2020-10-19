<template>
	<div class="layout-footer">
		<span class="footer-text" style="margin-right: 5px; font-weight:bold; font-size:1.5rem;">{{company}}</span>
	</div>
</template>

<script>
	export default {
		name: "AppFooter",
		props:{
			company:String
		}
	}
</script>

<style scoped>

</style>