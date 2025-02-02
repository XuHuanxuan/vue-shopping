<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model="searchFieldIndex" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goSearch(searchFieldIndex)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="historySearch.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clearHistorySearch" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div v-for="item in historySearch" class="list-item" @click="goSearch(item)" :key="item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      historySearch: getHistoryList(),
      searchFieldIndex: ''
    }
  },
  methods: {
    goSearch (key) {
      // console.log(key)
      if (key === '') {
        return
      }
      const index = this.historySearch.indexOf(key)
      if (index !== -1) {
        this.historySearch.splice(index, 1)
      }
      this.historySearch.unshift(key)
      setHistoryList(this.historySearch)

      // 跳转搜索列表页
      this.$router.push(`/searchlist?search=${key}`)
    },
    clearHistorySearch () {
      this.historySearch = []
      setHistoryList([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }

  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    cursor: pointer;
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
