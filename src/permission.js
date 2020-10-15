/**
 * 全站权限配置
 *
 */
import router from './router/router'
import store from '@/store'
import { validatenull } from '@/util/validate'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  const meta = to.meta || {}
  const value = to.query.src || to.fullPath
  const label = to.query.name || to.name
  if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
    store.commit('ADD_TAG', {
      label: label,
      value: value,
      params: to.params,
      query: to.query,
      group: router.$avueRouter.group || []
    })
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
  const title = store.getters.tag.label
  router.$avueRouter.setTitle(title)
})
