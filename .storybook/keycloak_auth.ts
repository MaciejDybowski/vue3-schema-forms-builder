import axios from "axios";

export async function fetchToken(workspaceId: string) {
  const url = import.meta.env.VITE_AUTH_ENDPOINT
  const clientId = import.meta.env.VITE_CLIENT_ID
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET

  const response = await axios({
    method: 'POST',
    url: url,
    data: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    },
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  })
  let token = response.data.access_token

  axios.defaults.headers.common['Workspace-Id'] = workspaceId;
  axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
  axios.defaults.headers.common['Accept-Language'] = `pl-PL`;

}
