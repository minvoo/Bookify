import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { measureMemory } from "vm";
import AdminMessageRequest from "../../../models/AdminMessageRequest";
import MessageModel from "../../../models/MessageModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { AdminMessage } from "./AdminMessage";

export const AdminMessages = () => {
  const { authState } = useOktaAuth();

  const [isLoadingMessages, setisLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messagesPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  //recall use effect.
  const [btnSubmit, setBtnSubmit] = useState(false);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/messages/search/findByClosed/?closed=false&page=${
          currentPage - 1
        }&size=${messagesPerPage}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-type": "application/json",
          },
        };

        const messagesResponse = await fetch(url, requestOptions);
        if (!messagesResponse.ok) {
          throw new Error("Something went wrong");
        }
        const messagesResponseJson = await messagesResponse.json();

        setMessages(messagesResponseJson._embedded.messages);
        setTotalPages(messagesResponseJson.page.totalPages);
      }
      setisLoadingMessages(false);
    };
    fetchUserMessages().catch((error: any) => {
      setHttpError(error.message);
      setisLoadingMessages(false);
    });
    window.scrollTo(0, 0);
  }, [authState, currentPage, btnSubmit]);

  if (isLoadingMessages) {
    return <SpinnerLoading />;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function submitResponseToQuestion(id: number, response: string) {
    const url = `http://localhost:8080/api/messages/secure/admin/message`;
    if (
      authState &&
      authState?.isAuthenticated &&
      id !== null &&
      response !== ""
    ) {
      const messageAdminRequestModel: AdminMessageRequest =
        new AdminMessageRequest(id, response);
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(messageAdminRequestModel)
        }
        const messageAdminRequestModelResponse = await fetch(url, requestOptions);
        if(!messageAdminRequestModelResponse.ok) {
            throw new Error('Something went wrong');
        }
        setBtnSubmit(!btnSubmit);
    }
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-3">
      {messages.length > 0 ? (
        <>
          <h5>Pending Q/A</h5>
          {messages.map((message) => (
            <AdminMessage message={message} key={message.id} submitResponseToQuestion={submitResponseToQuestion} />
          ))}
        </>
      ) : (
        <h5>No pending questions</h5>
      )}
      <div className="mt-3">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};
