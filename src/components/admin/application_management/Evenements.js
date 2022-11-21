import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ajaxGet, ajaxPost, ajaxPatch, ajaxDelete } from '../../../utils/Ajax';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Evenements = () => {
    const [events, setEvents] = useState([]);
    const [currentSemester, setCurrentSemster] = useState(0);
    const [eventToAdd, setEventToAdd] = useState({});
    const [reload, setReload] = useState(false);

    useEffect(() => {
        ajaxGet('events').then((res) => {
            const evenements = res.data;
            evenements.sort((a, b) => (a.date > b.date ? 1 : -1));
            setEvents(evenements);
        });
        ajaxGet('current/semester').then((res) => {
            setEventToAdd({ ...eventToAdd, semestre: res.data.id });
        });
    }, [reload]);

    const handleChangeName = (event) => {
        setEventToAdd({
            ...eventToAdd,
            name: event.target.value,
        });
    };

    const handleChangeDate = (event) => {
        setEventToAdd({
            ...eventToAdd,
            date: event.target.value,
        });
    };

    const saveEvent = () => {
        ajaxPost('events/', eventToAdd).then((response) => {
            setReload(!reload);
        });
    };

    const deleteEvent = (id) => {
        ajaxDelete('events/' + id).then((res) => {
            setReload(!reload);
        });
    };

    return (
        <div className="admin_container">
            <Grid container direction="column">
                <Grid container direction="row" style={{ marginBottom: 10 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            <ChevronRightIcon />
                            Ajouter Un Évenement
                        </Typography>
                    </Grid>
                </Grid>
                <Paper className={styles.paper_box}>
                    <Table>
                        <TableHead>
                            <TableCell className={styles.cell}>Nom de l'évenement</TableCell>
                            <TableCell className={styles.cell}>Date de l'évenement</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        id="nom"
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleChangeName}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="date"
                                        fullWidth
                                        type="date"
                                        onChange={handleChangeDate}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        margin="dense"
                                        size="small"
                                        className={styles.btnAddNews}
                                        onClick={saveEvent}
                                    >
                                        Créer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <Grid container direction="row" style={{ marginBottom: 10, marginTop: 20 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            <ChevronRightIcon />
                            List des Évenements
                        </Typography>
                    </Grid>
                </Grid>
                <Paper className={styles.paper_box}>
                    <Table>
                        <TableHead>
                            <TableCell className={styles.cell}>Nom de l'évenement</TableCell>
                            <TableCell className={styles.cell}>Date de l'évenement</TableCell>
                        </TableHead>
                        <TableBody>
                            {events.map((event, index) => (
                                <TableRow key={index}>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            margin="dense"
                                            size="small"
                                            className={styles.btnAddNews}
                                            onClick={() => deleteEvent(event.id)}
                                        >
                                            Supprimer
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </div>
    );
};

const styles = (theme) => ({
    paper_box: {
        width: '100%',
        overflowX: 'auto',
        marginTop: 100,
    },
    btnAddNews: {
        marginTop: 10,
        marginBottom: 20,
        marginRight: 5,
        marginLeft: 5,
    },
    cell: {
        textAlign: 'center',
    },
});

export default withStyles(styles)(Evenements);
