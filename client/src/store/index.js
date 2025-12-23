// import { createStore } from "vuex";
// import axios from "axios";
//  //vuex的核心作用就是帮我们管理组件之间的状态的
//  //vuex的核心概念包含：State，Getter,mutation，action
 
// const types = {
//    SET_AUTHENTICATED: "SET_AUTHENTIATED", // 是否认证通过
//    SET_USER: "SET_USER", // 用户信息
//  };
// export default createStore({
// 	//所有的状态都放在这里
//     state: {
// 	   isAuthenticated: false,
// 	   user: {}
//     },
// 	//对vuex中的数据进行过滤
//     getters:{
// 		isAuthenticated: state => state.isAuthenticated,
// 		user: state => state.user
// 	},
// 	//更改store中参数
//     mutations: {
// 		[types.SET_AUTHENTICATED](state, isAuthenticated) {
// 		    if (isAuthenticated) state.isAuthenticated = isAuthenticated
// 		    else state.isAuthenticated = false
// 		  },
		
// 		  [types.SET_USER](state, user) {
// 		    if (user) state.user = user
// 		    else state.user = {}
// 		  }
// 	},
// 	//action类似mutation
// 	//action提交的是mutation，而不是直接变更状态
// 	//action可以包含任意异步操作
// 	//为异步操作所准备的
//     actions: {
// 		 setAuthenticated: ({ commit }, isAuthenticated) => {
// 		    commit(types.SET_AUTHENTICATED, isAuthenticated);
// 		  },
// 		  setUser: ({ commit }, user) => {
// 		    commit(types.SET_USER, user);
// 		  },
// 		//退出登录
// 		  clearCurrentState: ({ commit }) => {
// 		    commit(types.SET_AUTHENTICATED, false)
// 		    commit(types.SET_USER, null)
// 		  }
// 	},
//     modules: {
		
// 	}
// });

import { createStore } from "vuex";

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER",
};

export default createStore({
  state: {
    isAuthenticated: !!localStorage.getItem("mytoken"),
    user: JSON.parse(localStorage.getItem("userinfo")) || {},
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
  },
  mutations: {
    [types.SET_AUTHENTICATED](state, isAuthenticated) {
      state.isAuthenticated = !!isAuthenticated;
    },
    [types.SET_USER](state, user) {
      state.user = user || {};
    },
  },
  actions: {
    setAuthenticated: ({ commit }, isAuthenticated) => {
      commit(types.SET_AUTHENTICATED, isAuthenticated);
    },
    setUser: ({ commit }, user) => {
      commit(types.SET_USER, user);
      // 同步保存到 localStorage
      if (user) localStorage.setItem("userinfo", JSON.stringify(user));
      else localStorage.removeItem("userinfo");
    },
    clearCurrentState: ({ commit }) => {
      commit(types.SET_AUTHENTICATED, false);
      commit(types.SET_USER, null);
      localStorage.removeItem("mytoken");
      localStorage.removeItem("userinfo");
    },
  },
});
