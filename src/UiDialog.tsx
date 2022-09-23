import React from "react";
import {AppBar, CircularProgress, Dialog, DialogContent, Fade, List, ListItem, TextField, Toolbar} from "@mui/material";
import DialogItem from "./DialogItem";
import axios from "axios";

interface DialogState {
    items: Array<any>
    isLoading: boolean
    keyword?: string
}

interface DialogProperties {
    onOk: (items: Array<any>) => void
    apiKey: string
}

export default class UiDialog extends React.Component<DialogProperties, DialogState> {

    constructor(props: DialogProperties) {
        super(props);

        this.state = {
            items: [],
            isLoading: true
        }
    }

    componentDidMount() {
        axios.get(`https://api.jotform.com/user/forms?limit=1000&apiKey=${this.props.apiKey}`).then(response => this.setState({
            items: response.data.content,
            isLoading: false
        }));
    }


    render() {
        const {items, isLoading} = this.state;
        return (<Dialog fullScreen open={true}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="search"
                        style={{
                            minWidth: 200
                        }}
                        label={"Search"}
                        type="text"
                        fullWidth={true}
                        onChange={event => this.onKeyWordChange(event.currentTarget.value)}
                    />
                </Toolbar>
            </AppBar>
            <DialogContent sx={{height: '100%'}}>
                {isLoading ? <Fade
                    in={isLoading}
                    style={{
                        zIndex: 9999999,
                        transitionDelay: isLoading ? '800ms' : '0ms',
                    }}
                    unmountOnExit>
                    <CircularProgress/>
                </Fade> : <List>
                    {items && items.map((item, index) => {
                            return (
                                <ListItem sx={{width: 'auto', display: 'inline-block'}} key={item.name}>
                                    <DialogItem item={item}
                                                onSelected={(itemSelected) => {
                                                    axios.get(`https://api.jotform.com/form/${itemSelected.id}/source?apiKey=${this.props.apiKey}`).then(response => {
                                                        this.props.onOk([{
                                                            content: itemSelected,
                                                            embed: btoa(response.data.content)
                                                        }])
                                                    })
                                                }}/>
                                </ListItem>
                            )
                        }
                    )}
                </List>}
            </DialogContent>
        </Dialog>);
    }


    onKeyWordChange(keyword: string) {
        axios.get(`https://api.jotform.com/user/forms?limit=1000&apiKey=${this.props.apiKey}`).then(response => this.setState({
            items: response.data.content.filter((item: any) => item.title.toLowerCase().startsWith(keyword.toLowerCase())),
            isLoading: false
        }));
    }


}


