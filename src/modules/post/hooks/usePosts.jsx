import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";

export function usePostsContext() {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error('usePostsContext debe ser usado dentro de un PostsProvider');
  }
  return context;
}

export function usePosts() {
  return usePostsContext();
}