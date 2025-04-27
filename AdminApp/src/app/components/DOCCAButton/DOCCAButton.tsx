import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetButtonStatus } from "../ApproveButton/APIAction";
import { Button } from "antd";


type Props = {
    SendToDocca: () => void;
}

const DOCCAButton = ({SendToDocca}: Props) => {
    const {id: paramID} = useParams();
    let id = '';
    if (paramID) {
        id = paramID;
    }
    const [show, setShow] = useState(false);

    useEffect(() => {
        const callAPI = async () => {
            const result = await GetButtonStatus(id);
            if (result === 'True') {
                setShow(true);
            } else {
                setShow(false);
            }
        };
        callAPI();
    }, [id]);

    if (show) {
        return (
            <Button type="primary" onClick={SendToDocca}>
                {id === '' ? 'Submit' : 'Send to DOCCA'}
            </Button>
        );
    } else {
        return '';
    }
}

export default DOCCAButton;