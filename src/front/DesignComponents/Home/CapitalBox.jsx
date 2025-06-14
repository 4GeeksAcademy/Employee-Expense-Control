import React from "react";
import "./CapitalBox.css";

const CapitalBox = () => {
  const cardsData = [
    { letter: "G", title: "GROWTH",      description: "Growth-driven financial tools that scale alongside your business, helping you stay agile and competitive..",            color: "var(--ghost-green)"    },
    { letter: "H", title: "Hassle-free ",      description: "Hassle-free invoice processing, reducing manual errors and saving your team valuable time.",                      color: "var(--ghost-green)"     },
    { letter: "O", title: "Optimized", description: "Optimized expense tracking that provides detailed visibility into spending patterns and budget adherence.",                   color: "var(--ghost-green)" },
    { letter: "S", title: "Secure",    description: "Secure cloud-based storage guarantees your financial data is protected with the highest industry standards.",             color: "var(--ghost-green)"    },
    { letter: "T", title: "Transparent",    description: "Transparent budgeting and reporting features enable clear, real-time insights so you always know where your money is going.",                    color: "var(--ghost-green)"     },
    { letter: "B", title: "Business automation",       description: "Business automation designed to streamline repetitive tasks such as invoice approval workflows and expense reconciliation, freeing your team to focus on strategic initiatives.",                      color: "var(--ghost-green)"    },
    { letter: "I", title: "Intuitive ",  description: "Intuitive interfaces crafted for ease of use, ensuring all employees—from finance teams to individual contributors—can navigate and manage expenses effortlessly.",                    color: "var(--ghost-green)"     },
    { letter: "L", title: "Live tracking",    description: "Live tracking and notifications that keep you updated on budget statuses and pending approvals, so no expense goes unnoticed or delayed.",                     color: "var(--ghost-green)" },
    { letter: "L", title: "Logic",         description: "Logic-based analytics and customizable reports turn raw data into actionable insights, empowering decision-makers with the knowledge needed to optimize resource allocation and control costs effectively.",                      color: "var(--ghost-green)"    },
  ];

  return (
    <section className="capital-boxes-section">
      <h2 className="capital-boxes-title">IT Solutions for Expense Management</h2>
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
              <h3 className="box-head-text">{card.title}</h3>
              <p className="box-head-paragragh">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CapitalBox;
