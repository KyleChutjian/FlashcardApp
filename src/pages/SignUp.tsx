import React, {useState, ChangeEvent} from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";

const SignUp = () => {
    const router = useNavigate();

    const [ newUser, setNewUser ] = useState({
        email: null,
        name: null,
        password: null // TODO: password encryption & authentication
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSignUp = () => {
        console.log("sign up button");
        console.log(newUser);

        if (
            newUser.email === "" || 
            newUser.email === null ||
            newUser.name === "" ||
            newUser.name === null
        ) {
            // Display to the user to fill in the empty values
            return console.error("Empty email or name");
        }


        signup(newUser).then((res) => {
            if (res.status === 200) {
                router("/login");
            } else {
                throw console.error("Invalid Response");
            }
        }).catch((e) => {
            console.log("Invalid User")
        });
    }


    return(
        <div>
            {/* Jumbotron*/}
            <section className="bg-white dark:bg-gray-900 mb-10">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                    <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Flashcard App</h1>
                    
                </div>

                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
                    <h4 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl md:text-5xl dark:text-white">Sign Up</h4>
                </div>
            </section>
            
            {/* Sign Up Form */}
            <section>
                <div className="max-w-md mx-auto mt-5 flex flex-col items-center">
                    <div className="mb-5 w-[70%]">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            onChange={handleInputChange} 
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            placeholder="example@domain.com" required/>
                    </div>
                    {/* Name */}
                    <div className="mb-5 w-[70%]">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
                        <input 
                            type="input" 
                            name="name" 
                            onChange={handleInputChange} 
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            placeholder="Enter your name" required/>
                    </div>
                    <div className="mb-5 w-[70%]">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="assword"
                            onChange={handleInputChange} 
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        />
                    </div>

                    {/* Login Button */}
                    <button onClick={handleSignUp} className="w-[40%] t-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                    
                    
                </div>
            </section>
            



        </div>

    )
};

export default SignUp;