import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isAuthenticated } from '../../helper/helper';
import Header from '../header/header';
import "./CardDetails.css";
function CardDetails() {
    const { id } = useParams();
    const [card, setCard] = useState([]);
    const [InstructionsB, setInstructionsB] = useState(true);
    const token = isAuthenticated();
    const url = process.env.REACT_APP_API;
    const getRescipe = () => {
        fetch(`${url}/upload`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                authorization: `${token}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setCard(data.data);
                    console.log(data)
                }
            })
    }

    useEffect(() => {
        getRescipe()
    }, [])

    const myCard = card.find((c) => c._id == id);
    // const list = myCard.ingredients
    // console.log(list);
    if (!myCard) {
        return <div>Card not found.</div>;
    }

    return (
        <>
            <Header />
            <div className="card-main">
                <div className='cardContainer'>
                    <h3>{myCard.title}</h3>
                    <img className="cardImage" src={myCard.url} alt="card" />
                </div>
                <div className="cardButton">
                    <button className="Instructions" onClick={() => { setInstructionsB(true) } } style={InstructionsB ? {backgroundColor : "black" , color : "white"}:{}}>Instructions</button>
                    <button className="Ingredients" onClick={() => { setInstructionsB(false) }} style={!InstructionsB ? {backgroundColor : "black" , color : "white"}:{}}>Ingredients</button>
                    <div>
                        {
                            InstructionsB ? <p>{myCard.description}</p> :
                                // list == undefined ? <p>Ingredients not available</p> :
                                myCard.ingredients.split(",").map((li) => {
                                   return <li>{li}</li>
                                })
                               
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardDetails;
