import API_KEY from "./api_key"

export const base_url = 'https://api-dev.simscale.com/v0'

let api_config = {
    headers: {
        ["X-API-KEY"]: API_KEY,
        ["Access-Control-Allow-Origin"]: "*",
        ["Access-Control-Allow-Methods"]: "GET, PUT, POST, DELETE, OPTIONS",
        ["Content-Type"]: "application/json",
    }
}

export default api_config