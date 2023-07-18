interface myProps{
    articleUrl: string
}


// This componenet will be render on the ArticleView Page
// this has to show the article that is located on a different website. 
export function ArticleDisplay(props: myProps){

    return(

        <> 
                <iframe src="{articleUrl}" width={800} height={800}></iframe>
            
        </>
    )
}
