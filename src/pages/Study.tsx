import React, { useEffect } from "react"
import { useAppSelector } from "../store/Store";
import NavBar from "../components/Navbar";

const Study = () => {
    const selectedCollections = useAppSelector(state => state.collections.collections);
    const frontFlashcard = useAppSelector(state => state.collections.frontFlashcard);
    const backFlashcard = useAppSelector(state => state.collections.backFlashcard);

    /* 
    1. Get list of flashcards in selectedCollections
    2. Randomize the flashcards
    3. Setup frontend
    */


    useEffect(() => {
        
    });

  return (
    <div>
      <NavBar/>
      <h1>{selectedCollections}</h1>
      <h1>{frontFlashcard}</h1>
      <h1>{backFlashcard}</h1>
    </div>
  )
};

export default Study;
