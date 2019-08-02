import { useState } from 'react';

export const tlc = str => str.split(' ').join('_').toLowerCase()
export const pureTLC = str => str.split(' ').join('').toLowerCase()

export const ampersand = str => {
  if(str.indexOf('__')){
    const arr = str.split('__')
    const arr2 = arr.map(s => s.charAt(0).toUpperCase() + s.slice(1))
    return arr2.join(' & ')
  }else{
    return str[0].toUpperCase() + str.slice(1)
  }
}

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
export const freeIfZero = (sum, currency) => sum === 0 ? 'Free' : `${currency}${sum}`
export const arrayFromNumber = (number) => Array.from({length: number}, (_, k) => k + 1)

export const SetFixed = (YOffset) => {
  const [fixed, setFixed] = useState(false)
  const scrollHandler = () => {
    if(window.pageYOffset > YOffset) setFixed(true)
    if(window.pageYOffset < YOffset) setFixed(false)
  }
  return {
    fixed,
    setFixed: scrollHandler
  }
}