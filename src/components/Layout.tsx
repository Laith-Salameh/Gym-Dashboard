import {FunctionComponent, useState} from "react";
import NavBar, { INavItem } from "./NavBar"
import styles from "../../styles/components/Layout.module.scss"
import {Menu as MenuIcon , Close as CloseIcon} from '@mui/icons-material';
import { Link } from "react-router-dom";
import useIsMobile from "../context/isMobile-Context";

interface ILoggedInUser{
    username: string,
    imgSrc: string
}

interface IPageLayout{
    user: ILoggedInUser,
    navItems: INavItem[]
    children: JSX.Element | JSX.Element[]    
}



const Layout: FunctionComponent<IPageLayout> = ({ user, navItems, children})=>{
    const [openNav, SetOpenNav] = useState<boolean>(false);
    const isMobile = useIsMobile();
    return(
        <>
            <div className={styles.header}>
                { (openNav && !isMobile)
                    ? <CloseIcon className={styles.menu} fontSize="large" onClick={ ()=>{SetOpenNav(false)} } />
                    : <MenuIcon className={styles.menu} fontSize="large" onClick={ ()=>{SetOpenNav(true)} } />
                }
                <Link className={styles.logo} to="/"><img src="./logo.svg" alt="gym logo"/></Link>
                <div className={"center " + styles.loggedInUser}>
                    <span>{user.username}</span>
                    <img src={"."+user.imgSrc} />
                </div>
            </div>
            <div className={styles.wrapper + " " + ((openNav && !isMobile)? styles.open : "")}>
                <NavBar styles={styles} items={navItems} />
                <main className="center-column">
                    {children}
                </main>
            </div>
                
        </>
    )
}
export default Layout;