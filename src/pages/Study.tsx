import React, { useEffect, useState } from "react"
import { useAppSelector } from "../store/Store";
import NavBar from "../components/Navbar";
import { getFlashcardsByCollectionIds } from "../api";
const lodash = require("lodash");

/* 
1. Setup frontend - DONE
2. Get list of flashcards in selectedCollections - DONE
3. Randomize the flashcards
4. Show current flashcard's collection name
*/

type Flashcard = {
  flashcard_id: string;
  collection_id: string;
  english: string;
  romaji: string;
  kana: string;
  createdAt: string;
}

const Study = () => {
    const selectedCollections = useAppSelector(state => state.collections.collections);
    const frontFlashcardLanguage = useAppSelector(state => state.collections.frontFlashcard);
    const backFlashcardLanguage = useAppSelector(state => state.collections.backFlashcard);
    
    const [ frontFlashcards, setFrontFlashcards ] = useState<Array<string> | null>(null);
    const [ backFlashcards, setBackFlashcards ] = useState<Array<string> | null>(null);
    const [ currentFrontFlashcard, setCurrentFrontFlashcard ] = useState("");
    const [ currentBackFlashcard, setCurrentBackFlashcard ] = useState("");
    const [ currentFlashcardIndex, setCurrentFlashcardIndex ] = useState(0);
    const [ totalFlashcardIndex, setTotalFlashcardIndex ] = useState(0);
    const [ inputText, setInputText ] = useState("");

    

    useEffect(() => {
      getFlashcardsByCollectionIds({collectionIds: selectedCollections}).then((res) => {
        const shuffledFlashcards = lodash.shuffle(res.data);
        const shuffledFrontFlashcards = shuffledFlashcards.map((flashcard: Flashcard) => {
          if (frontFlashcardLanguage === "english") return flashcard.english;
          if (frontFlashcardLanguage === "romaji") return flashcard.romaji;
          if (frontFlashcardLanguage === "kana") return flashcard.kana;
          else return null;
        });

        const shuffledBackFlashcards = shuffledFlashcards.map((flashcard: Flashcard) => {
          if (backFlashcardLanguage === "english") return flashcard.english;
          if (backFlashcardLanguage === "romaji") return flashcard.romaji;
          if (backFlashcardLanguage === "kana") return flashcard.kana;
          else return null;
        });

        setFrontFlashcards(shuffledFrontFlashcards);
        setBackFlashcards(shuffledBackFlashcards);
        setCurrentFrontFlashcard(shuffledFrontFlashcards[0]);
        setCurrentBackFlashcard(shuffledBackFlashcards[0]);
        setTotalFlashcardIndex(shuffledBackFlashcards.length);
      });
    }, []);

    const onChangeInput = (newInput: string) => {
      setInputText(newInput);

      if (newInput.toLowerCase() === currentBackFlashcard.toLowerCase()) {
        console.log(`${currentFlashcardIndex} : ${totalFlashcardIndex}`)
        if (currentFlashcardIndex+1 === totalFlashcardIndex) {
          console.log("DONE!");
          setInputText("");
          setCurrentFrontFlashcard("DONE");
        } else {
          if (frontFlashcards && backFlashcards) {
            console.log("changing to new flashcard:");
            setCurrentFrontFlashcard(frontFlashcards[currentFlashcardIndex+1])
            setCurrentBackFlashcard(backFlashcards[currentFlashcardIndex+1])
            setCurrentFlashcardIndex(currentFlashcardIndex+1);
            setInputText("");
          } else {
            console.log(frontFlashcards);
            console.log(backFlashcards);
          }



        }


        console.log("CORRECT");
      }


    }

  return (
    <div>
      <NavBar/>

      <section>
        <div className="max-w-md mx-auto mt-5 flex flex-col items-center mt-[10rem]">
            <div className="mb-5 min-w-[70%] max-w-[100%]">
              <h1 className="text-4xl font-bold tracking-tight py-5 text-center border max-w-[100%] mb-10 h-auto overflow-hidden">
                <span className="inline-block max-w-full break-all overflow-ellipsis">{currentFrontFlashcard}</span>
              </h1>
                <input 
                    type="text" 
                    name="input"
                    value={inputText}
                    onChange={(e) => onChangeInput(e.target.value)}
                    className="shadow-sm border-b-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                />
            </div> 
        </div>
    </section>
    </div>
  )
};

export default Study;
