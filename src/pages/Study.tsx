import React, { useEffect, useState } from "react"
import { useAppSelector } from "../store/Store";
import NavBar from "../components/Navbar";
import { getFlashcardsByCollectionIds } from "../api";

/* 
1. Setup frontend - DONE
2. Get list of flashcards in selectedCollections
3. Randomize the flashcards
*/

const Study = () => {
    const selectedCollections = useAppSelector(state => state.collections.collections);
    const frontFlashcard = useAppSelector(state => state.collections.frontFlashcard);
    const backFlashcard = useAppSelector(state => state.collections.backFlashcard);
    
    const [ currentFlashcard, setCurrentFlashcard ] = useState("");
    const [ inputText, setInputText ] = useState("");

    console.log(selectedCollections);

    // getFlashcardsByCollectionIds({collectionIds: selectedCollections});

    useEffect(() => {

    }, []);

    const onChangeInput = (newInput: string) => {
      


    }

  return (
    <div>
      <NavBar/>

      <section>
        <div className="max-w-md mx-auto mt-5 flex flex-col items-center mt-[10rem]">
            <div className="mb-5 min-w-[70%] max-w-[100%]">
              <h1 className="text-4xl font-bold tracking-tight py-5 text-center border max-w-[100%] mb-10 h-auto overflow-hidden">
                <span className="inline-block max-w-full break-all overflow-ellipsis">{currentFlashcard}</span>
              </h1>
                <input 
                    type="text" 
                    name="input"
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
