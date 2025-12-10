import { useState, useCallback, useMemo, useEffect } from "react";
import { deletePost, getPosts } from "../services/postService";
import { PostsContext } from "./PostsContext";

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await getPosts()
      console.log('data', data)
      setPosts(Array.isArray(data.posts) ? data.posts : [])
    } catch (error) {
      setError(error)
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const refetch = useCallback(() => {
    return fetchPosts()
  }, [fetchPosts])

  const removePost = useCallback(
    async (id) => {
      try{
        await deletePost(id)
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
        refetch()
      } catch (err) {
        setError(err)
        console.error('Error deleting post:', err)
        throw err
      }
    }
    ,[refetch]
  )

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const value = useMemo(() => ({
    posts,
    loading,
    error,
    refetch,
    fetchPosts,
    deletePost: removePost,
  }), [posts, loading, error, refetch, fetchPosts, removePost])

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  )
}