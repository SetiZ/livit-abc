<template>
  <div>
    <button className="button button--pinterest" @click="pinLogin">Log in</button>
    <router-link to='/landing'>landing</router-link>
  </div>
</template>

<script>
  import pinterest from './LandingPage/Pinterest'

  export default {
    name: 'login-page',
    // components: { SystemInformation, Pinterest },
    mounted (route, redirect, next) {
      window.PDK.init({ appId: '4930170613951121384', cookie: true })
      // window.PDK.init({ appId: pinterest.PIN_APP, cookie: true })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      pinLogged (token) {
        console.log('logged:', token.accessToken)
        // console.log(this.$route)
        // this.$route.push('landing-page')
        window.PDK.request('/v1/me/boards/', { fields: pinterest.PIN_FIELDS }, () => {
          console.log(window.PDK)
        })
      },
      pinLogin () {
        // pinterest.login(function () {
        //   console.log(window.PDK.getSession())
        // })
        // window.location.hash.
        // window.PDK.me('boards', { fields: 'id,name,image[small]' }, function () {
        //   console.log('boards')
        // })
        let self = this
        // window.PDK.login({ scope: 'read_public, write_public' }, function () {
        //   console.log('login')
        //   that.pinLogged(window.PDK.getSession())
        // })
        window.PDK.login({ scope: 'read_public, write_public' }, function () {
          console.log('login')
          self.pinLogged(window.PDK.getSession())
        })
        // console.log('pinLogin')
        // console.log(pinterest.Pinterest)
        // let pin = Pinterest.Pinterest.loggedIn()
        // console.log(pin)
        // let pinterest = Pinterest.Pinterest
        // Pinterest.Pinterest
      }
    }
  }
</script>

<style scoped>
	
</style>