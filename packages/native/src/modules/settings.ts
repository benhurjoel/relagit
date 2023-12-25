import fs from 'node:fs';
import promises from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import type { Settings } from '~/app/src/stores/settings';

const __SETTINGS_PATH__ = path.join(os.homedir(), '.relagit', 'settings.json');

export const backgroundFromTheme = (theme: string, isDark: boolean) => {
	if (theme === 'system') {
		return isDark ? '#141515' : '#ffffff';
	}

	return theme === 'dark' ? '#141515' : '#ffffff';
};

export const getSettings = async (): Promise<Settings> => {
	try {
		const dir = path.join(os.homedir(), '.relagit');

		if (!fs.existsSync(dir)) {
			await promises.mkdir(dir);
		}

		if (!fs.existsSync(__SETTINGS_PATH__)) {
			await promises.writeFile(__SETTINGS_PATH__, '{}');
		}

		return JSON.parse(await promises.readFile(__SETTINGS_PATH__, 'utf8'));
	} catch (e) {
		return {};
	}
};

export const setSettings = async (settings: Settings) => {
	await promises.writeFile(
		__SETTINGS_PATH__,
		JSON.stringify(Object.fromEntries(settings), null, 2)
	);
};
