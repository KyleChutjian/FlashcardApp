import React, {useState, useEffect, ChangeEvent} from "react";
import NavBar from "../components/Navbar";
import Modal from "../components/CreateCollectionModal";
import { getCollectionsByUserId, createCollection } from "../api";
import { useAppSelector } from "../store/Store";
import Collections from "../components/Collections";

const Dashboard = () => {
    const userInfo = useAppSelector(state=> state.user.userInfo);
    // const selectedCollections = useAppSelector(state => state.collections.collections);

    type Collection = {
        collection_id: string,
        user_id: string,
        name: string,
    }

    const [ collections, setCollections ] = useState<Array<Collection> | null>(null);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ newCollectionName, setNewCollectionName ] = useState<string>("");

    useEffect(() => {
        // Get collections by UserId when page loads
        getCollectionsByUserId(userInfo.user_id).then((res) => {
            setCollections(res.data);
            console.log(res.data);
        });
    }, [])

    useEffect(() => {
        // console.log(collections);
    }, [collections])

    const onChangeCollectionName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewCollectionName(value);
    }

    const handleCreateCollection = () => {
        if (newCollectionName === "" || !newCollectionName) {
            console.log("TOAST: Collection Name cannot be empty")
        } else {
            console.log(`Creating a new collection called: ${newCollectionName}`);
            setIsModalOpen(false);
            setNewCollectionName("");
            createCollection({
                user_id: userInfo.user_id,
                name: newCollectionName
            }).then((res) => {
                if (res.status == 200) {
                    console.log(res.data);
                    setCollections(currentCollections => {
                        if (currentCollections) {
                            return [...currentCollections, res.data];
                        } else {
                            return [res.data];
                        }
                    });
                } else {
                    console.log(`Error: could not create collection: ${newCollectionName}`);
                }
            });
        }
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
            <section className="mb-5 pt-10">
                <h1 className="text-center font-extrabold text-gray-800 mb-5">Select Collections to Study</h1>
                <Collections collectionsInput={collections}/>
            </section>

            {/* <div className="py-10 px-4 mx-auto max-w-screen-xl text-center">
                <button 
                        className="hover:text-gray-900 text-2xl bg-gray-900 font-extrabold  py-2 px-4 border text-white hover:bg-gray-100 border-gray-900 rounded"
                        onClick={onOpenModal}
                >Create New Collection</button>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <div className="">
                    <h1 className="block mb-3 text-lg">Create New Collection:</h1>
                    <input type="text" id="first_name" onChange={onChangeCollectionName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Collection Name" required/>
                    <div className="flex justify-center align-center1 mt-3">
                        <button onClick={handleCreateCollection} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                    </div>
                </div>
                
            </Modal> */}
        </div>
    )
}

export default Dashboard;