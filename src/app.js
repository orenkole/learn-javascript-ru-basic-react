import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ArticlesPage from './components/routes/articles'
import CommentsPage from './components/routes/comments-page'
import UserForm from './components/user-form'
import Filters from './components/filters'
import Counter from './components/counter'
import Menu, { MenuItem } from './components/menu'
import { Provider as UserProvider } from './contexts/user'
import LangProvider from './components/i18n/lang-provider'

class App extends Component {
  state = {
    username: '',
    language: 'en'
  }

  handleUserChange = (username) => this.setState({ username })
  changeLanguage = (language) => (ev) => this.setState({ language })

  render() {
    return (
      <LangProvider language={this.state.language}>
        <div>
          <ul>
            <li onClick={this.changeLanguage('en')}>English</li>
            <li onClick={this.changeLanguage('ru')}>Russian</li>
          </ul>
          <UserForm
            value={this.state.username}
            onChange={this.handleUserChange}
          />
          <UserProvider value={this.state.username}>
            <Menu>
              <MenuItem path="/counter">Counter</MenuItem>
              <MenuItem path="/filters">Filters</MenuItem>
              <MenuItem path="/articles">Articles</MenuItem>
              <MenuItem path="/comments">Comments</MenuItem>
            </Menu>
            <Switch>
              <Redirect from="/" to="/articles" exact />
              <Route path="/counter" component={Counter} exact />
              <Route path="/filters" component={Filters} />
              <Route
                path="/articles/new"
                render={() => <h1>New Article Page</h1>}
              />
              <Route path="/articles" component={ArticlesPage} />
              <Route path="/comments" component={CommentsPage} />
              <Route path="/error" render={() => <h1>Error Page</h1>} />
              <Route path="*" render={() => <h1>Not Found Page</h1>} />
            </Switch>
          </UserProvider>
        </div>
      </LangProvider>
    )
  }
}

export default App
