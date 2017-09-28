<template>
  <div>
    <div class="movies">
      <div class="title">
        <span>{{movies.title}}</span>
      </div>
      <div class="movie-list">
        <ul class="movie-box" ref="movieList">
          <li v-for="(movie,index) in movies.subjects" class="movie-item" @click="selectMovie(movie.id,$event)">
              <div class="show-box">
                <div class="img-show">
                  <img :src="movie.images.medium" alt="">
                </div>
                <div class="movie-title">
                  <span class="movie-name">{{movie.title}}</span>
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        movies: {
          title: '',
          subjects: [
          {
            images: {}
          }]
        },
        id: '',
        movie: {}
      };
    },
    created() {
      this.getMovies();
    },
    methods: {
      getMovies() {
        // 保存当前对象指针
        let _this = this;
        // axios获取数据
        _this.$axios.get('/api/movie/' + _this.$route.params.type)
        .then(res => {
          _this.movies = res.data;
          _this.movieTitle = res.data.title;
          _this.subjects = res.data.subjects;
          _this.$nextTick(() => {
            _this._initScroll();
          });
        })
        .catch(err => {
          console.log(err);
        });
      },
      // 创建滚动实例，绑定在对应dom节点上
      _initScroll() {
        this.movieScroll = new BScroll(this.$refs.movieList, {
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

<style lang="stylus">
.movies
  background-color: #ccc;
  position: absolute;
  left:0;
  top: 40px;
  .title
    width:100%;
    text-align: center;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    & > span
      font-size: 14px;
      font-weight: bold;
      color: #6B5E5E;
  .movie-list
    border-radius: 10px;
    border: 1px solid #ccc;
    background: #fff;
    .movie-box
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      margin: 10px 0 50px 2.5%;
      height: calc(100vh - 121px);
      overflow-y: scroll;
      .movie-item
        width:30%;
        margin-left: 2.5%;
        margin-bottom: 20px;
        .show-box
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          .img-show
            border: 1px solid #ccc;
            border-radius: 10px;
            height: 150px;
            & > img
              width: 100%;
              height: 100%;
          .movie-title
            font-size: 13px;
            font-weight: 400;
            padding: 10px 0 0;
            color: #494949;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
</style>