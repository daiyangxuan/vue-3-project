import _ from 'lodash'

export const highLight = (text: string, seach: string | undefined) => {
  if (!seach) return text
  return _.replace(text, seach, `<span class="highLight">${seach}</span>`)
}
