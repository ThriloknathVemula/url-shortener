import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const NotFound = ()=>{
    const [counter, setCounter] = useState(5);
    const navigate = useNavigate();

    if(counter === 0) navigate('/');
    
    setTimeout(()=>{
        setCounter(counter-1);
    }, 1000)

    return <div className="flex flex-col justify-center items-center">
        <p>Page Not Found....</p>
        <p>Redirecting you in {counter} seconds...</p>
    </div>
}