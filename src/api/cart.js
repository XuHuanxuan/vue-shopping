import request from '@/utils/request'

// 添加商品到购物车
export const axiosAddCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const axiosCartlist = () => {
  return request.get('/cart/list')
}

// 购物车商品更新
export const axiosChangeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const axiosDelSelect = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
