import React from "react";
import {DialogProperties, DialogSize, UiScope} from "@bloomreach/ui-extension";
import UiField from "./UiField";

interface CmsFieldState {
    items: Array<any>
    editMode: boolean
}

interface CmsFieldProperties {
    ui: UiScope
}

export default class CmsField extends React.Component<CmsFieldProperties, CmsFieldState> {

    constructor(props: CmsFieldProperties) {
        super(props);

        this.state = {
            items: [],
            editMode: false,
        }
    }

    componentDidMount() {
        this.getInitialItems(this.props.ui).then(items => this.setState({items: items}));
    }

    async getInitialItems(ui: UiScope) {
        try {
            const brDocument = await ui.document.get();
            this.setState({editMode: brDocument.mode === 'edit'});

            let store = await ui.document.field.getValue();
            let items: Array<any> = [];
            if (store) {
                const parsedStore = JSON.parse(store);
                items = Array.isArray(items) ? parsedStore : [];
            }
            return items;
        } catch (error: any) {
            console.error('Failed to register extension:', error.message);
            console.error('- error code:', error.code);
        }
        return [];
    }

    async openDialog(ui: UiScope) {
        try {

            const dialogOptions: DialogProperties = {
                title: 'Select a form',
                url: './dialog',
                size: DialogSize.Medium,
                value: JSON.stringify(this.state.items)
            };

            const response = await ui.dialog.open(dialogOptions) as unknown as Array<any>;
            this.setState({items: response});
            await ui.document.field.setValue(JSON.stringify(response));
        } catch (error: any) {
            if (error.code === 'DialogCanceled') {
                return;
            }
            console.error('Error after open dialog: ', error.code, error.message);
        }

    }


    render() {
        const {items, editMode} = this.state;
        return (
            <UiField
                key={`${(items && items.length > 0) ? items.map(value => value.content.id).join('-') : Math.floor(Math.random() * 100)}`}
                items={items}
                onChange={(items) => this.setState({items: items}, () => this.props.ui.document.field.setValue(JSON.stringify(items)))}
                editMode={editMode}
                onOpenDialog={() => this.openDialog(this.props.ui)}/>);
    }
}


