# Lesson 1
## HOC withAccordion
## External libraries
01:00
```jsx
<div>
    <ArticlesChart articles = {articles} />
</div>
```

__Articles.jsx__
```jsx
const Articles = props => {
    useEffect(() => {
        // update chart
    })
    componentWillUnmount() {
        // remove D3 junk
    }
    return (
        <div ref = {ref}>
            // our code (like D3) using ref
        </div>
    )
}
```

# Lesson 2

## componentDidCatch
```jsx
class Article extends PureComponent {
    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }
    ...
    return (
        {this.state.hasError
        ? 'Error occured'
        : <myComponent /> 
        }
    )
}
```

## Tests
```javascript

import React from 'react'
import { mount, render, shallow } from 'enzyme'
import ArticleListWithAccordion, { ArticleList } from './article-list'
import articles from '../fixtures'

describe('ArticleList', () => {
  it('should render article list', () => {
    const container = shallow(
      <ArticleList articles={articles} toggleOpenItem={() => {}} />
    )

    expect(container.find('.test__article-list--item').length).toEqual(
      articles.length
    )
  })

  it('should render closed articles by default', () => {
    const container = render(<ArticleListWithAccordion articles={articles} />)

    expect(container.find('.test__article--body').length).toEqual(0)
  })

  it('should open an article on click', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    container
      .find('.test__article--btn')
      .at(0)
      .simulate('click')

    expect(container.find('.test__article--body').length).toEqual(1)
  })

  it('should trigger data fetching on mount', (done) => {
    mount(
      <ArticleListWithAccordion
        articles={[]}
        toggleOpenItem={() => {}}
        fetchData={done}
      />
    )
  })
```

## Animation
01:23
```javascript
import CSSTransition from 'react-addons-css-transition-group'

...
<CSSTransition
    transitionName="article"
    transitionAppear
    transitionEnterTimeout={500}
    transitionAppearTimeout={1000}
    transitionLeaveTimeout={300}
>
    {this.body}
</CSSTransition>
```

_style.css_
```css
.article-enter {
    opacity: 0.01;
}

.article-enter.article-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
}

.article-appear {
    opacity: 0.01;
}

.article-appear.article-appear-active {
    opacity: 1;
    transition: opacity 1000ms ease-in;
}

.article-leave {
    opacity: 1;
}

.article-leave.article-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
}
```
