import axios from "axios";

export const validateToken = async (): Promise<boolean> => {
  try {
    // This could be any endpoint that confirms the token’s validity
    await axios.get('/api/user/validate');
    return true;
  } catch {
    return false;
  }
};