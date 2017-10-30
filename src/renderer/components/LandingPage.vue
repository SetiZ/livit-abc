<template>
  <div id="wrapper">
    <main>
      <div class="content" v-if="!Logged">
        <span class="title">
          Welcome to the new project!
        </span>
        <div class="doc">
          <button className="button" @click="pinLogin">Log in</button>
        </div>
      </div>

      <div class="content grid" v-if="Logged && !WebviewUrl">
        <Pinterest v-for="board in Suggested" :board="board" @url="webview"></Pinterest>
      </div>
      <div class="content" v-if="WebviewUrl">
        <div class="doc">
          <button className="button" @click="emptyUrl">Back</button>
        </div>
        <Webview :url="WebviewUrl"></Webview>
      </div>
    </main>
  </div>
</template>

<script>
  import Pinterest from './LandingPage/Pinterest'
  import Webview from './LandingPage/Webview'

  export default {
    name: 'landing-page',
    components: { Pinterest, Webview },
    data () {
      return {
        PIN_APP: '4930170613951121384',
        PIN_FIELDS: 'id,name,image[medium],url,description',
        PIN_SCOPE: 'read_public, write_public',
        BACKEND_URL: 'https://api.pinterest.com/v1/',
        Logged: false,
        Suggested: [],
        WebviewUrl: ''
      }
    },
    mounted (route, redirect, next) {
      window.PDK.init({ appId: this.PIN_APP, cookie: true })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      pinLogin () {
        let self = this
        window.PDK.login({ scope: this.PIN_SCOPE }, function () {
          console.log('login')
          self.pinLogged(window.PDK.getSession())
          self.pinBoards()
        })
      },
      pinLogged (token) {
        console.log('logged:', token.accessToken)
        this.Logged = true
      },
      pinBoards () {
        let self = this
        console.log('boards')
        window.PDK.me('boards', { fields: this.PIN_FIELDS }, function (response) {
          // console.log(response)
          self.Suggested = response.data
          console.log(self.Suggested)
        })
      },
      webview: function (url) {
        console.log(url)
        this.WebviewUrl = url
      },
      emptyUrl: function () {
        this.WebviewUrl = ''
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: content-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 84vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 100%; }

  .content {
    display: flex;
    flex-direction: column;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 20px;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
