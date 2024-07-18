import Cookies from 'js-cookie'

export function getCookie(key, options) {
  return Cookies.get(key, options)
}

export function setCookie(key, value, options) {
  return Cookies.set(key, value, options)
}

export function removeCookie(key, options) {
  return Cookies.remove(key, options)
}
