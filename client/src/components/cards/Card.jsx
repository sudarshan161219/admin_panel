import styles from "./cards.module.css"
import axios from "axios"
import { AiOutlineDelete } from "react-icons/ai"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from "react-hot-toast";
// eslint-disable-next-line react/prop-types
const Cardd = ({ item }) => {

    // eslint-disable-next-line react/prop-types
    const { _id, driveId, name,description, imageUrl } = item


    const jsonObject = {
        key1: _id,
        key2: driveId,
    };

    const handleClick = () => {

        const deleteFileURL = `/api/admin/deleteFile`;

        axios.post(deleteFileURL, { jsonObject })
            .then((response) => {
                if (response.status === 200) {
                    toast.success('File deleted successfully')
                } else {
                    toast.error('Failed to delete file')
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
            image={imageUrl }
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
            <button className={styles.btn} onClick={handleClick}><AiOutlineDelete className={styles.icon} /></button>
        </CardActions>
    </Card>
    )
}

export default Cardd