const getMonthTitle = (monthNumber) => {
  const titles = {
    '1': 'Tammikuu',
    '2': 'Helmikuu',
    '3': 'Maaliskuu',
    '4': 'Huhtikuu',
    '5': 'Toukokuu',
    '6': 'Kesäkuu',
    '7': 'Heinäkuu',
    '8': 'Elokuu',
    '9': 'Syyskuu',
    '10': 'Lokakuu',
    '11': 'Marraskuu',
    '12': 'Joulukuu',
  }
  return titles[monthNumber] || ''
}

const getMonthShortHand = (monthNumber) => {
  const titles = {
    '1': 'Tammi',
    '2': 'Helmi',
    '3': 'Maalis',
    '4': 'Huhti',
    '5': 'Touko',
    '6': 'Kesä',
    '7': 'Heinä',
    '8': 'Elo',
    '9': 'Syys',
    '10': 'Loka',
    '11': 'Marras',
    '12': 'Joulu',
  }
  return titles[monthNumber] || ''
}

export {
  getMonthTitle,
  getMonthShortHand
}
