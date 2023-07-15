import { useContext } from 'react';
import AppContext from '../AppContext';
import { MdOutlineArrowBack } from 'react-icons/md';

const EditNode = () => {
  const { selectedNode, setSelectedNode } = useContext(AppContext);

  const handleInputChange = (event) => {
    setSelectedNode({
      ...selectedNode,
      data: {
        label: event.target.value,
      },
    });
  };

  return (
    <>
      <div className="edit-back-container py-1 d-flex">
        <button className="btn back-btn" onClick={() => setSelectedNode({})}>
          <MdOutlineArrowBack />
        </button>
        <div className="m-auto">Message</div>
      </div>
      <div className="edit-input p-4">
        <label className="label">Text</label>
        <textarea
          rows={4}
          type="text"
          className="form-control mt-3"
          value={selectedNode?.data?.label}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default EditNode;
