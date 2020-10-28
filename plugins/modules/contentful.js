const contentful = require('contentful')
/* 
const config = {
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
}
console.log(config) */
// export const createClient = (config) => contentful.createClient(config)
export default (context, inject) => {
  if (!context) return
  const { app } = context
  return contentful.createClient({
    accessToken: app.$config.CTF_CDA_ACCESS_TOKEN,
    space: app.$config.CTF_SPACE_ID,
  })
}
