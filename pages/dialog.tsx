import type {NextPage} from 'next'
import UiDialog from "../components/UiDialog";
import {useState} from "react";
import UiExtension from "@bloomreach/ui-extension";
import CmsField from "../components/CmsField";
import CmsDialog from "../components/CmsDialog";

const Dialog: NextPage = () => {

    const [component, setComponent] = useState(<UiDialog
        token={'tfp_FppRtRWs1b3JeD4FrAV7WJ6XdfPxe7HDtNUGsF4849Z_hkny5Dy4rDHH'} onOk={items => console.log(items)}/>)

    try {
        UiExtension.register().then(ui => {
            setComponent(<CmsDialog ui={ui}/>)
        });
    } catch (e: any) {
        console.error(e.message)
    }

    return (
        component
    )
}

export default Dialog
