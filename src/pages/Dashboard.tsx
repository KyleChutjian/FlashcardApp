import React, {useState, useEffect, MouseEvent} from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Modal from "../components/Modal";
import { getCollectionsByUserId, createCollection, updateCollection } from "../api";
import { useAppSelector } from "../store/Store";

const Dashboard = () => {
    const userInfo = useAppSelector(state=> state.user.userInfo);
    const selectedCollections = useAppSelector(state => state.collections.collections);

    const [ collections, setCollections ] = useState(selectedCollections);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ newCollectionName, setNewCollectionName ] = useState<string>("");

    useEffect(() => {
        // Get collections by UserId when page loads
        getCollectionsByUserId(userInfo.user_id).then((res) => {
            setCollections(res.data);
        });
    }, [])

    useEffect(() => {
        // console.log(collections);
    }, [collections])

    const handleCreateCollection = () => {
        console.log(newCollectionName);
    }


    // Open Create Collection Modal
    const onOpenModal = () => {
        setIsModalOpen(true);
    }

    // Close Create Collection Modal
    const onCloseModal = () => {
        setIsModalOpen(false);
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

            {/* Collections Grid */}
            <section className="mb-5 py-10">
                <h1 className="text-center font-extrabold text-gray-800 mb-5">Select Collections to Study</h1>
                <ul role="list" className="w-full max-w-md p-4 bg-gray-900 border rounded-lg shadow ml-[10%] mr-[10%] divide-y divide-gray-200">
                    {collections ? 
                        // Collections Map:
                        collections.map((value, key) => {
                            return <li className="py-4" key={key}>
                                <div className="flex items-center">
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-white truncate">{value.name}</p>
                                        <p className="text-sm text-white truncate">Flashcards: 0</p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-white">
                                        Box
                                    </div>
                                </div>
                            </li>
                        })
                    : <div></div>
                    }
                {/* </div> */}
                </ul>


            </section>

            {/* Create New Collection */}
            <div className="py-10 px-4 mx-auto max-w-screen-xl text-center">
                <button 
                        className="hover:text-gray-900 text-2xl bg-gray-900 font-extrabold  py-2 px-4 border text-white hover:bg-gray-100 border-gray-900 rounded"
                        onClick={onOpenModal}
                >Create New Collection</button>
            </div>
            
            {/* Create New Collection Modal */}
            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <button onClick={handleCreateCollection}>Create Collection</button>
            </Modal>
        </div>
    )
}

export default Dashboard;