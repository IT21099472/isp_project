export const isAdmin = (userId?: string | null) => {
    return userId === process.env.ADMIN_ID;
  }