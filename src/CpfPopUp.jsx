const CpfPopUp = ({ cpfPopUp, open, setOpen }) => {
  if (!open) return null;
  return (
    <div
      className="cpf-popup"
      onClick={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
    >
      <div className="cpf-popup-inner" onClick={(e) => e.stopPropagation()}>
        <h2 className="cpf-popup-title">CPF Details</h2>
        <p className="cpf-popup-cpf">CPF: {cpfPopUp.cpf}</p>
        <p className="cpf-popup-created-at">Created At: {cpfPopUp.createdAt}</p>
        <button onClick={() => setOpen(false)} className="cpf-popup-close">
          Close
        </button>
      </div>
    </div>
  );
};

export default CpfPopUp;
