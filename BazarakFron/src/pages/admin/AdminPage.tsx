import { useEffect, useState } from "react";

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
  itemname: string;
  created_at: string;
  text: string;
  id_user: number;
  rating: number;
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

export function AdminPage() {

    const [users, setUsers] = useState<UserData[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const loadAdminData = async () => {
            try {
            const usersRes = await fetch("http://localhost:5000/api/admin/users", {
                credentials: "include",
            });

            const itemsRes = await fetch("http://localhost:5000/api/admin/items", {
                credentials: "include",
            });

            const reviewsRes = await fetch("http://localhost:5000/api/admin/reviews", {
                credentials: "include",
            });

            const commentsRes = await fetch("http://localhost:5000/api/admin/comments", {
                credentials: "include",
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
        };

        loadAdminData();
    }, []);


    const deleteEntity = async (
        url: string,
        id: number,
        setter: React.Dispatch<React.SetStateAction<any[]>>,
        idKey: string
        ) => {
        if (!window.confirm("Naozaj chceš zmazať tento záznam?")) return;

        try {
            const res = await fetch(`${url}/${id}`, {
            method: "DELETE",
            credentials: "include",
            });

            if (!res.ok) {
            throw new Error("Mazanie zlyhalo");
            }

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
                        <tr key={u.id_user}>
                            <td>{i + 1}</td>
                            <td>{u.name ?? "—"}</td>
                            <td>{u.email}</td>
                            <td>{new Date(u.created_at).toLocaleString("sk-SK")}</td>
                                                        <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                    deleteEntity(
                                        "http://localhost:5000/api/admin/users",
                                        u.id_user,
                                        setUsers,
                                        "id_user"
                                    )
                                    }
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
                        <tr key={item.id_item}>
                            <td>{i + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td className="fw-bold text-primary">{item.price} €</td>
                            <td>
                                <span className="badge bg-success">{item.condition}</span>
                            </td>
                            <td>{new Date(item.created_at).toLocaleString("sk-SK")}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                    deleteEntity(
                                        "http://localhost:5000/api/admin/items",
                                        item.id_item,
                                        setItems,
                                        "id_item"
                                    )
                                    }
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

        <div className="container my-4">
            <div className="card shadow p-4">
                <h3 className="fw-bold mb-4">Hodnotenia</h3>

                <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Autor</th>
                        <th>Inzerát</th>
                        <th>Text</th>
                        <th>Hodnotenie</th>
                        <th>Vytvorené</th>
                        <th>Akcia</th>
                    </tr>
                    </thead>

                    <tbody>
                        {reviews.map((review, i) => (
                        <tr key={review.id_review}>
                            <td>{i + 1}</td>
                            <td>{review.username}</td>
                            <td>{review.itemname}</td>
                            <td className="text-break">{review.text}</td>
                            <td>
                                <span className={`badge ${
                                    review.rating === 0 ? "bg-secondary" :
                                    review.rating >= 5 ? "bg-success" :
                                    "bg-warning text-dark"
                                }`}>
                                    {review.rating}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                    deleteEntity(
                                        "http://localhost:5000/api/admin/reviews",
                                        review.id_review,
                                        setReviews,
                                        "id_review"
                                    )
                                    }
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
                        <tr key={c.id_comment}>
                            <td>{i + 1}</td>
                            <td>{c.username}</td>
                            <td>{c.itemname}</td>
                            <td className="text-break">{c.text}</td>
                            <td>{new Date(c.created_at).toLocaleString("sk-SK")}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                    deleteEntity(
                                        "http://localhost:5000/api/admin/comments",
                                        c.id_comment,
                                        setComments,
                                        "id_comment"
                                    )
                                    }
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
    </>
    );
}