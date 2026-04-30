import { defineConfig } from "astro/config";
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    integrations: [react(), tailwindcss()],
    vite: {
        plugins: [tailwindcss()],
    },
    redirects: {
        '/how-to-stop-a-water-leak/': '/resources/how-to-stop-a-water-leak/',
        '/tank-vs-tankless-water-heaters/': '/resources/tank-vs-tankless-water-heaters/',
        '/products/tank-water-heaters/': '/resources/tank-water-heaters/',
        '/products/tankless-water-heaters/': '/resources/tankless-water-heaters/',
        '/products/power-vent-water-heaters/': '/resources/power-vent-water-heaters/',
        '/products/heat-pump-water-heaters/': '/resources/heat-pump-water-heaters/',
        '/products/mobile-home-water-heaters/': '/resources/mobile-home-water-heaters/',
        '/products/gas-tank-water-heaters/': '/resources/gas-tank-water-heaters/',
        '/products/electric-tank-water-heaters/': '/resources/electric-tank-water-heaters/',
        '/water-heater-pricing/': '/instant-quote/?step=1',
    },
});