import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {ajaxGet, ajaxPost, ajaxPatch, ajaxPut, ajaxDelete} from '../../../utils/Ajax';
import Button from '@material-ui/core/Button';

const TransferBDD = () => {

    const GetCategory = () => {
        ajaxGet('facture2/categories').then((res)=>{
            console.log(res);
        })
    }

  const tranfereCategory = () => {
        ajaxGet('facture/categories').then(async (res) => {
            let categories = res.data
            console.log(res.data)
            categories.sort((a, b) => a.id > b.id ? 1 : -1)
            for (let x in categories) {
                let category = categories[x]
                let data = {
                    id: category.id,
                    nom: category.nom,
                    code: category.code
                }
                await ajaxPost('facture2/categories/', data).then((res) => {
                    console.log(res);
                })
            }

        })
    }

    const SupprimerCategories = () => {
        ajaxGet('facture2/categories').then((res)=>{
            let categories = res.data
            for (let x in categories) {
                let category = categories[x]
                ajaxDelete('facture2/categories/'+category.id).then((res)=>{
                    console.log(res)
                })
            }
        })
    }

    const GetFactures = () => {
        ajaxGet('facture2/recue').then((res)=>{
            let factures = res.data
            factures.sort((a, b) => a.id > b.id ? 1 : -1)
            console.log(factures)
        })
    }

    const SupprimerFactures = () => {
        ajaxGet('facture2/recue').then((res)=>{
            let factures = res.data
            for (let x in factures) {
                let facture = factures[x]
                ajaxDelete('facture2/recue/'+facture.id).then((res)=>{
                    console.log(res)
                })
            }
        })
    }

    const tranfereFactures = () => {
        ajaxGet('facture/recue?semestre=all').then(async (res) => {
            let factures = res.data
            factures.sort((a, b) => a.id > b.id ? 1 : -1)
            let facturesTotal = []
            let x = 0
            let i = 0
            console.log(factures)
            while (x < factures.length) {
                if (factures[x].id === i+1) {
                    facturesTotal.push(factures[x])
                    x+=1
                    i+=1
                } else {
                    facturesTotal.push(
                        {
                            tva: 0,
                            prix: 0,
                            perm: null,
                            etat: 'D',
                            nom_entreprise: 'ASUPPRIMER',
                            date: '2023-02-15',
                            date_paiement: '2023-02-15',
                            date_remboursement: null,
                            moyen_paiement: null,
                            personne_a_rembourser: null,
                            immobilisation: false,
                            remarque: null,
                            semestre: 22,
                            facture_number: null,
                            categorie_prix: [{prix: 0, categorie: 10}]
                        })
                    i+=1
                }
            }
            for (let x in facturesTotal) {
                let facture = facturesTotal[x]
                let data = {
                    tva:facture.tva,
                    prix:facture.prix,
                    perm: facture.perm,
                    etat: facture.etat,
                    nom_entreprise: facture.nom_entreprise,
                    date: facture.date,
                    date_paiement: facture.date_paiement,
                    date_remboursement: facture.date_remboursement,
                    moyen_paiement: facture.moyen_paiement,
                    personne_a_rembourser: facture.personne_a_rembourser==""?'/':facture.personne_a_rembourser,
                    immobilisation: facture.immobilisation,
                    remarque: facture.remarque,
                    semestre: facture.semestre,
                    facture_number: facture.facture_number,
                    categorie_prix:[{prix:facture.prix, categorie:facture.categorie==null?10:facture.categorie}]
                }
                await ajaxPost('facture2/recue/', data).then((res)=>{
                    console.log(res);
                })}

        })
    }

    const GetFacturesEmise = () => {
        ajaxGet('facture2/emise').then((res)=>{
            console.log(res)
        })
    }

    const SupprimerFacturesEmises = () => {
        ajaxGet('facture2/emise').then((res)=>{
            let factures = res.data
            for (let x in factures){
                let facture = factures[x]
                ajaxDelete('facture2/emise/'+facture.id).then((res)=>{
                    console.log(res)
                })
            }
        })
    }

    const TransferFactureEmise = () => {
        ajaxGet('facture/emise?semestre=all').then(async (res) => {
            let factures = res.data
            factures.sort((a, b) => a.id > b.id ? 1 : -1)
            for (let x in factures) {
                let facture = factures[x]
                for (let y in facture.factureemiserow_set) {
                    let facture_row = facture.factureemiserow_set[y]
                    let data = {
                        tva: facture_row.tva,
                        prix: +(facture_row.prix * facture_row.qty).toFixed(2),
                        destinataire: facture.destinataire,
                        date_creation: facture.date_creation,
                        nom_createur: facture.nom_createur,
                        date_paiement: facture.date_paiement,
                        date_due: facture.date_due,
                        etat: facture.etat,
                        semestre: facture.semestre
                    }
                    await ajaxPost('facture2/emise/', data).then((res) => {
                        console.log(res);
                    })
                }
            }
            console.log(factures)
        })
    }

    const GetCheques = () => {
        ajaxGet('facture2/cheque').then((res)=>{
            console.log(res)
        })
    }

    const SupprimerCheques = () => {
        ajaxGet('facture2/cheque').then((res)=>{
            let cheques = res.data
            for (let x in cheques){
                let cheque = cheques[x]
                ajaxDelete('facture2/cheque/'+cheque.id).then((res)=>{
                    console.log(res)
                })
            }
        })
    }

    const TransferCheques = () => {
        ajaxGet('facture/cheque').then(async (res) => {
            let cheques = res.data
            cheques.sort((a, b) => a.id > b.id ? 1 : -1)
            for (let x in cheques) {
                let cheque = cheques[x]
                if (cheque.facturerecue == null) {
                    let data = {
                        num: cheque.num,
                        valeur: cheque.valeur,
                        state: cheque.state,
                        destinataire: cheque.destinataire,
                        date_encaissement: cheque.date_encaissement,
                        date_emission: cheque.date_emission,
                        commentaire: cheque.commentaire,
                        facture: null
                    }
                    await ajaxPost('facture2/cheque/', data).then((res) => {
                        console.log(res);
                    })
                }
                else{
                    await ajaxGet('facture2/recue/'+cheque.facturerecue).then(async (res) => {
                        let facture = res.data
                        let data={
                            tva:facture.tva,
                            prix:facture.prix,
                            perm: facture.perm,
                            etat: facture.etat,
                            nom_entreprise: facture.nom_entreprise,
                            date: facture.date,
                            date_paiement: facture.date_paiement,
                            date_remboursement: facture.date_remboursement,
                            moyen_paiement: facture.moyen_paiement,
                            personne_a_rembourser: facture.personne_a_rembourser,
                            immobilisation: facture.immobilisation,
                            remarque: facture.remarque,
                            semestre: facture.semestre,
                            facture_number: facture.facture_number,
                            categorie_prix:facture.categorie_prix,
                            sous_categorie_prix: facture.sous_categorie_prix,
                            cheque:[{
                                num: cheque.num,
                                valeur: cheque.valeur,
                                state: cheque.state,
                                destinataire: cheque.destinataire,
                                date_encaissement: cheque.date_encaissement,
                                date_emission: cheque.date_emission,
                                commentaire: cheque.commentaire,
                            }]
                        }
                        await ajaxPut('facture2/recue/'+cheque.facturerecue+'/', data).then((res)=>{
                            console.log(res)
                        })
                    })
                }
            }
        })
    }

    return (
        <div className="admin_container">
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h1 style={{
                    fontSize:'18px',
                    fontWeight:'bold',
                    textDecoration: 'underline'
                }}>
                    CATEGORIES
                </h1>
                <div style={{
                    height: '70px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    border: '1px solid black',
                    padding: '10px'
                }}>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={GetCategory}
                    >
                        Get Categories
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={SupprimerCategories}
                    >
                        Supprimer Categories
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={tranfereCategory}
                    >
                        Transfère Categories
                    </Button>
                </div>
                <h1 style={{
                    fontSize:'18px',
                    fontWeight:'bold',
                    textDecoration: 'underline'
                }}>
                    FACTURES RECUES
                </h1>
                <div style={{
                    height: '70px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    border: '1px solid black',
                    padding: '10px'
                }}>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={GetFactures}
                    >
                        Get Factures Recues
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={SupprimerFactures}
                    >
                        Supprimer Factures Recues
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={tranfereFactures}
                    >
                        Transfère Factures Recues
                    </Button>
                </div>
                <h1 style={{
                    fontSize:'18px',
                    fontWeight:'bold',
                    textDecoration: 'underline'
                }}>
                    FACTURES EMISES
                </h1>
                <div style={{
                    height: '70px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    border: '1px solid black',
                    padding: '10px'
                }}>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={GetFacturesEmise}
                    >
                        Get Factures Emises
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={SupprimerFacturesEmises}
                    >
                        Supprimer Factures Emises
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={TransferFactureEmise}
                    >
                        Transfère Factures Emises
                    </Button>
                </div>
                <h1 style={{
                    fontSize:'18px',
                    fontWeight:'bold',
                    textDecoration: 'underline'
                }}>
                    CHEQUES
                </h1>
                <div style={{
                    height: '70px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    border: '1px solid black',
                    padding: '10px'
                }}>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={GetCheques}
                    >
                        Get Cheques
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={SupprimerCheques}
                    >
                        Supprimer Cheques
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        margin="dense"
                        size="small"
                        onClick={TransferCheques}
                    >
                        Transfère Cheques
                    </Button>
                </div>
            </div>
        </div>
    );
};

const styles = (theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    }
});

export default withStyles(styles)(TransferBDD);