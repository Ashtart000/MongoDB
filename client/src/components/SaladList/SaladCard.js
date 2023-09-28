import React from 'react';

const SaladCard = (props) => {
    const {name, weight, dietType, isSpicy, ingredients} = props.salad

    return (
        <>
            <article>
                <h2>{name}</h2>
                <p>weight: {weight} kg</p>
                <p>diet type: {dietType}</p>
                <p>{isSpicy ? 'spicy' : 'not spicy'}</p>
                <p>ingredients:</p>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.name}</li>
                    ))}
                </ul>
            </article>
        </>
    );
}

export default SaladCard;
