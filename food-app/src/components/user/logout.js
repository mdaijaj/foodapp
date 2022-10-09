
const Logout=()=>{

    const clearToken=()=>{
        console.log("clear token")
        localStorage.clear();
    }

    
    return(
        <>
        <button  onClick={clearToken}>Logout</button>
        </>
    )
}

export default Logout;