import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Buttons from "../../../Buttons/Buttons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Context } from "../../../store/Context";
function BtnGototop() {
    const {showGototop,setshowGototop} = useContext(Context)
    function gototop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    return (
        <Buttons hide={showGototop} totop><FontAwesomeIcon icon={faArrowUp} onClick={gototop}/></Buttons>
    );
}

export default BtnGototop;