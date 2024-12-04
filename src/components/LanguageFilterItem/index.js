import './index.css'

const LanguageFilterItem = ({
  filterDetails,
  activeFilterItem,
  changeActiveFilterItem,
}) => {
  const {language, id} = filterDetails
  const isActive = id === activeFilterItem ? 'active-filter-option' : ''
  const onClickActiveItem = () => {
    changeActiveFilterItem(id)
  }
  return (
    <li>
      <button
        onClick={onClickActiveItem}
        className={`filter-option ${isActive}`}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
