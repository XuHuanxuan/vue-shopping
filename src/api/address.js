import request from '@/utils/request'

export const axiosAddressList = () => {
  return request.get('/address/list')
}
