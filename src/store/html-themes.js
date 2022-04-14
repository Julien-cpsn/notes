
export const defaultTheme =
  `<!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>{{ title }}</title>
  </head>
  <body>
    <main>
      {{ content }}
    </main>
  </body>
  </html>`

export const architect = require('./architect.html').default
export const cayman = require('./cayman.html').default
