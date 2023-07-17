import React, { useState } from 'react';
import Axios from 'axios';
import {ArticleDisplay}  from '../components/ArticleDisplay';
import { Article } from '../models/Article';

interface ArticleProps{
  article:Article
}

export function ArticleView(article:ArticleProps){
    const [selectionState, updateSelectionState] = useState(0);
    const [articleSelected, updateArticleSelected] = useState({id:0, url:''});


    function getArticleAPI(){
      let chosenArticle = Axios.get("https://api.spaceflightnewsapi.net//v4/articles/" + selectionState).then((response) =>
      {
        let apiArticle:Article = {
          id: response.data.id, 
          url: response.data.url,
          title: '',
          image_url: '',
          summary: ''
        }
        updateArticleSelected(apiArticle)
      });
    }
    return(

        <>
          <div className="article-view">
            <ArticleDisplay article={undefined}></ArticleDisplay>
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