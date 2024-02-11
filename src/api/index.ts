import http from "./httpService";

const apiEndPoint = "http://localhost:3001/api";
const userEndPoint = `${apiEndPoint}/users`;
const collectionEndPoint = `${apiEndPoint}/collections`;
const flashcardEndPoint = `${apiEndPoint}/flashcards`;

// Login: [email]
export function login(data: Object) {
    return http.post(`${userEndPoint}/login`, data);
}

// SignUp: [email, name]
export function signup(data: Object) {
    return http.post(`${userEndPoint}`, data)
}

//// Users:

// Get User By Id
export function getUserById(user_id: String) {
    return http.get(`${userEndPoint}/${user_id}`);
}

// Get All Users
export function getAllUsers() {
    return http.get(`${userEndPoint}`);
}

// Update User By Id
export function updateUser(user_id: String, data: Object) {
    return http.patch(`${userEndPoint}/${user_id}`, data);
}

// Delete User By Id
export function deleteUser(user_id: String) {
    return http.delete(`${userEndPoint}/${user_id}`);
}


//// Collections:


// Get Collection By Id
export function getCollectionById(collection_id: String) {
    return http.get(`${collectionEndPoint}/${collection_id}`);
}

// Get All Collections
export function getAllCollections() {
    return http.get(`${collectionEndPoint}`);
}

// Get Collection By UserId
export function getCollectionsByUserId(user_id: String) {
    return http.get(`${collectionEndPoint}/user/${user_id}`);
}

// Create Collection: [user_id, name]
export function createCollection(data: Object) {
    return http.post(`${collectionEndPoint}`, data);
}

// Update Collection By Id
export function updateCollection(collection_id: String, data: Object) {
    return http.patch(`${collectionEndPoint}/${collection_id}`, data);
}

// Delete Collection By Id
export function deleteCollection(collection_id: String) {
    return http.delete(`${collectionEndPoint}/${collection_id}`);
}

//// Flashcards:

// Get Flashcard By Id
export function getFlashcardById(flashcard_id: String) {
    return http.get(`${flashcardEndPoint}/${flashcard_id}`);
}

// Get All Flashcards
export function getAllFlashcards() {
    return http.get(`${flashcardEndPoint}`);
}

// Get Flashcard By UserId
export function getFlashcardsByUserId(user_id: String) {
    return http.get(`${flashcardEndPoint}/user/${user_id}`);
}

// Get Flashcard By CollectionId
export function getFlashcardsByCollectionId(collection_id: String) {
    return http.get(`${flashcardEndPoint}/collection/${collection_id}`);
}

// Create Flashcard: [collection_id, english, romaji, kana]
export function createFlashcard(data: Object) {
    return http.post(`${flashcardEndPoint}`, data);
}

// Update Flashcard By Id
export function updateFlashcard(data: Object) {
    return http.patch(`${flashcardEndPoint}`, data);
}

// Delete Flashcard By Id
export function deleteFlashcard(flashcard_id: String) {
    return http.delete(`${flashcardEndPoint}/${flashcard_id}`);
}