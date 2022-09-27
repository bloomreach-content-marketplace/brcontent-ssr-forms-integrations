import React from "react";
import {UiConfig} from "./utils";
import {UiScope} from "@bloomreach/ui-extension";
import UiDialog from "./UiDialog";
import {NoSsr} from "@mui/material";

interface CmsDialogState {
    items: Array<any>
}

interface CmsDialogProperties {
    ui: UiScope
}

export default class CmsDialog extends React.Component<CmsDialogProperties, CmsDialogState> {
    private config: UiConfig;

    constructor(props: CmsDialogProperties) {
        super(props);

        this.config = JSON.parse(props.ui.extension.config) ?? {};

        this.state = {
            items: [],
        }

    }

    componentDidMount() {
        this.getInitialItems(this.props.ui).then(items => this.setState({items: items}));
    }

    async getInitialItems(ui: UiScope) {
        try {
            const options = await ui.dialog.options();
            let items = JSON.parse(options.value)
            return items;
        } catch (error: any) {
            console.error('Failed to register extension:', error.message);
            console.error('- error code:', error.code);
        }
        return [];
    }


    render() {
        const {items} = this.state;
        return (

                <UiDialog key={items.length}
                          onOk={items => {
                              this.props.ui.dialog.close(items)
                          }} token={this.config.token}/>
        );
    }
}


