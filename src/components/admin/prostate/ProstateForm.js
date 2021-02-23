import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from '@material-ui/core/CircularProgress';

import {getProductsList, getTimeSets, diagramTypes} from './datas.js'

class ProstateForm extends Component{


    constructor(props) {
        super(props)


            this.state = {
                loading: true,
                start_date: new Date(),
                end_date: new Date(),
                evolution_type: "",
                family: "",
                product: "",
                period: "",
                diagram_type: "",
                timeSets: [],
                productList: []
            }




    }

    handleStartDate = start_date => {
        this.setState({start_date});
    }

    handleEndDate = end_date => {
        this.setState({end_date});
    }

    handleEvolutionType = evolution_type => {
        this.setState({evolution_type: evolution_type.currentTarget.dataset.value});
    }

    handleFamilyChosen = family => {
        this.setState({family: family.currentTarget.dataset.value});
    }

    handleProductChosen = product => {
        console.log(product.currentTarget.dataset.value);
        this.setState({product: product.currentTarget.dataset.value});
    }

    handlePeriod = period => {
        let i = 0;
        while(i < this.state.timeSets.length) {
            let time = this.state.timeSets.length[i];
            if(time.id === period.currentTarget.dataset.value) {
                this.setState({period: period.currentTarget.dataset.value, start_date: time.start, end_date: time.end});
                break;
            }
            i++;
        }
    }

    handleDiagram = type => {
        this.setState({diagram_type: type.currentTarget.dataset.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    componentDidMount() {
        this.loadDatas();
    }
    loadDatas(){



        getTimeSets()
		.then((data) => {
            this.setState({timeSets: data});
            getProductsList().then((data) => {
                this.setState({productList: data, loading: false});

            });
        });

    }







    render(){

        const { classes } = this.props;

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


        let products = [];
        this.state.productList.map(family => {
            let data = Array.from(family.products);
                data.map(product => {
                    products.push(product);
                    return  null;
                })
                return  null;
        }
        );



        return (
            <div>
                <Grid container>
                        <Typography variant="h6" className={classes.subTitle}>
                            Choisissez une période à étudier
                        </Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    label="Date de départ"
                                    name="start_date"
                                    value={this.state.start_date}
                                    onChange={this.handleStartDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    label="Date de fin"
                                    name="end_date"
                                    value={this.state.end_date}
                                    onChange={this.handleEndDate}

                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />


                            </Grid>
                            <TextField
                                    select
                                    label="Période souhaitée : "
                                    className={classes.textField}
                                    name="study_period"
                                    value={this.state.period}
                                    onChange={this.handlePeriod}
                                    margin="dense"
                                    variant="outlined"
                                >
                                    {this.state.timeSets.map((time, key) =>
                                    (
                                    <MenuItem key={key} value={time.id}>
                                        {time.name}
                                    </MenuItem>
                                    )


                                    )}
                                </TextField>

                            <TextField
                            select
                            label="Voir l'évolution de : "
                            className={classes.textField}
                            name="evolution_type"
                            value={this.state.evolution_type}
                            onChange={this.handleEvolutionType}
                            margin="dense"
                            variant="outlined"

                        >
                            <MenuItem key="family" value="family">
                                Famille de produits
                            </MenuItem>
                            <MenuItem key="product" value="product">
                                Produit
                            </MenuItem>

                        </TextField>

                        { this.state.evolution_type === "family" ?
                        <TextField
                        select
                        label="Familles de produits : "
                        className={classes.textField}
                        name="family_chosen"
                        value={this.state.family}
                        onChange={this.handleFamilyChosen}
                        margin="dense"
                        variant="outlined"
                    >
                        {this.state.productList.map(family => (
                        <MenuItem key={family.id} value={family.id}>
                            {family.name}
                        </MenuItem>
                        ))}
                    </TextField> : null
                    }

                    {this.state.evolution_type === "product" ?
                    <TextField
                    select
                    label="Produit : "
                    className={classes.textField}
                    name="product_chosen"
                    value={this.state.product}
                    onChange={this.handleProductChosen}
                    margin="dense"
                    variant="outlined"
                >
                    {products.map(product => (
                    <MenuItem key={product.id} value={product.id}>
                        {product.name}
                    </MenuItem>
                    ))}
                </TextField> :
                null




                }

                                <TextField
                                    select
                                    label="Type de diagramme : "
                                    className={classes.textField}
                                    name="type_diagram"
                                    value={this.state.diagram_type}
                                    onChange={this.handleDiagram}
                                    margin="dense"
                                    variant="outlined"
                                >
                                    {diagramTypes.map(type => (
                                    <MenuItem key={type.id} value={type.su}>
                                        {type.name}
                                    </MenuItem>
                                    ))}
                                </TextField>




                            <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    className={classes.generate_btn}
                                    onClick={(e) => this.handleSubmit(e)}
                                >
                                    Voir
                                </Button>
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>


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

    export default withStyles (styles) (ProstateForm)
