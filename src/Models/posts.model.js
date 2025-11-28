import { DataTypes } from "sequelize";
import { sequelize } from "../DB/connection.js";
import { UserModel } from "./users.model.js";

export const PostModel = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: { //resumen del blog
        type: DataTypes.STRING,
        allowNull: false,
        },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    readingTime: { //tiempo de lectura
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: { //etiquetas
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// realcion entre user y post
// un usuario puede tener muchos posts
UserModel.hasMany(PostModel, { foreignKey: "userId" });
// un post pertenece a un usuario
PostModel.belongsTo(UserModel, { foreignKey: "userId" });
