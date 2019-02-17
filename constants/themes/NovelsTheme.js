const tintColor = 'white'
// const backgroundColor = '#FFC792'
const backgroundColor = 'white'

// const primary = {
//   light: '#BF7949',
//   main: '#7F5031',
//   dark: '#402818',
// }

const primary = {
  light: '#484848',
  main: '#212121',
  dark: '#000000',
}

const secondary = {
  light: '#6a4f4b',
  main: '#3e2723',
  dark: '#1b0000',
}

const textPrimary = {
  light: 'gray',
  main: 'black',
  dark: 'black',
}

const Theme = {
  palette: {
    inherit: 'white',
    primary,
    secondary,
  },
  tintColor,
  backgroundColor,
  // errorBackground: 'red',
  // errorText: '#fff',
  // warningBackground: '#EAEB5E',
  // warningText: '#666804',
  // noticeBackground: tintColor,
  // noticeText: '#fff',
  text: {
    primary: textPrimary
  }
}

export default Theme