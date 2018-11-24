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
    },
    actions: {
      nuxtServerInit({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('setPosts', [
              {
                id: '1',
                title: 'First Post',
                previewText: 'This is our first post',
                thumbnail: 'https://previews.123rf.com/images/elen1/elen11704/elen1170400248/75919754-placa-de-circuito-la-tecnolog%C3%ADa-electr%C3%B3nica-hardware-del-equipo-chips-digitales-placa-base-fondo-tech-pro.jpg',
              },
              {
                id: '2',
                title: 'Second Post',
                previewText: 'This is our second post',
                thumbnail: 'https://previews.123rf.com/images/elen1/elen11704/elen1170400248/75919754-placa-de-circuito-la-tecnolog%C3%ADa-electr%C3%B3nica-hardware-del-equipo-chips-digitales-placa-base-fondo-tech-pro.jpg',
              },
              {
                id: '3',
                title: 'Third Post',
                previewText: 'This is our third post',
                thumbnail: 'https://previews.123rf.com/images/elen1/elen11704/elen1170400248/75919754-placa-de-circuito-la-tecnolog%C3%ADa-electr%C3%B3nica-hardware-del-equipo-chips-digitales-placa-base-fondo-tech-pro.jpg',
              },
            ])
            resolve()
          }, 1500)
        })
      },
      setPosts({ commit }, posts) {
        commit('setPosts', posts)
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
