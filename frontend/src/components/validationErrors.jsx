import '../styles/validationErrors.css';

export default function ValidationErrors(props) {
  return(
    <div className="validation">
      { props.errors.map((error, ndx) => (
      <p key={ ndx }>* { error }</p>
    ))}
    </div>
  );
}
  