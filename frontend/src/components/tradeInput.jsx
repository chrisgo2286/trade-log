import '../styles/tradeInput.css';
export default function tradeInput(props) {
  function handleChange (event) {
    props.onChange(event);
  }

  function handleLable () {
    return props.name[0].toUpperCase() + props.name.slice(1,);
  }

  return (
    <div className='trade-input'>
      <label htmlFor={ props.name }>{ handleLable() }</label>
      <input
        type={ props.type } 
        name={ props.name } 
        id={ props.name } 
        value={ props.value } 
        onChange={ handleChange }
      />
    </div>
  )
} 