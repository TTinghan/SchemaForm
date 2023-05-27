import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
export default async ({
  Vue,
  isServer
}) => {
  Vue.use(ElementUI)
  if (!isServer) {
    await import('../../').then(function(m){
      Vue.use(m)
    })
  }
}
