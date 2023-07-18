import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

import { Article } from "../models/Article";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function HomePage(){

    const [articles, setArticles] = useState<Article[]>([]);

    const getAllArticles = () => {

        axios.get<Article[]>(`https://api.spaceflightnewsapi.net/v3/articles`)
            .then(response => { setArticles(response.data) });
    }

    useEffect(getAllArticles, []);

    const [articles, setArticles] = useState<Article[]>([]);

    const getAllArticles = () => {

        axios.get<Article[]>(`https://api.spaceflightnewsapi.net/v3/articles`)
            .then(response => { setArticles(response.data) });
    }

    useEffect(getAllArticles, []);

    return<>

    <h1 style={{textAlign: "center"}}>Space Articles</h1>

        {console.log(articles)}
        {articles.map((myArticle) => {
            return <Link to={"/article/"+myArticle.id}>
                <div key={myArticle.id} className='bottom-gap' style={{textAlign: "center", margin: "50px"}}>
                    <p>{myArticle.title}</p>
                    <br />
                    <img src={myArticle.imageUrl} style={{width: "15%"}} alt={myArticle.imageUrl}/>
                    <br />
                    <span>{myArticle.summary}</span>
                </div>
            </Link>
            })}


    </>
}