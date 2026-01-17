interface Review {
name: string;
text: string;
date: string;
}


interface Ad {
id: number;
title: string;
price: string;
image: string;
}

export function ProfilePage() {

  const reviews: Review[] = [
  {
  name: "Petra Kováčová",
  text: "Spoľahlivý predajca, komunikácia výborná. Odporúčam!",
  date: "10. 11. 2025",
  },
  {
  name: "Martin Horváth",
  text: "Všetko prebehlo v poriadku, len doručenie trvalo dlhšie.",
  date: "8. 11. 2025",
  },
  {
  name: "Lucia Bieliková",
  text: "Výborná skúsenosť, produkt ako nový!",
  date: "5. 11. 2025",
  },
  ];


  const ads: Ad[] = [
  {
  id: 1,
  title: "iPhone 13 Pro",
  price: "850 €",
  image: "https://via.placeholder.com/300x200",
  },
  {
  id: 2,
  title: "Notebook Lenovo",
  price: "450 €",
  image: "https://via.placeholder.com/300x200",
  },
  ];


  return (
    <>
      <div className="container my-5">
        <div className="card shadow p-4">
          <section className="mb-5">
          <h4 >Osobné údaje</h4>
          <hr className="border-primary mb-4"/>
            <div className="row mt-3">
              <div className="col-md-6">
                <p className="mb-1"><strong>Meno:</strong> Ján</p>
                <p className="mb-1"><strong>E-mail:</strong> jan.novak@example.com</p>
                <p className="mb-1"><strong>Dátum narodenia:</strong> 15. 5. 1998</p>
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary me-2">Upraviť údaje</button>
              <button className="btn btn-primary">Zmeniť heslo</button>
            </div>
          </section>
        </div>
      </div>

      <div className="container my-5">
        <div className="card shadow p-4">
          <section className="mb-5">
            <h4 className="pb-2">Hodnotenia používateľa</h4>
            <hr className="border-primary mb-4"/>
              <div className="list-group mt-3">
              {reviews.map((review, index) => (
                <div key={index} className="list-group-item">
                  <p className="mb-1">
                  <strong>{review.name}:</strong> {review.text}
                  </p>
                  <small className="text-muted">{review.date}</small>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="container my-5">
        <div className="card shadow p-4">
          <section>
            <h4 className="pb-2">Moje inzeráty</h4>
            <hr className="border-primary mb-4"/>
              <div className="row mt-3">
              {ads.map((ad) => (
                <div key={ad.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img src={ad.image} className="card-img-top" alt={ad.title} />
                    <div className="card-body">
                      <h5 className="card-title">{ad.title}</h5>
                      <p className="card-text fw-bold">{ad.price}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <button className="btn btn-sm btn-warning">Upraviť</button>
                      <button className="btn btn-sm btn-danger">Zmazať</button>
                    </div>
                  </div>
                </div>
              ))}
                </div>
          </section>
        </div>
      </div>
    </>
  );
}