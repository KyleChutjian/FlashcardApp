import React, {useState, useEffect, ChangeEvent} from "react";
import NavBar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../store/Store";
import Collections from "../components/Collections";
import { useNavigate } from "react-router-dom";
import { setBackFlashcard, setFrontFlashcard } from "../store/slices";

const Dashboard = () => {
    const selectedCollections = useAppSelector(state => state.collections.collections);
    const dispatch = useAppDispatch();
    const router = useNavigate();

    const [ frontCard, setFrontCard ] = useState("");
    const [ backCard, setBackCard ] = useState("");

    const handleStartStudying = () => {
        if (selectedCollections.length === 0) {
            console.log("TOAST: No collections are selected");
        } else if (frontCard === backCard) {
            console.log("TOAST: Front and back flashcards can't be the same");
        } else {
            console.log(selectedCollections);
            router("/study");
        }
    }

    const handleFlashcardChange = (side: string, language: string) => {
        if (side === "front") {
            setFrontCard(language);
            dispatch(setFrontFlashcard({frontFlashcard: language}));
        } 
        else if (side === "back") {
            setBackCard(language);
            dispatch(setBackFlashcard({backFlashcard: language}));
        }
        else console.log("TOAST: throw error");
    }

    return(
        <div className="bg-gray-100 min-h-screen">
            <NavBar/>


            {/* Start Studying Jumbotron Button & Front/Back Flashcard Options*/}
            <section className="bg-yellow-200">
                {/* Jumbotron */}
                <div className="py-10 px-4 mx-auto max-w-screen-xl text-center">
                    <button 
                        className="text-gray-900 text-4xl bg-transparent font-extrabold  py-2 px-4 border border-gray-900 hover:text-white hover:bg-gray-900 hover:border-transparent rounded"
                        onClick={handleStartStudying}
                    >Start Studying</button>
                </div>

                {/* Front Flashcard */}
                <div className="front-flashcard-container content-center justify-items-center">
                    <h1 className="text-center font-extrabold text-gray-800">Front Flashcard</h1>
                    <ul className="grid w-[30%] gap-6 md:grid-cols-3 mx-auto">
                        <li>
                            <input type="radio" onChange={(e) => handleFlashcardChange("front", "english")} id="front-flashcard-english" name="front" value="english" className="hidden peer" required/>
                            <label htmlFor="front-flashcard-english" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">English</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" onChange={(e) => handleFlashcardChange("front", "romaji")} id="front-flashcard-romaji" name="front" value="english" className="hidden peer" required/>
                            <label htmlFor="front-flashcard-romaji" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">Romaji</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" onChange={(e) => handleFlashcardChange("front", "kana")} id="front-flashcard-kana" name="front" value="english" className="hidden peer" required/>
                            <label htmlFor="front-flashcard-kana" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">Kana</div>
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>

                {/* Back Flashcard */}
                <div className="back-flashcard-container py-5">
                    <h1 className="text-center font-extrabold text-gray-800">Back Flashcard</h1>
                    <ul className="grid w-[30%] gap-6 md:grid-cols-3 mx-auto">
                            <li>
                                <input type="radio" onChange={(e) => handleFlashcardChange("back", "english")} id="back-flashcard-english" name="back" value="english" className="hidden peer" required/>
                                <label htmlFor="back-flashcard-english" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">English</div>
                                    </div>
                                </label>
                            </li>
                            <li>
                                <input type="radio" onChange={(e) => handleFlashcardChange("back", "romaji")} id="back-flashcard-romaji" name="back" value="english" className="hidden peer" required/>
                                <label htmlFor="back-flashcard-romaji" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Romaji</div>
                                    </div>
                                </label>
                            </li>
                            <li>
                                <input type="radio" onChange={(e) => handleFlashcardChange("back", "kana")} id="back-flashcard-kana" name="back" value="english" className="hidden peer" required/>
                                <label htmlFor="back-flashcard-kana" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Kana</div>
                                    </div>
                                </label>
                            </li>
                        </ul>
                </div>
            </section>

            {/* Collections Grid Section */}
            <Collections/>
        </div>
    )
}

export default Dashboard;