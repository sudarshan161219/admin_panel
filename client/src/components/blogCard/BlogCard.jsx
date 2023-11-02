import { Link } from "react-router-dom"
import axios from "axios"
import styles from "./blogcard.module.css"
import { AiOutlineDelete } from "react-icons/ai"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from "react-hot-toast";
// eslint-disable-next-line react/prop-types
const BlogCard = ({ item }) => {

    // eslint-disable-next-line react/prop-types
    const {_id, name, description, coverImg, authorName, content, tags, category } = item

    const handleDelete = () => {
        // eslint-disable-next-line no-undef
        axios.delete(`/api/admin/delete_post/${_id}`)
            .then((response) => {
                if (response.status === 200) {
                    toast.success('Post deleted successfully...!')
                } else {
                    toast.error('Failed to delete post')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Card className={styles.card}>
            <CardMedia
                sx={{ height: 140 }}
                image={coverImg}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions className={styles.actions}>
                <Link to={`/admin/post/${item._id}`}><Button size="small">Read More</Button></Link>
                <button className={styles.btn} onClick={handleDelete}><AiOutlineDelete className={styles.icon} /></button>
            </CardActions>
        </Card>
    )
}

export default BlogCard