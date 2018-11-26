import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
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
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
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
      addPost({ commit, state }, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date(),
        }
        return this.$axios
          .$post(`posts.json?auth=${ state.token }`, createdPost)
          .then((data) => {
            commit('addPost', {
              ...createdPost,
              id: data.name,
            })
            this.$router.push('/admin')
          })
          .catch(error => console.log(error))
      },
      editPost({ commit, state }, editedPost) {
        return this.$axios
          .$put(`posts/${ editedPost.id }.json?auth=${ state.token }`, editedPost)
          .then(() => commit('editPost', editedPost))
          .catch(error => console.log(error))
      },
      authenticateUser({ commit, dispatch }, authData) {
        let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
        if (!authData.isLogin) {
          authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='
        }
        return this.$axios
          .$post(authUrl + 'AIzaSyAdS89o5BH29ycx6ufgHi2AxGh9xQwi-rk', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then(res => {
            commit('setToken', res.idToken)
            localStorage.setItem('token', res.idToken)
            localStorage.setItem('tokenExpiration', new Date().getTime() + +res.expiresIn * 1000)
            Cookie.set('jwt', res.idToken)
            Cookie.set('expirationDate', new Date().getTime() + +res.expiresIn * 1000)
          })
          .catch(error => console.log(error))
      },
      initAuth({ commit, dispatch }, req) {
        let token
        let expirationDate

        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(el => el.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(el => el.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')
          dispatch('logout')
          return
        }
        commit('setToken', token)
      },
      logout({commit}) {
        commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token !== null
      },
    },
  })
}
export default createStore
