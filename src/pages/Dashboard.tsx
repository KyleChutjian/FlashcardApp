import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { getCollectionsByUserId, createCollection, updateCollection } from "../api";
import { useAppSelector } from "../store/Store";

const Dashboard = () => {
    const userInfo = useAppSelector(state=> state.user.userInfo);
    console.log(userInfo);

    const selectedCollections = useAppSelector(state => state.collections.collections);
    console.log(selectedCollections);

    const [ collections, setCollections ] = useState(null);



    return(
        <div>
            <NavBar/>


            {/* Start Studying Jumbotron Button*/}
            <section className="bg-yellow-200 mb-10">
                <div className="py-10 px-4 mx-auto max-w-screen-xl text-center">
                    <button 
                        className="text-gray-900 text-4xl bg-transparent font-extrabold  py-2 px-4 border border-gray-900 hover:text-white hover:bg-gray-900 hover:border-transparent rounded"
                        // onClick={}
                    >Start Studying</button>
                </div>
            </section>

            {/* Collections Grid */}
            <div className="grid grid-cols-4 gap-4">

            </div>

        </div>
    )
}

export default Dashboard;