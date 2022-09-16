import './index.css'

const SalaryRange = props => {
  const {eachItem, onClickSalaryRange} = props
  const {salaryRangeId, label} = eachItem

  const onClickSalaryId = () => {
    onClickSalaryRange(salaryRangeId)
  }

  return (
    <li className="employ-item">
      <input
        type="radio"
        className="checkbox"
        id={salaryRangeId}
        onClick={onClickSalaryId}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRange
