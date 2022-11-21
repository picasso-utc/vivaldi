import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ajaxGet, ajaxPost, ajaxPatch } from '../../../utils/Ajax';
import Grid from '@material-ui/core/Grid';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TrendingProduct = () => {
    const [reload, setReload] = useState(false);
    const [products, setProducts] = useState([]);
    const [newTrendingProduct, setNewTrendingProduct] = useState({});
    const [categoryNames, setCategoryNames] = useState({});

    useEffect(() => {
        ajaxGet('payutc/public/articles').then((res) => {
            let productNames = [];
            let categoryNames = {};
            res.data.map((category) => {
                category.products.map((product) => {
                    productNames.push(product.name);
                    categoryNames[product.name] = category.name;
                });
            });
            productNames.sort((a, b) => (a > b ? 1 : -1));
            setProducts(productNames);
            setCategoryNames(categoryNames);
        });
    }, [reload]);

    const handleChangeProduct = (event) => {
        setNewTrendingProduct({
            ...newTrendingProduct,
            nom_produit: event.target.value,
            nom_categorie: categoryNames[event.target.value],
        });
    };

    const handleChangeDescription = (event) => {
        setNewTrendingProduct({
            ...newTrendingProduct,
            description: event.target.value,
        });
    };

    const saveTrendingProduct = () => {
        ajaxPost('trending_product/', newTrendingProduct).then((res) => {
            setReload(!reload);
        });
    };

    return (
        <div className="admin_container">
            <Grid container direction="column">
                <Grid container direction="row" style={{ marginBottom: 10 }}>
                    <Grid item xs={10}>
                        <Typography variant="h6">
                            <ChevronRightIcon />
                            Selectionner le Produit du moment
                        </Typography>
                    </Grid>
                </Grid>
                <Paper className={styles.paper_box}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom du Produit:</TableCell>
                                <TableCell>Description:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        select
                                        fullWidth
                                        autoComplete="off"
                                        variant="outlined"
                                        onChange={handleChangeProduct}
                                    >
                                        {products.map((product, index) => (
                                            <MenuItem key={index} value={product.toString()}>
                                                {product}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="description"
                                        fullWidth
                                        variant="outlined"
                                        multiline
                                        onChange={handleChangeDescription}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        margin="dense"
                                        size="small"
                                        className={styles.btnAddNews}
                                        onClick={saveTrendingProduct}
                                    >
                                        modifier
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
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

export default withStyles(styles)(TrendingProduct);
