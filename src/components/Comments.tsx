interface inputCommentProps{
    userComment: string
}
// allow comments if logged in

// push comments to a comment [] 
export function Comments(props: inputCommentProps){
    
    function submitComment(){
        {/*pushing to comments array */}
    }
    return(

        <>
            <div>
                <input type="text" width={500} height={250} ></input>
                <button onClick={submitComment}></button>
            </div>
           
        </>
    );
}