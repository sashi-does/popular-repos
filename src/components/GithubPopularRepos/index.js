import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeFilterItem: languageFiltersData[0].id,
    activeFilterredData: [],
    isLoading: true,
    serverErr: false,
  }

  componentDidMount() {
    this.fetchDataFromAPI()
  }

  changeActiveFilterItem = activeId => {
    this.setState({activeFilterItem: activeId, isLoading: true}, () => {
      this.fetchDataFromAPI()
    })
  }

  modifyJsonData = jsonData => {
    const modifiedData = jsonData.map(eachData => ({
      name: eachData.name,
      id: eachData.id,
      starsCount: eachData.stars_count,
      issuesCount: eachData.issues_count,
      forksCount: eachData.forks_count,
      avatarUrl: eachData.avatar_url,
    }))
    return modifiedData
  }

  fetchDataFromAPI = async () => {
    const {activeFilterItem} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeFilterItem}`
    try {
      const response = await fetch(url)
      console.log(response)
      const jsonData = await response.json()
      const modifiedFetchedData = this.modifyJsonData(jsonData.popular_repos)
      this.setState({
        activeFilterredData: modifiedFetchedData,
        isLoading: false,
      })
    } catch {
      this.setState({
        serverErr: true,
        isLoading: false,
        activeFilterredData: [],
      })
    }
  }

  renderFailure = () => (
    <div>
      <img
        className="failure-view"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderLanguageFilter = () => {
    const {activeFilterItem} = this.state
    return (
      <ul className="filters-list">
        {languageFiltersData.map(language => (
          <LanguageFilterItem
            changeActiveFilterItem={this.changeActiveFilterItem}
            activeFilterItem={activeFilterItem}
            key={language.id}
            filterDetails={language}
          />
        ))}
      </ul>
    )
  }

  renderRepoItems = () => {
    const {activeFilterredData, serverErr} = this.state
    return serverErr ? (
      this.renderFailure()
    ) : (
      <ul className="repo-items">
        {activeFilterredData.map(eachItem => (
          <RepositoryItem key={eachItem.id} repoDetails={eachItem} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="github-repos">
        <div className="repo-section">
          <h1 className="github-heading">Popular</h1>
          {this.renderLanguageFilter()}
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
            </div>
          ) : (
            this.renderRepoItems()
          )}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
