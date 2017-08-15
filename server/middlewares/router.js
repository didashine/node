import Router from 'koa-router'
import config from '../config'
import sha1 from 'sha1'

export const router = app => {
  const router = new Router()
  router.get('/wechat_hear', async ( ctx, next ) => {
    const token = config.wechat.token
    const {
      signature,   // 签名
      nonce,     // 随机数
      timestamp,    // 时间戳
      echostr
    } = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)

    if (sha === signature) {
      ctx.body = echostr
    } else {
      ctx.body = 'Failed'
    }
  })

  app.use(router.routes())
  app.use(router.allowedMethods())
}