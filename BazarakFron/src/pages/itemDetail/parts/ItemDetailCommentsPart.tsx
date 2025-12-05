import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

type Comment = {
  id_comment: number;
  user_name: string;
  created_at: string;
  text: string;
  id_user: number;
};

export function ItemDetailCommentsPart() {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const [errors, setErrors] = useState<{ newComment?: string }>({});

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

  async function deleteComment(id_commentPar: number) {
    try {
      await fetch(
        `http://localhost:5000/api/item-detail/delete-comment/${id_commentPar}`,
        {
          method: "DELETE",
        }
      );
      await loadComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  async function updateComment() {
    if (editingId === null) return;

    try {
      await fetch(
        `http://localhost:5000/api/item-detail/update-comment/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: editingText }),
        }
      );

      setEditingId(null);
      setEditingText("");
      loadComments();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  }

  useEffect(() => {
    loadComments();
  }, [id]);

  function validateForm() {
    const newErrors: { newComment?: string } = {};

    const text = newComment.trim();  

    if (!text) {
      newErrors.newComment = "Napíš komentár";
    } else if (text.length > 500) {
      newErrors.newComment = "Komentár môže mať max 500 znakov.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function addComment() {
    try {
      if (!validateForm()) return;
      await fetch(`http://localhost:5000/api/item-detail/add-comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newComment,
          id_user: user?.id_user,
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
            <div key={c.id_comment} className="mb-3 pb-3 border-bottom">

              <div className="d-flex justify-content-between">
                <div className="fw-bold">{c.user_name}</div>

                <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                  {new Date(c.created_at).toLocaleString("sk-SK", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="mt-2" style={{ width: "100%" }}>
                {editingId === c.id_comment ? (
                  <>
                    <textarea
                      className="form-control"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />

                    <button
                      className="btn btn-success btn-sm mt-2 me-2"
                      onClick={updateComment}
                    >
                      💾 Uložiť
                    </button>

                    <button
                      className="btn btn-secondary btn-sm mt-2"
                      onClick={() => {
                        setEditingId(null);
                        setEditingText("");
                      }}
                    >
                      Zrušiť
                    </button>
                  </>
                ) : (
                  <div>{c.text}</div>
                )}
              </div>

              {isLoggedIn &&
                user?.id_user === c.id_user &&
                editingId !== c.id_comment && (
                  <div className="mt-2 d-flex justify-content-end">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => {
                        setEditingId(c.id_comment);
                        setEditingText(c.text);
                      }}
                    >
                      ✏️ Upraviť
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteComment(c.id_comment)}
                    >
                      ❌ Zmazať
                    </button>
                  </div>
               )}
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
            {errors.newComment && <p className="error-text">{errors.newComment}</p>}
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