import './index.css'

const EmployType = props => {
  const {eachType, onClickEmployItem} = props
  const {employmentTypeId, label} = eachType

  const onClickEmployType = () => {
    onClickEmployItem(employmentTypeId)
  }

  return (
    <li className="employ-item">
      <input
        type="checkbox"
        className="checkbox"
        id={employmentTypeId}
        onClick={onClickEmployType}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmployType
