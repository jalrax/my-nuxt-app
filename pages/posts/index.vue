<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts"/>
  </div>
</template>

<script>
  import PostList from '~/components/Posts/PostList'

  export default {
    name: 'index',
    components: {
      PostList,
    },
    fetch(context) {
      if (context.store.state.loadedPosts.length > 0) {
        return null
      }
    },
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts
      }
    }
  }
</script>

<style scoped>
  .posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
