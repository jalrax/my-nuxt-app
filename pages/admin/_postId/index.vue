<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost"/>
    </section>
  </div>
</template>

<script>
  import AdminPostForm from '~/components/Admin/AdminPostForm'

  export default {
    name: 'index',
    layout: 'admin',
    components: {
      AdminPostForm
    },
    data() {
      return {
        loadedPost: {
          author: 'Serge',
          title: 'My awesome Post',
          thumbnailLink: 'https://clsimplex.com/images/releases/headers/quality-code.jpg',
          content: 'Super amazing, thanks for that!',
        }
      }
    },
  }
</script>

<style scoped>
  .update-form {
    width: 90%;
    margin: 20px auto;
  }
  @media (min-width: 768px) {
    .update-form {
      width: 500px;
    }
  }
</style>
