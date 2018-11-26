export default ({store, req}) => {
  console.log('[Middleware] Check Auth')
    store.dispatch('initAuth', req)
}
