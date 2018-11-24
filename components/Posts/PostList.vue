<template>
  <section class="post-list">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      title="My Awesome Title"
      previewText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, temporibus?"
      thumbnail="https://static.techspot.com/images2/news/bigimage/2018/07/2018-07-10-image-35.jpg"
    />
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      title="My Awesome Title"
      previewText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, temporibus?"
      thumbnail="https://static.techspot.com/images2/news/bigimage/2018/07/2018-07-10-image-35.jpg"
    />
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      title="My Awesome Title"
      previewText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, temporibus?"
      thumbnail="https://static.techspot.com/images2/news/bigimage/2018/07/2018-07-10-image-35.jpg"
    />
  </section>
</template>

<script>
  import PostPreview from '~/components/Posts/PostPreview'

  export default {
    name: 'PostList',
    props: {
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    components: {
      PostPreview,
    },
  }
</script>

<style scoped>
  .post-list {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>
