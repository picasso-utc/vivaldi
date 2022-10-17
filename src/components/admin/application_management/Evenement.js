import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ajaxGet, ajaxPost, ajaxPatch } from '../../../utils/Ajax';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Evenement = () => {
    const [events, setEvents] = useState([]);
    const [eventSemester, setEventSemester] = useState([]);
    const [reload, setReload] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(0);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [eventToAdd, setEventToAdd] = useState({});

    useEffect(() => {
        ajaxGet('events').then((res) => {
            ajaxGet('current/semester').then((result) => {
                if (selectedSemester === 0) {
                    setSelectedSemester(result.data.id);
                    setEventToAdd({ ...eventToAdd, semestre: result.data.id });
                    var eventsSemester = [];
                    res.data.map((event, index) => {
                        if (event.semestre === result.data.id) {
                            eventsSemester.push(event);
                        }
                    });
                } else {
                    setEventToAdd({ ...eventToAdd, semestre: selectedSemester });
                    var eventsSemester = [];
                    res.data.map((event) => {
                        if (event.semestre === selectedSemester) {
                            eventsSemester.push(event);
                        }
                    });
                }
                eventsSemester.sort((a, b) => (a.date > b.date ? 1 : -1));
                setEventSemester(eventsSemester);
            });
            setEvents(res.data);
        });
    }, [reload]);

    useEffect(() => {
        ajaxGet('semesters').then((res) => {
            setSemesters(res.data);
        });
        ajaxGet('current/semester').then((res) => {
            setSelectedSemester(res.data.id);
            setEventToAdd({ ...eventToAdd, semestre: res.data.id });
        });
    }, []);

    const handleModalClickClose = () => {
        setCreate(false);
        setEdit(false);
        setEventToAdd({ semestre: selectedSemester });
        setReload(!reload);
    };

    const handleChangeString = (event) => {
        setEventToAdd({ ...eventToAdd, name: event.target.value });
    };

    const handleChangeSemester = (event) => {
        setEventToAdd({ ...eventToAdd, semestre: event.target.value });
        setSelectedSemester(event.target.value);
    };

    const handleChangeCurrentSemester = (e) => {
        setEventToAdd({ ...eventToAdd, semestre: e.target.value });
        setSelectedSemester(e.target.value);
        let eventsSemester = [];
        events.map((event) => {
            if (event.semestre === e.target.value) {
                eventsSemester.push(event);
            }
        });
        setEventSemester(eventsSemester);
    };

    const handleChangeDate = (event) => {
        setEventToAdd({ ...eventToAdd, date: event.target.value });
    };

    const saveEvent = (info) => {
        const ajax_event = {
            semestre: info.semestre,
            date: info.date,
            name: info.name,
        };
        if (create) {
            ajaxPost('events/', ajax_event)
                .then((res) => {
                    handleModalClickClose();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (edit) {
            ajaxPatch('events/' + info.id + '/', ajax_event)
                .then((res) => {
                    handleModalClickClose();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="admin_container">
            <Grid container direction="column">
                <Grid container direction="row" style={{ marginBottom: 10 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            <ChevronRightIcon />
                            Selection de Semestre
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="semestre"
                            fullWidth
                            variant="outlined"
                            multiline
                            select
                            value={selectedSemester}
                            onChange={handleChangeCurrentSemester}
                        >
                            {semesters.map((semester, index) => (
                                <MenuItem key={index} value={semester.id}>
                                    {semester.periode + semester.annee}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container direction="row" style={{ marginBottom: 10 }}>
                    <Grid item xs={10}>
                        <Typography variant="h6">
                            <ChevronRightIcon />
                            Gestion des Évenements
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className={styles.btnAddNews}
                            onClick={() => setCreate(!create)}
                        >
                            Ajouter Un Evenement
                        </Button>
                    </Grid>
                </Grid>
                <Paper className={styles.paper_box}>
                    {eventSemester.length == 0 && (
                        <Typography variant="h6" style={{ margin: 20 }}>
                            Il n'y a pas encore d'evenement ce semestre!
                        </Typography>
                    )}
                    {eventSemester.length != 0 && (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={styles.cellLeft}>
                                        Nom de l'évenement
                                    </TableCell>
                                    <TableCell className={styles.cell}>
                                        Date de l'évenement
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {eventSemester.map((event, index) => (
                                    <TableRow key={index}>
                                        <TableCell className={styles.cellLeft}>
                                            {event.name}
                                        </TableCell>
                                        <TableCell className={styles.cell}>{event.date}</TableCell>
                                        <TableCell className={styles.cell}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                className={styles.btnAddNews}
                                                onClick={() => {
                                                    setEdit(!edit);
                                                    setEventToAdd({
                                                        id: event.id,
                                                        name: event.name,
                                                        semestre: event.semestre,
                                                        date: event.date,
                                                    });
                                                }}
                                            >
                                                Editer
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Paper>
            </Grid>

            <Dialog open={create} onClose={handleModalClickClose}>
                <DialogTitle>Creation d'un nouvelle évenement</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableRow>
                            <TableCell>Semestre:</TableCell>
                            <TableCell>
                                <TextField
                                    id="semestre"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    select
                                    value={selectedSemester}
                                    onChange={handleChangeSemester}
                                >
                                    {semesters.map((semester, index) => (
                                        <MenuItem key={index} value={semester.id}>
                                            {semester.periode + semester.annee}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date de l'évenement:</TableCell>
                            <TableCell>
                                <TextField
                                    id="date"
                                    fullWidth
                                    variant="outlined"
                                    type="date"
                                    onChange={handleChangeDate}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nom de l'évenement:</TableCell>
                            <TableCell>
                                <TextField
                                    id="name"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    onChange={handleChangeString}
                                />
                            </TableCell>
                        </TableRow>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        className={styles.btnAddNews}
                        onClick={() => saveEvent(eventToAdd)}
                    >
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={edit} onClose={handleModalClickClose}>
                <DialogTitle>Modification d'un évenement</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableRow>
                            <TableCell>Semestre:</TableCell>
                            <TableCell>
                                <TextField
                                    id="semestre"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    select
                                    defaultValue={eventToAdd.semestre}
                                    onChange={handleChangeSemester}
                                >
                                    {semesters.map((semester, index) => (
                                        <MenuItem key={index} value={semester.id}>
                                            {semester.periode + semester.annee}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date de l'évenement:</TableCell>
                            <TableCell>
                                <TextField
                                    id="date"
                                    fullWidth
                                    variant="outlined"
                                    type="date"
                                    onChange={handleChangeDate}
                                    defaultValue={eventToAdd.date}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nom de l'évenement:</TableCell>
                            <TableCell>
                                <TextField
                                    id="name"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    onChange={handleChangeString}
                                    defaultValue={eventToAdd.name}
                                />
                            </TableCell>
                        </TableRow>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        className={styles.btnAddNews}
                        onClick={() => saveEvent(eventToAdd)}
                    >
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const styles = (theme) => ({
    container: {
        padding: 20,
        margin: 30,
        marginTop: 100,
        border: '1.5px solid #B22132',
    },
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
    cellLeft: {
        textAlign: 'left',
    },
});

export default withStyles(styles)(Evenement);
