import { PostModel } from "../Models/posts.model.js";

// Crear un post
export const createPost = async (req, res) => {
  try {
    const { title, summary, content, readingTime, category, tags, userId } = req.body;

    // Validaciones
    if (!title || !summary || !content || !readingTime || !category || !userId) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    // Asegurar que tags sea un array (si usas JSON)
    if (!Array.isArray(tags)) {
      return res.status(400).json({ message: "Tags debe ser un arreglo" });
    }

    // Crear el post
    const post = await PostModel.create({
      title,
      summary,
      content,
      readingTime,
      category,
      tags,
      userId,
    });

    return res.status(201).json({
      message: "Post creado exitosamente",
      post,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todos los posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Posts obtenidos exitosamente",
      posts,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
