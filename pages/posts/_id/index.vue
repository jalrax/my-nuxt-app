<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">Last updated on {{ loadedPost.updatedDate }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think about the post, send a mail to <a href="mailto:feedback@my-awesome-domain.com">feedback@my-awesome-domain.com</a></p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'index',
    asyncData(context, callback) {
      setTimeout(() => {
        callback(null, {
          loadedPost: {
            id: '1',
            title: 'First Post (ID: ' + context.route.params.id + ')',
            previewText: 'This is our first post',
            author: 'Serge',
            updatedDate: new Date(),
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, voluptatem.',
            thumbnail: 'https://previews.123rf.com/images/elen1/elen11704/elen1170400248/75919754-placa-de-circuito-la-tecnolog%C3%ADa-electr%C3%B3nica-hardware-del-equipo-chips-digitales-placa-base-fondo-tech-pro.jpg',
          },
        })
      }, 1500)
    },
  }
</script>

<style scoped>
  .single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
  }

  .post {
    width: 100%;
  }

  @media (min-width: 768px) {
    .post {
      width: 600px;
      margin: auto;
    }
  }

  .post-title {
    margin: 0;
  }

  .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .post-details {
      flex-direction: row;
    }
  }

  .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
  }

  .post-feedback a {
    color: red;
    text-decoration: none;
  }

  .post-feedback a:hover,
  .post-feedback a:active {
    color: salmon;
  }
</style>
