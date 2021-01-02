export default function (context) {
  // console.log('[Middleware] Just Auth')
  if (!context.store.getters['auth/isAuthenticated']) {
    context.redirect('/auth')
  }
}
