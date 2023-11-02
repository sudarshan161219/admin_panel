import { useState, useEffect } from 'react'
import axios from 'axios';
import styles from "./post.module.css"
import {
    useParams
} from "react-router-dom";
const Post = () => {
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    let { id } = useParams();
    const fetchPosts = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/api/admin/post/${id}`);
            setIsLoading(false)
            setPost(response.data.post);
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (isLoading) {
        return (
            <div className={styles.headContainer}> <h1 className={styles.heading}>LOADING.....🙄</h1> </div>
        )
    }
    const { name, coverImg, content } = post
    return (

        <div className={styles.container}>
            <div className={styles.Postcontainer}>
                <div className={styles.infoContainer}>
                    <h1 className={styles.title}>{name}</h1>
                </div>
                <div className={styles.imgContainer} >
                    <img src={coverImg} alt={name} className={styles.image} />
                </div>

                <div className={styles.textContainer}>
                    {/* <p className={styles.text}>Lorem</p> */}
                    <div
                        className={styles.text}
                        dangerouslySetInnerHTML={{ __html: content }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Post