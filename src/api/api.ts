const BASE_URL = "http://localhost:5000";

export async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Kunde inte hämta data: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function post<T, B>(endpoint: string, bodyData: B): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });
  if (!response.ok) {
    throw new Error(`Kunde inte spara data: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function patch<T, B>(endpoint: string, bodyData: B): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });
  if (!response.ok) {
    throw new Error(`Kunde inte uppdatera: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
