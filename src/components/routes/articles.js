import React, { Component } from 'react'
import ArticleList from '../article-list'
import { Route } from 'react-router-dom'
import Article from '../article'

class ArticlesPage extends Component {
  static propTypes = {}

  render() {
    console.log('---', 'articles list match:', this.props.match)
    return (
      <div>
        <ArticleList />
        <Route path="/articles/:id" children={this.getArticle} exact />
      </div>
    )
  }

  getArticle = ({ match }) => {
    console.log('---', 'article match: ', match)
    if (!match) return <h1>Select an Article</h1>

    return <Article id={match.params.id} isOpen key={match.params.id} />
  }
}

export default ArticlesPage
