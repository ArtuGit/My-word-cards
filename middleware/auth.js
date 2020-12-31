export default function (context) {
  console.log('[Middleware] Just Auth')
  console.log(!context.store.getters)
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/auth')
  }
}
