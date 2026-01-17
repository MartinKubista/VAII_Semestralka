import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

type Review = {
  id_review: number;
  user_name: string;
  created_at: string;
  text: string;
  id_user: number;
};

export function ProfileReview() {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const [errors, setErrors] = useState<{ newReview?: string }>({});

  async function loadReviews() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/review/${id}/reviews`
      );

      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading reviews:", error);
      setReviews([]);
    }
  }

  async function deleteReview(id_reviewPar: number) {
    try {
      await fetch(
        `http://localhost:5000/api/review/delete-review/${id_reviewPar}`,
        { method: "DELETE" }
      );
      await loadReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }

  async function updateReview() {
    if (editingId === null) return;

    try {
      await fetch(
        `http://localhost:5000/api/review/update-review/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: editingText }),
        }
      );

      setEditingId(null);
      setEditingText("");
      loadReviews();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  }

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/review/${id}/reviews`
        );

        const data = await response.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading reviews:", error);
        setReviews([]);
      }
    }

    fetchReviews();
  }, [id]);

  function validateForm() {
    const newErrors: { newReview?: string } = {};
    const text = newReview.trim();

    if (!text) {
      newErrors.newReview = "Napíš recenziu";
    } else if (text.length > 500) {
      newErrors.newReview = "Recenzia môže mať max 500 znakov.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function addReview() {
    try {
      if (!validateForm()) return;

      await fetch(`http://localhost:5000/api/review/add-review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newReview,
          id_user: user?.id_user,
          id_item: id,
        }),
      });

      setNewReview("");
      loadReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  }

  return (
  <div className="container my-5">
    <div className="card shadow p-4">
      <section className="mb-5">
        <h4 className="pb-2">Hodnotenia používateľa</h4>
        <hr className="border-primary mb-4" />

        <div className="list-group mt-3">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id_review}
                className="list-group-item mb-3"
              >
                <div className="d-flex justify-content-between">
                  <strong>{review.user_name}</strong>
                  <small className="text-muted">
                    {new Date(review.created_at).toLocaleDateString("sk-SK")}
                  </small>
                </div>

                <div className="mt-2">
                  {editingId === review.id_review ? (
                    <>
                      <textarea
                        className="form-control"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />

                      <div className="mt-2">
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={updateReview}
                        >
                          💾 Uložiť
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setEditingId(null);
                            setEditingText("");
                          }}
                        >
                          Zrušiť
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="mb-1">{review.text}</p>
                  )}
                </div>

                {isLoggedIn &&
                  user?.id_user === review.id_user &&
                  editingId !== review.id_review && (
                    <div className="mt-2 text-end">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => {
                          setEditingId(review.id_review);
                          setEditingText(review.text);
                        }}
                      >
                        ✏️ Upraviť
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteReview(review.id_review)}
                      >
                        ❌ Zmazať
                      </button>
                    </div>
                  )}
              </div>
            ))
          ) : (
            <p className="text-muted">Zatiaľ žiadne hodnotenia.</p>
          )}

          {isLoggedIn &&  (
          <>
            <textarea
              className="form-control mb-3"
              rows={3}
              placeholder="Napíšte svoje hodnotenie..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            {errors.newReview && <p className="error-text">{errors.newReview}</p>}
            <div className="text-left">
              <button className="btn btn-primary" onClick={addReview}>
                Pridať hodnotenie
              </button>
            </div>
          </>
        )}
        </div>
      </section>
    </div>
  </div>
);

}
