import { AsideBar } from "@/app/Components/Aside/index"
import { ChatContainer } from "@/app/Components/MainContainer"
export default function Chat() {
  return (
    <main className="flex">
      <AsideBar />
      <ChatContainer />
    </main> 
  )
}
