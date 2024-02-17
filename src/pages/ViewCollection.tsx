import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import { getCollectionById } from "../api";
import Flashcards from "../components/ManageFlashcards";

const ViewCollection = () => {
    const { mode, collection_id} = useParams();
    var viewMode = false, editMode = false;
    if (mode =="view") viewMode = true
    if (mode =="edit") editMode = true

    const [ collectionName, setCollectionName ] = useState("");
    

    useEffect(() => {
        if (collection_id) getCollectionById(collection_id).then((res) => {
            setCollectionName(res.data.name);
        });
    }, [])
    

  return (
    <div className="bg-gray-100 min-h-screen">
        <NavBar/>

        {/* Jumbotron*/}
        <section className="bg-yellow-200 pb-10">
            <div className="pt-8 mx-auto max-w-screen-xl text-center">
                <h4 className="text-2xl font-extrabold tracking-tight leading-none text-gray-900">Viewing collection:</h4>
            </div>
            <div className="mx-auto  text-center">
                <h1 className="text-6xl font-extrabold tracking-tight leading-none text-gray-900">{collectionName}</h1>
            </div>
        </section>
            
        <Flashcards/>

    </div>
  )
};

export default ViewCollection;
