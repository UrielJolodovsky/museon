import { useParams } from "next/navigation"
import axios from "axios"
import dir_url from "@/lib/url"

const useUrl = async () => {

  const params = useParams()
  const MuseoName = params.slug.toString().replace('-', ' ')

  const verifyurl = await axios.post(`${dir_url}/verifyMuseoName`, {
    name_museo: MuseoName
  })
  return verifyurl.data as boolean
}

export default useUrl