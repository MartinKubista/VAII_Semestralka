
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

import "./AdminPage.css";

type Item = {
  id_item: number;
  username: string;
  created_at: string;
  price: number;
  name: string;
  category: string;
  condition: string;
};

type Review = {
  id_review: number;
  username: string;
  created_at: string;
  text: string;
  id_user: number;
  rating: number;
  targetname: string;
};


type Comment = {
  id_comment: number;
  username: string;
  itemname: string;
  created_at: string;
  text: string;
  id_item: number;
};

type UserData = {
  id_user: number;
  name: string;
  email: string;
  created_at: string;
};

type WithId = {
  [key: string]: number | string;
};


type ActiveTable = "users" | "items" | "reviews" | "comments";

export function AdminPage() {

    const [users, setUsers] = useState<UserData[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    const { token } = useAuth();

    const navigate = useNavigate();

    const [activeTable, setActiveTable] = useState<ActiveTable>("users");

    const loadAdminData = useCallback(async () => {
            try {
            const usersRes = await fetch("http://localhost:5000/api/admin/users", {
                headers: { 
                    Authorization: `Bearer ${token}`,
                },
            });

            const itemsRes = await fetch("http://localhost:5000/api/admin/items", {
                headers: { 
                    Authorization: `Bearer ${token}`,
                },
            });

            const reviewsRes = await fetch("http://localhost:5000/api/admin/reviews", {
                headers: { 
                    Authorization: `Bearer ${token}`,
                },
            });

            const commentsRes = await fetch("http://localhost:5000/api/admin/comments", {
                headers: { 
                    Authorization: `Bearer ${token}`,
                },
            });

            const usersData = await usersRes.json();
            const itemsData = await itemsRes.json();
            const reviewsData = await reviewsRes.json();
            const commentsData = await commentsRes.json();

            setUsers(Array.isArray(usersData) ? usersData : []);
            setItems(Array.isArray(itemsData) ? itemsData : []);
            setReviews(Array.isArray(reviewsData) ? reviewsData : []);
            setComments(Array.isArray(commentsData) ? commentsData : []);
            } catch (error) {
            console.error("Error loading admin data:", error);
            setUsers([]);
            setItems([]);
            setReviews([]);
            setComments([]);
            }
        }, [token]);

    useEffect(() => {
        loadAdminData();
    }, [loadAdminData]);



    const deleteEntity = async <T extends WithId> (
        url: string,
        id: number,
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        idKey: string
        ) => {
        if (!window.confirm("Naozaj chceš zmazať tento záznam?")) return;

        try {
            const res = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: { 
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Mazanie zlyhalo");
            }

            await loadAdminData();

            setter(prev => prev.filter(item => item[idKey] !== id));
        } catch (err) {
            console.error(err);
            alert("Chyba pri mazaní");
        }
    };

    return (
        <>
        <div className="container my-4">
            <div className="card shadow p-4">
                <div className="admin-tabs justify-content-center">
                <button
                    className={`admin-tab ${activeTable === "users" ? "active" : ""}`}
                    onClick={() => setActiveTable("users")}
                >
                     Používatelia
                </button>

                <button
                    className={`admin-tab ${activeTable === "items" ? "active" : ""}`}
                    onClick={() => setActiveTable("items")}
                >
                     Inzeráty
                </button>

                <button
                    className={`admin-tab ${activeTable === "reviews" ? "active" : ""}`}
                    onClick={() => setActiveTable("reviews")}
                >
                     Hodnotenia
                </button>

                <button
                    className={`admin-tab ${activeTable === "comments" ? "active" : ""}`}
                    onClick={() => setActiveTable("comments")}
                >
                     Komentáre
                </button>
                </div>
            </div>
        </div>

        {activeTable === "users" && (
        <div className="container my-4">
            <div className="card shadow p-4">
                <h3 className="fw-bold mb-4">Používatelia</h3>

                <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Meno</th>
                        <th>Email</th>
                        <th>Vytvorený</th>
                        <th>Akcia</th>
                    </tr>
                    </thead>

                    <tbody>
                        {users.map((u, i) => (
                        <tr key={u.id_user} style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/profile/${u.id_user}`)}>
                            <td>{i + 1}</td>
                            <td>{u.name ?? "—"}</td>
                            <td>{u.email}</td>
                            <td>{new Date(u.created_at).toLocaleString("sk-SK")}</td>
                                                        <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    deleteEntity(
                                        "http://localhost:5000/api/admin/users",
                                        u.id_user,
                                        setUsers,
                                        "id_user"
                                    )
                                    }}
                                >
                                    Zmaž
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        )}

        {activeTable === "items" && (
        <div className="container my-4">
            <div className="card shadow p-4">
                <h3 className="fw-bold mb-4">Inzeráty</h3>

                <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Autor</th>
                        <th>Názov</th>
                        <th>Kategória</th>
                        <th>Cena</th>
                        <th>Stav</th>
                        <th>Vytvorené</th>
                        <th>Akcia</th>
                    </tr>
                    </thead>

                    <tbody>
                        {items.map((item, i) => (
                        <tr key={item.id_item} style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/item/${item.id_item}`)}>
                            <td>{i + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price} €</td>
                            <td>{item.condition}</td>
                            <td>{new Date(item.created_at).toLocaleString("sk-SK")}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    deleteEntity(
                                        "http://localhost:5000/api/admin/items",
                                        item.id_item,
                                        setItems,
                                        "id_item"
                                    )
                                    }}
                                >
                                    Zmaž
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>

                </table>
                </div>
            </div>
        </div>
        )}
        
        {activeTable === "reviews" && (
        <div className="container my-4">
            <div className="card shadow p-4">
                <h3 className="fw-bold mb-4">Hodnotenia</h3>

                <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Profil</th>
                        <th>Autor</th>
                        <th>Text</th>
                        <th>Hodnotenie</th>
                        <th>Vytvorené</th>
                        <th>Akcia</th>
                    </tr>
                    </thead>

                    <tbody>
                        {reviews.map((review, i) => (
                        <tr key={review.id_review} style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/profile/${review.id_user}`)}>
                            <td>{i + 1}</td>
                            <td>{review.targetname}</td>
                            <td>{review.username}</td>
                            <td className="text-break">{review.text}</td>
                            <td>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                    key={star}
                                    style={{
                                        color: star <= review.rating ? "#ffc107" : "#e4e5e9"
                                    }}
                                    >
                                    ★
                                    </span>
                                ))}
                            </td>
                            <td>{new Date(review.created_at).toLocaleString("sk-SK")}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    deleteEntity(
                                        "http://localhost:5000/api/admin/reviews",
                                        review.id_review,
                                        setReviews,
                                        "id_review"
                                    )
                                    }}
                                >
                                    Zmaž
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>

                    
                </table>
                </div>
            </div>
        </div>
        )}

        {activeTable === "comments" && (
        <div className="container my-4">
            <div className="card shadow p-4">
                <h3 className="fw-bold mb-4">Komentáre</h3>

                <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Autor</th>
                        <th>Inzerát</th>
                        <th>Text</th>
                        <th>Vytvorené</th>
                        <th>Akcia</th>
                    </tr>
                    </thead>

                    <tbody>
                        {comments.map((c, i) => (
                        <tr key={c.id_comment} style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/item/${c.id_item}`)}>
                            <td>{i + 1}</td>
                            <td>{c.username}</td>
                            <td>{c.itemname}</td>
                            <td className="text-break">{c.text}</td>
                            <td>{new Date(c.created_at).toLocaleString("sk-SK")}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    deleteEntity(
                                        "http://localhost:5000/api/admin/comments",
                                        c.id_comment,
                                        setComments,
                                        "id_comment"
                                    )
                                    }}
                                >
                                    Zmaž
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        )}
    </>
    );
}