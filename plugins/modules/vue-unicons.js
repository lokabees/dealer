import Vue from 'vue'
import Unicon from 'vue-unicons/dist/vue-unicons-ssr.common.js'
import { uniFacebookF, uniGoogle, uniBars } from 'vue-unicons/src/icons'
import 'vue-unicons/dist/vue-unicons-ssr.css'

Unicon.add([uniFacebookF, uniGoogle, uniBars])
Vue.use(Unicon)
