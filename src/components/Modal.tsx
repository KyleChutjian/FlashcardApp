import React from "react";

type propTypes = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<propTypes> = ({isOpen, onClose, children}) => {

    return (
        <div onClick={onClose} className={`p-4 min-w-10 max-h-full fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? "visible bg-black/20" : "invisible"} `}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-lg shadow p-6 transition-all ${isOpen ? "scale-100 opacity-100" : "scale-110 opacity-0"} min-w-[25%]`}>
                <button onClick={onClose} className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                    X
                </button>
                {children}
            </div> 

        </div>
    )
}
export default Modal;