function Modal({ book, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h2 className="text-xl font-semibold mb-4">Chỉnh sửa: {book.title}</h2>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Đóng</button>
        </div>
      </div>
    );
  }
  
  export default Modal;
  