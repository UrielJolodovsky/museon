import dir_url from "@/lib/url"
import axios from "axios"


const useMuseos = async () => {
  const museos = await axios.get(`${dir_url}/api/museos`)

  const data = museos.data

  return data
}

export default useMuseos