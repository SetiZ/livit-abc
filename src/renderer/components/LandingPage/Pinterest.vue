<template>
  <div class="item" :id="board.id">
    <a @click="webview">
      <div class="title">{{board.name}}</div>
      <div class="name">{{board.description}}</div>
      <div v-if="photoUrl">
        <img class="image" :src="board.image.medium.url" :width="board.image.medium.width" :height="board.image.medium.height"/>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'board',
    props: ['board'],
    data () {
      return {
        url: ''
      }
    },
    computed: {
      photoUrl: function () {
        return this.board.image.medium.url || false
      }
    },
    methods: {
      webview: function () {
        this.$emit('url', this.board.url)
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items {
    margin-top: 8px;
  }

  .item {
    flex: 1 1 200px;  
    margin-bottom: 6px;
    background-color: #efefef;
    border-radius: 8px;
    padding-left: 10px;
    cursor: pointer;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
    margin-bottom: 6px;
  }

  .item .image {
    margin: 10px auto;
    display: block;
  }

  a {
    text-decoration: none;
    color: #888;
  }
</style>