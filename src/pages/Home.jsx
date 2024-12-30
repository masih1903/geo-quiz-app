import { NavLink, Outlet } from "react-router-dom";
import Card from "../components/Card";

function Home() {
  return (
    <>
  
     
          <NavLink to="/world"><Card title="World" description="Identify countries, capitals and flags on a global scale - can you get them all?"/></NavLink>
       
          <NavLink to="/europe"><Card title="Europe" description=" Explore Europe by identifying its countries, capitals and flags."/></NavLink>
       
          <NavLink to="/asia"><Card title="Asia" description="Can you pinpoint countries, capitals and flags across vast Asia?"/></NavLink>
       
          <NavLink to="/africa"><Card title="Africa" description=" Identify the countries, capitals and flags of vibrant Africa."/></NavLink>
       
          <NavLink to="/north-america"><Card title="North America" description="Spot countries, capitals and flags in North America with confidence!"/></NavLink>
      
          <NavLink to="/south-america"><Card title="South America" description="How many South American countries, capitals and flags can you recall?"/></NavLink>
       
    </>
  );
}

export default Home;
