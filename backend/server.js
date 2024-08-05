import express, { json } from "express";
import mysql from "mysql";
import cors from "cors";

 const app=express();
 app.use(cors());
 app.use(express.json())

 const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gestionVente"
 })

app.get("/",(req,res)=>{
    const sql="SELECT numProduit,design,prix,quantite,(prix*quantite) AS prestation FROM vente";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:"Erreur de serveur!"})
        return res.json(result)
    })
});

app.post("/Ajouter",(req,res)=>{
    const sql="INSERT INTO vente (`numProduit`,`design`,`prix`,`quantite`) VALUES (?)"
    const values=[
        req.body.numProduit,
        req.body.design,
        req.body.prix,
        req.body.quantite
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json(err)
        return res.json(result)
    })
})

app.get("/afficheWhereNumProduit/:numProduit",(req,res)=>{
    const sql="SELECT * FROM vente WHERE numProduit=?";

    const numProduit=req.params.numProduit;

    db.query(sql,[numProduit],(err,result)=>{
        if(err) return res.json(err)
        //if(err) return res.json({Message:"Erreur de serveur!"})
        return res.json(result)
    })
});

app.put("/Modifier/:numProduit",(req,res)=>{
    const sql="UPDATE vente SET `design`=?,`prix`=?,`quantite`=? WHERE numProduit=?"
    const numProduit=req.params.numProduit;

    db.query(sql,[req.body.design,req.body.prix,req.body.quantite,numProduit],(err,result)=>{
        if(err) return res.json(err)
        return res.json(result)
    })
})

app.delete("/Supprimer/:numProduit",(req,res)=>{
    const sql="DELETE FROM vente WHERE numProduit=?";

    const numProduit=req.params.numProduit;

    db.query(sql,[numProduit],(err,result)=>{
        if(err) return res.json({Message:"Erreur de serveur!"})
        return res.json(result)
    })
})

app.get("/AfficheMinMaxTot",(req,res)=>{
        const sql="SELECT MIN(prix*quantite) AS minimal,MAX(prix*quantite) AS maximal,SUM(prix*quantite) AS total FROM vente";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:"Erreur de serveur!"})
        return res.json(result)
    })
})

// Vérifier si une donnée existe déjà dans la base de données
app.post('/verifierDonnee/:numProduit1', (req, res) => {
    const donnee = req.params.numProduit1;
    const query = `SELECT * FROM vente WHERE numProduit = ?`;
    
    db.query(query, [donnee], (error, results) => {
      if (error) {
        console.error('Erreur lors de la requête MySQL :', error);
        res.status(500).json({ message: 'Erreur lors de la requête MySQL' });
        return;
      }
  
      if (results.length > 0) {
        // La donnée existe déjà
        res.json({ existe: true });
      } else {
        // La donnée n'existe pas encore
        res.json({ existe: false });
      }
    });
  });
  
  

 app.listen(5000,()=>console.log("mandeha tsara!"));