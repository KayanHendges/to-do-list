import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default ({mode}) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [react()],
    server: { port: Number(env.VITE_APP_PORT) },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') },]
    }
  })
}
