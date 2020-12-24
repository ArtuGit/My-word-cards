export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage({ content = '', color = '' }) {
      store.commit('cards/showMessage', { content, color })
    },
  })
}
