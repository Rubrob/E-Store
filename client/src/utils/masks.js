import { createTextMask } from 'redux-form-input-masks'

const masks = {
  phone: createTextMask({
    guide: false,
    pattern: '9 (99) 999 99 99'
  }),
  cardnumber: createTextMask({
    guide: false,
    pattern: '9999 9999 9999 9999'
  }),
  cardexp: createTextMask({
    guide: false,
    pattern: '99/99'
 }),
}

export default masks