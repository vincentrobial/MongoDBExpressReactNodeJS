import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./process.css"
import { Tooltip } from "bootstrap";
import { Popover } from "bootstrap";
import { useParams } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";
import ComposantDataService from "../services/composant";
import axios from "axios"
import { formatDate } from "../common-functions";


function CaseAR({ date }) {
  const maintenant = new Date();

  // Condition : cochée seulement si la date existe ET <= maintenant
  const estCochee = date && new Date(date) <= maintenant;
  const dateFormatee = formatDate(date);

  return (
    <i
      className={
        estCochee
          ? "bi bi-check-square-fill text-success"
          : "bi bi-square text-secondary"
      }
      {...(estCochee && {
        "data-bs-toggle": "tooltip",
        "data-bs-placement": "top",
        "data-bs-html": "true",
        title: `${dateFormatee}`
      })}
    ></i>
  );
}

  
const Composants = props => {
   const { id } = useParams();

   const [composants, setComposants] = useState([]);

   // Gestion des fenêtres contextuelles
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = (c) => {
      setSelected(c);
      setShow(true);
    };
 

  useEffect(() => {
    axios.get("http://localhost:5001/api/v1/composants")
      //.then(res => setComposants(res.data.composants))
      .then(res => {
          const sorted = res.data.composants.sort((a, b) => {
          return a.nom.toLowerCase().localeCompare(b.nom.toLowerCase());
          });
          setComposants(sorted);
        })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    // Active tous les tooltips de la page
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(el => new Tooltip(el));
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].map(el => new Popover(el, { trigger: "hover" }));
  }, [composants]);

  return (
    <div>
      <h2>Suivi PRO-07</h2>
      <table className="table text-center">
          <thead>
            <tr>
              <th>Composants</th>
              <th>Sites</th>
              <th>Eval SENSSI</th>
              <th>Eval DATA</th>
              <th>AR</th>
              <th>Audit</th>
              <th>MSS</th>
              <th>Comité homolog</th>
              <th>avis homolog</th>
            </tr>
          </thead>
          <tbody>
            {composants.map(c => (
              <tr class="montableau">
                <td><Button
                      variant="outline-primary"
                      key={c.id}
                      onClick={() => handleShow(c)}
                      style={{ margin: "5px" }}
                    >
                      {c.nom}
                    </Button>
                    
                    <Offcanvas show={show} onHide={handleClose} placement="end">
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{selected?.nom}</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <p><b>Responsable :</b> {selected?.responsable.nom} ({selected?.responsable.pole})</p>
                        <p><b>Système technique :</b> {selected?.systech}</p>
                        <p><b>Sensibilité :</b> {selected?.sensibilite}</p>
                        <p><b>Version :</b> {selected?.version.valeur}</p>
                        <p><b>Contenu :</b> {selected?.version.contenu}</p>
                        <p><b>Commentaire :</b> {selected?.commentaire}</p>
                      </Offcanvas.Body>
                    </Offcanvas>
                </td>
                <td>{(c.site || []).map((nom, index) => ( <p key={index}>{nom}</p> ))}</td>
                <td><CaseAR date={c.homologation?.jalons_atteints?.evaluationSSI}/></td>
                <td><CaseAR date={c.homologation?.jalons_atteints?.evalDATA}/></td>
                <td><CaseAR date={c.homologation?.jalons_atteints?.AR}/></td>
                <td><CaseAR date={c.homologation?.jalons_atteints?.audit}/></td>
                <td><CaseAR date={c.homologation?.jalons_atteints?.MSS}/></td>
                <td><CaseAR date={c.homologation?.jalons_atteints?.comite}/></td>
                <td><CaseAR date={c.homologation?.jalons_atteints?.avis}/></td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}

export default Composants;