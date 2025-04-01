import React from 'react';

const Card = ({ icon, title, description }) => {
  return (
    <div className="card">
      <div className="card-icon"><i className={icon}></i></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;