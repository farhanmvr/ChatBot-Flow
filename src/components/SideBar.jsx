import { useContext } from 'react';
import AppContext from '../AppContext';
import EditNode from './EditNode';
import MessageBtn from './MessageBtn';

const SideBar = () => {
  const { selectedNode } = useContext(AppContext);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="side-bar">
      {selectedNode?.id ? (
        // Editing area if user has selected any node
        <EditNode />
      ) : (
        <div className="row p-4">
          <div className="col-6">
            <MessageBtn
              label={'Message'}
              onDragStart={(event) => onDragStart(event, 'message')}
            />
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
