const AlertTemplate = ({ message, options }) => {
  var alertStyle = {
    backgroundColor: options.type === 'error' ? 'red' : 'green',
    color: 'white',
    padding: '8px 25px',
    borderRadius: '10px',
    marginTop: '15px',
    display: 'flex',
    fontSize: '.9rem',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
  };

  return <div style={alertStyle}>{message}</div>;
};

export default AlertTemplate;
