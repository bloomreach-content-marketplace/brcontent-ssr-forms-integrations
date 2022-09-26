import type {NextPage} from 'next'
import UiField from "../components/UiField";
import UiExtension from "@bloomreach/ui-extension";
import CmsField from "../components/CmsField";
import {useState} from "react";

const Field: NextPage = () => {

    const [component, setComponent] = useState(<UiField onChange={items => console.log(items)}
                                                        onOpenDialog={items => console.log(items)} editMode={false}
                                                        items={[]}/>)
    // try {
    //     UiExtension.register().then(ui => {
    //         setComponent(<CmsField ui={ui}/>)
    //     });
    // } catch (e: any) {
    //     console.error(e.message)
    // }
    return component;
}

export default Field
