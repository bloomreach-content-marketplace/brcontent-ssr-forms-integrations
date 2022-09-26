import type {NextPage} from 'next'
import UiDialog from "../components/UiDialog";
import {useState} from "react";
import UiField from "../components/UiField";

const Dialog: NextPage = () => {

    const [component, setComponent] = useState(<UiDialog apiKey={'tfp_FppRtRWs1b3JeD4FrAV7WJ6XdfPxe7HDtNUGsF4849Z_hkny5Dy4rDHH'} onOk={items => console.log(items)}/>)

    // try {
    //     UiExtension.register().then(ui => {
    //         setComponent(<CmsField ui={ui}/>)
    //     });
    // } catch (e: any) {
    //     console.error(e.message)
    // }

    return (
        component
    )
}

export default Dialog
