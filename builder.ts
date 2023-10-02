import fs from 'fs';

const buildInfo = JSON.parse(fs.readFileSync('./dist/build_info.json', 'utf-8')) as {
	commit: string;
	date: string;
	env: 'development' | 'production';
};

export default {
	appId: 'com.relagit.app',
	productName: 'RelaGit',
	directories: {
		output: 'out'
	},
	icon: buildInfo.env === 'development' ? './build/dev' : './build/icon',
	asar: false,
	dmg: {
		background: './build/background.png',
		icon: './build/dmg.icns',
		iconSize: 72,
		contents: [
			{
				x: 462,
				y: 160,
				type: 'link',
				path: '/Applications'
			},
			{
				x: 155,
				y: 160,
				type: 'file'
			}
		]
	},
	mac: {
		identity: null,
		category: 'public.app-category.developer-tools',
		darkModeSupport: true
	},
	linux: {
		category: 'Developer',
		maintainer: 'TheCommieAxolotl',
		target: ['deb', 'tar.gz', 'rpm']
	},
	win: {
		target: ['zip']
	},
	files: ['!*', 'dist', 'public', 'package.json', 'LICENSE']
} satisfies import('electron-builder').Configuration;
