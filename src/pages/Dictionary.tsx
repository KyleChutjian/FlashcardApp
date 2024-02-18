import React, { useEffect, useState } from "react"
import NavBar from "../components/Navbar";
import { useAppSelector } from "../store/Store";
import { getCollectionNameById, getFlashcardsByUserId } from "../api";

type Flashcard = {
    flashcard_id: string;
    collection_id: string;
    english: string;
    romaji: string;
    kana: string;
    dictionary: boolean;
    collectionName: string;
    createdAt: string;
}


const Dictionary = () => {
    const userInfo = useAppSelector(state => state.user.userInfo);
    
    const [flashcards, setFlashcards] = useState<Array<Flashcard>>();
    const [filterLanguage, setFilterLanguage] = useState("english");
    const [filterDirection, setFilterDirection] = useState("AZ");

    useEffect(() => {
        getFlashcardsByUserId(userInfo.user_id).then(async(res: {data: Array<Flashcard>}) => {
            
            // const dictionaryFlashcards = res.data.filter(flashcard => flashcard.dictionary)
            const dictionaryFlashcardsMap = res.data.map(async (flashcard: Flashcard) => {
                const collectionName = (await getCollectionNameById(flashcard.collection_id)).data;
                flashcard.collectionName = collectionName
                if (flashcard.dictionary) return flashcard;

            })
            const dictionaryFlashcards = await Promise.all(dictionaryFlashcardsMap);
            const filteredFlashcards = dictionaryFlashcards.filter((flashcard): flashcard is Flashcard => flashcard !== undefined && flashcard.dictionary)
            setFlashcards(filteredFlashcards);
        });
    }, []);

    const sortFlashcards = (language: string) => {
        let newFilterDirection = filterDirection;
        let newFilterLanguage = filterLanguage;
        if (filterLanguage === language) {
            if (newFilterDirection === "AZ") newFilterDirection = "ZA";
            else newFilterDirection = "AZ";
            setFilterDirection(newFilterDirection);
        } else {
            newFilterDirection = "AZ"
            setFilterDirection("AZ");
            newFilterLanguage = language;
            setFilterLanguage(language);
        }
        


        const sortedFlashcards = flashcards?.slice().sort((a, b) => {
            switch (language) {
                case "english":
                    return newFilterDirection === "AZ" ? a.english.localeCompare(b.english) : b.english.localeCompare(a.english)
                    
                case "romaji":
                    return newFilterDirection === "AZ" ? a.romaji.localeCompare(b.romaji) : b.romaji.localeCompare(a.romaji)

                case "kana":
                    return newFilterDirection === "AZ" ? a.kana.localeCompare(b.kana) : b.kana.localeCompare(a.kana)

                case "collection":
                    return newFilterDirection === "AZ" ? a.collectionName.localeCompare(b.collectionName) : b.collectionName.localeCompare(a.collectionName)

                default:
                    return 0;
            }
        });


        setFlashcards(sortedFlashcards);
    }



  return (
    <div>
        <NavBar />
        <h1 className="text-center text-4xl mt-5 font-bold">Dictionary Page</h1>
        <section>
            <div className="px-4 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5 text-center">#</th>
                            <th className="text-left p-3 px-5 text-center">
                                <button className="flex items-center" onClick={(e) => sortFlashcards("english")}>
                                    English
                                    {filterLanguage==="english" && filterDirection === "AZ" ? <img src={require("../images/arrow_up.png")} alt="Options" className="h-4 w-4" /> : <div></div>}
                                    {filterLanguage==="english" && filterDirection === "ZA" ? <img src={require("../images/arrow_down.png")} alt="Options" className="h-4 w-4" /> : <div></div>}
                                </button>
                            </th>
                            <th className="text-left p-3 px-5 text-center">
                                <button className="flex items-center" onClick={(e) => sortFlashcards("romaji")}>
                                    Romaji
                                    {filterLanguage==="romaji" && filterDirection === "AZ" ? <img src={require("../images/arrow_up.png")} alt="Options" className="h-4 w-4" /> : <div></div>}
                                    {filterLanguage==="romaji" && filterDirection === "ZA" ? <img src={require("../images/arrow_down.png")} alt="Options" className="h-4 w-4" /> : <div></div>}
                                </button>
                            </th>
                            <th className="text-left p-3 px-5 text-center">
                                <button className="flex items-center" onClick={(e) => sortFlashcards("kana")}>
                                    Kana
                                    {filterLanguage==="kana" && filterDirection === "AZ" ? <img src={require("../images/arrow_up.png")} alt="Options" className="h-4 w-4" /> : <div></div>}
                                    {filterLanguage==="kana" && filterDirection === "ZA" ? <img src={require("../images/arrow_down.png")} alt="Options" className="h-4 w-4" /> : <div></div>}
                                </button>
                            </th>
                            <th className="text-left p-3 px-5 text-center">
                                <button className="flex items-center" onClick={(e) => sortFlashcards("collection")}>
                                    Collection
                                    {filterLanguage==="collection" && filterDirection === "AZ" ? <img src={require("../images/arrow_up.png")} alt="Options" className="h-4 w-4" /> : <div></div>}
                                    {filterLanguage==="collection" && filterDirection === "ZA" ? <img src={require("../images/arrow_down.png")} alt="Options" className="h-4 w-4" /> : <div></div>}
                                </button>
                            </th>
                        </tr>
                        {flashcards && flashcards.length>0 && flashcards.map((flashcard, key) => {
                            return <tr key={key} className="border-b hover:bg-orange-100 bg-gray-100 h-10">
                                <td className="px-5 w-[5%] border-r border-black text-center overflow-hidden">
                                    <p className="bg-transparent border-black py-2 ">{key+1}</p>
                                </td>
                                <td className="px-5 w-[20%] border-black border-r text-center overflow-hidden">
                                  <h1>{flashcard.english}</h1>
                                </td>
                                <td className="px-5 w-[20%] border-black border-r text-center overflow-hidden">
                                  <h1>{flashcard.romaji}</h1>
                                </td>
                                <td className="px-5 w-[20%] border-black border-r text-center overflow-hidden">
                                  <h1>{flashcard.kana}</h1>
                                </td>
                                <td className="px-5 w-[20%] border-black border-r text-center overflow-hidden">
                                  <h1>{flashcard.collectionName}</h1>
                                </td>
                            </tr>



                        })}


                    </tbody>




                </table>


            </div>




        </section>
    </div>
  )
};

export default Dictionary;
