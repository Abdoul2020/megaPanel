import { useEffect, useState } from "react";
import { AiFillMail, AiFillPhone } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { CreateFeedBackDto } from "../../../../common/dtos/CreateFeedBackDto";
import { Alert } from "../../../../common/types/Alert";
import { Client } from "../../../../common/types/Client.entity";
import { Doctor } from "../../../../common/types/Doctor.entity";
import { createFeedBack } from "../../../../features/feedbacks/feedbacksAPI";
import { updateAlert } from "../../../../features/options/optionsSlice";

type Props = {};

export default function AboutContact({}: Props) {
  const dispatch = useAppDispatch();
  const authObject = useAppSelector((state) => state.auth.auth_object);
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const [submitDisable, setSubmitDisable] = useState(false);
  const [loader, setLoader] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [expert, setExpert] = useState<Doctor | undefined>();
  const [client, setClient] = useState<Client | undefined>();

  useEffect(() => {
    if (authObject !== undefined) {
      setClient(authObject);
      setName(authObject.client_name + " " + authObject.client_surname);
      setEmail(authObject.client_email);
      setClient(authObject);
    } else if (authExpertObject !== undefined) {
      setExpert(authExpertObject);
      setName(
        authExpertObject.expert_name + " " + authExpertObject.expert_surname
      );
      setEmail(authExpertObject.expert_email);
      setExpert(authExpertObject);
    }
  }, [authObject, authExpertObject]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    async function fetchData() {
      const feedBackBody: CreateFeedBackDto =
        authObject !== undefined
          ? {
              feedback_client_name: name,
              feedback_client_email: email,
              feedback_client_subject: subject,
              feedback_client_message: message,
              feedback_client_client: client,
            }
          : authExpertObject !== undefined
          ? {
              feedback_client_name: name,
              feedback_client_email: email,
              feedback_client_subject: subject,
              feedback_client_message: message,
              feedback_client_expert: expert,
            }
          : {
              feedback_client_name: name,
              feedback_client_email: email,
              feedback_client_subject: subject,
              feedback_client_message: message,
            };
      setLoader(true);
      setSubmitDisable(true);
      const createFeedbackResponse = await createFeedBack(feedBackBody);
      setLoader(false);
      setSubmitDisable(false);
      const success = createFeedbackResponse.success;
      if (success) {
        const alert: Alert = {
          type: "success",
          text: "Geri bildiriminiz alınmıştır",
          active: true,
          statusCode: createFeedbackResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      } else {
        const alert: Alert = {
          type: "warning",
          text: createFeedbackResponse.data.response.data.message,
          active: true,
          statusCode: createFeedbackResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      }
    }

    if (
      name === undefined ||
      email === undefined ||
      subject === undefined ||
      message === undefined
    ) {
      const alert: Alert = {
        type: "danger",
        text: "Boş alan bırakmayınız.",
        active: true,
        statusCode: 400,
      };
      dispatch(updateAlert(alert));
    } else {
      fetchData();
    }
  };
  return (
    <div className="flex w-full flex-col items-start justify-start gap-5">
      <h1 className="text-2xl font-bold text-color-dark-primary">İletişim</h1>
      <div className="item-start flex w-full flex-col justify-start gap-4 rounded-[20px]">
        <ul className="flex w-full items-end justify-end gap-4">
          <li className="flex items-center justify-center gap-2">
            <AiFillPhone className="text-color-main" />
            <a href="tel:+908503907262">
              <h1 className="text-base text-color-dark-primary opacity-50">
                +90 (850) 390 7262
              </h1>
            </a>
          </li>
          <li className="flex items-center justify-center gap-2">
            <AiFillMail className="text-color-main" />
            <a href="mailto:info@megaverse.coach">
              <h1 className="text-base text-color-dark-primary opacity-50">
                info@megaverse.coach
              </h1>
            </a>
          </li>
        </ul>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-start gap-4"
        >
          <input
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            placeholder="İsim"
            className="w-full rounded-lg border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
          text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
          />
          <input
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="E-posta"
            className="w-full rounded-lg border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
          text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
          />
          <input
            value={subject}
            onChange={(e: any) => setSubject(e.target.value)}
            type="text"
            name="subject"
            id="subject"
            placeholder="Konu"
            className="w-full rounded-lg border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
          text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
          />
          <textarea
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
            rows={4}
            cols={50}
            name="message"
            id="message"
            placeholder="Mesaj"
            className="w-full rounded-lg border-[1px] border-color-dark-primary border-opacity-10 bg-color-white-third py-[15px] px-[22px]
          text-[16px] font-medium outline-none transition-all duration-300 focus:border-color-main"
          />
          <button
            disabled={submitDisable}
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-color-third py-2 transition-all 
      duration-300 hover:bg-color-secondary"
          >
            {loader ? (
              <div className="animate-spin">
                <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
              </div>
            ) : (
              <h1 className="text-lg text-color-white">Gönder</h1>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
