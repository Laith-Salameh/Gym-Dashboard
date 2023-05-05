import React, {FunctionComponent, useContext, useRef} from 'react';
import useMobile from '../customHooks/useMobile';

const MobileContext = React.createContext<boolean>(false);

const useIsMobile= () =>{
    return useContext(MobileContext)
}
export default useIsMobile;


export const MobileContextProvider : FunctionComponent<{children: JSX.Element | JSX.Element[] }> = ({children })=>{
    const container = useRef<HTMLDivElement>(null);
    const isMobile = useMobile(container);
    return (
        <div ref={container}>
        <MobileContext.Provider value={isMobile}>
        {children}
        </MobileContext.Provider>
        </div>
      )
}
;
