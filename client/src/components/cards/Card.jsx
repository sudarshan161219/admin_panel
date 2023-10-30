import styles from "./cards.module.css"
import axios from "axios"
import { toast } from "react-hot-toast";
import {
    AiOutlineEdit,
    AiOutlineDelete
} from "react-icons/ai"
// eslint-disable-next-line react/prop-types
const Card = ({ item }) => {

    // eslint-disable-next-line react/prop-types
    const { _id, driveId } = item


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
        <div className={styles.card}>

            <div className={styles.top1overlay}>
                <h1 className={styles.name}>{item.name}</h1>

                <div className={styles.controlls}>
                    {/* <button> <AiOutlineEdit /> edit</button> */}
                    <button onClick={handleClick}> < AiOutlineDelete className={styles.icon} /></button>
                </div>
            </div>

            <img className={styles.img} src={item.imageUrl} alt={item.name} />


        </div >
    )
}

export default Card