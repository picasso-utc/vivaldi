import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProstateForm from './ProstateForm';
import Chart from './Chart';




class Prostate extends Component{


    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            formParameters: null
        }
    }

    handleSubmitParameters = (formParameters) => {
        console.log("SUBMIT");
        this.setState({loading: true});

        this.setState({formParameters},
            () => {
                this.setState({loading: false});
            });
    }









    render(){

        if (this.state.loading) {
            return (
                <Grid
                    container
                    className="admin_loader"
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <CircularProgress/>
                    </Grid>
                </Grid>
            )
        }

        return (
            <div className="admin_container">
                <ProstateForm
                    onSubmit={this.handleSubmitParameters}
                    parameters={this.state.formParameters}
                />
                {this.state.formParameters ?
                <Chart
                    parameters={this.state.formParameters}
                ></Chart>
                :
                null


            }





            </div>
            );
        };

    }

    const styles = theme => ({
        container: {
            padding: 20,
            margin: 30,
            marginTop: 100,
            border: "1.5px solid #B22132",
        },
        paper: {
            padding: 10
        },
        textField: {
            marginTop: 16,
            paddingRight: 15,
            width: "100%",
        },
        suggestions: {
            zIndex: 100,
            position: 'absolute',
            maxHeight: 200,
            overflowY: 'scroll',
            marginRight: 15,
        },
        suggestionItem: {
            paddingLeft: 15,
            paddingBottom: 0,
            paddingTop: 0,
            fontSize: 14,
            minHeight: 30,
        },
        addButton: {
            marginTop: 16,
            marginBottom: 8,
        },
        subTitle: {
            marginTop: 10,
            marginBottom: 10,
        },
        subTitleIcon: {
            marginRight: 8,
            paddingTop: 5,
        },
        row: {
            height: 40,
        },
        cell: {
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 10,
            paddingLeft: 10,
        },
        btn: {
            margin: 5
        },
    });

    export default withStyles (styles) (Prostate)
