import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientId = process.argv[2];
if (!clientId) {
    console.error('Usage: npm run build:client <client-id>');
    process.exit(1);
}

// Adjust paths relative to project root (scripts/ is one level deep)
const projectRoot = path.join(__dirname, '..');
const clientConfigPath = path.join(projectRoot, 'clients', `${clientId}.json`);
const targetConfigPath = path.join(projectRoot, 'src', 'config', 'client.json');

// Ensure src/config directory exists
const configDir = path.dirname(targetConfigPath);
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
}

try {
    // Copy client config to active config
    fs.copyFileSync(clientConfigPath, targetConfigPath);
    console.log(`✓ Loaded configuration for ${clientId}`);

    // Run Vite build
    console.log('Starting build...');
    exec('npm run build', { cwd: projectRoot }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Build error: ${error}`);
            return;
        }
        console.log(stdout);
        if (stderr) console.error(stderr);
        console.log(`✓ Build complete for ${clientId}`);
    });
} catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
}
