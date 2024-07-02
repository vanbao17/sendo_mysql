import { useEffect, useState } from 'react';
import { Context } from './Context';
function Provider({ children }) {
    const [showGototop, setshowGototop] = useState(false);
    const [hasReloaded, setHasReloaded] = useState(false);
    const [menufix, setmenufix] = useState(false);
    const [dis, setdis] = useState(false);
    const [user, setuser] = useState({});
    const [idShop, setidShop] = useState();
    const [usergg, setusergg] = useState(false);
    const [userfb, setuserfb] = useState(false);
    useEffect(() => {
        const totop = () => {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                setshowGototop(true);
            } else {
                setshowGototop(false);
            }
        };
        const fixedmenu = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 50) {
                setmenufix(true);
            } else {
                setmenufix(false);
            }
        };
        window.addEventListener('scroll', fixedmenu);
        window.addEventListener('scroll', totop);
        return () => {
            window.removeEventListener('scroll', totop);
            window.removeEventListener('scroll', fixedmenu);
        };
    });
    return (
        <Context.Provider
            value={{
                showGototop,
                setshowGototop,
                menufix,
                setmenufix,
                dis,
                setdis,
                user,
                setuser,
                usergg,
                setusergg,
                userfb,
                setuserfb,
                hasReloaded,
                setHasReloaded,
                idShop,
                setidShop,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default Provider;
