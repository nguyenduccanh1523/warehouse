import React from 'react';
import './FeatureCard.scss';

const featuresData = [
  {
    title: 'Search Data',
    desc: 'Dont worry if your data is very large, our data warehouse provides a search engine, which is useful for making it easier to find data effectively saving time.',
    image: 'https://warehouse-blue.vercel.app/static/media/feature1.3bd68cd8e4cd29a40d80.png',
    color: '#F4F6FB',
    link: '#',
  },
  {
    title: '24 Hours Access',
    desc: 'Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data.',
    image: 'https://warehouse-blue.vercel.app/static/media/feature2.aa8cfbcff7c4975f6f37.png',
    color: '#F4F6FB',
    link: '#',
  },
  {
    title: 'Print Out',
    desc: 'Print out service gives you convenience if someday you need print data, just edit it all and just print it.',
    image: 'https://warehouse-blue.vercel.app/static/media/feature3.d41c5afe07c670d96f41.png',
    color: '#FFF7F0',
    link: '#',
  },
  {
    title: 'Security Code',
    desc: 'Data Security is one of our best facilities. Allows for your files to be safer. The file can be secured with a code or password.',
    image: 'https://warehouse-blue.vercel.app/static/media/feature4.821e83ecc96bd79a8e9a.png',
    color: '#F4F9F6',
    link: '#',
  },
];

const FeatureCard = () => {
  return (
    <>
      {featuresData.map((feature, idx) => (
        <div className="featurecard-container" style={{ background: feature.color }} key={idx}>
          <img className="featurecard-img" src={feature.image} alt={feature.title} />
          <div className="featurecard-content">
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
            <a href={feature.link} className="featurecard-link">Learn more <span>&rarr;</span></a>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeatureCard;
