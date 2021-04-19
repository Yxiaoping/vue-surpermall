<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners='banners'></home-swiper>
        <home-recommend-view :recommends='recommends'></home-recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control" :titles='["流行","新款","精选"]'></tab-control>
        <ul> <!-- ul>li{列表$}*10 -->
          <li>列表1</li>
          <li>列表2</li>
          <li>列表3</li>
          <li>列表4</li>
          <li>列表5</li>
          <li>列表6</li>
          <li>列表7</li>
          <li>列表8</li>
          <li>列表9</li>
          <li>列表10</li>
        </ul>
        <ul>
          <li>hello1</li>
          <li>hello2</li>
          <li>hello3</li>
          <li>hello4</li>
          <li>hello5</li>
          <li>hello6</li>
          <li>hello7</li>
          <li>hello8</li>
          <li>hello9</li>
          <li>hello10</li>
          <li>hello11</li>
          <li>hello12</li>
          <li>hello13</li>
          <li>hello14</li>
          <li>hello15</li>
          <li>hello16</li>
          <li>hello17</li>
          <li>hello18</li>
          <li>hello19</li>
          <li>hello20</li>
          <li>hello21</li>
          <li>hello22</li>
          <li>hello23</li>
          <li>hello24</li>
          <li>hello25</li>
          <li>hello26</li>
          <li>hello27</li>
          <li>hello28</li>
          <li>hello29</li>
          <li>hello30</li>
          <li>hello31</li>
          <li>hello32</li>
          <li>hello33</li>
          <li>hello34</li>
          <li>hello35</li>
          <li>hello36</li>
          <li>hello37</li>
          <li>hello38</li>
          <li>hello39</li>
          <li>hello40</li>
          <li>hello41</li>
          <li>hello42</li>
          <li>hello43</li>
          <li>hello44</li>
          <li>hello45</li>
          <li>hello46</li>
          <li>hello47</li>
          <li>hello48</li>
          <li>hello49</li>
          <li>hello50</li>
          <li>hello51</li>
          <li>hello52</li>
          <li>hello53</li>
          <li>hello54</li>
          <li>hello55</li>
          <li>hello56</li>
          <li>hello57</li>
          <li>hello58</li>
          <li>hello59</li>
          <li>hello60</li>
        </ul>
    </div>
</template>

<script>
// 分块放置，优雅，方便管理、维护
import HomeSwiper from './childComps/HomeSwiper' // 导入的组件放一起
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import {getHomeMultidata} from 'network/home.js'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl
  },
  data () {
    return {
        // result: null
        banners: [],
        recommends: []
    }
  },
  created () {
    getHomeMultidata().then(res => {
    //   console.log(res)
    // this.result = res
    this.banners = res.data.banner.list
    this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style>
#home{
  padding: 44px 0 64px;
}
.home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>
