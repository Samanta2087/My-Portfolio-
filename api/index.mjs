import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load the built server
const serverPath = require.resolve('../dist/index.cjs');
delete require.cache[serverPath];

// Import and get the Express app
let app;
try {
  const serverModule = require(serverPath);
  app = serverModule.default || serverModule.app || serverModule;
} catch (err) {
  console.error('Failed to load server:', err);
  throw err;
}

// Export handler for Vercel
export default app;
