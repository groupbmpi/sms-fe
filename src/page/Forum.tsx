import { Container } from "react-bootstrap";

const ChatItem = ({ isSelf }: { isSelf: boolean }) => {
  const conditionalClass = isSelf
    ? "bg-body-secondary text-dark"
    : "bg-dark text-light";

  const chatItem = (
    <div
      className={`d-flex p-2 w-75 rounded-5 align-items-center gap-2 mb-2 ${conditionalClass}`}
    >
      <div>
        <img
          src="https://via.placeholder.com/500"
          alt="profile"
          className="rounded-circle"
          width={50}
          height={50}
          draggable={false}
        />
      </div>
      <div>
        <p className="mb-0 fw-bold">Ferguso</p>
        <p className="mb-0 fst-italic">25 Mei 2022 02.00 PM</p>
        <p className="">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
          magnam soluta assumenda repellendus culpa vitae eveniet incidunt
          voluptatem aliquam ea nisi libero optio consequuntur placeat provident
          autem dolorum, ullam magni.
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
  return (
    <Container className="mt-2">
      <section
        className="bg-light w-75 mx-auto p-4 rounded-3 overflow-scroll"
        style={{ height: "75vh" }}
      >
        <ChatItem isSelf={false} />
        <ChatItem isSelf={true} />
        <div className="d-flex gap-2 sticky-bottom">
          <input className="form-control"></input>
          <button className="btn btn-primary">Kirim</button>
        </div>
      </section>
    </Container>
  );
};

export default Forum;
