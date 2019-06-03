global.test = {
	utils: {
		hooks: {
			formatType: [],
			filters: [],
		},
	},
};
global.wp = {};
global.wp.richText = {
	registerFormatType: ( name, setting ) => {
		global.test.utils.hooks.formatType.push( { name, setting } );
	},
	toggleFormat: ( value, attributes ) => ( {
		value, attributes,
	} ),
};
global.wp.element = {
	createElement: () => {
	},
	Fragment: () => {
	},
};
global.wp.components = {
	createSlotFill: () => ( {
		Fill: {},
		Slot: {},
	} ),
};
global.wp.editor = {
	BlockFormatControls: () => {
	},
};
global.wp.hooks = {
	addFilter: ( hook, hookName, render ) => {
		global.test.utils.hooks.filters.push( { hook, hookName, render } );
	},
};
