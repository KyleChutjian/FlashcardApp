import React, { ChangeEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { useContext } from "react";
import { useAppDispatch } from "../store/Store";
import { setLoginData } from "../store/userSlice";


const Login = () => {
    // const {handleLogin} = useContext(Context);
    const dispatch = useAppDispatch();


    const router = useNavigate();

    const [ loginInfo, setLoginInfo ] = useState({
        email: null,
        password: null
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleLoginSubmit = () => {



        login(loginInfo).then((res) => {
            if (res.status === 200) {

                console.log(`user_id: ${res.data.user_id}`);
                console.log(`name: ${res.data.name}`);

                dispatch(setLoginData({
                    user_id: res.data.user_id,
                    name: res.data.name
                }));



                router("/dashboard");
            } else {
                throw console.error("Invalid Response");
            }
        }).catch((e) => {
            console.log("Invalid User")
        });
        
    }

    const handleSignup = () => {
        router("/signup");
    }


    return(
        <div>
            {/* Jumbotron*/}
            <section className="bg-white dark:bg-gray-900 mb-10">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                    <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Flashcard App</h1>
                    
                </div>

                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
                    <h4 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl md:text-5xl dark:text-white">Login</h4>
                </div>
            </section>
            
            {/* Login Form */}
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
                    <div className="mb-5 w-[70%]">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Password</label>
                        <input
                            disabled={true}
                            type="password" 
                            name="password" 
                            placeholder="assword"
                            onChange={handleInputChange} 
                            className="disabled shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        />
                    </div>

                    {/* Login Button */}
                    <button onClick={handleLoginSubmit} className="w-[40%] t-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    
                    
                </div>


                {/* Sign Up Button */}
                <div className="max-w-md mx-auto mt-3 flex flex-col items-center">
                    <button onClick={handleSignup} className="mt-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-blue-800">Sign Up</button>
                </div>
            </section>
            



        </div>

    )
}

export default Login;