import {
  getMonthTitle,
  getMonthShortHand
} from './formatter'

describe('When month number is converted to title', () => {
  describe('and number is valid', () => {
    it('should convert to correct title', () => {
      expect(getMonthTitle('1')).toBe('Tammikuu')
      expect(getMonthTitle('2')).toBe('Helmikuu')
      expect(getMonthTitle('3')).toBe('Maaliskuu')
      expect(getMonthTitle('4')).toBe('Huhtikuu')
      expect(getMonthTitle('5')).toBe('Toukokuu')
      expect(getMonthTitle('6')).toBe('Kesäkuu')
      expect(getMonthTitle('7')).toBe('Heinäkuu')
      expect(getMonthTitle('8')).toBe('Elokuu')
      expect(getMonthTitle('9')).toBe('Syyskuu')
      expect(getMonthTitle('10')).toBe('Lokakuu')
      expect(getMonthTitle('11')).toBe('Marraskuu')
      expect(getMonthTitle('12')).toBe('Joulukuu')
    })
  })

  describe('and month is not valid', () => {
    it('should return empty string', () => {
      expect(getMonthTitle('13')).toBe('')
    })
  })
})

describe('When month number is converted to short title', () => {
  describe('and number is valid', () => {
    it('should convert to correct title', () => {
      expect(getMonthShortHand('1')).toBe('Tammi')
      expect(getMonthShortHand('2')).toBe('Helmi')
      expect(getMonthShortHand('3')).toBe('Maalis')
      expect(getMonthShortHand('4')).toBe('Huhti')
      expect(getMonthShortHand('5')).toBe('Touko')
      expect(getMonthShortHand('6')).toBe('Kesä')
      expect(getMonthShortHand('7')).toBe('Heinä')
      expect(getMonthShortHand('8')).toBe('Elo')
      expect(getMonthShortHand('9')).toBe('Syys')
      expect(getMonthShortHand('10')).toBe('Loka')
      expect(getMonthShortHand('11')).toBe('Marras')
      expect(getMonthShortHand('12')).toBe('Joulu')
    })
  })

  describe('and month is not valid', () => {
    it('should return empty string', () => {
      expect(getMonthShortHand('13')).toBe('')
    })
  })
})
