import PropTypes from 'prop-types';

const Button = ({ onNextPage }) => {
  return (
    <button className="Button" onClick={onNextPage}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onNextPage: PropTypes.func.isRequired,
};

export default Button;
