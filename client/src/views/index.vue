<template>
	<div class="index">
		<HeadNavVue></HeadNavVue>
		<LeftMenuVue></LeftMenuVue>
		<div class="rightContainer">
		  <router-view></router-view>
		</div>
	</div>
</template>

<script>
	import HeadNavVue from '../components/HeadNav.vue'
	import LeftMenuVue from '../components/LeftMenu.vue'
	export default{
		name:"index",
		components:{
		     HeadNavVue,
			 LeftMenuVue
		}
	}
</script>

<style>
	.index{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.rightContainer {
	  position: relative;
	  top: 0;
	  left: 180px;
	  width: calc(100% - 180px);
	  height: calc(100% - 71px);
	  overflow: auto;
	}
</style>