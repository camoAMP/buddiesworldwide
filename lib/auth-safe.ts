import { getServerSession } from "next-auth"

export async function tryGetSession() {
  try {
    return await getServerSession()
  } catch {
    return null
  }
}
