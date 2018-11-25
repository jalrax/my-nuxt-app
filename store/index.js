import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(el => el.id === editedPost.id)
        state.loadedPosts[postIndex] = editedPost
      },
    },
    actions: {
      nuxtServerInit({ commit }, context) {
        return context.app.$axios
          .$get('posts.json')
          .then(data => {
            const postsArray = []
            for (const key of Object.keys(data)) {
              postsArray.push({
                ...data[key],
                id: key,
              })
            }
            commit('setPosts', postsArray)
          })
          .catch(error => context.error(error))
      },
      setPosts({ commit }, posts) {
        commit('setPosts', posts)
      },
      addPost({ commit }, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date(),
        }
        return this.$axios
          .$post('posts.json', createdPost)
          .then((data) => {
            commit('addPost', {
              ...createdPost,
              id: data.name,
            })
            this.$router.push('/admin')
          })
          .catch(error => console.log(error))
      },
      editPost({ commit }, editedPost) {
        return this.$axios
          .$put(`posts/${ editedPost.id }.json`, editedPost)
          .then(() => commit('editPost', editedPost))
          .catch(error => console.log(error))
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
    },
  })
}
export default createStore
