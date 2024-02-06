import PropTypes from 'prop-types';
function Button({ onClick,text, color}) {
 
  // Hardcoded styles for testing
// const buttonStyle = "bg-red-500 hover:red-700 rounded-md px-4 py-2 text-2";
  return (
    <div>
      <button className = {`bg-${color}-500 hover:bg-${color}-700 rounded-md px-4 py-2 text-2 text-white`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default Button;
