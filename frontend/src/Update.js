import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';

function Update() {

    const { numProduit } = useParams();
    const navigate = useNavigate();
    const [showAlertSucces, setShowAlertSucces] = useState(false);

    function okchoixSucces() {
        navigate('/');
    }

    useEffect(() => {
        axios.get('http://localhost:5000/afficheWhereNumProduit/' + numProduit)
            .then(res => {
                console.log(res)
                setValues({
                    ...values, numProduit: res.data[0].numProduit, design: res.data[0].design,
                    prix: res.data[0].prix, quantite: res.data[0].quantite
                })
            })
            .catch(err => console.log(err))
    }, [])

    const [values, setValues] = useState({
        numProduit: '',
        design: '',
        prix: '',
        quantite: ''
    })

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/Modifier/' + numProduit, values)
            .then(res => {
                console.log(res)
                setShowAlertSucces(true);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div className='container w-25 bg-white rounded p-3'>
                <h3 className='text text-secondary text-center'>Modifier un produit</h3><br></br>
                <form onSubmit={handleUpdate}>
                    <div className='mb-3'>
                        <label>NumProduit</label>
                        <input type='text' className='form-control' value={values.numProduit} onChange={e => setValues({ ...values, numProduit: e.target.value })} readOnly></input>
                    </div>
                    <div className='mb-3'>
                        <label>Design</label>
                        <input type='text' className='form-control' value={values.design} onChange={e => setValues({ ...values, design: e.target.value })}></input>
                    </div>
                    <div className='mb-3'>
                        <label>Prix</label>
                        <input type='number' className='form-control' value={values.prix} onChange={e => setValues({ ...values, prix: e.target.value })}></input>
                    </div>
                    <div className='mb-3'>
                        <label>Quantite</label>
                        <input type='number' className='form-control' value={values.quantite} onChange={e => setValues({ ...values, quantite: e.target.value })}></input>
                    </div>
                    <button className='col-md-6 btn btn-info btn-md'>Modifier</button>
                    <Link to='/' className='col-md-6 btn btn-warning btn-md'>Annuler</Link>
                </form>
            </div>

            <Modal show={showAlertSucces} onHide={okchoixSucces} centered>
                <Modal.Header>
                    <Modal.Title>Produit modifie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Modification effectuee!
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

export default Update
