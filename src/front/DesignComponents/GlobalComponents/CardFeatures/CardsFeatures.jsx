import greywaves from "../../../assets/img/ClientCarouselImages/greywaves.png";

import "../CardFeatures/CardFeatures.css"

export const CardsFeatures = () => {

  return (
    <>
      {/* Sección de características (cards) */}
      <section className="home-features homeFeatures"
       style={{
                              backgroundImage: `url(${greywaves})`,
                  
                          }}
      >
        <article className="feature-card">
          <div className="card-inner">
            <div className="card-front">
              <div className="feature-icon">🧾</div>
              <h1 className="cardheadText">Our Solution</h1>
              <h3 className="feature-title">Upload Your Invoices</h3>
              <p className="feature-desc">
                Easily centralize all your invoices in one place with just one click.
              </p>
            </div>
            <div className="card-back">
              <p>At Ghost Bill, we make invoice management effortless. With just one click, centralize all your invoices securely in one place—no more searching or paperwork.

                Our platform automates organization and categorization, saving you time, reducing errors, and improving cash flow visibility.

                Simplify your financial workflow and gain real-time insights with Ghost Bill—your partner for smarter invoice management..</p>
            </div>
          </div>
        </article>
        <article className="feature-card">
          <div className="card-inner">
            <div className="card-front">
              <div className="feature-icon">📊</div>
              <h1 className="cardheadText">Our Approach</h1>
              <h3 className="feature-title">Flexible Budgeting</h3>
              <p className="feature-desc">
                Create and approve budgets in real time—no spreadsheets needed.
              </p>
            </div>
            <div className="card-back">
              {/* <h3>More Info</h3> */}
              <p>At Ghost Bill, we believe budgeting should be as dynamic as your business. Our flexible budgeting feature lets you create and approve budgets in real time, eliminating the need for complex spreadsheets.

                This approach allows teams to adapt quickly to changes, make informed decisions instantly, and maintain full control over financial planning. By simplifying budget management, we empower your business to stay agile and focused on growth.</p>
            </div>
          </div>
        </article>
        <article className="feature-card">
          <div className="card-inner">
            <div className="card-front">
              <div className="feature-icon">🎯</div>
              <h1 className="cardheadText">Our Goal</h1>
              <h3 className="feature-title">Financial Clarity</h3>
              <p className="feature-desc">
                Simplify financial workflows so companies can focus on growth and efficiency.
              </p>
            </div>
            <div className="card-back">
              <p>At Ghost Bill, our goal is to provide businesses with clear, actionable financial insights by simplifying complex workflows. We streamline processes like invoicing, budgeting, and reporting to eliminate confusion and reduce manual effort.

                By delivering financial clarity, we enable companies to focus on what matters most—driving growth, improving efficiency, and making smarter decisions with confidence.</p>
            </div>
          </div>
        </article>

      </section>

    </>
  );
};



//  <article className="feature-card">
//           <div className="feature-icon">🎯</div>
//           <h1 className="cardheadText">Our Goal</h1>
//           <h3 className="feature-title">Financial Clarity</h3>
//           <p className="feature-desc">
//             Simplify financial workflows so companies can focus on growth and efficiency.
//           </p>
//         </article>
