// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import movies from 'components/movies.vue';
import detail from 'components/movieDetail.vue';
import searchRes from 'components/searchRes.vue';
import axios from 'axios';

Vue.prototype.$axios = axios;

// 安装路由
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/', redirect: '/movie/coming_soon' },
    { path: '/movie/:type', component: movies },
    { path: '/movie/subject/:id', component: detail },
    { path: '/search/:text', component: searchRes }
  ]
});

// const router = new VueRouter({
//   mode: history,
//   base: __dirname,
//   routes: [
//     {path: '/', redirect: '/movies/comingSoon'},
//     {path: '/movies/comingSoon', component: movies},
//     {path: '/movies/inTheater', component: movies}
//   ]
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  axios,
  components: { App }
});
