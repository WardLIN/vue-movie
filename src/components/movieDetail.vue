<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div v-if="!isLoading">
      <div class="back">
        <i class="icon-arrow_lift" @click="back()"><</i>
      </div>
      <div class="detail" ref="detail">
        <div class="contentWrapper">
          <div class="movie-header">
            <div class="image-header">
              <img :src="item.images.large">
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
                <p class="contHide" ref="summary">
                  {{item.summary}}
                </p>
                <a class="expand" @click="expand()" ref="expand">(展开)</a>
              </div>
            </div>
            <!-- 影人列表  导演排在第一位 -->
            <div class="actors"> 
              <h2>影人</h2>
              <div class="actor-list" ref="actor">
                <ul class="player-list" ref="player">
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
                      <span class="name">{{actor.name}}</span>  
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import loading from 'components/loading.vue';

export default {
  data() {
    return {
      isLoading: true,
      item: {
        images: {},
        rating: {},
        directors: [
          {
            avatars: {
              medium: ''
            }
          }
        ],
        casts: [
          {
            avatars: {
              medium: ''
            }
          }
        ]
      }
    };
  },
  created() {
    this.getDetail();
  },
  watch: {
    item: function() {
      this._initScroll();
      this._initPics();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._initPics();
    });
  },
  methods: {
    getDetail() {
      let _this = this;
      _this.$axios.get('/api/movie/subject/' + _this.$route.params.id)
      .then(res => {
        _this.item = res.data;
        _this.isLoading = false;
        _this.$nextTick(() => {
          _this._initScroll();
          _this._initPics();
        });
      })
      .catch(err => {
        console.log(err);
      });
    },
    _initScroll() {
        if (!this.detailScroll) {
          this.detailScroll = new BScroll(this.$refs.detail, {
            click: true
          });
        } else {
          this.detailScroll.refresh();
        }
      },
    _initPics() {
      this.$nextTick(() => {
        if (this.item.directors || this.item.casts) {
          let picWidth = 80;
          let margin = 6;
          let width = (picWidth + margin) * (this.item.directors.length + this.item.casts.length) - margin;
          this.$refs.player.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.actorScroll) {
              this.actorScroll = new BScroll(this.$refs.actor, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.actorScroll.refresh();
            }
          });
        }
      });
    },
    back() {
      history.back();
    },
    expand() {
      this.$refs.expand.style.display = 'none';
      this.$refs.summary.className = 'contShow';
      this._initScroll();
      return false;
    }
  },
  components: {
    loading
  }
};
</script>

<style scoped lang="stylus">
  .back
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: rgba(212, 206, 206, 0.5);
    .icon-arrow_lift
      display: block;
      padding-left: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      float:left;
  .detail
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    height: calc(100vh - 80px);
    color: #4C4747;
    background: #fff;
    overflow: hidden;
    .contentWrapper
      padding-bottom: 80px;
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
      .movie-content
        position: relative;
        margin: 0 20px;
        text-align:left;
        font-size: 0;
        h1
          width: 80%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
            color: #000;
            font-size: 15px;
            .contHide
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 22px;
            .contShow
              display: -webkit-box;
              -webkit-line-clamp: 0;
              -webkit-box-orient: vertical;
              line-height: 22px;
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
                margin-right:6px;
                width: 80px;
                text-align:center;
                &:last-child
                  margin-right: 0
                img
                  width: 100%;
                  height: 110px;
                  margin-bottom: 5px;
                span
                  display: block;
                  font-size: 14px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  color: #000;
</style>