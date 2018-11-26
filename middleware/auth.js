export default ({store, redirect}) => {
  console.log('[Middleware] Auth')
  if (!store.getters.isAuthenticated) {
    redirect('/admin/auth')
  }
}
