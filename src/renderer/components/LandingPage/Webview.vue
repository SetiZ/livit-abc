<template>
	<webview id="foo" :src="url"></webview>
</template>

<script>
  export default {
    name: 'view',
    props: ['url']
  }
</script>

<style scoped>
	#foo {
		display: inline-flex;
		width: 100%;
		height: 400px;
		margin-top: 10px;
		border: 1px solid #000;
	}
</style>