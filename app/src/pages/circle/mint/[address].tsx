import { useRouter } from "next/router";
import CircleMint from "../../../views/Circle/mint";

const MintPage = () => {
  const router = useRouter()
  return <CircleMint projectAddress={String(router.query.address)} />
}

export default MintPage
