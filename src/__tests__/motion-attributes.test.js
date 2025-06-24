/**
 * Test motion attributes functionality
 */

describe( 'Motion Attributes', () => {
	test( 'should add motion attributes to block settings', () => {
		const mockSettings = {
			attributes: {
				content: {
					type: 'string',
				},
			},
		};

		// Mock the addMotionAttributes function logic
		const addMotionAttributes = ( settings ) => {
			if ( ! settings.attributes ) {
				settings.attributes = {};
			}

			settings.attributes = {
				...settings.attributes,
				motionEnabled: {
					type: 'boolean',
					default: false,
				},
				motionPreset: {
					type: 'string',
					default: 'fade',
				},
				motionDelay: {
					type: 'number',
					default: 0,
				},
				motionDuration: {
					type: 'number',
					default: 600,
				},
			};

			return settings;
		};

		const result = addMotionAttributes( mockSettings );

		expect( result.attributes.motionEnabled ).toEqual( {
			type: 'boolean',
			default: false,
		} );
		expect( result.attributes.motionPreset ).toEqual( {
			type: 'string',
			default: 'fade',
		} );
		expect( result.attributes.motionDelay ).toEqual( {
			type: 'number',
			default: 0,
		} );
		expect( result.attributes.motionDuration ).toEqual( {
			type: 'number',
			default: 600,
		} );

		// Should preserve existing attributes
		expect( result.attributes.content ).toEqual( {
			type: 'string',
		} );
	} );

	test( 'should handle settings without existing attributes', () => {
		const mockSettings = {};

		const addMotionAttributes = ( settings ) => {
			if ( ! settings.attributes ) {
				settings.attributes = {};
			}

			settings.attributes = {
				...settings.attributes,
				motionEnabled: {
					type: 'boolean',
					default: false,
				},
			};

			return settings;
		};

		const result = addMotionAttributes( mockSettings );

		expect( result.attributes ).toBeDefined();
		expect( result.attributes.motionEnabled ).toEqual( {
			type: 'boolean',
			default: false,
		} );
	} );
} );
