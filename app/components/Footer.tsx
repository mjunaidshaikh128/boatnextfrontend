const Footer = () => {
  return (
    <div className="flex flex-col bg-[#343a40] text-white pt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-items-center mb-4">
        <div>
            <h3 className="font-semibold mb-2">ABOUT US</h3>
            <ul className="leading-loose">
                <li>Help</li>
                <li>Who we are</li>
                <li>How does it work?</li>
                <li>Press</li>
                <li>Rent out your boat</li>
                <li>Professional Boat Owners</li>
                <li>Partners</li>
                <li>Join Us</li>
                <li>Blog</li>
            </ul>
        </div>
        <div>
            <h3 className="font-semibold mb-2">DESTINATION</h3>
            <ul className="leading-loose">
                <li>Maita</li>
                <li>Croatia</li>
                <li>Greece</li>
                <li>Italy</li>
                <li>Ibiza</li>
                <li>Cannes</li>
                <li>Zaddar</li>
            </ul>
        </div>
        <div>
            <h3 className="font-semibold mb-2">BOATS</h3>
            <ul className="leading-loose">
                <li>Charter Sailboat</li>
                <li>Charter Motorboat</li>
                <li>Charter Catamaran</li>
                <li>Charter RIB</li>
                <li>Charter Yacht</li>
            </ul>
        </div>
        <div>
            <h3 className="font-semibold mb-2">FOLLOW US</h3>
            <ul className="leading-loose">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
            </ul>
        </div>
        </div> 
      <div className="self-center mb-4">&copy; Created by Muhammad Junaid Shaikh 2023</div>
    </div>
  );
};

export default Footer;
