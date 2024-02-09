import React from "react";

type Collection = {
    collection_id: string,
    user_id: string,
    name: string,
}

type CollectionsProps = {
  collections: Array<Collection>;
}

const Collections: React.FC<CollectionsProps> = ({collections}) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-4">
        {collections.map((collection, key) => {
            return <div key={key} className="p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-lg font-semibold">{collection.name}</h2>
                <p className="text-gray-600">Flashcards: 0</p>
            </div>
        })}
      </div>
    </div>
  );
}

export default Collections;