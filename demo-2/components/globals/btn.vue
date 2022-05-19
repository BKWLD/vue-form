<!-- Standard pill button -->

<script lang='coffee'>
export default

	props:

		# URL to link to
		to: String

		# Size of the button
		size:
			type: String
			default: 'normal'
			validator: (val) -> val?.toLowerCase() in [
				'small'
				'normal'
			]

		# If a <button>, what type is it
		type:
			type: String
			default: 'button'
			validator: (val) -> val?.toLowerCase() in [
				'button'
				'submit'
				'reset'
			]

		# Fill
		fill:
			type: String
			default: 'solid'
			validator: (val) -> val?.toLowerCase() in [
				'solid'
				'outline'  # Transparent fill with `color` text and stroke
				'inverted' # White solid fill with `color` text
			]

		# Color
		color:
			type: String
			default: 'auto'
			validator: (val) -> val?.toLowerCase() in [
				'auto'
				'blue'
				'green'
				'yellow'
				'orange'
				'purple'
				'grey'
			]

		# Icon
		icon:
			type: String
			validator: (val) -> val?.toLowerCase() in [
				''
				'arrow'
			]

		# States
		loading: Boolean
		disabled: Boolean

	computed:

		# Root classes
		classes: -> [
			# Size class
			if @size then "size-#{@size}"
			# Color class
			if @color then "color-#{@color}"
			# Fill class
			if @fill then "fill-#{@fill}"
			loading: @loading
		]

		iconClasses: ->
			switch @icon?.toLowerCase()
				when 'arrow' then return 'icon-arrow-right'

		# States that should supress clicks
		nonInteractive: -> @disabled or @loading

	methods:

		# Prevent clicking if non-interactive
		onClick: (e) ->
			if @nonInteractive
			then e.preventDefault()
			else @$emit 'click'

	# Conditionally change the root button type
	render: (create) ->

		# Make the shared data object
		data =
			class: ['btn', ...@classes]
			domProps: disabled: @nonInteractive
			on: click: @onClick

		# The contents of the button
		children = [
			create 'span', class: 'shape'
			create 'span', class: 'slot', @$nonEmpty [
				@$slots.default
				if @loading then create 'span', class: 'icon-spinner'
			]
			if @iconClasses then create 'span', class: "icon #{@iconClasses}"
		]

		# Render a smart-link
		if @to
			create 'smart-link', {
				...data
				props: { @to }
			}, children

		# Render an html button
		else
			create 'button', {
				...data
				domProps: {
					...data.domProps
					@type
				}
			}, children

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

hover-darken-factor = 3%

.btn

	// Set height
	position relative
	&.size-small
		height btn-small-h
	&.size-normal
		+tablet-up()
			height btn-desktop-h
		+tablet-down()
			height btn-mobile-h

	// Center contents
	display inline-flex
	align-items center
	justify-content center
	text-align center

	// Clear possibly inheritted underline
	text-decoration none

	// Disable cursor when disabled
	&[disabled]
		cursor default

	// Add hover/active effects
	&:not([disabled])
		+btn-hover(true)
			.shape
				background darken(primary-color, hover-darken-factor)
				transform scale(1.02, 1.04)
		+active()
			.shape.shape // Double class to override hover
				// transition transform 100ms ease-out-quint, background 100ms linear
				transition-duration 150ms
				transform scale(1)

		// Add focus state
		.js-focus-visible &.focus-visible:focus
			outline none
			.shape
				background darken(primary-color, hover-darken-factor)
				outline 2px solid rgba(white, 1)
				outline-offset 2px

	// Prevent content from spilling out
	// overflow hidden

	// Typography
	color black
	fluid font-size, body-font-size, body-font-size-min
	font-weight-bold()

ease-out-back-3 = cubic-bezier(0.2, 2.0, 0.7, 0.9);  // Faster start

// Make backgound state
.shape
	expand()
	background-color primary-color
	transition transform 300ms ease-out-back-3, background 100ms linear, box-shadow 200ms
	+tablet-up()
		border-radius btn-desktop-h * 0.5
	+tablet-down()
		border-radius btn-mobile-h * 0.5
		&.size-small
			height btn-small-h * 0.5

	// Disabled state
	[disabled] &
		background-color grey-bkgd


.btn
	// Define slot padding (use CSS var because .icon uses this too)
	fluid --slot-padding-h, btn-pad-h, btn-pad-h-min
	&.size-small
		fluid --slot-padding-h, btn-pad-h, btn-pad-h-small

.slot

	// Align slotted stuff
	flex-center()

	// Overlap the shape
	position relative

	// Push edges away
	padding-h var(--slot-padding-h)

.icon-spinner
	margin-left 7px
	font-size 0.8em
	animation spin 0.5s linear infinite

	// Transition effects
	&.v-enter-active, &.v-leave-active
		transition opacity 0.1s
	&.v-enter, &.v-leave-to
		opacity 0

// Icon layout
.icon
	position relative
	left calc(-1 * var(--slot-padding-h))
	top 1px
	padding-left 0.8em
	font-size 0.75em

// Arrow icon hover
.icon-arrow-right
	transition transform 200ms ease-out-back-2, opacity 100ms linear
	transform translateX(0)

.btn
	+btn-hover()
		.icon-arrow-right
			transform translateX(3px)


//////////////////////////////////////////////////////////////////
// Themes (fill="solid")

theme-fill-solid(bg-color)
	.shape
		background-color bg-color

	+btn-hover()
		.shape
			background-color darken(bg-color, hover-darken-factor)

	// Add focus state
	.js-focus-visible &.focus-visible:focus
		.shape
			background-color darken(bg-color, hover-darken-factor)
			outline-color bg-color

.fill-solid
	generate-themes(theme-fill-solid, 'color')

// When color="auto", inherit the wrapper block's accent color
.color-auto.fill-solid
	generate-ancestor-themes(theme-fill-solid, 'accent')


//////////////////////////////////////////////////////////////////
// Themes (fill="outline")

theme-fill-outline(bg-color)
	color bg-color

	.shape
		border 2px solid bg-color
		background-color transparent

	+btn-hover()
		color white

		.shape
			background-color darken(bg-color, hover-darken-factor)
			border 2px solid darken(bg-color, hover-darken-factor)

	// Add focus state
	.js-focus-visible &.focus-visible:focus
		color white

		.shape
			background-color darken(bg-color, hover-darken-factor)
			border 2px solid darken(bg-color, hover-darken-factor)
			outline-color bg-color

.fill-outline
	generate-themes(theme-fill-outline, 'color')

// When color="auto", inherit the wrapper block's accent color
.color-auto.fill-outline
	generate-ancestor-themes(theme-fill-outline, 'accent')


//////////////////////////////////////////////////////////////////
// Themes (fill="inverted")

theme-fill-inverted(bg-color)
	color bg-color

	.shape
		background-color white

	+btn-hover()
		.shape
			background-color white

	// Add focus state
	.js-focus-visible &.focus-visible:focus
		.shape
			background-color white

.fill-inverted
	generate-themes(theme-fill-inverted, 'color')

// When color="auto", inherit the wrapper block's accent color
.color-auto.fill-inverted
	generate-ancestor-themes(theme-fill-inverted, 'accent')



</style>
