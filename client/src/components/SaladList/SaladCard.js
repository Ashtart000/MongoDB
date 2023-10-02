import React, { useState } from 'react';
import { addSaladImage } from '../../api';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

const SaladCard = (props) => {
    const {_id, name, weight, dietType, isSpicy, ingredients, images} = props.salad;

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
      };

    const uploadBtnHandler = async() => {
        if(file) {
            const formData = new FormData();
            [...file].forEach((file) => {
                formData.append('images', file)
            })
        
        try {
            await addSaladImage(formData, _id);
            setFile(null);
            await props.loadSalads();
        } catch (error) {
            console.error(error)
        }
    }
    }

    return (
        <>
            <article className='card-wrapper'>
                <h2>{name}</h2>
                {images && images.length > 0 ? (
                    <Slider {...settings}>
                        {images.map((imageName, index) => (
                            <div key={index} className='image-wrapper'>
                                <img src={`http://localhost:5000/${imageName}`} alt={imageName}/>
                            </div>
                        ))}
                    </Slider>
                ) : null}
                <br/>
                
                <h3>Not enought images? Load more</h3>
                <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                />
                <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
                {file ? <button onClick={uploadBtnHandler}>Upload image(s)</button> : null}

                <p>weight: {weight} kg</p>
                <p>diet type: {dietType}</p>
                <p>{isSpicy ? 'spicy' : 'not spicy'}</p>
                <p>ingredients:</p>
                <ul>
                    {ingredients.map((ingredient) => (
                        <li key={ingredient._id}>{ingredient.name}</li>
                    ))}
                </ul>
            </article>
        </>
    );
}

export default SaladCard;
