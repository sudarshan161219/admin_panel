import styles from "./footer.module.css"
import { useLocation } from "react-router-dom";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs"

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation()


  const socialLinks = [
    {
      icon: <BsFacebook className={styles.icons} />,
      link: "https://www.facebook.com/magickdcompany/",
    },
    {
      icon: <AiOutlineTwitter className={styles.icons} />,
      link: "https://twitter.com/Magickdcompany",
    },
    {
      icon: <AiOutlineInstagram className={styles.icons} />,
      link: "https://www.instagram.com/magickdcompany/",
    },
    {
      icon: <AiOutlineYoutube className={styles.icons} />,
      link: "https://www.youtube.com/channel/UCI6p6prAF85a3XMtpq29QKg?view_as=subscriber",
    },
  ];


  const admin = location.pathname === "/admin/99025773623568154745460635436441622443649708975362114242464"
  const admin_auth = location.pathname === "/admin/99025773623568154745460635436441622443649708975362114242464/auth"
  const admin_add_item = location.pathname === "/admin/99025773623568154745460635436441622443649708975362114242464/add_item"
  const admin_my_item = location.pathname === "/admin/99025773623568154745460635436441622443649708975362114242464/my_item"
  const admin_users = location.pathname === "/admin/99025773623568154745460635436441622443649708975362114242464/users"

  if (admin || admin_auth || admin_add_item || admin_my_item || admin_users) {
    return null
  }



  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h5 className={styles.footerTitle}>Copyright {currentYear} - MAGICKD</h5>

        <div className={styles.socialConatiner} >
          <ul className={styles.ul}>
            {socialLinks.map((item, idx) => (
              <li key={idx}><a target="_blank" href={item.link} rel="noreferrer">{item.icon}</a></li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Footer