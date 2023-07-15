import { Handle, Position } from 'reactflow';
import { BiMessageRoundedDetail } from 'react-icons/bi';

const MessageNode = ({ data }) => {
  const { label } = data;
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="card">
        <p className="title px-2 py-1">
          <BiMessageRoundedDetail /> Send Message
        </p>
        <pre className="message px-2 py-2 mb-0">{label}</pre>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
};

export default MessageNode;
