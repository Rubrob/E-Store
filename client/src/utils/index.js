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

export const tlcWithUnderline = (str) => str.toLowerCase().split(' & ').join('__')

export const isObjectValues = (obj) => {
  let isValues = false
  for(let key in obj){
    if(!obj[key].length){
      isValues = false
    }else{
      isValues = true
    }
  }
  return isValues
}

export const totalCalculation = (arr) => arr.reduce((acc, curr) => acc + (curr.price * curr.qty), 0)

export const backdropFilterSupport = () => {
  const webkit = window.CSS.supports('-webkit-backdrop-filter', 'blur(20px)')
  const regular = window.CSS.supports('backdrop-filter', 'blur(20px)')
  if(regular || (regular && webkit)) {
    return true
  } else {
    return false
  }
}

export const renderTitle = ({gender, subcategory, category}) => {
  return `${gender}'s ${ampersand(subcategory || '')} ${category === 'shoes' ? category : ''}`
}