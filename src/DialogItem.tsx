import React from "react";
import {Chip} from "@mui/material";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface ItemProperties {
    item: any
    onSelected: (item: any) => void
}

interface ItemState {
    item: any
    onHover: boolean
}

export default class DialogItem extends React.Component<ItemProperties, ItemState> {

    constructor(props: ItemProperties) {
        super(props);

        this.state = {
            item: props.item,
            onHover: false
        }
    }

    componentDidMount() {

    }


    render() {
        const {item, onHover} = this.state;
        return (<Chip
                onMouseEnter={() => this.setState({onHover: true})}
                onMouseLeave={() => this.setState({onHover: false})}
                size={'medium'}
                variant={"outlined"}
                icon={<DynamicFormIcon />}
                label={item.title}
                onClick={() => this.props.onSelected(item)}
                deleteIcon={onHover ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}
                onDelete={() => this.props.onSelected(item)}
            />
        );
    }


}


