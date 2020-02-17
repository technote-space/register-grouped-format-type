import { setupGlobal } from '@technote-space/gutenberg-test-helper';

setupGlobal({
	setUseRefMock: false,
	setWp: {
		formatLibrary: false,
	},
});
