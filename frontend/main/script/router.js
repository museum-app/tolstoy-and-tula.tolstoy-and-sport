import Vue from 'vue'
import VueRouter from 'vue-router'

import Start from ':main/view/Start'
import List from ':main/view/List'

export default router()

function router () {
	Vue.use(VueRouter)

	return new VueRouter({
		base: '/',
		mode: 'hash',
		routes: [
			{
				path: '/',
				redirect: '/start'
			},

			{
				path: '/start',
				component: Start
			},

			{
				path: '/list',
				component: List
			}
		]
	})
}