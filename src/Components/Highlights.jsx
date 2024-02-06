import PropTypes from "prop-types";

function Highlights({ weatherData, topic, value, unit, children }) {
  if (!weatherData) {
    return (
      <div>
        <p>No weather data available.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-500 text-white w-40 h-auto flex flex-col gap-4 text-center items-center justify-start rounded-lg">
        <div>
          <h2>{topic}</h2>
        </div>
        <div className="pb-2">
          <p>
            {value} <span>{unit}</span>
          </p>
        </div>
    {children}
      </div>
    </div>
  );
}
Highlights.propTypes = {
  weatherData: PropTypes.object.isRequired,
  topic: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  children: PropTypes.node,
};
export default Highlights;
