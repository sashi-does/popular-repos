import './index.css'

const githubConstantUrls = {
  starIcon: 'https://assets.ccbp.in/frontend/react-js/stars-count-img.png',
  forkIcon: 'https://assets.ccbp.in/frontend/react-js/forks-count-img.png',
  openIssues: 'https://assets.ccbp.in/frontend/react-js/issues-count-img.png',
}

const RepositoryItem = ({repoDetails}) => {
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails
  return (
    <li className="repo-item">
      <img className="count-logo" alt={name} src={avatarUrl} />
      <h1 className="repo-name">{name}</h1>
      <div className="actions-count">
        <img
          className="count-icon"
          alt="stars"
          src={githubConstantUrls.starIcon}
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="actions-count">
        <img
          className="count-icon"
          alt="forks"
          src={githubConstantUrls.forkIcon}
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="actions-count">
        <img
          className="count-icon"
          alt="open issues"
          src={githubConstantUrls.openIssues}
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
