<template>
  <div>
    <div class="search-box">
      <h1>{{res.title}}</h1>
      <div class="resList" ref="result">
        <li v-for="movie in res.subjects" class="item-box" @click="selectMovie(movie.id,$event)">
          <div class="poster">
            <img :src="movie.images.small">
          </div>
          <div class="mes">
            <span class="movie-title">{{movie.title}}</span>
            <span><i v-for="tag in movie.genres">{{tag}} / </i></span>
            <span>{{movie.rating.average}} / {{movie.year}}</span>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        res: {
          subjects: [
            {
              images: {},
              rating: {}
            }
          ]
        },
        id: ''
      };
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let _this = this;
        _this.$axios.get('/api/movie/search', {
          params: {
            q: _this.$route.params.text
          }
        })
        .then(res => {
          _this.res = res.data;
          _this.$nextTick(() => {
            _this._initScroll();
        });
        })
        .catch(err => {
          console.log(err);
        });
      },
      _initScroll() {
        this.resultScroll = new BScroll(this.$refs.result, {
          click: true
        });
      },
      selectMovie(id, event) {
        if (!event._constructed) {
          return;
        }
        this.id = id;
        this.$router.push('/movie/subject/' + this.id);
      }
    }
  };
</script>

<style scoped lang="stylus">
  .search-box
    position: fixed;
    left: 0;
    top: 40px;
    bottom 40px;
    width: 100%;
    color: #4C4747;
    background: #fff;
    text-align: left;
    h1
      width: 100%;
      padding: 10px 0 10px 10px;
      background: #ccc;
    .resList
      width: 100%;
      height: calc(100vh - 114px);
      overflow-y: scroll;
      .item-box
        display: flex;
        margin: 10px 20px;
        .poster
          width: 20%;
          margin-right: 10px;
          img
            width: 60px;
            height: 80px;
        .mes
          flex: 1;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-around;
          span
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          span.movie-title
            font-family: Helvetica, Arial;
            font-size: 20px;
            font-weight: bold;
            color: #000;
</style>