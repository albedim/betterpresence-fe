import type { PAGES } from "../../../types";

interface SelectorProps {
  onSelect: (page: PAGES) => void;
  selectedPage: PAGES;
}

const Selector: React.FC<SelectorProps> = (props) => {
  
  return (
    <div className="flex gap-6">
      {props.selectedPage === "all" ? (
        <button className="pb-2 border-b-2 border-[#5865F2]">
          <p className="text-[#5865F2] font-medium text-[15.4px]">All activities</p>
        </button>
      ):(
        <button onClick={() => props.onSelect("all")} className="pb-2 cursor-pointer hover:border-b-2 hover:border-[#5865F2]">
          <p className="text-[#7e7d7d] text-[15.4px]">All activities</p>
        </button>
      )}
      {props.selectedPage === "favorites" ? (
        <button className="pb-2 border-b-2 border-[#5865F2]">
          <p className="text-[#5865F2] font-medium text-[15.4px]">Favorited</p>
        </button>
      ):(
        <button onClick={() => props.onSelect("favorites")} className="pb-2 cursor-pointer hover:border-b-2 hover:border-[#5865F2]">
          <p className="text-[#7e7d7d] text-[15.4px]">Favorited</p>
        </button>
      )}
    </div>
  )
          
};

export default Selector;