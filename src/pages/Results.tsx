import React, { useEffect, useState } from "react"
import NavBar from "../components/Navbar";
import { useLocation } from "react-router-dom";

type FlashcardResult = {
  flashcard_id: string;
  collection_id: string;
  collection_name: string;
  english: string;
  romaji: string;
  kana: string;
  isCorrect: boolean;
}


const Results = () => {
  const location = useLocation();

  const [ flashcardResults, setFlashcardResults ] = useState<Array<FlashcardResult> | null>(null)
  



  useEffect(() => {
    if (location.state) {
      console.log(location.state.flashcardResults);
      setFlashcardResults(location.state.flashcardResults)
    } else {
      console.log("uh oh")
    }
  
  }, [location])
  
  return (
    <div>
        <NavBar />
        <section>
          <h1 className="text-4xl text-center font-bold mt-10">Results Screen</h1>
          <h1 className="text-5xl text-center font-bold mt-5">14/14</h1>
        </section>

    </div>
  )
};

export default Results;
