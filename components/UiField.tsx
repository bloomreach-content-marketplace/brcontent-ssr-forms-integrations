import React from "react";
import {Button, Chip, Grid} from "@mui/material";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';


interface FieldState {
    items: Array<any>
    editMode: boolean
}

interface FieldProperties {
    onChange: (items: Array<any>) => void
    onOpenDialog: (items: Array<any>) => void
    editMode: boolean
    items: Array<any>
}

export default class UiField extends React.Component<FieldProperties, FieldState> {

    constructor(props: FieldProperties) {
        super(props);

        this.state = {
            items: this.props.items,
            editMode: props.editMode,
        }
    }


    render() {
        const {editMode, items} = this.state;
        return (
            <>
                <Grid container sx={{minWidth: '375px'}} spacing={1}>
                    {editMode &&
                        <Grid sx={{paddingLeft: 0}} item>
                            <List sx={{paddingY: 0, paddingLeft: 0}}>
                                <ListItem sx={{paddingLeft: 0}}>
                                    <Button size={"small"} sx={{display: editMode ? 'block' : 'none'}}
                                            variant="outlined"
                                            onClick={() => {
                                                this.props.onOpenDialog(items)
                                            }}>Select</Button>
                                </ListItem>
                            </List>
                        </Grid>}
                    <Grid item xs={8} sx={{paddingLeft: 0}}>
                        <List sx={{height: '100%', paddingLeft: 0}} row={true}>
                            {items.map((item: any, index: number) => (
                                <ListItem key={index} sx={{height: '100%', paddingLeft: 0}}>
                                    <Grid item sx={{paddingTop: 0}}>
                                        <Chip key={index}
                                              disabled={!editMode}
                                              size={'medium'}
                                              variant={"outlined"}
                                              icon={<DynamicFormIcon/>}
                                              label={item.content.title}
                                              onDelete={() => this.setState({items: []}, () => this.props.onChange([]))}
                                        />
                                    </Grid>
                                </ListItem>

                            ))}
                        </List>

                    </Grid>
                </Grid>
            </>);
    }


}