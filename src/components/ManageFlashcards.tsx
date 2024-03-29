import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { createFlashcard, getFlashcardsByCollectionId, updateFlashcard, deleteFlashcard, updateCollection } from "../api";
import ConfirmationModal from "./ConfirmationModal";

const Flashcards = () => {
    type Flashcard = {
        flashcard_id: string;
        collection_id: string;
        english: string;
        romaji: string;
        kana: string;
        dictionary: boolean;
        createdAt: string;
    }

    const { collection_id} = useParams();
    const [ flashcards, setFlashcards ] = useState<Array<Flashcard> | null>(null);
    const [ numFlashcards, setNumFlashcards ] = useState(0);

    useEffect(() => {
        if (collection_id) getFlashcardsByCollectionId(collection_id).then((res) => {
            setFlashcards(res.data);
            setNumFlashcards(res.data.length);
        });
    }, [])
    
    const handleCreateFlashcard = async () => {
        console.log("Creating new flashcard");
        await createFlashcard({
            collection_id: collection_id,
            english: "",
            romaji: "",
            kana: ""
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                setFlashcards(currentFlashcards => {
                    if (currentFlashcards) {
                        return [...currentFlashcards, res.data];
                    } else {
                        return [res.data];
                    }
                });
                if (flashcards && collection_id) {
                    setNumFlashcards(flashcards.length+1);
                    updateCollection(collection_id, {numFlashcards: flashcards.length+1});
                }
                
            }
        });
    }

    const handleFlashcardOnChange = (flashcard_id: string, column: string, value: string) => {
        setFlashcards(currentFlashcards => {
            if (currentFlashcards) {
                return currentFlashcards.map(flashcard => {
                    if (flashcard.flashcard_id === flashcard_id) {
                        return {
                            ...flashcard,
                            [column]: value
                        };
                    }
                    return flashcard;
                });
            } else {
                return null;
            }
        });
    }

    const handleSaveFlashcard = (flashcard: Flashcard) => {
        console.log(`Saving flashcard with id ${flashcard.flashcard_id}`);
        
        updateFlashcard(flashcard).then((res) => {
            if (res.status === 200) {
                console.log("Flashcard successfully updated");
                console.log(res.data)
            }
            
        });
    };

    const handleSaveAll = () => {
        console.log("saving all flashcards");
        
        flashcards?.forEach(flashcard => {
            updateFlashcard(flashcard).then((res) => {
                if (res.status === 200) {
                    console.log(`Flashcard ${flashcard.flashcard_id} has been updated`);
                    console.log(res.data)
                }
            })
        })
    };

    const [isConfirmationModalOpen, setIsConfirmationModalOpen ] = useState(false);
    const [flashcardToDelete, setFlashcardToDelete ] = useState("");

    const handleFlashcardDelete = (flashcard_id: string) => {
        console.log(`clicked on delete flashcard for id: ${flashcard_id}`);
        setFlashcardToDelete(flashcard_id);
        setIsConfirmationModalOpen(true);
    }

    const handleConfirmDeleteFlashcard = () => {
        console.log(`Deleting flashcard with id ${flashcardToDelete}`);
        
        deleteFlashcard(flashcardToDelete).then((res) => {
            if (res.status === 200) {
                console.log(`Deleted flashcard with id ${res.data.flashcard_id}`);
                setFlashcards(currentFlashcards => {
                    if (currentFlashcards) {
                        return currentFlashcards.filter(flashcard => flashcard.flashcard_id !== flashcardToDelete);
                    } else return null
                });
                if (flashcards && collection_id) {
                    setNumFlashcards(flashcards.length-1);
                    updateCollection(collection_id, {numFlashcards: flashcards.length-1});
                }

                console.log(`TOAST: Successfully deleted ${res.data.name}`)
                setIsConfirmationModalOpen(false);
            }
        });
    }
    const handleCancelDelete = () => {
        // If the user cancels deletion, close the modal
        setIsConfirmationModalOpen(false);
    };

    const handleDictionaryCheckbox = (flashcard: Flashcard, value: boolean) => {
        console.log(`Changing flashcard ${flashcard.flashcard_id} to ${value}`);
        updateFlashcard({
            flashcard_id: flashcard.flashcard_id, 
            english: flashcard.english, 
            romaji: flashcard.romaji, 
            kana: flashcard.kana, 
            dictionary: value
        }).then((res) => {
            if (res.status === 200) {
                console.log("Flashcard successfully updated");
                console.log(res.data)
                if (flashcards) {
                    const flashcardIndex = flashcards.findIndex(val => val.flashcard_id === flashcard.flashcard_id);

                    const newArr = [...flashcards];
                    newArr[flashcardIndex].dictionary = value;
                    console.log(newArr);
                    setFlashcards(newArr);

                }



            }
            
        });
    }

  return (
    <section className="mb-5 pt-5">
        <div className="text-gray-900 bg-gray-200 w-[90%] justify-center align-center mx-auto">
            <div className="p-4 flex">
                <h1 className="text-3xl">Flashcards: {numFlashcards}</h1>
            </div>
            <div className="px-3 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5">#</th>
                            <th className="text-left p-3 px-5">English</th>
                            <th className="text-left p-3 px-5">Romaji</th>
                            <th className="text-left p-3 px-5">Kana</th>
                        </tr>
                        
                        {/* Flashcard Grid */}
                        {flashcards && flashcards.map((flashcard, key) => {
                            return <tr key={key} className="border-b hover:bg-orange-100 bg-gray-100">
                                <td className="p-3 px-5 w-[15%] border-r">
                                    <p className="bg-transparent border-gray-300 py-2">{key+1}</p>
                                </td>
                                <td className="p-3 px-5 w-[20%] border-r">
                                    <input type="text" value={flashcard.english} onChange={(e) => handleFlashcardOnChange(flashcard.flashcard_id, "english", e.target.value)} className="bg-transparent border-b-2 border-gray-300 py-2"/>
                                </td>
                                <td className="p-3 px-5 w-[20%] border-r">
                                    <input type="text" value={flashcard.romaji} onChange={(e) => handleFlashcardOnChange(flashcard.flashcard_id, "romaji", e.target.value)} className="bg-transparent border-b-2 border-gray-300 py-2"/>
                                </td>
                                <td className="p-3 px-5 w-[20%]  border-r">
                                    <input type="text" value={flashcard.kana} onChange={(e) => handleFlashcardOnChange(flashcard.flashcard_id, "kana", e.target.value)} className="bg-transparent border-b-2 border-gray-300 py-2"/>
                                </td>
                                <td className="w-[10%]">
                                    <div className="justify-center align-center mx-auto w-[19%] flex">
                                        <button 
                                            type="button"
                                            onClick={() => handleSaveFlashcard(flashcard)}
                                            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                                        <button
                                            type="button"
                                            onClick={() => handleFlashcardDelete(flashcard.flashcard_id)}
                                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                        <input
                                            type="checkbox"
                                            checked={flashcard.dictionary}
                                            onChange={(e) => handleDictionaryCheckbox(flashcard, e.target.checked)}
                                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 ml-3 rounded focus:outline-none focus:shadow-outline"/>
                                    </div>
                                </td>
                            </tr>
                        })}
                        <tr>
                            <td colSpan={5} className="p-3 px-2 text-center">
                                <div className="py-1">
                                    <button onClick={(e) => handleCreateFlashcard()} className="text-white text-1xl bg-gray-900 font-semibold py-2 px-4 rounded w-[20%] mx-auto">Add Flashcard</button>
                                </div>
                                <div className="py-1">
                                    <button onClick={(e) => handleSaveAll()} className="text-white text-1xl bg-blue-500 font-semibold py-2 px-4 rounded w-[20%] mx-auto">Save Changes</button>
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          message="Are you sure you want to delete this collection?"
          onConfirm={handleConfirmDeleteFlashcard}
          onCancel={handleCancelDelete}
        />
        
    </section>


  )
};

export default Flashcards;
