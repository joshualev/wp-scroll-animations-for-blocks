const defaultConfig = require("@wordpress/scripts/config/webpack.config");

// Handle both single config and array of configs (experimental modules)
if (Array.isArray(defaultConfig)) {
	// When using experimental modules, wp-scripts returns an array
	// [0] is for regular scripts, [1] is for modules
	const [scriptConfig, moduleConfig] = defaultConfig;

	module.exports = [
		// Regular script config for editor
		{
			...scriptConfig,
			entry: {
				index: ["./src/index.js"]
			}
		},
		// Module config for frontend
		{
			...moduleConfig,
			entry: {
				frontend: "./src/frontend.js"
			}
		}
	];
} else {
	// Fallback for when not using experimental modules
	module.exports = {
		...defaultConfig,
		entry: {
			index: ["./src/index.js"],
			frontend: "./src/frontend.js"
		}
	};
}
