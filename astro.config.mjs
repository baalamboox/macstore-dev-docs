import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			defaultLocale: 'es',
			logo: {
				light: './src/assets/logos/logo-macstore-dark.svg',
				dark: './src/assets/logos/logo-macstore-light.svg',
				replacesTitle: true,
			},
			title: 'Dev Docs',
			// social: {
			// 	github: 'https://github.com/withastro/starlight',
			// },
			sidebar: [
				// {
				// 	label: 'Guides',
				// 	items: [
				// 		// Each item here is one entry in the navigation menu.
				// 		{ label: 'Example Guide', slug: 'guides/example' },
				// 	],
				// },
				// {
				// 	label: 'Reference',
				// 	autogenerate: { directory: 'reference' },
				// },
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
				'./src/css/custom.css',
			],
		}),
	],
});
