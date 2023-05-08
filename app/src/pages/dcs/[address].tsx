import DcsDetails from 'views/Ranking/addressInfo'
import {useRouter} from "next/router";

const DetailsPage = () => {
  const router = useRouter()
  return <DcsDetails address={String(router.query.address)} />
}

export default DetailsPage