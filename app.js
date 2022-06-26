if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
          console.log('[app:register]')
      })
      .catch((err) => {
          console.log('app:register-ERR', err)
      })
}
