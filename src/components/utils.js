export const authCodeToMessage = code => {
  if (code === "auth/wrong-password") {
    return "Credenciais incorretas"
  }
  if (code === "auth/invalid-email") {
    return "Email inválido"
  }
  if (code === "auth/email-already-in-use") {
    return "Este email já está em uso"
  }
  if (code === "auth/user-not-found") {
    return "Usuário não encontrado/registrado"
  }
  return `Código de erro não listado: ${code}`
}
