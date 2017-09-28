<template>
  <div>
    <div class="detail" ref="detail">
      <div class="movie-header">
        <div class="image-header">
          <img :src="item.images.large">
          <div class="back" @click="back()">
            <i class="icon-arrow_lift"><</i>
          </div>
        </div>
      </div>
      <div class="movie-content">
        <h1>{{item.title}}</h1>
        <!-- 电影信息 -->
        <div class="movie-message">
          <span>{{item.year}} <i v-for="tag in item.genres">/ {{tag}} </i></span>
          <span>原名：{{item.original_title}}</span>
          <span>上映时间：{{item.year}}(<i v-for="country in item.countries">{{country}}</i>)</span>
          <span>时长：90分钟</span>
        </div>
        <div class="mark">
          <span>豆瓣评分</span>
          <span>{{item.rating.average}}</span>
          <span>{{item.rating.stars}}星</span>
          <span>{{item.ratings_count}}人</span>
        </div>
        <!-- 电影简介 -->
        <div class="summary">
          <h2>剧情简介</h2>
          <div class="summary-content">
            <p data-clamp="3" :data-content="item.summary" class="cont">
              {{item.summary}}
            </p>
            <a class="expand" href="#">(展开)</a>
          </div>
        </div>
        <!-- 影人列表  导演排在第一位 -->
        <div class="actors"> 
          <h2>影人</h2>
          <div class="actor-list" ref="player">
            <ul class="player-list">
              <li v-for="director in item.directors" class="player">
                <a :href="director.alt">
                  <img :src="director.avatars.medium">
                  <div>
                    <span class="name">{{director.name}}</span>
                  </div>
                </a>
              </li>
              <li v-for="actor in item.casts" class="player">
                <a :href="actor.alt">
                  <img :src="actor.avatars.medium">
                  <div>
                    <span class="name">{{actor.name}}</span>
                  </div>
                  
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  data() {
    return {
      item: {
        images: {},
        rating: {},
        directors: [
          {
            avatars: {}
          }
        ],
        casts: [
          {
            avatars: {}
          }
        ]
      }
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let _this = this;
      _this.$axios.get('/api/movie/subject/' + _this.$route.params.id)
      .then(res => {
        _this.item = res.data;
        _this._initScroll();
      })
      .catch(err => {
        console.log(err);
      });
    },
    _initScroll() {
      this.detailScroll = new BScroll(this.$refs.detail, {
        click: true
      });
      this.playerScroll = new BScroll(this.$refs.player, {
        click: true,
        scrollX: true,
        eventPassthrough: 'vertical'
      });
    },
    back() {
      history.back();
    }
  }
};
</script>

<style scoped lang="stylus">
  .detail
    position: fixed;
    left: 0;
    top: 40px;
    bottom 40px;
    z-index: 2;
    width: 100%;
    color: #4C4747;
    background: #fff;
    transform: translate3d(0,0,0);
    overflow-y: scroll;
    .image-header
      position: relative;
      width:100%;
      height: 0;
      padding-top: 100%;
      background: #522525;
      img
        position: absolute;
        width:60%;
        height: 80%
        top: 10%;
        left: 20%;
      .back
        position: fixed;
        top: 0;
        left: 0;
        width:100%;
        .icon-arrow_lift
          display: block;
          padding: 10px;
          font-size: 20px;
          font-size: bold;
          color: #fff;
          float:left;
    .movie-content
      position: relative;
      margin: 0 20px;
      text-align:left;
      font-size: 0;
      h1
        font-size: 20px;
        font-weight: bold;
        height:40px;
        line-height: 40px;
        color: #000;
      .movie-message
        padding-bottom: 20px;
        span
          display: block;
          max-width: 75%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          margin: 5px 0;
      .mark
        position:absolute;
        top: 30px;
        right: 0;
        width: 80px;
        height: 90px;
        border: 1px solid #ccc;
        font-size: 14px;
        text-align: center;
        box-shadow: 0 0 10px #ccc;
        span
          display: block;
          margin: 5px 0;
        span:first-child
          color: #B1AEAE;
        span:nth-child(2)
          font-size: 20px;
          font-weight: bold;
          color: #000;
      .summary
        h2
          font-size: 14px;
          padding: 10px 0;
        .summary-content
          position: relative;
          font-size: 14px;
          line-height: 20px;
          .cont
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 15px;
            color: #494949;
            line-height: 22px;
            word-wrap: break-word;
          .expand
              float: right;
              color: #42bd56;
      .actors
        margin: 20px 0;
        font-size: 14px;
        h2
          padding: 10px 0;
        .actor-list
          width: 100%;
          overflow: hidden;
          white-space: nowrap
          .player-list
            font-size: 0;
            .player
              display: inline-block;
              margin-right: 6px;
              img
                width: 80px;
                height: 110px;
                margin-bottom: 5px;
              div
                display: block;
                width: 80%;
                text-align: center;
                span
                  font-size: 14px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  color: #000;
</style>