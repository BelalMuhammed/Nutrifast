import React from "react";
import {
  FaAppleAlt,
  FaCarrot,
  FaLemon,
  FaLeaf,
  FaRunning,
  FaHeartbeat,
  FaSwimmer,
  FaWalking,
  FaWeight,
  FaBicycle,
  FaEgg,
} from "react-icons/fa";
import {
  GiWaterBottle,
  GiMeditation,
  GiTomato,
  GiBanana,
  GiBroccoli,
  GiMuscleUp,
  GiAvocado,
  GiGrapes,
  GiOrange,
  GiSteak,
  GiMilkCarton,
  GiBowlOfRice,
  GiHotMeal,
  
} from "react-icons/gi";

import "./FloatingFoodIcons.css";


const icons = [
  <FaAppleAlt />,
  <FaCarrot />,
  <GiBanana />,
  <GiTomato />,
  <GiBroccoli />,
  <FaLemon />,
  <GiAvocado />,
  <GiGrapes />,
  <GiOrange />,
  <FaLeaf />,
  <FaRunning />,
  <FaBicycle />,
  <FaSwimmer />,
  <FaWalking />,
  <GiWaterBottle />,
  <FaHeartbeat />,
  <GiMuscleUp />,
  <GiMeditation />,
  <FaWeight />,
  <GiSteak />,
  <GiMilkCarton />,
  <FaEgg />,
  <GiBowlOfRice />,
  <GiHotMeal />,

];

export default function FloatingFoodIcons() {
  const randomStyle = () => ({
    left: `${Math.random() * 90}%`, 
    fontSize: `${2 + Math.random() * 1.5}rem`, 
    animationDuration: `${13 + Math.random() * 12}s`, 
    animationDelay: `-${Math.random() * 12}s`, 
  });

  return (
    <div className="floating-icons">
      {icons.map((icon, index) => (
        <span key={index} className="icon" style={randomStyle()}>
          {icon}
        </span>
      ))}
    </div>
  );
}
