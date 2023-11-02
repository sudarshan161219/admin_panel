import styles from "./index.module.css"
import Chip from '@mui/material/Chip';

// eslint-disable-next-line react/prop-types
const ItemOne = ({ item }) => {

  // eslint-disable-next-line react/prop-types
  const { name, price, category, imageUrl } = item

  return (
    <div className={styles.container}>
      <div className={styles.box} >
        <img className={styles.img} src={imageUrl} alt={name} />
        <div className={styles.infoContainer} >
          <span>{name}</span>/
          <span>₹{price}</span>/
          <Chip label={category} />
        </div>
      </div>
    </div>
  )
}

export default ItemOne