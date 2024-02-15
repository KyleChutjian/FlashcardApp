import React, { useEffect, useState } from "react"
import { useAppSelector } from "../store/Store";
import NavBar from "../components/Navbar";
import { getCollectionNameById, getFlashcardsByCollectionIds } from "../api";
import { useNavigate } from "react-router-dom";
const lodash = require("lodash");

type Flashcard = {
  flashcard_id: string;
  collection_id: string;
  english: string;
  romaji: string;
  kana: string;
  createdAt: string;
}

type FlashcardScore = {
  flashcard_id: string;
  collection_name: string;
  front: string;
  isCorrect: boolean;
}

const Study = () => {
    const selectedCollections = useAppSelector(state => state.collections.collections);
    const frontFlashcardLanguage = useAppSelector(state => state.collections.frontFlashcard);
    const backFlashcardLanguage = useAppSelector(state => state.collections.backFlashcard);

    const router = useNavigate();
    
    const [ frontFlashcards, setFrontFlashcards ] = useState<Array<FlashcardScore> | null>(null);
    const [ backFlashcards, setBackFlashcards ] = useState<Array<string> | null>(null);
    const [ currentFrontFlashcard, setCurrentFrontFlashcard ] = useState<FlashcardScore>({
      flashcard_id: "",
      collection_name: "",
      front: "",
      isCorrect: false
    });
    const [ currentBackFlashcard, setCurrentBackFlashcard ] = useState("");
    const [ currentFlashcardIndex, setCurrentFlashcardIndex ] = useState(0);
    const [ totalFlashcardIndex, setTotalFlashcardIndex ] = useState(0);
    const [ totalCorrectFlashcards, setTotalCorrectFlashcards ] = useState(0);
    const [ inputText, setInputText ] = useState("");
    
    useEffect(() => {
      if (frontFlashcards) {
        const correctFlashcards = frontFlashcards?.filter(flashcard => flashcard.isCorrect);
        setTotalCorrectFlashcards(correctFlashcards?.length);
      }
    }, [currentFlashcardIndex])

    useEffect(() => {
      setTotalCorrectFlashcards(0);
      setCurrentFlashcardIndex(0);

      if (frontFlashcards) {
        setFrontFlashcards((currentFrontFlashcards: Array<FlashcardScore> | null) => {
          if (!currentFrontFlashcards) return null;
          return currentFrontFlashcards.map(flashcard => ({
            ...flashcard,
            isCorrect: false
          }));
        })
      }

      getFlashcardsByCollectionIds({collectionIds: selectedCollections}).then(async (res) => {
        const shuffledFlashcards = lodash.shuffle(res.data);
        const shuffledFrontFlashcards = await Promise.all(shuffledFlashcards.map(async (flashcard: Flashcard) => {
          const collectionName = (await getCollectionNameById(flashcard.collection_id)).data;

          if (frontFlashcardLanguage === "english") return {
            flashcard_id: flashcard.flashcard_id,
            collection_id: flashcard.collection_id, 
            collection_name: collectionName,
            front: flashcard.english,
            english: flashcard.english,
            romaji: flashcard.romaji,
            kana: flashcard.kana,
            isCorrect: false
          };
          if (frontFlashcardLanguage === "romaji") return {
            flashcard_id: flashcard.flashcard_id, 
            collection_id: flashcard.collection_id, 
            collection_name: collectionName,
            front: flashcard.romaji, 
            english: flashcard.english,
            romaji: flashcard.romaji,
            kana: flashcard.kana,
            isCorrect: false
          };
          if (frontFlashcardLanguage === "kana") return {
            flashcard_id: flashcard.flashcard_id, 
            collection_id: flashcard.collection_id, 
            collection_name: collectionName,
            front: flashcard.kana, 
            english: flashcard.english,
            romaji: flashcard.romaji,
            kana: flashcard.kana,
            isCorrect: false
          };
          else return null;
        }));

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

      if (newInput.toLowerCase() === currentBackFlashcard.toLowerCase() && newInput !== "") {
        console.log(frontFlashcards)
        setFrontFlashcards((currentFrontFlashcards: Array<FlashcardScore> | null) => {
          if (!currentFrontFlashcards) return null;
          const updatedFrontFlashcards = [...currentFrontFlashcards];
          updatedFrontFlashcards[currentFlashcardIndex].isCorrect = true;
          return updatedFrontFlashcards;
        });

        if (currentFlashcardIndex+1 === totalFlashcardIndex) {
          console.log("DONE!");
          // SAVE RESULTS
          router("/results", {state: {
            flashcardResults: frontFlashcards
          }});
        } else {
          if (frontFlashcards && backFlashcards) {
            setCurrentFrontFlashcard(frontFlashcards[currentFlashcardIndex+1])
            setCurrentBackFlashcard(backFlashcards[currentFlashcardIndex+1])
            setCurrentFlashcardIndex(currentFlashcardIndex+1);
            setInputText("");
          }
        }
      }
    }

    const onSkip = () => {
      if (currentFlashcardIndex+1 === totalFlashcardIndex) {
        console.log("DONE!");
        setInputText("");
      } else {
        if (frontFlashcards && backFlashcards) {
          setCurrentFrontFlashcard(frontFlashcards[currentFlashcardIndex+1])
          setCurrentBackFlashcard(backFlashcards[currentFlashcardIndex+1])
          setCurrentFlashcardIndex(currentFlashcardIndex+1);
          setInputText("");
        }
      }

    }

  return (
    <div>
      <NavBar/>

      <section>
        <div className="max-w-md mx-auto mt-5 flex flex-col items-center mt-[10rem]">
            <div className="mb-5 min-w-[70%] max-w-[100%]">
              <h1 className="text-center">{`Collection: ${currentFrontFlashcard.collection_name}`}</h1>
              <h1 className="text-4xl font-bold tracking-tight py-5 text-center border max-w-[100%] mb-3 h-auto overflow-hidden">
                <span className="inline-block max-w-full break-all overflow-ellipsis">{currentFrontFlashcard.front}</span>
              </h1>
              <p className="text-center mb-2">{`${totalCorrectFlashcards}/${currentFlashcardIndex}`}</p>
              <input 
                  type="text" 
                  name="input"
                  value={inputText}
                  onChange={(e) => onChangeInput(e.target.value)}
                  className="shadow-sm border-b-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" 
              />
              <p className="text-center mt-2">{`Type in: ${backFlashcardLanguage}`}</p>
              <button onClick={() => onSkip()} className="mt-3 flex justify-center mx-auto w-[30%] t-5 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Skip</button> 
              
            </div> 
        </div>
    </section>
    </div>
  )
};

export default Study;
