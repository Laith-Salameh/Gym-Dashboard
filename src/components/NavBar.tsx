import { FunctionComponent } from "react"
import { Link, useLocation } from "react-router-dom";

export interface INavItem{
    link: string,
    title: string,
    iconSrc: string
}

const NavBar: FunctionComponent<{styles: CSSModuleClasses, items: INavItem[] }> =({styles, items})=>{
    const currentRoute = useLocation().pathname.split('/')[2];
    const index = items.findIndex(item=> currentRoute == item.link.split('/')[2])
    return(
        <nav className={styles.navBar}>
            <ul>
                {
                    items.map((item,i)=>(
                        <li key={i}>
                            <Link to={item.link}>
                                <img src={item.iconSrc} alt={item.title} />
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.activeItem} style={{top: index*62 + "px"}}></div>
        </nav>
    )
}



export default NavBar