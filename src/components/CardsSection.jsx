import React from 'react';
import Card from './Card';

const CardsSection = () => {
  const cards = [
    {
      icon: 'fas fa-brain',
      title: 'Neural Networks',
      description: 'Advanced machine learning models powering natural conversations',
    },
    {
      icon: 'fas fa-rocket',
      title: 'API Integration',
      description: 'Seamless integration with modern development stacks',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Security',
      description: 'Enterprise-grade security and privacy protection',
      className: 'security-card' // Add this line
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <Card
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
          className={card.className} // Pass the class
        />
      ))}
    </div>
  );
};

export default CardsSection;