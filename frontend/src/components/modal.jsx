import '../styles/modal.css';

export default function Modal(props) {
  function handleModalClass () {
    return (props.showModal === true) ? 'modal visible': 'modal';
  }
  
  function handleTradeModalExit () {
    props.exitModal();
  }

  return(
    <div className={ handleModalClass() } onClick={ handleTradeModalExit }>
      <div className='modal-main' onClick={ e => e.stopPropagation() }>
        { props.children }
      </div>
    </div>  
  );
}
  
