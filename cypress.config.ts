import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'uovao1',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
