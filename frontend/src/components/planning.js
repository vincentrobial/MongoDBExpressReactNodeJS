import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRef, useState } from "react";
import "./planning.css"

/* Gestion de l'unité de la timeline en fonction du zoom */
function getTimelineUnits(zoom) {
  if (zoom > 1.5) return "month";
  if (zoom > 0.9) return "quarter";
  return "semester";
}

/* Affichage des labels de la timeline */
function generateTimeline(year) {
  return {
    months: [
      "Jan", "Fév", "Mar", "Avr", "Mai", "Jun",
      "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"
    ],
    quarters: ["T1", "T2", "T3", "T4"],
    semesters: ["S1", "S2"],
  };
}

// --- DRAG À LA SOURIS --- 
const handleMouseDown = (e) => {
  setIsDragging(true); 
  setDragStartX(e.clientX); 
  setScrollStartX(containerRef.current.scrollLeft); 
}; 
const handleMouseMove = (e) => { 
  if (!isDragging) return; 
  
  const dx = e.clientX - dragStartX; 
  containerRef.current.scrollLeft = scrollStartX - dx; 
}; 
const handleMouseUp = () => { 
  setIsDragging(false); 
};

/* Fonction principale */
export default function InfiniteGantt() {
  const containerRef = useRef(null);

  // Zoom entre 0.5 et 3
  const [zoom, setZoom] = useState(1);

  // Index du mois central (0 = Jan 2000)
  const [centerIndex, setCenterIndex] = useState(0);

  // Nombre d’unités à afficher autour du centre
  const RANGE = 120; // 10 ans de chaque côté

  const baseWidth = 100; // largeur d’un mois à zoom = 1

  // Déterminer l’unité selon le zoom
  const unit = zoom > 1.5 ? "month" : zoom > 0.9 ? "quarter" : "semester";

  // Génère les labels pour une unité donnée
  const getLabel = (index) => {
    const year = 2000 + Math.floor(index / 12);
    const month = index % 12;

    if (unit === "month") {
      const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
      return `${months[month]} ${year}`;
    }

    if (unit === "quarter") {
      const q = Math.floor(month / 3) + 1;
      return `T${q} ${year}`;
    }

    if (unit === "semester") {
      const s = month < 6 ? 1 : 2;
      return `S${s} ${year}`;
    }
  };

  // Largeur d’une unité selon le zoom
  const unitWidth = {
    month: baseWidth * zoom,
    quarter: baseWidth * 3 * zoom,
    semester: baseWidth * 6 * zoom,
  }[unit];

  // Gestion du zoom centré
  const handleWheel = (e) => {
    if (e.ctrlKey) return;
    e.preventDefault();

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const mouseX = e.clientX - rect.left + container.scrollLeft;
    const delta = e.deltaY > 0 ? -0.1 : 0.1;

    setZoom((oldZoom) => {
      const newZoom = Math.min(Math.max(oldZoom + delta, 0.5), 3);
      const ratio = newZoom / oldZoom;

      container.scrollLeft = mouseX * ratio - (e.clientX - rect.left);

      return newZoom;
    });
  };

  // Recentrage automatique si on approche des bords
  const handleScroll = () => {
    const container = containerRef.current;
    const scroll = container.scrollLeft;
    const maxScroll = container.scrollWidth;

    // Si on approche du bord gauche → on décale la fenêtre
    if (scroll < 300) {
      setCenterIndex((c) => c - 60);
    }

    // Si on approche du bord droit → on décale la fenêtre
    if (scroll > maxScroll - container.clientWidth - 300) {
      setCenterIndex((c) => c + 60);
    }
  };

  // Génération des unités autour du centre
  const units = [];
  for (let i = -RANGE; i <= RANGE; i++) {
    units.push(centerIndex + i);
  }

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onScroll={handleScroll}
      className="no-scrollbar"
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        border: "1px solid #ccc",
        height: "120px",
        whiteSpace: "nowrap",
        position: "relative",
      }}
    >
      <div style={{ display: "flex" }}>
        {units.map((index) => (
          <div
            key={index}
            className="border text-center"
            style={{
              width: unitWidth,
              padding: "10px",
              background: index % 2 ? "#f8f9fa" : "#e9ecef",
            }}
          >
            {getLabel(index)}
          </div>
        ))}
      </div>
    </div>
  );
}
