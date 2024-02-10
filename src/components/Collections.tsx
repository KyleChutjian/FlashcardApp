import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { updateCollection, deleteCollection } from "../api";
import ConfirmationModal from "./ConfirmationModal";

type Collection = {
    collection_id: string,
    user_id: string,
    name: string,
}

type CollectionsProps = {
  collectionsInput: Array<Collection> | null;
}

const Collections: React.FC<CollectionsProps> = ({collectionsInput}) => {

  const [ collections, setCollections ] = useState<Array<Collection> | null>(collectionsInput);
  useEffect(() => {
    setCollections(collectionsInput);
  }, [collectionsInput]);
  // const [ collections, setCollections ] = useState<CollectionArray>({collections: collectionsInput});
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCollectionView = (collection_id: string)  => {
    console.log(`clicked on view collection for id: ${collection_id}`);
  }

  const handleCollectionEdit = (collection_id: string)  => {
    console.log(`clicked on edit collection for id: ${collection_id}`);
  }

  const handleCollectionDelete = (collection_id: string)  => {
    console.log(`clicked on delete collection for id: ${collection_id}`);

    setCollectionToDelete(collection_id);
    setIsConfirmationModalOpen(true);
  }
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [collectionToDelete, setCollectionToDelete] = useState<string>("");

  // ConfirmationModal Functions:
  const handleConfirmDelete = () => {
    // Implement delete functionality here using the `collectionToDelete` state
    console.log("Confirming deletion of collection ID:", collectionToDelete);

    deleteCollection(collectionToDelete).then((res) => {
      if (res.status == 200) {
        console.log(res);
        setCollections(currentCollections => {
          if (currentCollections) {
            return currentCollections.filter(collection => collection.collection_id !== collectionToDelete)
          } else return null
        })
        console.log(`TOAST: Successfully deleted ${res.data.name}`)
        setIsConfirmationModalOpen(false);
      }
    });
  };

  const handleCancelDelete = () => {
    // If the user cancels deletion, close the modal
    setIsConfirmationModalOpen(false);
  };



  const toggleOptionsMenu = (collectionId: string) => {
    setOpenMenuId(prevOpenMenuId => (prevOpenMenuId === collectionId ? null : collectionId));
  }

  // If user clicks anywhere other than options menu, close the options menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, []);

  return (
    <div className="flex justify-center w-[70%] mx-auto">
      <div className="grid grid-cols-3 gap-4 w-full">
        {collections && collections.map((collection, key) => {
          // console.log(collection);
            return <div key={key} className="p-4 bg-white shadow-md rounded-lg flex relative">
                <div className="flex-1 max-w-[80%]">
                  <h2 className="text-lg font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">{collection.name}</h2>
                  <p className="text-gray-600">Flashcards: 0</p>
                </div>

                <div className="flex-1 flex justify-end items-center relative">
                  {/* 3 dots button goes here with options: [View, Edit, Delete] */}
                  <button className="focus:outline-none" onClick={() => toggleOptionsMenu(collection.collection_id)}>
                    {/* <img src="../../public/MoreOptions2.png" alt="Options" className="h-6 w-6" /> */}
                    <img src={require("../images/moreOptions.png")} alt="Options" className="h-6 w-6" />
                  </button>
                  {/* Options Menu */}
                  {openMenuId === collection.collection_id && (
                    <div ref={menuRef} className="absolute bottom-full right-0 mt-2 w-24 bg-white rounded-lg shadow-lg z-10">
                      <ul>
                        <li><button onClick={(e) => handleCollectionView(collection.collection_id)} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">View</button></li>
                        <li><button onClick={(e) => handleCollectionEdit(collection.collection_id)} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Edit</button></li>
                        <li><button onClick={(e) => handleCollectionDelete(collection.collection_id)} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Delete</button></li>
                      </ul>
                    </div>
                  )}
                </div>


            </div>
        })}
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        message="Are you sure you want to delete this collection?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default Collections;