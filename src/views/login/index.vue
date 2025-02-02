<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="PhoneNumber" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="InputPicCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="GetedPicUrl" :src="GetedPicUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="InputMsgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{ NowIntervalSecond === IntervalSecond ? '获取验证码' : NowIntervalSecond + '秒后重新发送'
            }}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { axiosGetPic, axiosGetMsgCode, axiosLogin } from '@/api/login'
export default {
  data () {
    return {
      InputPicCode: 'abcd',
      GetedPicKey: '',
      GetedPicUrl: '',
      IntervalId: null,
      IntervalSecond: 60,
      NowIntervalSecond: 60,
      PhoneNumber: '13000000000',
      InputMsgCode: '246810'
    }
  },
  name: 'LoginPage',
  async created () {
    this.getPicCode()
  },
  destroyed () {
    // 离开页面清除定时器
    clearInterval(this.IntervalId)
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await axiosGetPic()
      this.GetedPicUrl = base64
      this.GetedPicKey = key
      // const res = await axiosGetPic()
      // console.log(res)
    },
    async getCode () {
      if (!this.validPhoneNumberAndPicCode()) {
        return
      }
      if (!this.IntervalId && this.NowIntervalSecond === this.IntervalSecond) {
        await axiosGetMsgCode(this.InputPicCode, this.GetedPicKey, this.PhoneNumber)
        this.$toast('发送成功，请注意查收')
        this.IntervalId = setInterval(() => {
          // console.log(111)
          this.NowIntervalSecond--
          if (this.NowIntervalSecond <= 0) {
            clearInterval(this.IntervalId)
            this.IntervalId = null
            this.NowIntervalSecond = this.IntervalSecond
          }
        }, 1000)
      }
    },
    validPhoneNumberAndPicCode () {
      const reg = /^(?:(?:\+|00)86)?1\d{10}$/
      if (!reg.test(this.PhoneNumber)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.InputPicCode)) {
        this.$toast('请输入正确验证码')
        return false
      }
      return true
    },
    async login () {
      if (!this.validPhoneNumberAndPicCode()) {
        return
      }
      if (!/^\d{6}$/.test(this.InputMsgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const msg = await axiosLogin(this.PhoneNumber, this.InputMsgCode)
      this.$store.commit('user/setUserInfo', msg.data)
      this.$toast(msg.message)
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      cursor: pointer;
      width: 94px;
      height: 31px;
    }

    button {
      cursor: pointer;
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    cursor: pointer;
    user-select: none;
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
