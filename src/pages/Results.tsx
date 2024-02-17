import React, { useEffect, useState } from "react"
import NavBar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import ResultFlashcards from "../components/ResultFlashcards";

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

  const [ flashcardResults, setFlashcardResults ] = useState<FlashcardResult[] | null>(null)
  const [ totalCorrectFlashcards, setTotalCorrectFlashcards ] = useState(0);


  useEffect(() => {
    if (location.state) {
      console.log(location.state.flashcardResults);
      setFlashcardResults(location.state.flashcardResults)

      const correctFlashcards = location.state.flashcardResults?.filter((flashcard:FlashcardResult) => flashcard.isCorrect);
      console.log(correctFlashcards.length);
      setTotalCorrectFlashcards(correctFlashcards?.length);
      
    } else {
      console.log("uh oh")
    }
  
  }, [location])
  
  return (
    <div>
        <NavBar />
        <section>
          <h1 className="text-4xl text-center font-bold mt-10">Results Screen</h1>
          {flashcardResults && totalCorrectFlashcards && <h1 className="text-5xl text-center font-bold mt-5">{`${totalCorrectFlashcards}/${flashcardResults.length}`}</h1>}
        </section>

        <section>
          {flashcardResults && <ResultFlashcards flashcards={flashcardResults} />}
        </section>

    </div>
  )
};

export default Results;
