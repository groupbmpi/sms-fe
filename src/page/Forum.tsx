import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { IChatQuery, IChatResponseData, IFormChat } from "../feature/forum/model/Forum";
import { ForumRepository } from "../feature/forum/repository/ForumRepo";
import profilePhoto from "../assets/images/profile-icon.png";

const ChatItem = (
  { 
    isSelf,
    message,
    user,
    time,
    linkFoto
  }: 
  { 
    isSelf: boolean,
    message: string,
    user: string,
    time: string,
    linkFoto: string
  }
  ) => {
  const conditionalClass = isSelf
    ? "bg-body-secondary text-dark"
    : "bg-dark text-light";

  const chatItem = (
    <div
      className={`d-flex p-2 w-75 rounded-5 align-items-center gap-2 mb-2 ${conditionalClass}`}
    >
      <div>
        <img
          src={linkFoto}
          alt="profile"
          className="rounded-circle"
          width={50}
          height={50}
          draggable={false}
        />
      </div>
      <div>
        <p className="mb-0 fw-bold">{user}</p>
        <p className="mb-0 fst-italic">{time}</p>
        <p className="">
          {message}
        </p>
      </div>
    </div>
  );

  return isSelf ? (
    <div className="d-flex justify-content-end">{chatItem}</div>
  ) : (
    chatItem
  );
};

const Forum = () => {

  const [formValue, setFormValue] = useState<string>("");
  const [chatData, setChatData] = useState<IChatResponseData[]>([]);
  const [minID, setMinID] = useState<IChatQuery>({lowID : null});
  const ref = useRef<HTMLDivElement>(null);
  const [lenChat, setLenChat] = useState<number>(0);
  // const [lastTimeScrollZero, setLastTimeScrollZero] = useState<number>(0);

  useEffect(() => {
    ForumRepository.getInstance()
      .getChat(minID)
      .then((res) => {
        if(res.data.length != chatData.length){
          if(res.data.length > 0){
            setMinID({
              lowID : res.data[0].id
            })
            setLenChat(res.data.length)
          }
        }
      })
  },[])

  useEffect(() => {
    ForumRepository.getInstance()
      .getChat(minID)
      .then((res) => {
        if(res.data.length != chatData.length){
          setChatData([...res.data]);
        }
      })
  },[minID,lenChat])

  useEffect(() => {
    if(ref != null){
      if(ref.current != null){
        ref.current.scrollTop = ref?.current.scrollHeight
      }
    }
  },[ref.current])

  useEffect(() => {
    if(!ref)return;
    if(!ref.current)return;
  },[ref.current?.scrollTop])

  const handleFormChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setFormValue(value);
  }

  const handleFormSubmit = () => {
    const body : IFormChat = {
      message : formValue
    }
    ForumRepository.getInstance()
      .postChat(body)
      .then(() => {
        ForumRepository.getInstance()
        .getChat(minID)
        .then((res) => {
          setChatData(res.data);
          if(res.data.length > 0){
            setMinID({lowID : res.data[0].id})
            setLenChat(res.data.length)
          }
        })
        setFormValue("");
      })
  }

  const handleScroll = () => {
    if(ref.current != null){
      if(ref.current.scrollTop == 0){
        const num : number = minID.lowID as number;
        const newMinID : IChatQuery = {
          lowID : num - 5
        }
        ForumRepository.getInstance()
        .getChat(newMinID)
        .then((res) => {
          setChatData(res.data);
          if(res.data.length > 0){
            if(res.data[0].id != minID.lowID && ref.current != null){
              ref.current.scrollTop = 20;
              setMinID({lowID : res.data[0].id})
              setLenChat(res.data.length)
            }
          }
        })
      }
    }
  }

  return (
    <Container className="mt-2">
      <section
        className="bg-light w-75 mx-auto p-4 rounded-3 overflow-scroll"
        style={{ height: "75vh" }} onScroll={handleScroll}ref={ref}
      >
        {chatData.map((chat) => (
          <ChatItem
          key={chat.id}
          linkFoto={            
            chat.linkFoto == "" || chat.linkFoto == null
            ? profilePhoto
            : chat.linkFoto
          } 
          message={chat.pesan}
          time={chat.messageTime}
          user={chat.user}
          isSelf={chat.isSelf} 
          />
        ))}
        <div className="d-flex gap-2 sticky-bottom">
          <input className="form-control" value={formValue} onChange={handleFormChange}></input>
          <button disabled={formValue==""} className="btn btn-primary" type="button" onClick={handleFormSubmit}>Kirim</button>
        </div>
      </section>
    </Container>
  );
};

export default Forum;
