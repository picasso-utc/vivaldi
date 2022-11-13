import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ajaxGet, ajaxPost, ajaxPatch } from '../../../utils/Ajax';
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

const BeerInfo = () => {
    const [beerInfo, setBeerInfo] = useState([]);
    const [beerNames, setBeerNames] = useState({});
    const [edit, setEdit] = useState(false);
    const [infoToEdit, setInfoToEdit] = useState({});
    const [create, setCreate] = useState(false);
    const [reload, setReload] = useState(false);
    const [listOfBeersToCreate, setListOfBeersToCreate] = useState([]);

    useEffect(() => {
        ajaxGet('beer_info').then((res) => {
            const info = res.data;
            info.sort((a, b) => (a.weez_id > b.weez_id ? 1 : -1));
            ajaxGet('payutc/public/articles').then((res) => {
                let products = res.data;
                let names = {};
                products.map((category, index) => {
                    if (category.name === 'Pressions' || category.name === 'Bouteilles') {
                        category.products.map((beer, index) => {
                            names[beer.id] = beer.name;
                        });
                    }
                });
                let infoAfficher = [];
                for (let i = 0; i < info.length; i++) {
                    if (names[info[i].weez_id] !== undefined) {
                        infoAfficher.push({ ...info[i], name: names[info[i].weez_id] });
                    }
                }
                setBeerInfo(infoAfficher);
            });
        });
    }, [reload]);

    const handleOpenCreate = () => {
        var tempDict = { ...beerNames };
        let listOfBeers = [];
        beerInfo.map((beer) => delete tempDict[beer.weez_id]);
        {
            Object.entries(tempDict).forEach(([key, value]) => {
                listOfBeers.push({ weez_id: key, name: value });
            });
        }
        if (listOfBeers.length != 0) {
            setListOfBeersToCreate(listOfBeers);
            setCreate(!create);
        } else {
            alert("Y'a plus de bières qui n'ont pas de description");
        }
    };

    const handleChangeString = (event) => {
        let editedInfo = infoToEdit;
        editedInfo[event.target.id] = event.target.value;
        setInfoToEdit(editedInfo);
    };

    const handleChangeBeer = (event) => {
        setInfoToEdit({
            ...infoToEdit,
            weez_id: parseInt(event.target.value, 10),
        });
    };
    const handleChangeInt = (event) => {
        let editedInfo = infoToEdit;
        if (event.target.value <= 5 && event.target.value >= 0) {
            editedInfo[event.target.id] = parseInt(event.target.value, 10);
        } else {
            event.target.value = 0;
        }
        setInfoToEdit(editedInfo);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        let media = null;
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            media = reader.result;
            setInfoToEdit({
                ...infoToEdit,
                logo: media,
                new_logo: file,
            });
        };
    };

    const saveInfo = (info) => {
        const ajax_info = {
            weez_id: info.weez_id,
            amertume: info.amertume,
            fruite: info.fruite,
            acidite: info.acidite,
            sucre: info.sucre,
            description: info.description,
        };
        if (create) {
            ajax_info.logo = null;
            ajaxPost('beer_info/', ajax_info)
                .then((res) => {
                    setInfoToEdit({ ...infoToEdit, id: res.data.id });
                    setEdit(!edit);
                    fileUpload(info.new_logo, res.data.id);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (edit) {
            ajaxPatch('beer_info/' + info.id + '/', ajax_info)
                .then((res) => {
                    if (info.new_logo) {
                        fileUpload(info.new_logo, info.id);
                    } else {
                        handleModalClickClose();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const fileUpload = async (file, id) => {
        const fd = new FormData();
        fd.append('logo', file);
        ajaxPatch('beer_info/' + id + '/', fd)
            .then(() => {
                handleModalClickClose();
            })
            .catch((errors) => {});
    };

    const handleModalClickClose = () => {
        setEdit(false);
        setCreate(false);
        setReload(!reload);
        setInfoToEdit({});
    };

    return (
        <div className="admin_container">
            <Grid container direction="column">
                <Grid container direction="row" style={{ marginBottom: 10 }}>
                    <Grid item xs={10}>
                        <Typography variant="h6">
                            <ChevronRightIcon />
                            Ajouter des Infos sur des Bières
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className={styles.btnAddNews}
                            onClick={() => {
                                handleOpenCreate();
                            }}
                        >
                            Ajouter Une Bière
                        </Button>
                    </Grid>
                </Grid>
                <Paper className={styles.paper_box}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.cellLeft}>Nom de la bière</TableCell>
                                <TableCell className={styles.cell}>Amertume</TableCell>
                                <TableCell className={styles.cell}>Fruité</TableCell>
                                <TableCell className={styles.cell}>Acidité</TableCell>
                                <TableCell className={styles.cell}>Sucré</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {beerInfo.map((beer, index) => (
                                <TableRow key={index}>
                                    <TableCell className={styles.cellLeft}>{beer.name}</TableCell>
                                    <TableCell className={styles.cell}>{beer.amertume}</TableCell>
                                    <TableCell className={styles.cell}>{beer.fruite}</TableCell>
                                    <TableCell className={styles.cell}>{beer.acidite}</TableCell>
                                    <TableCell className={styles.cell}>{beer.sucre}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            className={styles.btnAddNews}
                                            onClick={() => {
                                                setEdit(!edit);
                                                setInfoToEdit({
                                                    id: beer.id,
                                                    name: beer.name,
                                                    weez_id: beer.weez_id,
                                                    amertume: beer.amertume,
                                                    fruite: beer.fruite,
                                                    acidite: beer.acidite,
                                                    sucre: beer.sucre,
                                                    description: beer.description,
                                                    logo: beer.logo,
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
                </Paper>
            </Grid>

            <Dialog open={edit} onClose={() => setEdit(!edit)}>
                <DialogTitle>{'Modification des Infos sur la ' + infoToEdit.name}</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableRow>
                            <TableCell>Amertume:</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 5,
                                            min: 0,
                                        },
                                    }}
                                    id="amertume"
                                    fullWidth
                                    defaultValue={infoToEdit.amertume}
                                    variant="outlined"
                                    onChange={handleChangeInt}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Fruité:</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 5,
                                            min: 0,
                                        },
                                    }}
                                    id="fruite"
                                    fullWidth
                                    defaultValue={infoToEdit.fruite}
                                    variant="outlined"
                                    onChange={handleChangeInt}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Acidité:</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 5,
                                            min: 0,
                                        },
                                    }}
                                    id="acidite"
                                    fullWidth
                                    defaultValue={infoToEdit.acidite}
                                    variant="outlined"
                                    onChange={handleChangeInt}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Sucré:</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 5,
                                            min: 0,
                                        },
                                    }}
                                    id="sucre"
                                    fullWidth
                                    defaultValue={infoToEdit.sucre}
                                    variant="outlined"
                                    onChange={handleChangeInt}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description:</TableCell>
                            <TableCell>
                                <TextField
                                    id="description"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    defaultValue={infoToEdit.description}
                                    onChange={handleChangeString}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Logo:</TableCell>
                            <TableCell>
                                <img
                                    src={infoToEdit.logo}
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    accept="image/*;video/*"
                                    style={{ display: 'none' }}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleFileChange}
                                    name="media"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        className={styles.upload_button}
                                        name="media"
                                    >
                                        Média
                                    </Button>
                                </label>
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
                        onClick={() => saveInfo(infoToEdit)}
                    >
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={create} onClose={() => setCreate(!create)}>
                <DialogTitle>Creation d'Info sur les bières</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableRow>
                            <TableCell>Chosisez une bière</TableCell>
                            <TableCell>
                                <TextField
                                    select
                                    fullWidth
                                    autoComplete="off"
                                    variant="outlined"
                                    onChange={handleChangeBeer}
                                >
                                    {listOfBeersToCreate.map((beer) => (
                                        <MenuItem key={beer.weez_id} value={beer.weez_id}>
                                            {beer.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Amertume:</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 5,
                                            min: 0,
                                        },
                                    }}
                                    id="amertume"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChangeInt}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Fruité:</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 5,
                                            min: 0,
                                        },
                                    }}
                                    id="fruite"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChangeInt}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Acidité:</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 5,
                                            min: 0,
                                        },
                                    }}
                                    id="acidite"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChangeInt}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Sucré:</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 5,
                                            min: 0,
                                        },
                                    }}
                                    id="sucre"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChangeInt}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description:</TableCell>
                            <TableCell>
                                <TextField
                                    id="description"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    onChange={handleChangeString}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Logo:</TableCell>
                            <TableCell>
                                <img
                                    src={infoToEdit.logo}
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    accept="image/*;video/*"
                                    style={{ display: 'none' }}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleFileChange}
                                    name="media"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        className={styles.upload_button}
                                        name="media"
                                    >
                                        Média
                                    </Button>
                                </label>
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
                        onClick={() => saveInfo(infoToEdit)}
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
    upload_button: {
        marginTop: 15,
    },
    cell: {
        textAlign: 'center',
    },
    cellLeft: {
        textAlign: 'left',
    },
});

export default withStyles(styles)(BeerInfo);
