import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";

export function requireAuth(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Missing token" });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    request.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    response.status(401).json({ message: "Invalid token" });
  }
}
