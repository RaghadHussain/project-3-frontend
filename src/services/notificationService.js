import api from "./api";

async function getNotifications() {
  const response = await api.get("/notification");
  return response.data;
}

export { getNotifications };
