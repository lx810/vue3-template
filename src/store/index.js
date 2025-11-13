export const piniaStore = createPinia()
export function setupStore(app) {
  app.use(piniaStore)
}
