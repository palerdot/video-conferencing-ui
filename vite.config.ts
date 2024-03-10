import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  // ref: https://vitejs.dev/guide/static-deploy
  base: "video-conferencing-ui",
  plugins: [react()],
})
