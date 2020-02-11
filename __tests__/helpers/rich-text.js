import { PLUGIN_NAME } from '../../src/constant';
import { registerMultipleClassFormatType, getFormatName, getRemoveFormatButton } from '../../src/helpers';

describe('registerMultipleClassFormatType', () => {
	it('should not null if succeeded registration', () => {
		expect(registerMultipleClassFormatType('rich-text/test1-1', {
			tagName: 'span',
			className: 'test1-1',
			title: 'test1-1',
		})).not.toBeNull();
		expect(registerMultipleClassFormatType('rich-text/test1-2', {
			tagName: 'span',
			className: 'test1-2 test1-22',
			title: 'test1-2',
			keywords: ['test1-2'],
		})).not.toBeNull();
		expect(registerMultipleClassFormatType('rich-text/test1-3', {
			tagName: 'span',
			className: null,
			title: 'test1-3',
		})).not.toBeNull();
	});

	it('should null if invalid name', () => {
		expect(registerMultipleClassFormatType(1, {})).toBeNull(); // eslint-disable-line no-magic-numbers
		expect(registerMultipleClassFormatType('test2-2', { name: 2 })).toBeNull();
		expect(registerMultipleClassFormatType('test2-3', {})).toBeNull();
		expect(registerMultipleClassFormatType('123rich-text/test2-4', {})).toBeNull();
	});

	it('should null if invalid tagName', () => {
		expect(registerMultipleClassFormatType('rich-text/test3-1', {})).toBeNull();
		expect(registerMultipleClassFormatType('rich-text/test3-2', {
			tagName: 1,
		})).toBeNull();
	});

	it('should null if invalid className', () => {
		expect(registerMultipleClassFormatType('rich-text/test3-1', {
			tagName: 'span',
		})).toBeNull();
		expect(registerMultipleClassFormatType('rich-text/test3-1', {
			tagName: 'span',
			className: 1,
		})).toBeNull();
		expect(registerMultipleClassFormatType('rich-text/test3-1', {
			tagName: 'span',
			className: '123test3',
		})).toBeNull();
	});

	it('should null if invalid title', () => {
		expect(registerMultipleClassFormatType('rich-text/test4-1', {
			tagName: 'span',
			className: 'test4-1',
		})).toBeNull();
		expect(registerMultipleClassFormatType('rich-text/test4-2', {
			tagName: 'span',
			className: 'test4-2',
			title: '',
		})).toBeNull();
		expect(registerMultipleClassFormatType('rich-text/test4-2', {
			tagName: 'span',
			className: 'test4-2',
			title: null,
		})).toBeNull();
	});

	it('should null if has already registered', () => {
		expect(registerMultipleClassFormatType('rich-text/test1-1', {})).toBeNull();
		expect(registerMultipleClassFormatType('rich-text/test5-2', {
			tagName: 'span',
			className: null,
			title: 'test5-2',
		})).toBeNull();
		expect(registerMultipleClassFormatType('rich-text/test5-3', {
			tagName: 'span',
			className: 'test1-1',
			title: 'test5-3',
		})).toBeNull();
	});

	it('should null if many keywords', () => {
		expect(registerMultipleClassFormatType('rich-text/test6-1', {
			tagName: 'span',
			className: 'test6-1',
			title: 'test6-1',
			keywords: ['test6-1', 'test6-10', 'test6-100', 'test6-1000'],
		})).toBeNull();
	});

});

describe('getFormatName', () => {
	it('should start plugin name', () => {
		expect(getFormatName('test1')).toContain(PLUGIN_NAME);
	});

	it('should end name', () => {
		expect(getFormatName('test2')).toContain('test2');
	});
});

describe('getRemoveFormatButton', () => {
	it('should get remove format button generator', () => {
		expect(typeof getRemoveFormatButton('test-label1')).toBe('function');
		expect(typeof getRemoveFormatButton('test-label2', {})).toBe('function');
	});

	it('should get remove format button', () => {
		const generator = getRemoveFormatButton('test-label1');
		const button = generator({
			value: {
				formats: [
					{
						attributes: { style: 'font-size: 16px' },
						type: 'test/test',
						unregisteredAttributes: {},
					},
				],
			},
		});
		expect(typeof button).toBe('object');
		expect(button).toHaveProperty('props');
		expect(button.props).toHaveProperty('onClick');
		expect(button.props.children).toBe('test-label1');
	});

	it('should not get remove format button', () => {
		const generator = getRemoveFormatButton('test-label2');
		const button = generator({
			value: {
				formats: [],
			},
		});
		expect(button).toBeNull();
	});
});
