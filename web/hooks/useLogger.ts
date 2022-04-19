import { isDev } from 'utils'

export default function useLogger() {
  function debug(message?: any, ...optionalParams: any[]) {
    isDev ? console.info(message, optionalParams) : ''
  }

  function info(message?: any, ...optionalParams: any[]) {
    isDev ? console.info(message, optionalParams) : ''
  }

  function warn(message?: any, ...optionalParams: any[]) {
    isDev ? console.warn(message, optionalParams) : ''
  }

  function error(message?: any, ...optionalParams: any[]) {
    isDev ? console.error(message, optionalParams) : ''
  }

  return {
    debug,
    info,
    warn,
    error,
  }
}
