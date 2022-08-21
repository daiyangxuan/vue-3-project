export const checkPhone = (value: string, text: string) => {
  const reg = /^1[3456789][0-9]{9}$/
  if (!value) {
    return Promise.reject(`请输入${text}`)
  } else if (!reg.test(value)) {
    return Promise.reject(`请输入正确的${text}`)
  } else {
    return Promise.resolve()
  }
}
