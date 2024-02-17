import React from "react"

type Flashcard = {
    flashcard_id: string;
    collection_id: string;
    collection_name: string;
    english: string;
    romaji: string;
    kana: string;
}

interface ResultFlashcardProps {
  flashcards: Flashcard[];
}

const ResultFlashcards: React.FC<ResultFlashcardProps> = ({flashcards}) => {
  console.log(flashcards);

  return (
    <div>
      
    </div>
  )
};

export default ResultFlashcards;
