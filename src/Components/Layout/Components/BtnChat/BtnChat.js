import { faMessage } from "@fortawesome/free-solid-svg-icons";
import Buttons from "../../../Buttons/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function BtnChat() {
    
    return (  
        <Buttons  chat hide >
            <span style={{display:"flex",alignItems:"center",gap:"5px"}}><FontAwesomeIcon icon={faMessage} flip="horizontal" />Chat</span>
        </Buttons>
    );
}

export default BtnChat;