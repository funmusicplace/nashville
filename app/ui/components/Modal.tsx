const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onConfirm?: () => void;
}> = ({ isOpen, onClose, children, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      ></div>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          isOpen ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full mx-auto my-6">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-foreground-default dark:text-white">
                Get us there
              </h3>
              <button
                type="button"
                className="text-foreground-light bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6 md:p-7">{children}</div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={onConfirm}
                className="text-background-default 
                bg-primary-default 
                hover:bg-primary-dark 
                focus:ring-4 
                focus:outline-none 
                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Let's go
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={onClose}
                className="py-2.5 px-5 ms-3 text-sm font-medium 
                  text-foreground-default
                  focus:outline-none 
                  bg-background-default 
                  rounded-lg border 
                  border-gray-200 
                  hover:bg-background-light 
                  hover:text-primary-default 
                  focus:z-10 focus:ring-4 
                  focus:ring-gray-100 
                  "
              >
                Nevermind
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
