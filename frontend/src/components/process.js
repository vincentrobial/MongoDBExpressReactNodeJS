import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Tooltip } from "bootstrap";
import { Popover } from "bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import ComposantDataService from "../services/composant";


//function Process() {
  
const Composants = props => {
   const { id } = useParams();
   const navigate = useNavigate();
   const initialComposantState = {
     id: null,
     nom: "",
     address: {},
     cuisine: "",
     reviews: []
   };
   const [composant, setComposant] = useState(initialComposantState);
 
   const getComposant = id => {
     ComposantDataService.get(id)
       .then(response => {
         setComposant(response.data);
         console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
   };
 

 useEffect(() => {
    // Active tous les tooltips de la page
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(el => new Tooltip(el));
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].map(el => new Popover(el, { trigger: "hover" }));
  }, []);

  //useEffect(() => {
  //  getComposant(id);
  //}, [id]);

  return (
    <div>
      <h2>Suivi PRO-07</h2>
      <table className="table text-center">
          <thead>
            <tr>
              <th>Libellé</th>
              <th>Colonne 1</th>
              <th>Colonne 2</th>
              <th>Colonne 3</th>
              <th>Colonne 4</th>
              <th>Colonne 5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button type="button" class="btn btn-outline-primary">Composant</button></td>
              <td>
                <i className="bi bi-check-square-fill text-success"
                  data-bs-toggle="popover"
                  data-bs-placement="top"
                  data-bs-title="Case cochée"
                  data-bs-content="Voici un texte plus détaillé"></i>
              </td>
              <td><i className="bi bi-square text-secondary"></i></td>
              <td>
                <i className="bi bi-check-square-fill text-success"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Case cochée"></i>
              </td>
              <td><i className="bi bi-square text-secondary"></i></td>
              <td>
                <i className="bi bi-check-square-fill text-success"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Case cochée"></i>
              </td>
            </tr>
          </tbody>
      </table>
      /* Test du retour de Composant */
      {composant ? (
        <p>{composant.nom}</p>
      ) : (
          <p>No composant selected.</p>
      )}
    </div>
  );
}

export default Composants;