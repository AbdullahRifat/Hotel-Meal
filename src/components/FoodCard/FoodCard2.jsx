

const FoodCard2 = () => {
    return (
        <div className="meal-delivery-services" style={{ border: '10px solid #ccc', padding: '20px' }}>
          <img src="https://i.imgur.com/example.jpg" alt="Healthline's picks for the best prepared meal delivery services" />
          <h1 style={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>Healthline's picks for the best prepared meal delivery services</h1>
    
          <div className="best-overall" style={{ border: '5px solid #eee', padding: '10px' }}>
            <h2 style={{ color: '#000', fontSize: '20px', fontWeight: 'bold' }}>Best overall prepared meal delivery service</h2>
            <h3>Factor</h3>
            <img src="https://i.imgur.com/factor-logo.jpg" alt="Factor logo" />
            <p style={{ color: '#666', fontSize: '16px' }}>Price per serving: $10.99-$13.49</p>
            <p style={{ color: '#666', fontSize: '16px' }}>Menus: Chef's Choice, Keto, Calorie Smart, Vegan & Veggie, Protein Plus, Flexitarian</p>
            <p style={{ color: '#666', fontSize: '16px' }}>Shipping: $10.99</p>
            <a href="https://factormeals.com/" className="btn" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', borderRadius: '5px' }}>GET STARTED WITH FACTOR</a>
          </div>
    
          <div className="healthline-review" style={{ border: '5px solid #eee', padding: '10px' }}>
            <h2 style={{ color: '#000', fontSize: '20px', fontWeight: 'bold' }}>Healthline's review</h2>
            <p style={{ color: '#666', fontSize: '16px' }}>Healthline Score: 4.3/5</p>
            <p style={{ color: '#666', fontSize: '16px' }}>Our overall score is based on a variety of criteria, including:</p>
            <ul>
              <li>Variety of meal options</li>
              <li>Nutrition and health quality</li>
              <li>Taste and satisfaction</li>
              <li>Convenience and delivery</li>
              <li>Customer service</li>
            </ul>
          </div>
        </div>
      );
};

export default FoodCard2;