import React from "react";
import "./CapitalBox.css";

const CapitalBox = () => {
  const cardsData = [
    { letter: "G", title: "Gestión",      description: "At Ghost Bill, we specialize in smart financial technology for modern businesses. Our focus is on simplifying expense management by helping companies seamlessly track, manage, and approve employee-related expenses.",            color: "var(--ghost-green)"    },
    { letter: "H", title: "Hosting",      description: "Aloja tu sitio con máxima disponibilidad.",                      color: "var(--ghost-green)"     },
    { letter: "O", title: "Optimización", description: "Mejora el rendimiento de tu infraestructura.",                   color: "var(--ghost-green)" },
    { letter: "S", title: "Seguridad",    description: "Protege tus datos con cifrado de última generación.",             color: "var(--ghost-green)"    },
    { letter: "T", title: "Ticketing",    description: "Soporte ágil y trazabilidad de incidencias.",                    color: "var(--ghost-green)"     },
    { letter: "B", title: "Backup",       description: "Copias de seguridad automáticas y fiables.",                      color: "var(--ghost-green)"    },
    { letter: "I", title: "Integración",  description: "Conecta todas tus herramientas empresariales.",                    color: "var(--ghost-green)"     },
    { letter: "L", title: "Licencias",    description: "Gestiona licencias con total transparencia.",                     color: "var(--ghost-green)" },
    { letter: "L", title: "Logs",         description: "Monitorea y audita todas las actividades.",                      color: "var(--ghost-green)"    },
  ];

  return (
    <section className="capital-boxes-section">
      <h2 className="capital-boxes-title">Nuestros Servicios IT</h2>
      <div className="capital-boxes-container">
        {cardsData.map((card, idx) => (
          <div className="capital-card" key={idx}>
            <div
              className="capital-card-triangle"
              style={{
                borderColor: `transparent ${card.color} transparent transparent`,
              }}
            />
            <div
              className="capital-card-letter"
              style={{ color: card.color }}
            >
              <span>{card.letter}</span>
            </div>
            <div className="capital-card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CapitalBox;
