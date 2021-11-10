export const authCodeToMessage = code => {
  if (code === "auth/wrong-password") {
    return "Senha incorreta"
  }
  if (code === "auth/invalid-email") {
    return "Email inválido"
  }
  if (code === "auth/email-already-in-use") {
    return "Este email já está em uso"
  }
  return `Código de erro não listado: ${code}`
}
