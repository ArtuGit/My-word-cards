export default function (context) {
  // console.log('[Middleware] Just Auth')
  if (!context.store.getters['auth/isAuthenticated']) {
    let path = '/auth'
    if (context.route.name) {
      path = path + '?redirect=' + context.route.name
    }
    context.redirect(path)
  }
}
