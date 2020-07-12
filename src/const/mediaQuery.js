// Brek points :
//  sm : 320px
// md : 672px
// lg : 1056px
// xlg :1312px

const breaks = {
  xlarge: '1312px',
  large: '1056px',
  medium: '672px',
  small: '320px'
}

const less = {
  lessThanXLarge: `(max-width: ${breaks.xlarge})`,
  lessThanLarge: `(max-width: ${breaks.large})`,
  lessThanMedium: `(max-width: ${breaks.medium})`,
  lessThanSmall: `(max-width: ${breaks.small})`
}

const great = {
  greatereThanXlarge: `(min-width: ${breaks.xlarge})`,
  greaterThanLarge: `(min-width: ${breaks.large})`,
  greaterThanMedium: `(min-width: ${breaks.medium})`,
  greaterThanSmall: `(min-width: ${breaks.small})`
}

const createBetween = (start, stop) =>
  `${great[`greaterThan${start}`]} and ${less[`lessThan${stop}`]}`

const between = {
  betweenSmallMedium: createBetween('Small', 'Medium'),
  betweenMediumLarge: createBetween('Medium', 'Large'),
  betweenLargeXLarge: createBetween('Large', 'XLarge')
}

export default { ...less, ...great, ...between }
