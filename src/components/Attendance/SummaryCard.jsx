import './SummaryCard.css';

const SummaryCard = ({ label, value, color, bgColor, onClick }) => {
  return (
    <div 
      className={`summary-card ${bgColor ? `summary-card-${bgColor}` : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <p className="summary-label">{label}</p>
      <h2 className={`summary-value ${color ? `summary-value-${color}` : ''}`}>
        {value}
      </h2>
    </div>
  );
};

export default SummaryCard;

