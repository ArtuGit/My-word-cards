export default async function (context) {
  // console.log('[Middleware] Check Auth')
  await context.store.dispatch('auth/initAuth', context.req)
}
