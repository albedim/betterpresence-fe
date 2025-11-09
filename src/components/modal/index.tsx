import { IoClose } from "react-icons/io5";

interface ModalWrapperProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = (props) => {

  return (
    <div className="w-screen h-full z-2 bg-black/20 absolute flex justify-around items-center">
      <div className="bg-[white] rounded-lg p-6 w-[400px]">
        <div className="flex justify-between">
          <div></div>
          <button className="p-1 rounded-full cursor-pointer transition-all hover:bg-[#ebebeb]" onClick={props.closeModal}><IoClose size={18} /></button>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default ModalWrapper;