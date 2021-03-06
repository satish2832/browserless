'use strict'

const { readFile } = require('fs').promises
const isUrl = require('is-url-http')
const path = require('path')

const THEME_CACHE = Object.create(null)
const THEME_PATHS = path.resolve(require.resolve('prism-themes'), '../themes')

module.exports = async themeId => {
  if (isUrl(themeId)) return `<link rel="stylesheet" type="text/css" href="${themeId}">`

  const stylesheet =
    THEME_CACHE[themeId] ||
    (THEME_CACHE[themeId] = await readFile(path.resolve(THEME_PATHS, `prism-${themeId}.css`)))

  return `<style>${stylesheet}</style>`
}
