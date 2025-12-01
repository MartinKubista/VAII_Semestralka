import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

type Comment = {
  id_commnet: number;
  user_name: string;
  created_at: string;
  text: string;
};

export function ItemDetailCommentsPart() {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");


  async function loadComments() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/item-detail/${id}/comments`
      );
      const data = await response.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading comments:", error);
      setComments([]);
    }
  }

  useEffect(() => {
    loadComments();
  }, [id]);

  async function addComment() {
    try {
      await fetch(`http://localhost:5000/api/item-detail/${id}/add-comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newComment,
          user_name: user?.name,
          id_item: id,
        }),
      });

      setNewComment(""); 
      loadComments(); 
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  return (
    <div className="container my-4">
      <div className="card shadow p-4 mt-4">
        <h5 className="fw-bold mb-4">💬 Komentáre</h5>

        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id_commnet} className="mb-3 pb-3 border-bottom">
              <div className="d-flex justify-content-between">
                <div className="fw-bold">{c.user_name}</div>

                <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {new Date(c.created_at).toLocaleString("sk-SK", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                    })}
                </div>
              </div>

              <div className="mt-1">{c.text}</div>
            </div>
          ))
        ) : (
          <p className="text-muted">Zatiaľ žiadne komentáre.</p>
        )}

        {isLoggedIn && (
          <>
            <textarea
              className="form-control mb-3"
              rows={3}
              placeholder="Napíšte svoj komentár..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <div className="text-left">
              <button className="btn btn-primary" onClick={addComment}>
                Pridať komentár
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}