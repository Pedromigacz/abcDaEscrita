export const authCodeToMessage = code => {
  if (code === "auth/wrong-password") {
    return "Senha incorreta"
  }
  if (code === "auth/invalid-email") {
    return "Email inválido"
  }
  return "Email/senha invalido"
}
