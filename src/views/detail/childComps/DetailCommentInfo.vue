<template>
    <div v-if="commentInfo !== null && commentInfo.images !== undefined"
    class="comment">
            <div class="info-header">
                <div class="header-title">用户评价</div>
                <div class="header-more">更多
                <i class="arrow-right"></i>
                </div>
            </div>
            <div class="info-user">
                <img :src="commentInfo.user.avatar" alt="">
                <span>{{commentInfo.user.uname}}</span>
            </div>
            <div class="info-detail">
                <p>{{commentInfo.content}}</p>
                <div class="info-other">
                    <!-- <span class="data">{{date}}</span> -->
                    <!-- 过滤器语法 | 前面的内容即下面的过滤器函数中的value值-->
                    <span class="data">{{commentInfo.created | showDate}}</span>
                    <span>{{commentInfo.style}}</span>
                </div>
                <div class="info-imgs">
                    <img v-for="(item,index) in commentInfo.images" 
                    :key="index" :src="item" alt="">
                </div>
            </div>
    </div>
</template>

<script>
import {formatDate} from 'common/utils'
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: Object
  },
  filters: {
    showDate (value) {
        //   1. 将时间戳转化为Date对象
    const date = new Date(value * 1000)
    return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  },
  computed: {
    // date () {
    // //   1. 将时间戳转化为Date对象
    // const date = new Date(this.commentInfo.created * 1000)
    // return formatDate(date,'yyyy-MM-dd')
    // }
  }
}
</script>

<style>
.comment {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
}
.info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.header-title{
    float: left;
}
.header-more {
    float: right;
    font-size: 12px;
    margin-right: 10px;
}
.info-user {
    padding: 10px 0 5px;
}
.info-user img {
    width: 42px;
    border-radius: 50%;
}
.info-user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}
.info-detail {
    padding: 0 5px 15px;
    font-size: 14px;
    color: #777;
    line-height: 1.5;
}
.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.info-detail .data {
  margin-right: 8px;
}
.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
