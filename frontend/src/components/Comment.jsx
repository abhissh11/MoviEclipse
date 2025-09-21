import { useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Comment({ comment, refresh }) {
  const { user } = useContext(AuthContext);

  const canDelete =
    user &&
    (user.user.role === "admin" || user.user.id === comment.user_id?._id);

  const deleteComment = async () => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await API.delete(`/comments/${comment._id}`);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className=" bg-gray-100 border-b border-gray-300 shadow-xs px-2 pb-1">
      <div className="flex justify-between items-center">
        <p className="font-medium text-sm text-gray-800">
          {comment.user_id?.name || "Unknown"}
        </p>
        {canDelete && (
          <button
            onClick={deleteComment}
            className="text-xs text-red-500 hover:underline text-center cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-gray-700 text-sm mt-1">{comment.body}</p>
    </div>
  );
}
