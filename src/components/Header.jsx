import { useContext } from 'react';
import AppContext from '../AppContext';
import { useAlert } from 'react-alert';

const Header = () => {
  const alert = useAlert();
  const { nonTargetNodes, nodesAdded } = useContext(AppContext);

  const handleClick = () => {
    if (nodesAdded?.length < 1) {
      alert.error('Add atleast one Node');
      return;
    }
    if (nonTargetNodes?.size > 1) alert.error('Cannot save Flow');
    else alert.success('Flow saved');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-end px-5 py-3">
      <button
        onClick={handleClick}
        className="btn btn-prim btn-outline-success bg-white my-2 px-4 my-sm-0"
      >
        Save Changes
      </button>
    </nav>
  );
};

export default Header;
