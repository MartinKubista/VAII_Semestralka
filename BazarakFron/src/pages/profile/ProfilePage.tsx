import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import "./ProfilePage.css";
import { ProfileReview } from "./parts/ProfileReviewPart";

type Item = {
  id_item: number;
  id_user: number;
  created_at: string;
  price: number;
  name: string;
  image: string;
  category: string;
  condition: string;
};

type UserData = {
  id_user: number;
  name: string;
  email: string;
  created_at: string;
};

export function ProfilePage() {

  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  const { token, user, isLoggedIn} = useAuth();

  const loadItems = async () => {
    const res = await fetch(`http://localhost:5000/api/profile/${id}/items`);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    async function loadProfile() {
      try{
        const res = await fetch(`http://localhost:5000/api/profile/${id}`);
        const dataUSer = await res.json();
        setUserData(dataUSer);

        console.log(user);
        await loadItems();

      } catch (err) {
      console.error(err);
    }


    }
    loadProfile();
  }, [id]);

  const handleDelete = async (id: number) => {
    try {
    const response = await fetch(`http://localhost:5000/api/profile/${id}/deleteItem`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Chyba pri mazaní produktu");
    }

    await loadItems();

  } catch (error) {
    console.error(error);
  }

      
  };

  if (!userData) return <p>Načítavam...</p>;

  return (
    <>
      <div className="container my-5">
        <div className="card shadow p-4">
          <section className="mb-5">
          <h4 >Osobné údaje</h4>
          <hr className="border-primary mb-4"/>
            <div className="row mt-3">
              <div className="col-md-6">
                <p className="mb-1"><strong>Meno:</strong> {userData.name}</p>
                <p className="mb-1"><strong>E-mail:</strong> {userData.email}</p>
                <p className="mb-1"><strong>Profil vytvorený:</strong> {new Date(userData.created_at).toLocaleDateString("sk-SK")}</p>  
              </div>
            </div>
            <div className="mt-3">
              <Link to="/changeProfile">
                <button className="btn btn-primary me-2">Upraviť údaje</button>
              </Link>
              <Link to="/changePassword">
                <button className="btn btn-primary">Zmeniť heslo</button>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <ProfileReview/>

      <div className="container my-5">
        <div className="card shadow p-4">
          <section>
            <h4 className="pb-2">Moje inzeráty</h4>
            <hr className="border-primary mb-4"/>
              <div className="row mt-3">
              {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id_item} className="col-md-4 mb-4">
                  <Link className="linkwithoutstyle" to={`/item/${item.id_item}`}>
                  <div className="card h-100">
                    <div className="d-flex justify-content-center">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      className="card-img-top maxWidthOfImg"
                      alt=""
                    />
                  </div>
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Kategória: {item.category}</p>
                      <p className="card-text">Cena: {item.price}</p>
                      <p className="card-text">Stav: {item.condition}</p>
                      <p className="card-text"> Pridané: {new Date(item.created_at).toLocaleDateString("sk-SK")}</p>
                    </div>
                    {isLoggedIn &&
                    Number(user?.id_user) === Number(item.id_user) && (
                    <div className="card-footer d-flex justify-content-between">
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id_item)} >Zmazať</button>
                    </div>
                    )}
                  </div>
                  </Link>
                </div>
                ))
                ) : (
                  <p className="text-muted">Zatiaľ žiadne inzeráty.</p>
                )}  

                </div>
          </section>
        </div>
      </div>
    </>
  );
}