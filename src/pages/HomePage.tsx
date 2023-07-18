import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Article } from '../models/article';
import { SetStateAction, useEffect, useState } from "react";
import axios from 'axios';


export default function HomePage(){
    const router = useNavigate();

    const [articles, setArticles] = useState<Article[]>([]);

    const getAllArticles = () => {

        axios.get<Article[]>(`https://api.spaceflightnewsapi.net/v3/articles`)
            .then(response => { setArticles(response.data) });
    }

    useEffect(getAllArticles, []);

    return<>

    <h1 style={{textAlign: "center"}}>Space Articles</h1>
        
        {articles.map((myArticle) => {
                return <div key={myArticle.id} className='bottom-gap' style={{textAlign: "center", margin: "50px"}}>
                    <a href={myArticle.url}>{myArticle.title}</a>
                    <br />
                    <img src={myArticle.imageUrl} style={{width: "15%"}}></img>
                    <br />
                    <span>{myArticle.summary}</span>
                </div>
            })}
    </>
}