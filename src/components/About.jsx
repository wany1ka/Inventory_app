import React from 'react';

const About = () => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <img class="float-right w-80 rounded-3xl " src="src\assets\warehouse.avif"></img>
      <p className="text-lg mb-4 mr-3">
        Welcome to Stockify, your premier partner in inventory management. <br /> Our mission is to revolutionize the way businesses handle their stock with a platform that is both powerful and user-friendly.
      </p>
      <p className="text-lg mb-4">
        At Stockify, we understand the challenges of managing inventory—whether it’s keeping track of stock levels, processing orders, or analyzing trends. That's why we've developed an innovative solution that offers real-time tracking, seamless data management, and comprehensive analytics. Our intuitive interface is designed to make inventory management effortless, so you can focus on what really matters: growing your business.
      </p>
      <p className="text-lg mb-4">
        With Stockify, you can expect:
        <ul className="list-disc list-inside ml-4 mt-2">
          <li><strong>Real-Time Tracking:</strong> Monitor your inventory levels and movements instantly to stay ahead of demand.</li>
          <li><strong>Efficient Management:</strong> Update and organize your stock with ease, reducing manual errors and saving valuable time.</li>
          <li><strong>Insightful Analytics:</strong> Gain actionable insights into your inventory trends and performance to make informed decisions.</li>
        </ul>
      </p>
      <p className="text-lg mb-4">
        Our platform is suitable for businesses of all sizes, from small shops to large enterprises. We are committed to providing a solution that adapts to your needs and helps you maintain control over your inventory efficiently.
      </p>
      <p className="text-lg">
        Join the growing number of businesses transforming their inventory management with Stockify. Experience the simplicity and power of our platform today!
      </p>
    </div>
  );
};

export default About;
