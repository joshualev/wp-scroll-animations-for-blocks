const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

// Shared resolve configuration
const resolveConfig = {
	alias: {
		"@": path.resolve(__dirname, "src")
	}
};

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
				editor: [
					"./src/editor/block-controls/index.tsx",
					"./src/editor/global-controls/index.tsx"
				]
			},
			resolve: {
				...scriptConfig.resolve,
				...resolveConfig
			}
		},
		// Module config for frontend
		{
			...moduleConfig,
			entry: {
				frontend: "./src/frontend/frontend.ts"
			},
			resolve: {
				...moduleConfig.resolve,
				...resolveConfig
			}
		}
	];
} else {
	// Fallback for when not using experimental modules
	module.exports = {
		...defaultConfig,
		entry: {
			editor: [
				"./src/editor/block-controls/index.tsx",
				"./src/editor/global-controls/index.tsx"
			],
			frontend: "./src/frontend/frontend.ts"
		},
		resolve: {
			...defaultConfig.resolve,
			...resolveConfig
		}
	};
}
