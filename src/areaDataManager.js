import React from "react";
import Button from "@material-ui/core/Button";
import {withStyles} from '@material-ui/core/styles';
import {Dialog, DialogContent, DialogTitle, TextField} from "@material-ui/core";


const styles = ((theme) => ({
    TextArea: {
        '& > *': {
            margin: theme.spacing(0),
            "min-width": '400px',
        },
    },
}));


class AreaDataManager extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            open: false,
            to_change_text_area_json: ''
        }

        this.onConfirmDialog = this.onConfirmDialog.bind( this );
        this.onCloseDialog = this.onCloseDialog.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    onConfirmDialog()
    {
        try
        {
            JSON.parse( this.state.to_change_text_area_json )
        }
        catch( e )
        {
            console.log(e);
            return
        }

        window.localStorage.setItem( "time_area_list", this.state.to_change_text_area_json );
        this.setState( { open: false, to_change_text_area_json: '' } );
        this.props.onChangeTimeArea();
    }

    onCloseDialog()
    {
        this.setState( { open: false, to_change_text_area_json: '' } );
    }

    handleChange( event )
    {
        this.setState({
            to_change_text_area_json: event.target.value
        })
    }

    render()
    {
        return (
            <div>
                <Button variant="contained" color={"primary"}  onClick={ event => {
                    this.setState( {
                        open: true,
                    } )}}> 권역 Export/Import </Button>

                <Dialog open={this.state.open}>
                    <DialogTitle> 현재 에이리어 데이터 Export / Import </DialogTitle>
                    <DialogContent>
                        <div className={"TextArea"}>
                            <TextField
                                id="outlined-textarea"
                                label="현재 Area Data"
                                placeholder="Placeholder"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={window.localStorage.getItem("time_area_list").toString()}
                                multiline
                                variant="outlined"
                            />
                        </div>
                        <div className={"TextArea"}>
                            <TextField
                                id="outlined-textarea"
                                label="수정할 Area Data"
                                placeholder="Placeholder"
                                value={this.state.to_change_text_area_json}
                                multiline
                                onChange={ event => this.handleChange( event )}
                                variant="outlined"
                            />
                        </div>

                        <Button variant="contained" color={"primary"} onClick={event=>{this.onConfirmDialog( event )}}>해당 데이터로 변경</Button>
                        <Button variant="contained" color={"secondary"} onClick={event=>{this.onCloseDialog( event )}}>취소</Button>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}


export default withStyles(styles)(AreaDataManager);