import React from 'react'

const DarkLightContext = React.createContext({
  isDark: false,
  changeTheme: () => {},
  removeItem: () => {},
  removeAllItems: () => {},
  savedVideos: [],
  addSavedVideos: () => {},
  activeTab: '',
  activeTabItem: () => {},
})
export default DarkLightContext
