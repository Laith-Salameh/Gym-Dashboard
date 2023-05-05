//Libraries
import { Route, Routes } from "react-router-dom"
//Componants
import Layout from './components/Layout'
import { INavItem } from "./components/NavBar"
import { MobileContextProvider } from "./context/isMobile-Context"
//MUI
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//pages
import Home from './pages/Home'
import Classes from './pages/Classes'
import GymClass from './pages/Classes/GymClass'
import Clients from './pages/Clients'
import Client from "./pages/Clients/Client"
//styles
import "../styles/globals.scss"
//icons
import DashboardIcon from "./assets/icons/dashboard.svg"
import ClientsIcon from "./assets/icons/clients.svg"
import ClassesIcon from "./assets/icons/classes.svg"
import { useEffect } from "react"
import { useAppDispatch } from "./store/store"
import { getClients } from "./store/api/clients"
import { getClasses } from "./store/api/classes"

const App = ()=>{
  const user = { username: "admin" , imgSrc: "./images/admin.jpg"}
  const NavItems: INavItem[] = [
    {link: "/Gym-Dashboard/", title: "Dashboard", iconSrc: DashboardIcon},
    {link: "/Gym-Dashboard/clients", title: "Clients", iconSrc: ClientsIcon},
    {link: "/Gym-Dashboard/classes", title: "Classes", iconSrc: ClassesIcon}
  ]
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch( getClients())
    dispatch( getClasses())
  }, [dispatch])
  
  return (
    <MobileContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <Layout user={user} navItems={NavItems}> 
          <Router/>
        </Layout>
      </LocalizationProvider>
    </MobileContextProvider>
    )
}

const Router = () =>{
  return (
    <Routes>
      <Route path="/Gym-Dashboard/" element={<Home />} />
      <Route path="/Gym-Dashboard/clients">
        <Route index={true} element={<Clients/>} />
        <Route path=":clientId" element={<Client/>} />
      </Route>
      <Route path="/Gym-Dashboard/classes">
        <Route index={true} element={<Classes/>} />
        <Route path=":classId" element={<GymClass/>} />
      </Route>
    </Routes>
  )
}
export default App
