import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import {ajaxPost} from "../../../utils/Ajax";
import "./prostate.css";

const Prostate = () => {
    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [result, setResult]= useState([])

    const handleForm = async () => {
        setLoading(true)

        await ajaxPost('treso/stats', {
            "start_date": startDate.toISOString().split('T')[0],
            "end_date": endDate.toISOString().split('T')[0]
        }).then(
            res => setResult(res.data)
        ).catch(
            setLoading(false)
        )

        setLoading(false)
    }

    if (loading) {
        return (
            <div className="admin_container">
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
            </div>
        )
    }

    return (
        <div className="admin_container">
            <Grid container>
                <Typography variant="h6" className="prostate-sub-title">
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
                            value={startDate}
                            onChange={setStartDate}
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
                            value={endDate}
                            onChange={setEndDate}

                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() => handleForm()}
                        >
                            Voir
                        </Button>
                    </Grid>
                </MuiPickersUtilsProvider>
                <div className='prostate-result-container'>
                    <Grid className='prostate-tab_container'>
                        {result.map(({ categorie__nom, total_price }, index) => (
                            <Grid className='prostate-row-container' item key={index}>
                                <div><b>{categorie__nom}</b></div>
                                <div><b>{total_price} €</b></div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Grid>
        </div>
    )
}

export default Prostate
