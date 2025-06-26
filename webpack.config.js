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
				editor: ["./src/editor-view.tsx"]
			}
		},
		// Module config for frontend
		{
			...moduleConfig,
			entry: {
				frontend: "./src/frontend-view.ts"
			}
		}
	];
} else {
	// Fallback for when not using experimental modules
	module.exports = {
		...defaultConfig,
		entry: {
			editor: ["./src/editor-view.tsx"],
			frontend: "./src/frontend-view.ts"
		}
	};
}
