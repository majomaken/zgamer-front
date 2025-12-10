import { useCallback, useState } from "react";
import { usePosts } from "./usePosts";

export function useDeletePost() {
  const { deletePost: deletePostContext } = usePosts();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null)

  const remove = useCallback(
    async (id) => {
      setIsDeleting(true);
      setError(null)

      try {
        const response = await deletePostContext(id)
        return response
      } catch(err) {
        setError(err)
        throw err
      } finally {
        setIsDeleting(false)
      }
    },
    [deletePostContext]
  )

  return {
    deletePost: remove,
    isDeleting,
    error,
    resetError: () => setError(null),
  }
  
}