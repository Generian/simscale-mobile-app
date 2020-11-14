import API_KEY from "./api_key"

export const base_url = 'https://api-dev.simscale.com/v0'

let api_config = {
    headers: {
        ["X-API-KEY"]: API_KEY,
    }
}

export default api_config