import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { articlesLoadingSelector, filtratedArticles } from '../selectors'
import { loadAllArticles } from '../ac'
import Loader from './common/loader'
import { NavLink } from 'react-router-dom'

export class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    fetchData: PropTypes.func,

    //from accordion decorator
    openItemId: PropTypes.string,
    toggleItem: PropTypes.func
  }

  render() {
    console.log('---', 'rendering article list')
    if (this.props.loading) return <Loader />
    return <ul>{this.body}</ul>
  }

  get body() {
    const { articles } = this.props
    return articles.map((article) => (
      <li key={article.id} className="test__article-list--item">
        <NavLink to={`/articles/${article.id}`} activeStyle={{ color: 'red' }}>
          {article.title}
        </NavLink>
      </li>
    ))
  }

  componentDidMount() {
    const { fetchData } = this.props
    fetchData && fetchData()
  }
}

export default connect(
  (state) => {
    console.log('---', 'articles connect')
    return {
      articles: filtratedArticles(state),
      loading: articlesLoadingSelector(state),
      router: state.router
    }
  },
  { fetchData: loadAllArticles }
)(ArticleList)
