import './index.css'

const Skills = props => {
  const {eachSkill} = props

  return (
    <li>
      <div className="skill-container">
        <img
          src={eachSkill.imageUrl}
          alt={eachSkill.name}
          className="skill-logo"
        />
        <p className="skill-name">{eachSkill.name}</p>
      </div>
    </li>
  )
}
export default Skills
