// Resolve a public-folder path against Vite's deployment base URL.
// Paths stored in translation.json begin with "/" (e.g. "/projects/foo.webp").
// Stripping that slash avoids a double-slash when BASE_URL ends with "/".
// In dev (base "/"):                 assetUrl('/logo.webp') → '/logo.webp'
// In prod (base '/iccreative-portfolio/'): → '/iccreative-portfolio/logo.webp'
export const assetUrl = (path) =>
  path ? import.meta.env.BASE_URL + path.replace(/^\//, '') : ''
