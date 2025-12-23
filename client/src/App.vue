<template>
   <div id="app">
	  <router-view></router-view>
   </div>
</template>

<script>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// import locale from "element-plus/es/locale/lang/zh-cn";


import { jwtDecode } from "jwt-decode";
import { useStore } from "vuex";
import { onMounted } from "vue";
const store = useStore();

// 判断是否为空的方法
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

onMounted(() => {
  if (localStorage.mytoken) {
    const decoded = jwtDecode(localStorage.mytoken);
    // token存储到vuex中
    store.dispatch("setAuthenticated", !isEmpty(decoded));
    store.dispatch("setUser", decoded);
  }
});
</script>


<style>
html,
body,
#app{
	width: 100%;
	height: 100%;
}
</style>
