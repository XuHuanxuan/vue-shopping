<template>
  <div class="category">
    <!-- 分类 -->
    <van-nav-bar title="全部分类" fixed />

    <!-- 搜索框 -->
    <van-search readonly shape="round" background="#f1f1f2" placeholder="请输入搜索关键词" @click="$router.push('/search')" />

    <!-- 分类列表 -->
    <div class="list-box">
      <van-sidebar v-model="activeIndex">
        <van-sidebar-item v-for="(item) in list" :key="item.category_id" :title=item.name />
      </van-sidebar>
      <div class="right">
        <div @click="$router.push(`/searchlist?categoryId=${item.category_id}`)"
          v-for="item in list[activeIndex]?.children" :key="item.category_id" class="cate-goods">
          <img :src="item.image?.external_url" alt="">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryData } from '@/api/category'
export default {
  name: 'CategoryPage',
  created () {
    this.getCategoryList()
  },
  data () {
    return {
      list: [],
      activeIndex: 0
    }
  },
  methods: {
    async getCategoryList () {
      const { data: { list } } = await getCategoryData()
      console.log(list)
      this.list = list
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.category {
  padding-top: 100px;
  padding-bottom: 50px;
  height: 100vh;

  .list-box {
    height: 100%;
    display: flex;

    .right {
      flex: 1;
      height: 100%;
      background-color: #ffffff;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      padding: 10px 0;
      overflow: auto;

      .cate-goods {
        width: 33.3%;
        margin-bottom: 10px;

        img {
          width: 70px;
          height: 70px;
          display: block;
          margin: 5px auto;
        }

        p {
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}

.van-sidebar-item {
  font-size: 11px;
  font-weight: bold;
}
</style>
