import React from "react"
import { useParams } from "react-router-dom";

const EditCollection = () => {
    const { collection_id} = useParams();

  return (
    <div>
      <h1>{collection_id}</h1>
    </div>
  )
};

export default EditCollection;