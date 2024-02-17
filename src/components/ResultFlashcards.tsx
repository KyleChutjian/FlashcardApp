import React from "react"

type Flashcard = {
    flashcard_id: string;
    collection_id: string;
    collection_name: string;
    english: string;
    romaji: string;
    kana: string;
    isCorrect: boolean;
}

interface ResultFlashcardProps {
  flashcards: Flashcard[];
}

const ResultFlashcards: React.FC<ResultFlashcardProps> = ({flashcards}) => {

  // Show incorrect flashcards first
  flashcards = flashcards.sort((a, b) => {
    if (a.isCorrect === b.isCorrect) return 0;
    else if (a.isCorrect) return 1;
    else return -1;
  });


  console.log(flashcards);

  return (
    <section className="mb-5 pt-5">
        <div className="text-gray-900 bg-gray-200 w-[80%] justify-center align-center mx-auto">
            <div className="p-4 flex">
                <h1 className="text-3xl">Flashcards</h1>
            </div>
            <div className="px-3 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5 text-center">#</th>
                            <th className="text-left p-3 px-5 text-center">English</th>
                            <th className="text-left p-3 px-5 text-center">Romaji</th>
                            <th className="text-left p-3 px-5 text-center">Kana</th>
                            <th className="text-left p-3 px-5 text-center">Collection</th>
                        </tr>
                        
                        {/* Flashcard Grid */}
                        {flashcards && flashcards.map((flashcard, key) => {
                          let bgColor = "" 
                          if (flashcard.isCorrect) bgColor = "bg-green-300";
                          else bgColor = "bg-red-300";

                            return <tr key={key} className={`border-b border-black ${bgColor}`}>
                                <td className="p-3 px-5 w-[5%] border-r border-black text-center overflow-hidden">
                                    <p className="bg-transparent border-black py-2 ">{key+1}</p>
                                </td>
                                <td className="p-3 px-5 w-[20%] border-black border-r text-center overflow-hidden">
                                  <h1>{flashcard.english}</h1>
                                </td>
                                <td className="p-3 px-5 w-[20%] border-black border-r text-center overflow-hidden">
                                  <h1>{flashcard.romaji}</h1>
                                </td>
                                <td className="p-3 px-5 w-[20%] border-black border-r text-center overflow-hidden">
                                  <h1>{flashcard.kana}</h1>
                                </td>
                                <td className="p-3 px-5 w-[20%] border-black border-r text-center overflow-hidden">
                                  <h1>{flashcard.collection_name}</h1>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        

        
    </section>
  )
};

export default ResultFlashcards;
