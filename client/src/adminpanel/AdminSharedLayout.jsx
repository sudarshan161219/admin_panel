import { Outlet } from "react-router-dom"
import styles from "./index.module.css"
import {
  AiOutlineMenu
} from "react-icons/ai"
import logo from "../assets/logo.png"
import { AdminSidebar } from "../components/export"
import { useAppContext } from "../context/Context"

const AdminSharedLayout = () => {
  const { toggleAdminMenuFn, admin } = useAppContext()
  return (
    <div className={styles.container}>
      < AdminSidebar />
      <div className={styles.header} >

        <div className={styles.logoIconContainer}>
          < AiOutlineMenu onClick={toggleAdminMenuFn} className={styles.icon} />
          <img className={styles.img} src={logo} alt="magickd.com" />
        </div>

        <div>
          <h1>hey, {admin.name} 👋🏻</h1>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default AdminSharedLayout
