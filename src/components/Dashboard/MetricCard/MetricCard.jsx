import './MetricCard.css';

const MetricCard = ({ title, value, icon: Icon, color, bgColor }) => {
  return (
    <div className="metric-card" style={{ backgroundColor: bgColor }}>
      <div className="metric-content">
        <div className="metric-info">
          <h3 className="metric-title">{title}</h3>
          <p className="metric-value">{value}</p>
        </div>
        <div className="metric-icon" style={{ color: color }}>
          <Icon />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;

