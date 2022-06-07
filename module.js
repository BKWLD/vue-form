import path from 'path'

export default function vueFormModule(moduleOptions) {
	// Register the plugin
	this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}