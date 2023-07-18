import axios from 'axios';
import { useState, useEffect } from 'react';
import {ArticleDisplay}  from '../components/ArticleDisplay';
import { Comments } from '../components/Comments';
import { Article } from '../models/Article';
import { useParams } from 'react-router-dom';
//import styled from 'styled-components';

interface myProps{
  
}
export function ArticlePage(props: myProps){
    const [article, setArticle] = useState<Article>({id:0,title:"",url:"",imageUrl:"",summary:"",publishedAt:""});
    const {articleid} = useParams();
    const id = Number(articleid)
    if(id){localStorage.setItem('article',id.toString())}

    const getArticle = () => {

        axios.get<Article>(`https://api.spaceflightnewsapi.net/v3/articles/`+localStorage.getItem("article"))
            .then(response => { setArticle(response.data) });
    }

    useEffect(getArticle, []);
    
    return(

        <>
        {console.log(article)}
          <div>
            {article.url ? <ArticleDisplay articleUrl={article.url} ></ArticleDisplay>:<p>loading</p>}
          </div>
          <br></br>
          <div>
            {/* <Comments userComment={''}></Comments> */}
          </div>
          <br></br>
          <div>
            {/* this will be a list of the comments: should show userName and comment. */}
          </div>
        </>
    );

    {/* 
        First part of this view is getting the specific article to load
        - the id of the article should be brought in because if the user clicking 
          to view that particular article from the homepage. 
                
        Second part of this view will be the comments block.  
        - this will be made as a separate component and brought into this view.
        - the user can only make a comment if they are logged in. This doesn't have 
          to be high-end security.  It is just to show basic conditional rendering. 
        - comment should then show down below with a list of the other comments on 
          the same article with the user name. 
          
        Third part will be rendering the comments below the comment box.  This should
        be done as a list with the user name. 
        
        Optional forth part if time allows will be giving a reader the option to click a 
    thumbs up or down for the article and it show the count beside it. */}
}