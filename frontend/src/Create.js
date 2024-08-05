import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function Create() {
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertSucces, setShowAlertSucces] = useState(false);
    const [values, setValues] = useState({
        numProduit: '',
        design: '',
        prix: '',
        quantite: ''
    })

    const navigate = useNavigate();

    function okchoix() {
        setShowAlert(false);
    }

    function okchoixSucces() {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const numProduit1 = values.numProduit;
            const response = await axios.post('http://localhost:5000/verifierDonnee/' + numProduit1);
            if (response.data.existe) {
                setShowAlert(true);
            }
            else {
                axios.post('http://localhost:5000/Ajouter', values)
                    .then(res => {
                        console.log(res)
                        setShowAlertSucces(true)
                    })
                    .catch(err => console.log(err))
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div className='container w-25 bg-white rounded p-3'>
                <h3 className='text text-secondary text-center'>Ajouter un produit</h3><br></br>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label>NumProduit</label>
                        <input type='text' className='form-control' onChange={e => setValues({ ...values, numProduit: e.target.value })} required></input>
                    </div>
                    <div className='mb-3'>
                        <label>Design</label>
                        <input type='text' className='form-control' onChange={e => setValues({ ...values, design: e.target.value })} required></input>
                    </div>
                    <div className='mb-3'>
                        <label>Prix</label>
                        <input type='number' className='form-control' onChange={e => setValues({ ...values, prix: e.target.value })} required></input>
                    </div>
                    <div className='mb-3'>
                        <label>Quantite</label>
                        <input type='number' className='form-control' onChange={e => setValues({ ...values, quantite: e.target.value })} required></input>
                    </div>
                    <button className='col-md-6 btn btn-info btn-md'>Enregistrer</button>
                    <Link to='/' className='col-md-6 btn btn-warning btn-md'>Annuler</Link>
                    {/* {donneeExiste ? <p>La donnée existe déjà.</p> : <p>La donnée n'existe pas encore.</p>} */}
                </form>
            </div>
            <Modal show={showAlert} onHide={okchoix} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Produit Existant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ce numero de produit existe deja!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={okchoix}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAlertSucces} onHide={okchoixSucces} centered>
                <Modal.Header>
                    <Modal.Title>Produit ajoute</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Produit ajoute avec succes!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={okchoixSucces}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Create
