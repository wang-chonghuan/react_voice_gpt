export async function retrieveMessages() {
  const response = await fetch(process.env.REACT_APP_API_URL!);
  const body = (await response.json()) as any;
  return body;
}


