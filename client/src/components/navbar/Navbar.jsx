import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css"
import { useEffect, useState } from "react"
import logo from "../../assets/logo.png"
import { useAppContext } from "../../context/Context";
import { BiMenu } from "react-icons/bi"


const Navbar = () => {
  const { toggleMenu, toggleProfileMenu, toggleMenuFn, toggleProfileMenuFn, toggleAuthModalFn, toggleAuthModal, user } = useAppContext()
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation()



  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    if (toggleMenu || toggleProfileMenu || toggleAuthModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toggleMenu, toggleProfileMenu, toggleAuthModal]);

  // const admin = location.pathname === "/admin/99025773623568154745460635436441622443649708975362114242464"
  // const admin_auth = location.pathname === "/admin/99025773623568154745460635436441622443649708975362114242464/auth"
  // const admin_add_item = location.pathname === "/admin/99025773623568154745460635436441622443649708975362114242464/add_item"
  // const admin_my_item = location.pathname === "/admin/99025773623568154745460635436441622443649708975362114242464/my_item"
  // const admin_users = location.pathname === "/admin/99025773623568154745460635436441622443649708975362114242464/users"

  // if (admin || admin_auth || admin_add_item || admin_my_item || admin_users) {
  //   return null
  // }

  return (
    <nav
      className={
        `${scrollPosition > 100 ? ` ${styles.stickyNav}` : `${styles.container}`}`
      }>

      <div className={styles.LogoContainer}>
        <BiMenu onClick={toggleMenuFn} className={styles.icon} />
        <Link to="/" ><img className={styles.logo} src={logo} alt="logo" /></Link>
      </div>


      <div className={styles.loginProfileContainer}  >
        <ul className={styles.ul}>
          <li className={styles.li}> <Link to="/" className={styles.link}>Home</Link> </li>
          <li className={styles.li}> <Link to="/Portfolio" className={styles.link}>Portfolio</Link> </li>
          <li className={styles.li}> <Link to="/Blog" className={styles.link}>Blog</Link> </li>
          <li className={styles.li}> <Link to="/AboutUs" className={styles.link}>About Us</Link> </li>
          <li className={styles.li}> <Link to="/ContactUs" className={styles.link}>Contact Us</Link> </li>
        </ul>
        {user && user.name ? <div onClick={toggleProfileMenuFn} className={styles.plink} to="/user-profile" ><img className={styles.Plogo} src={user.userImg} alt={user.name} /></div> :
          <button onClick={toggleAuthModalFn} className={styles.login}>Log in</button>
        }

      </div>
    </nav>
  )
}

export default Navbar