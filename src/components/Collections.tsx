import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { createCollection, updateCollection, deleteCollection, getCollectionsByUserId } from "../api";
import ConfirmationModal from "./ConfirmationModal";
import CreateCollectionModal from "./CreateCollectionModal";
import { useAppSelector } from "../store/Store";
import { useNavigate } from "react-router-dom";

type Collection = {
    collection_id: string,
    user_id: string,
    name: string,
}

type SelectedCollection = {
  collection_id: string;
  isSelected: boolean
}

const Collections = () => {
  const userInfo = useAppSelector(state=> state.user.userInfo);
  const router = useNavigate();
  
  const [ collections, setCollections ] = useState<Array<Collection> | null>(null);
  const [ selectedCollections, setSelectedCollections ] = useState<Array<SelectedCollection> | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [collectionToDelete, setCollectionToDelete] = useState<string>("");
  const [ isCreateCollectionOpen, setIsCreateCollectionOpen ] = useState<boolean>(false);
  const [ newCollectionName, setNewCollectionName ] = useState<string>("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const onChangeCheckbox = (collection_id: string, isChecked: boolean) => {
    setSelectedCollections(currentSelectedCollections => {
      if (currentSelectedCollections) {
        return currentSelectedCollections.map(selectedCollection => {
          if (selectedCollection.collection_id === collection_id) {
            return {
              ...selectedCollection,
              isSelected: isChecked
            };
          }
          return selectedCollection;
        });
      } else return null;
    })
  }

  useEffect(() => {
    getCollectionsByUserId(userInfo.user_id).then((res: any) => {
      setCollections(res.data);
      console.log(res.data);
      setSelectedCollections(res.data.map((collection: Collection) => ({
        collection_id: collection.collection_id,
        isSelected: false
      })));
  });
  }, []);

  const handleCollectionView = (collection_id: string)  => {
    console.log(`clicked on view collection for id: ${collection_id}`);
    router(`/collection/view/${collection_id}`);
  }
  const handleCollectionDelete = (collection_id: string)  => {
    console.log(`clicked on delete collection for id: ${collection_id}`);

    setCollectionToDelete(collection_id);
    setIsConfirmationModalOpen(true);
  }
  const handleConfirmDelete = () => {
    // Implement delete functionality here using the `collectionToDelete` state
    console.log("Confirming deletion of collection ID:", collectionToDelete);

    deleteCollection(collectionToDelete).then((res) => {
      if (res.status == 200) {
        console.log(res);
        setCollections(currentCollections => {
          if (currentCollections) {
            return currentCollections.filter(collection => collection.collection_id !== collectionToDelete);
          } else return null
        });

        setSelectedCollections(currentCollections => {
          if (currentCollections) {
            return currentCollections.filter(collection => collection.collection_id !== collectionToDelete);
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

  const onChangeCollectionName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewCollectionName(value);
  }
  const handleCreateCollection = () => {
      if (newCollectionName === "" || !newCollectionName) {
          console.log("TOAST: Collection Name cannot be empty")
      } else {
          console.log(`Creating a new collection called: ${newCollectionName}`);
          setIsCreateCollectionOpen(false);
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
                  setSelectedCollections((selectedCollections) => {
                    if (selectedCollections) {
                      return [...selectedCollections, {
                        collection_id: res.data.collection_id,
                        isSelected: false
                      }]
                    } else {
                      return [{
                        collection_id: res.data.collection_id,
                        isSelected: false
                      }]
                    }
                  })

              } else {
                  console.log(`Error: could not create collection: ${newCollectionName}`);
              }
          });
      }
  }
  // Open Create Collection Modal
  const onOpenCreateCollection = () => {
    setIsCreateCollectionOpen(true);
    setNewCollectionName("");
  }
  // Close Create Collection Modal
  const onCloseCreateCollection = () => {
    setIsCreateCollectionOpen(false);
  }

  return (
    <section className="mb-5 pt-10">
      <h1 className="text-center font-extrabold text-gray-800 mb-5">Select Collections to Study</h1>

      {/* Collections Grid: */}
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
                      <img src={require("../images/moreOptions.png")} alt="Options" className="h-6 w-6" />
                    </button>
                    {/* Options Menu */}
                    {openMenuId === collection.collection_id && (
                      <div ref={menuRef} className="absolute bottom-full right-0 mt-2 w-24 bg-white rounded-lg shadow-lg z-10">
                        <ul>
                          <li><button onClick={() => handleCollectionView(collection.collection_id)} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">View</button></li>
                          <li><button onClick={() => handleCollectionDelete(collection.collection_id)} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Delete</button></li>
                        </ul>
                      </div>
                    )}

                    <input 
                      type="checkbox"
                      checked={selectedCollections?.find(selectedCollection => selectedCollection.collection_id === collection.collection_id)?.isSelected}
                      onChange={(e) => onChangeCheckbox(collection.collection_id, e.target.checked)}
                    />
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

      {/* Create New Collection */}
      <div className="py-10 px-4 mx-auto max-w-screen-xl text-center">
          <button 
                  className="hover:text-gray-900 text-2xl bg-gray-900 font-extrabold  py-2 px-4 border text-white hover:bg-gray-100 border-gray-900 rounded"
                  onClick={onOpenCreateCollection}
          >Create New Collection</button>
      </div>
      
      {/* Create New Collection Modal */}
      <CreateCollectionModal isOpen={isCreateCollectionOpen} onClose={onCloseCreateCollection}>
          <div className="">
              {/* Collection Name */}
              <h1 className="block mb-3 text-lg">Create New Collection:</h1>
              {/* <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Collection Name</label> */}
              <input type="text" id="first_name" value={newCollectionName} onChange={onChangeCollectionName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Collection Name" required/>

              {/* Create Collection Button */}
              <div className="flex justify-center align-center1 mt-3">
                  <button onClick={handleCreateCollection} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
              </div>
              
              
          </div>
          
      </CreateCollectionModal>








    </section>

  );
}

export default Collections;