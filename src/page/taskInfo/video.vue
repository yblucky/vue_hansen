<template>
  <div id="vedioComponent">
    <video id="vdo" webkit-playsinline playsinline controls v-show="isVdoShow" src="http://vjs.zencdn.net/v/oceans.mp4"></video>
    <img id="poster" v-show="isPosterShow" :src="posterUrl" alt="">
    <img id="loading" v-show="isLoadingShow" src="https://hybrid.xiaoying.tv/web/active/krFAQ/static/imgs/load.gif" alt="">
    <img @click="play()" id="playBtn" v-show="isPlayBtnShow" src="https://hybrid.xiaoying.tv/web/active/krFAQ/static/imgs/playBtn.png" alt="">
  </div>
</template>

<script>
export default {
  props: [ 'videoUrl', 'posterUrl' ],
  data () {
    return {
      isVdoShow: false,
      isPosterShow: true,
      isLoadingShow: false,
      isPlayBtnShow: true,
      reciveVideoUrl: ''
    }
  },
  mounted () {

  },
  methods: {
    //  点击播放按钮播放视屏
    play: function () {
      // this.reciveVideoUrl = ""             //  获取视频url
      // var vdo = document.getElementById('vdo');
      this.canplay();
      this.isLoadingShow = true
      this.isPlayBtnShow = false
    },
    canplay(){
      //  给视频容器设置高
      var screenW = window.screen.width
      document.getElementById('vedioComponent').style.height = screenW + 'px'
      this.isVdoShow = true
      this.isLoadingShow = false
      this.isPosterShow = false
    },
  }
}
</script>
