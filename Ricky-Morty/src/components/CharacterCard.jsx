// Card component to show basic info of a character in the grid
// Wrapped with Link to navigate to the character's detail page
import React from 'react';
import cardStyles from "../styles/card.module.css"
import { Link } from "react-router-dom";

const CharacterCard = ({ character }) => {
  return (
    
      <Link
        to={`/character/${character.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
      <div className={cardStyles.card} style={{color:"black"}}>

         {/* Character Image with fixed aspect ratio */}

        <img src={character.image} alt={character.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />

        {/* Character Name and Status */}
        
        <div className={cardStyles.cardContent}>
        <h3>{character.name}</h3>
        <p>{character.status} - {character.species}</p>
        </div>
      </div>
      </Link>
  );
};

export default CharacterCard;
