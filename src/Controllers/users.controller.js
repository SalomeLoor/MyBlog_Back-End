//Controller usuario
import { UserModel } from "../Models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TOKEN_KEY } from "../Config/config.js";


export const getOneUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({where:{id:req.params.id}});
    if(!user){
      res.status(404).json({message: "user not found"});
    }
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name ||  email ||  password)) {
      res.status(400).json({ message: "Todos los inputs son requeridos" });
    }
    // check if email already exist
    // Validate if email exist in our database
    const oldUser = await UserModel.findOne({ where: { email: email } });
    if (oldUser) {
      return res.status(409).json("email ya existe");
    }
    //Encrypt user password
   const encryptedPassword = await bcrypt.hash(password.toString(),10);
    // Create user in our database
    const users = await UserModel.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });
    // Create token
    const token = jwt.sign({ user_id: users.id, email }, TOKEN_KEY, {
      expiresIn: "1h",
    });
    // save user token
    // users.token = token;
    res.status(201).json({ users, token: token ,message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({message:"Todos los inputs son requeridos"});
    }
    const user = await UserModel.findOne({
      where: { email: email.toLowerCase() },
    });
     // Check if user exists
     if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
   // If everything is valid, generate a token
    const token = jwt.sign({ user_id: user.id, email }, TOKEN_KEY,);
      let dataUser={
          id:user.id,
          name:user.name,
          email:user.email,
      }
      res.status(200).json({ dataUser, token: token, message:"Inicio de sesión exitoso" });
  } catch (err) {
    console.error("Login:", err.message );
    res.status(500).json({ error: err.message });
  }
};

export const logout = async (req, res)=>{

}

export const refresh = (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
	if (!token) {
		return res.status(401).end()
	}
	var payload
	try {
		payload = jwt.verify(token, 'secret')
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
		return res.status(400).end()
	}
	const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
	if (payload.exp - nowUnixSeconds > 30) {
		return res.status(400).end()
	}
	const newToken = jwt.sign({ username: payload.username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})
	res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 })
	res.end()
}