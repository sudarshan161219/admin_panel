import Ripples from 'react-ripples'
import styles from "./ripple.module.css"

// eslint-disable-next-line react/prop-types
const Ripple = ({ children }) => {
    return (
        <Ripples className={styles.container}>
            {children}
        </Ripples>
    )
}

export default Ripple