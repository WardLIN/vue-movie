<template>
  <div>
    <div class="header">
      <a class="theme" href="/">电影</a> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'header'
  // data () {
  //   return {};
  // },
  // methods: {
  //   search() {
  //     let _this = this;
  //     _this.$axios.get('/api/movie/search', {
  //       params: {
  //         q: _this.query
  //       }
  //     })
  //     .then(res => {
  //       _this.res = res;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //     this.query = '';
  //     this.$refs.search.show();
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.header
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #fff;
  .theme
    float:left;
    font-weight: bold;
    margin-left: 10px;
  
</style>
