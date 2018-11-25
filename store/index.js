import Vuex from 'vuex'
import axios from 'axios'

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
        return axios
          .get('https://nuxt-app-ac0bc.firebaseio.com/posts.json')
          .then(res => {
            const postsArray = []
            for (const key of Object.keys(res.data)) {
              postsArray.push({
                ...res.data[key],
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
        return axios
          .post('https://nuxt-app-ac0bc.firebaseio.com/posts.json', createdPost)
          .then((result) => {
            commit('addPost', {
              ...createdPost,
              id: result.data.name,
            })
            this.$router.push('/admin')
          })
          .catch(error => console.log(error))
      },
      editPost({ commit }, editedPost) {
        return axios
          .put(`https://nuxt-app-ac0bc.firebaseio.com/posts/${ editedPost.id }.json`, editedPost)
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
