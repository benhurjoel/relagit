import * as ipc from '~/common/ipc';

const shell = window.Native.DANGEROUS__NODE__REQUIRE(
	'electron:shell'
) as typeof import('electron').shell;
const ipcRenderer = window.Native.DANGEROUS__NODE__REQUIRE(
	'electron:ipcRenderer'
) as typeof import('electron').ipcRenderer;

export const openExternal = (url: string) => {
	shell.openExternal(url);
};

export const showItemInFolder = (path: string) => {
	ipcRenderer.invoke(ipc.SHOW_ITEM_IN_FOLDER, path);
};

export const checkIsInPath = async (bin: string): Promise<boolean> => {
	const result = await ipcRenderer.invoke(ipc.CHECK_IS_IN_PATH, bin);

	return result;
};
