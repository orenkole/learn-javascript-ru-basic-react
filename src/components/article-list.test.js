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

  it('should close an article', (done) => {
    const wrapper = mount(<ArticleListWithAccordion articles={articles} />)
    expect(wrapper.find('.test__article--body').length).toEqual(0)

    wrapper
      .find('.test__article--btn')
      .at(0)
      .simulate('click')
    expect(wrapper.find('.test__article--body').length).toEqual(1)

    wrapper
      .find('.test__article--btn')
      .at(0)
      .simulate('click')

    setTimeout(() => {
      try {
        wrapper.simulate('transitionEnd')

        expect(wrapper.find('.test__article--body').length).toEqual(0)
        done()
      } catch (err) {
        done.fail(err)
      }
    }, 800)
  })
})
