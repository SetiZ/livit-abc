<template>
	<webview id="foo" :src="url" style="display:inline-flex; width:640px; height:480px"></webview>
</template>

<script>
  export default {
    name: 'view',
    props: ['url']
  }
</script>

<style scoped>
	
</style>