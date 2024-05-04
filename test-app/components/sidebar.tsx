import React from "react";
import Link from "next/link";




const Sidebar = () => {
  const navItems = [
    { name: "Register Project", href: "/register"},
    
  ];

  
  
  

  

  return (
    <div className="pt-1 px-5 bg-gradient-to-b  transition-all duration-300 z-10">
      <div className="p-4">
        <Link href="/" className="flex">
          
          <span className="cursor-pointer text-white font-bold text-2xl">
            Vanderlinde
          </span>
        </Link>
      </div>
      <ul className="h-full mt-3">
        {navItems.map((item, index) => (
          <>
            
            <li
              key={index}
              className="mb-2 hover:bg-purple-800 cursor-pointer rounded-lg"
            >
              <Link href={item.href}>
                <div className="flex ">
                  
                  <span className="block px-4 py-2 text-sm font-semibold text-white ">
                    {item.name}
                  </span>
                </div>
              </Link>
            </li>
          </>
        ))}
        
      </ul>
    </div>
  );
};

export default Sidebar;
