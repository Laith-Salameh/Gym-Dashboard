import { FunctionComponent, useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { Grid } from "@mui/material";
//charts
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
//styles
import styles from "../../styles/pages/Home.module.scss"

const Home: FunctionComponent = ()=>{
    const clients  = useAppSelector((state) => state.clients.clients);
    const classes  = useAppSelector((state) => state.classes.classes);
    const basicPlanNumber = clients.filter(client=>client.subscription_plan === "Basic Plan").length;
    const PriemPlanNumber = clients.length - basicPlanNumber;
    const data = [
        { name: "Basic Plan", value: basicPlanNumber },
        { name: "Premium Plan", value: PriemPlanNumber },
      ];
    const COLORS = [ '#69A197','#ffd300'];
    return (
        <>
        <h1>Dashboard</h1>
        <Grid container style={{margin: 0}} gap={2}>  
            <Grid item xs={12} md={2}/>  
            <Grid item xs={12} md={4} lg={4}>
                <div className={styles.chart + " center-column"}>
                    <h2>Plans</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={300} height={300}>
                            <Pie
                                data={data}
                                cx={"50%"}
                                cy={"50%"}
                                innerRadius={"80%"}
                                outerRadius={"90%"}
                                paddingAngle={5}
                                fill="#000"
                                dataKey="value"
                                label
                            >
                                {
                                    data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))
                                }
                            </Pie>
                            <Legend
                                iconSize={20}
                                width={150}
                                height={50}
                                layout='vertical'
                                verticalAlign='bottom'
                                align='center'
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container columnSpacing={2}> 
                    <Grid item xs={12}>
                        <div className={styles.data + " center-column"}>
                            <h2>Clients</h2>
                            <CountingNumber number={clients.length} delay={500}/>
                        </div> 
                    </Grid>
                    <Grid item xs={12}> 
                        <div className={styles.data + " center-column"}>
                            <h2>Classes</h2>
                            <CountingNumber number={classes.length} delay={500}/>
                        </div> 
                    </Grid>
                </Grid> 
            </Grid>
        </Grid>
        </>
    )
}

const CountingNumber: FunctionComponent<{number: number, delay: number}> = ({number, delay})=>{
    const [ changingNumber, setChangingNumber ] = useState<number>(0);
    useEffect(()=>{
        let intervalLoop = 0;
        const interval = setInterval( ()=>{
            if( intervalLoop >= number ) { clearInterval(interval);}
            setChangingNumber(i=>Math.min(i+1,number));
            intervalLoop++;
        }, delay/number)
        return ()=>{ clearInterval(interval)}
    }, [number, delay])
    return <span className={styles.number}>{changingNumber}</span>
}

export default Home;