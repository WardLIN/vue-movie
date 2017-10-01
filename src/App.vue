<template>
  <div id="app">
    <div class="header">
      <v-header></v-header>
    </div>
    <!-- 搜索栏 -->
    <div class="search">
        <input type="text" class="search-input" name="serach" placeholder="搜索..." v-model.trim="query">
        <!-- <img src="./assets/search-btn.png" class="search-btn" @click="search()"> -->
        <router-link :to="path" class="search-btn" @click.native="empty()"> 
        </router-link>
      </div>
    <div class="tab">
      <div class="tab-item">
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/movie/coming_soon">即将上映</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/movie/in_theaters">热播</router-link>
      </div>
    </div>
    <!-- 内容栏 -->
    <div class="content">
      <keep-alive>
        <router-view :key="key"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import vHeader from 'components/header.vue';

export default {
  name: 'app',
  data() {
    return {
      query: '',
      path: ''
    };
  },
  computed: {
    key: function() {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date();
    }
  },
  watch: {
    query: function(val) {
      this.path = '/search/' + val;
    }
  },
  methods: {
    empty() {
      this.query = '';
    }
  },
  components: {
    vHeader
  }
};
</script>

<style lang="stylus">
* {
  margin: 0;
  padding: 0;
}

ul,li {
  list-style-type: none;
  margin:0;
}

a {
  text-decoration: none;
}

//输入框在获得焦点时去掉placeholder提示
input:focus::-webkit-input-placeholder{
    color:transparent;
}

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100vh;
  .search
    position: absolute;
    right: 0;
    top: 10px;
    margin-right: 10px;
    .search-input
      -webkit-appearance: none;
      outline: none;
      width:100px;
      border-radius: 10px;
      border:1px solid #F9CB32;
      padding:2px 22px 2px 10px;
      font-size: 14px;
      line-height:14px;
    .search-btn
      position: absolute;
      right: 5px;
      top: 5px;
      width: 13px;
      height: 13px;
      background-image: url(./assets/search-btn.png);
  .tab
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px
    line-height: 40px
    border-radius: 5px 5px 0 0;
    display:flex
    background: #8adad0;
    .tab-item
      width:50%
      text-align: center
      & > a
        display: block
        text-decoration: none
        font-size: 14px
        color: rgb(77,85,93)
        font-size: 20px
        &.router-link-active
          color: rgb(240,20,20)
  .content
    max-height: calc(100vh - 80px);
</style>
