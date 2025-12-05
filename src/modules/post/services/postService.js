import httpClient from "../../../shared/utils/httpClient"

export async function createPost(postData) {
  try {
    const response = await httpClient.post('/posts', postData)
    return response.data
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export async function getPosts(filters = {}) {
  try {
    const response = await httpClient.get('/posts', { params: filters })
    return response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}