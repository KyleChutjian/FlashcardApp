import React, { useEffect, useState } from "react"
import NavBar from "../components/Navbar";
import { useAppSelector } from "../store/Store";
import { getFlashcardsByUserId } from "../api";

type Flashcard = {
    flashcard_id: string;
    collection_id: string;
    english: string;
    romaji: string;
    kana: string;
    createdAt: string;
}


const Dictionary = () => {
    const userInfo = useAppSelector(state => state.user.userInfo);
    
    const [flashcards, setFlashcards] = useState();

    useEffect(() => {
        getFlashcardsByUserId(userInfo.user_id).then((res) => {
            setFlashcards(res.data);
        });
    }, []);

  return (
    <div>
        <NavBar />
        <h1 className="text-center text-4xl mt-5 font-bold">Dictionary Page</h1>
    </div>
  )
};

export default Dictionary;
