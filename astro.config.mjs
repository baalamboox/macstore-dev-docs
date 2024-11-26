import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Español',
					lang: 'es'
				},
			},
			logo: {
				light: '/src/assets/logos/logo-macstore-dark.svg',
				dark: '/src/assets/logos/logo-macstore-light.svg',
				replacesTitle: true,
			},
			title: 'Dev Docs',
			sidebar: [
				{
					label: 'Administrador',
					autogenerate: {
						directory: 'administrador',
					},
				},
				{
					label: 'Empezando',
					autogenerate: {
						directory: 'empezando',
					},
				},
				{
					label: 'Componentes',
					autogenerate: {
						directory: 'componentes',
					},
				},
				{
					label: 'Colores',
					autogenerate: {
						directory: 'colores',
					},
				},

				{
					label: 'Home Page',
					autogenerate: {
						directory: 'home',
					},
				},
				{
					label: 'Formularios',
					autogenerate: {
						directory: 'formularios',
					},
				},
				{
					label: 'Iconos',
					autogenerate: {
						directory: 'iconos',
					},
				},
				{
					label: 'Librerías modificadas',
					autogenerate: {
						directory: 'librerias-modificadas',
					},
				},
				{
					label: 'Tipografías',
					autogenerate: {
						directory: 'tipografias',
					},
				},
			],
			customCss: [
				'./src/fonts/font-face.css',
				'./src/css/root.css',
				'./src/css/custom.css',
			],
			lastUpdated: true,
		}),
	],
});
