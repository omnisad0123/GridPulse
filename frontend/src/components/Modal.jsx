export default function Modal({ title, children, onClose }) {
  if (!children) return null;
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <header>
          <h2>{title}</h2>
          <button type="button" className="ghost" onClick={onClose}>Close</button>
        </header>
        {children}
      </section>
    </div>
  );
}
