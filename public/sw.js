// install the service worker
self.addEventListener('install', (evt) => {

  console.log('[sw:install]', evt);
  self.skipWaiting();

});

// activate service worker
self.addEventListener('activate', (evt) => {

  console.log('[sw:activate]', evt);

});

// on fetch
self.addEventListener('fetch', async (evt) => {

  // if (evt.request.method !== "POST") return;

  // async function modifyRequest() {

  //   const headers = [...evt.request.headers.entries()].reduceRight((obj, [key, value]) => {
  //     obj[key] = value;
  //     return obj;
  //   }, {})

  //   headers["X-Custom-Header"] = "Custom Value";

  //   let body = await evt.request.json();
  //   body = { ...body, ...{ customKey: "CustomValue" } };

  //   const req = new Request(evt.request, { headers: new Headers(headers), body: JSON.stringify(body) });

  //   console.log('[sw:fetch]', req);

  //   return fetch(req);

  // }

  // evt.respondWith(modifyRequest());

});