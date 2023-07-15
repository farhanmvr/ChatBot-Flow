import { BiMessageRoundedDetail } from 'react-icons/bi';

const MessageBtn = ({ onDragStart, label }) => {
  return (
    <div draggable onDragStart={onDragStart} className="msg-btn py-3">
      <BiMessageRoundedDetail size={25} />
      <div className="p">{label}</div>
    </div>
  );
};

export default MessageBtn;
