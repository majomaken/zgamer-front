import { useState, useCallback, useMemo, useEffect } from "react";
import { getPosts } from "../services/postService";
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

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const value = useMemo(() => ({
    posts,
    loading,
    error,
    refetch,
    fetchPosts,
  }), [posts, loading, error, refetch, fetchPosts])

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  )
}