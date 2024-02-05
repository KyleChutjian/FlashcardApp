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

// Users:

// Get User By Id
export function getUserById(user_id: String) {
    return http.get(`${userEndPoint}/${user_id}`);
}

// Get All Users
export function getAllUsers() {
    return http.get(`${userEndPoint}`);
}

// Update User By Id
export function updateUser(user_id: String) {
    return http.patch(`${userEndPoint}/${user_id}`);
}

// Delete User By Id
export function deleteUser(user_id: String) {
    return http.delete(`${userEndPoint}/${user_id}`);
}


// Collections:


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
    return http.get(`${collectionEndPoint}/collections/${user_id}`);
}

// Create Collection: [user_id, name]
export function createCollection(data: Object) {
    return http.post(`${collectionEndPoint}`, data);
}

// Update Collection By Id
export function updateCollection(collection_id: String) {
    return http.patch(`${collectionEndPoint}/${collection_id}`);
}

// Delete Collection By Id
export function deleteCollection(collection_id: String) {
    return http.delete(`${collectionEndPoint}/${collection_id}`);
}







// Flashcards: