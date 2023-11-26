import img1 from "../../assets/home/gold.jpg"
import img2 from "../../assets/home/silver.jpg"
import img3 from "../../assets/home/plutinum.jpg"
import { NavLink } from "react-router-dom";

const MembershipCard = () => {
    const memmberShips = [
        {
            memmberShipType: 'gold',
            image: img1,
            price: 150
        },
        {
            memmberShipType: 'silver',
            image: img2,
            price: 250
        },
        {
            memmberShipType: 'plutinum',
            image:img3,
            price: 350
        }
    ]
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
           {
            memmberShips.map((memmberShip,idx)=> <div key={idx} className="card card-side bg-base-100 shadow-xl">
            <figure><img src={memmberShip.image} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{memmberShip.memmberShipType.toUpperCase()} Membership</h2>
                <p>Click the button to get exclusive package</p>
                <div className="card-actions justify-end">
                    <NavLink to={`checkout/${memmberShip.memmberShipType}`}> <button className="btn btn-primary">Purchase</button></NavLink>
                </div>
            </div>
        </div>)
           }
            
        </div>
    );
};

export default MembershipCard;