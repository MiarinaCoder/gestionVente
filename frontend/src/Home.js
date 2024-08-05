import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const [data, setData] = useState([])
    const [values, setValues] = useState({
        minimal: '',
        maximal: '',
        total: ''
    })

    // Fonction pour gérer la suppression
    function handleDelete1() {
        // Ici, vous pouvez appeler votre fonction de suppression avec l'ID spécifique
        handleDelete(itemIdToDelete);
        // Fermer la modal de confirmation
        setShowConfirmation(false);
        //afficher un alert
        setShowAlert(true);
    }

    // Fonction pour afficher la modal de confirmation
    function confirmDelete(itemId) {
        setItemIdToDelete(itemId);
        setShowConfirmation(true);
    }

    // Fonction pour annuler la suppression
    function cancelDelete() {
        setItemIdToDelete(null);
        setShowConfirmation(false);
    }
    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = async (numProduit) => {
        try {
            await axios.delete('http://localhost:5000/Supprimer/' + numProduit)
            window.location.reload();

            //afficher un alert
            setShowAlert(true);
        }
        catch (err) {
            console.log(err)
        }
        // }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/AfficheMinMaxTot')
            // .then(res => setMinmaxtot(res.minmaxtot))
            // .catch(err => console.log(err))
            .then(res => {
                setValues({
                    ...values, minimal: res.data[0].minimal,
                    maximal: res.data[0].maximal, total: res.data[0].total
                })
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='container'>           
                <div className="p-4 fixed-top bg-secondary">
                    <div className="container-fluid">
                        <h3 className='text text-white'>Gestion de vente des produits</h3>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            <div className='d-flex justify-content-end'>
                <Link to='/Create' className='btn btn-success'>Ajouter+</Link>
            </div>
            <br></br>
            <table className='table table-bordered table-md'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Design</th>
                        <th>Prix</th>
                        <th>Quantite</th>
                        <th>Prestation</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((vente, index) => {
                        return <tr key={index}>
                            <td>{vente.design}</td>
                            <td>{vente.prix}</td>
                            <td>{vente.quantite}</td>
                            <td>{vente.prestation}</td>
                            <td>
                                <Link to={`/Update/${vente.numProduit}`} className='btn btn-sm btn-info'>Modifier</Link>
                            </td>
                            <td>
                                <button onClick={() => confirmDelete(vente.numProduit)} className='btn btn-sm btn-danger'>Supprimer</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <br></br>
            <div className='row'>
                <div className='col-8'>
                    <div className='card-center'>
                        <div className='card bg-light w-75 text-center'>
                            {/* {data.map((vent, index) => {
                    return  */}
                            <form>
                                <div className='mb-3'>
                                    <label className='col-3'>Prestation minimale :</label>
                                    <input type='text' readonly value={values.minimal}></input>
                                    <label className='col-1'>ariary</label>
                                </div>
                                <div className='mb-3'>
                                    <label className='col-3'>Prestation maximale :</label>
                                    <input type='text' readonly value={values.maximal}></input>   
                                    <label className='col-1'>ariary</label>                                 
                                </div>
                                <div className='mb-3'>
                                    <label className='col-3'>Prestation totale :</label>
                                    <input type='text' readonly value={values.total}></input>
                                    <label className='col-1'>ariary</label>
                                </div>
                            </form>
                            {/* })} */}
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    {showAlert && (
                        <div className='alert alert-success' role='alert'>
                            element supprime avec succès
                        </div>
                    )
                    }
                </div>
            </div>
            <br></br>
            <div className='text text-left'>
                <Link to='/Histo' className='btn btn-lg btn-secondary'>Histogramme</Link>
            </div>
            {/* <button className='btn btn-sm btn-info'>Histogramme</button> */}
            {/* <label>Prestation minimale:</label>
            <input type='text' readonly value={minMaxTot.minimal}></input>
            <label>Prestation maximal:</label>
            <input type='text' readonly value={minMaxTot.maximal}></input>
            <label>Prestation total:</label>
            <input type='text' readonly value={minMaxTot.total}></input> */}
            {/* Modal de confirmation */}
            <Modal show={showConfirmation} onHide={cancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation de suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cet élément ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={handleDelete1}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home
