import styles from "./index.module.css"
import Chip from '@mui/material/Chip';
// eslint-disable-next-line react/prop-types
const StatCard = ({ item }) => {

    // eslint-disable-next-line react/prop-types
    const {  name, email, userImg, method, } = item

    return (
        <div className={styles.container}>
            <div className={styles.box} >
                <img className={styles.img} src={userImg} alt={name} />
                <div className={styles.infoContainer} >
                    <span>{name}</span>
                    <span>{email}</span>
                    <Chip label={method} />
                </div>
            </div>
        </div>
    )
}

export default StatCard