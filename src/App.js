import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import DarkLightContext from './context/DarkLightContext'
import HomeOneVideoItem from './components/HomeOneVideoItem'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDark: false, savedVideos: [], activeTab: 'Home'}

  activeTabItem = tab => {
    this.setState({activeTab: tab})
  }

  changeTheme = () => {
    this.setState(prev => ({
      isDark: !prev.isDark,
    }))
  }

  addSavedVideos = gameItemData => {
    const {savedVideos} = this.state
    const index = savedVideos.findIndex(i => i.id === gameItemData.id)
    if (index === -1) {
      this.setState({savedVideos: [...savedVideos, gameItemData]})
    } else {
      savedVideos.splice(index, 1)
      this.setState({savedVideos})
    }
  }

  removeItem = id => {
    const {savedVideos} = this.state
    const remov = savedVideos.filter(i => i.id !== id)
    this.setState({savedVideos: remov})
  }

  removeAllItems = () => {
    this.setState({savedVideos: []})
  }

  render() {
    const {isDark, activeTab, savedVideos} = this.state
    return (
      <DarkLightContext.Provider
        value={{
          isDark,
          savedVideos,
          changeTheme: this.changeTheme,
          addSavedVideos: this.addSavedVideos,
          activeTabItem: this.activeTabItem,
          activeTab,
          removeItem: this.removeItem,
          removeAllItems: this.removeAllItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={HomeOneVideoItem}
          />
          <Route exact path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </DarkLightContext.Provider>
    )
  }
}

export default App
