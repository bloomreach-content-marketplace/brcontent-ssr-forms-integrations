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
    items: Array<any>
    endpoint: string
    jwtToken?: string
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
        axios.get(`${this.props.endpoint}/form?type=form`, this.props.jwtToken ? {headers: {'x-jwt-token': this.props.jwtToken} as Record<string, string>} : {}).then(response => this.setState({
            items: response.data,
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
                    {items.map((item, id) => {
                            return (
                                <ListItem sx={{width: 'auto', display: 'inline-block'}} key={item.name}>
                                    <DialogItem item={item}
                                                onSelected={(itemSelected) => this.props.onOk([itemSelected])}/>
                                </ListItem>
                            )
                        }
                    )}
                </List>}
            </DialogContent>
        </Dialog>);
    }


    onKeyWordChange(keyword: string) {
        axios.get(`${this.props.endpoint}/form?type=form&title__regex=${keyword ?? ''}`, this.props.jwtToken ? {headers: {'x-jwt-token': this.props.jwtToken} as Record<string, string>} : {}).then(response => this.setState({
            items: response.data,
            isLoading: false,
            keyword: keyword
        }));
    }
}


