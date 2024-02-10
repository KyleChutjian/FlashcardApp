import React, {useState, useEffect, ChangeEvent} from "react";
import NavBar from "../components/Navbar";
import Modal from "../components/CreateCollectionModal";
import { getCollectionsByUserId, createCollection } from "../api";
import { useAppSelector } from "../store/Store";
import Collections from "../components/Collections";

const Dashboard = () => {

    return(
        <div className="bg-gray-100 min-h-screen">
            <NavBar/>


            {/* Start Studying Jumbotron Button & Front/Back Flashcard Options*/}
            <section className="bg-yellow-200">
                {/* Jumbotron */}
                <div className="py-10 px-4 mx-auto max-w-screen-xl text-center">
                    <button 
                        className="text-gray-900 text-4xl bg-transparent font-extrabold  py-2 px-4 border border-gray-900 hover:text-white hover:bg-gray-900 hover:border-transparent rounded"
                        // onClick={}
                    >Start Studying</button>
                </div>

                {/* Front Flashcard */}
                <div className="front-flashcard-container content-center justify-items-center">
                    <h1 className="text-center font-extrabold text-gray-800">Front Flashcard</h1>
                    <ul className="grid w-[30%] gap-6 md:grid-cols-3 mx-auto">
                        <li>
                            <input type="radio" id="front-flashcard-english" name="front" value="english" className="hidden peer" required/>
                            <label htmlFor="front-flashcard-english" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">English</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="front-flashcard-romaji" name="front" value="english" className="hidden peer" required/>
                            <label htmlFor="front-flashcard-romaji" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">Romaji</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="front-flashcard-kana" name="front" value="english" className="hidden peer" required/>
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
                                <input type="radio" id="back-flashcard-english" name="back" value="english" className="hidden peer" required/>
                                <label htmlFor="back-flashcard-english" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">English</div>
                                    </div>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="back-flashcard-romaji" name="back" value="english" className="hidden peer" required/>
                                <label htmlFor="back-flashcard-romaji" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Romaji</div>
                                    </div>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="back-flashcard-kana" name="back" value="english" className="hidden peer" required/>
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