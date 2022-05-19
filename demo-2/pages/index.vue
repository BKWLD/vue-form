<!-- Standard Block renderer -->

<template lang='pug'>

article

	//- Layout stuff
	header.max-w.pad
		a.logo(href='https://github.com/BKWLD/vue-form')
			h1 vue-form
		h3 Vue 2 forms with support for styling, accessibility, and validation.

	article.max-w
		.cols
			.col
				h2 Simple example
				ul
					li Two inputs
					li No labels -- placeholders only
					li Simple validation

				code-highlight(language='pug'): pre.
					// 'onSubmit' is a component method
					vue-form(:submit='onSubmit' id='form1')
						h2 Manage your growing business with us!
						p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
						input-field(
							name='name'
							placeholder='First and last name'
							:rules='["required"]'
						)
						input-field(
							name='email'
							placeholder='Email'
							:rules='["required", "email"]'
						)
						btn(type='submit') Submit
			.col
				vue-form(:submit='onSubmit' id='form1')
					h2 Manage your growing business with us!
					p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
					input-field(
						name='form1name'
						placeholder='Your name'
						:rules='["required"]'
					)
					input-field(
						name='form1email'
						placeholder='Email address'
						:rules='["required", "email"]'
					)
					select-field(
						placeholder='Where did you hear about us?'
						name='form1select'
						:options='["Website", "Twitter", "Podcast", "Word of mouth"]'
					)

					checkbox-field(
						label='Please sign me up for your newsletter!'
						name='form1check'
						:rules='["required"]'
					)


					btn(type='submit') Submit

	transition(name='modal'): .modal(v-if='showModal')
		.modal-overlay
		.modal-inner: h2 Submit handler


	//- The article
	//- nuxt-content.max-w(:document='page')

	//- p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import pageMixin from '@bkwld/cloak/mixins/page'
import { VueForm, InputField, SelectField, CheckboxField } from '../../index.js'
import { component as CodeHighlight } from 'vue-code-highlight'
import 'prism-es6/components/prism-pug'
import 'prism-themes/themes/prism-one-dark.css'
# import 'prism-themes/themes/prism-coldark-dark.css'
# import 'vue-code-highlight/themes/window.css'


export default
	name: 'Page'

	mixins: [ pageMixin ]

	components: {
		VueForm
		InputField
		SelectField
		CheckboxField
		CodeHighlight
	}

	data: ->
		showModal: false

	# Get Tower data
	asyncData: ({ app, params, $content }) ->

		# Don't query for these paths
		return app.$notFound() if params.tower in [ '__webpack_hmr' ]

		# Get data
		page = await $content(params.tower || 'home').fetch()
		return app.$notFound() unless page

		# Set data
		return { page }

	methods:
		onSubmit: ->
			@showModal = true
			setTimeout () =>
				@showModal = false
			, 1500

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>
base-radius = 16px

article
	style-body()

	// ::selection
	// 	background rgba(sunshine-yellow, 0.6)

header
	margin-top 100px
	margin-bottom 40px

h1
	style-h1()
	margin-bottom 20px
h2
	style-h2()
	margin-bottom 20px
h3
	style-h3()
	margin-bottom 20px

.cols
	width 100%
	display flex
	// Remove gutters
	fluid padding-v, 40, 20
	fluid padding-h, 20, 10
	margin-bottom 20px
	background grey

	+tablet-up()
		flex-direction row
	+tablet-down()
		flex-direction column

.col
	fluid padding-h, 20, 10

	+tablet-up()
		width 50%
	+tablet-down()
		width 100%

.vf-form
	margin 0
	width 100%
	// border 1px solid rgba(black, 0.3)
	background white
	fluid padding, 30, 20
	border-radius base-radius
	box-shadow 0px 10px 30px rgba(black, 0.1)

	p
		padding-bottom 16px

ul
	list-style-type disc
	padding-left 20px
	padding-bottom 20px

// Modal
.modal
	expand()
	position fixed

.modal-overlay
	expand()
	background rgba(black, 0.2)

.modal-inner
	center()
	background white
	width 600px
	text-align center
	fluid padding, 30, 20
	border-radius 16px
	box-shadow 0px 10px 30px rgba(black, 0.1)

	h2
		margin-bottom 10px

.modal-enter-active, .modal-leave-active
	transition opacity 150ms

.modal-enter, .modal-leave-to // Out state
	opacity 0

// Prism code highlighter
>>>
	pre[class*="language-"]
		border-radius (base-radius/2)

	pre[class*="language-"], code[class*="language-"]
		background darken(black, 60%)
		background desaturate( darken(blue, 80%), 30% )
		text-shadow none
	.token.operator
		background none


</style>
