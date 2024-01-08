type ModalProps = {
  id: string
  title: string
  children: React.ReactNode
}

const Modal = ({ id, title, children }: ModalProps) => {
  return (
    <>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-6">{title}</h3>
          {children}
        </div>
      </dialog>
    </>
  )
}

export default Modal