import { env } from "utility/config";
import { toast } from "react-toastify";
import FileUploader from "views/components/DropZone";
import CreatableSelect from "react-select/creatable";
import { FormattedMessage, useIntl } from "react-intl";
import React, { useEffect, useRef, useState } from "react";
import {
  supportGetDynamicFields,
  supportLogin,
  supportStoreTickets,
} from "utility/helper/endpoints";
import {
  Button,
  Modal,
  FormFeedback,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
} from "reactstrap";

import CustomInput from "views/components/@custom/Input";
import Editor from "./Editor";
import LoaderButton from "./LoaderButton";
import { HtmlStringConvert } from "./HtmlConvertTo";

import "./editor.scss";

// env variables for support form
const {
  SUPPORT_API_BASEURL,
  SUPPORT_ORGANIZATION_ID,
  SUPPORT_TEAM_ID,
  SUPPORT_SUB_TEAM_ID,
} = env;

// endpoints
const store_tickets = `${SUPPORT_API_BASEURL + supportStoreTickets
}?organization_id=${SUPPORT_ORGANIZATION_ID}`;

const get_dynamic_fields = `${SUPPORT_API_BASEURL
}${supportGetDynamicFields}/${SUPPORT_TEAM_ID}?organization_id=${SUPPORT_ORGANIZATION_ID}`;

const login = SUPPORT_API_BASEURL + supportLogin;

// initial Object
const supportObj = {
  attachment: [],
  dynamic_fields: [],
  subject: "",
};
let nhcc_token = "";

function SupportForm({
  visible,
  setVisible,
  minWidth = 380,
  maxWidth = 450,
}) {
  const context = useIntl();
  const [Data, setData] = useState(supportObj);
  const [postComment, setPostComment] = useState(false);
  const [ticketDone, setTicketDone] = useState(false);
  const [validation, setValidation] = useState(false);
  const [region, setRegion] = useState([]);
  const [Org, setOrg] = useState();
  const [value, setValue] = useState("");
  const fileRef = useRef();

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    getToken();
  }, []);
  // handle change input value form field
  const handleChange = (key, value) => {
    setData({ ...Data, [key]: value });
  };

  const getToken = () => {
    const u = "system.user@ascend.com.sa";
    const p = "Ms5C!lcB";

    fetch(login, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: u,
        password: p,
        dataTeam: "True",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response?.accessToken) {
          nhcc_token = response?.accessToken;
        }

        fetch(get_dynamic_fields, {
          method: "GET",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${nhcc_token}`,
          },
        })
          .then((response) => response.json())
          .then((r) => {
            setDynamicFields(r.data);

            setData((d) => {
              if (r.data?.length) {
                r.data.forEach((df) => {
                  d.dynamic_fields.push({ [df._id]: "" });
                });
              }
              return { ...d };
            });
          });
      });
  };
  // Submit data to server side
  const handleSubmit = (data) => {
    const postData = {
      ...data,
      priority_id: "medium",
      status_id: "opened",
      subject: data.subject,
      content: value,
      team_ids: [SUPPORT_TEAM_ID],
      sub_team: [SUPPORT_SUB_TEAM_ID],
      attachment: Data.attachment.map((img) => img?.Location).filter((i) => i),
      dynamic_fields: Data.dynamic_fields,
    };

    const selectedFields = Data.dynamic_fields;
    let isValid = true;
    dynamicFields.forEach((df) => {
      if (df.requiredField) {
        isValid = selectedFields.reduce((result, cItem) => {
          if (df._id in cItem) {
            result = result && !!cItem[df._id];
          }
          return result;
        }, isValid);
      }
    });

    if (
      postData.subject?.trim() === ""
      || postData.content === ""
      || !isValid
    ) {
      setValidation(true);
    } else {
      setValidation(false);
      setTicketDone(true);

      fetch(store_tickets, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${nhcc_token}`,
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response?.data?._id) {
            toast.success(
              "Thank you for contacting us, we will get back to you!",
            );
            setPostComment(true);
            setData(supportObj);
            setValue("");
            setTicketDone(false);
            if (fileRef?.current?.reset) {
              fileRef.current.reset();
            }
          }
        })
        .catch((error) => {
          toast.error("Something went wrong!");
          setTicketDone(false);
        });
    }
  };

  const isDynamicFieldValid = (df) => {
    let isValid = true;
    if (df.requiredField) {
      isValid = Data.dynamic_fields.reduce((result, cItem) => {
        if (df._id in cItem) {
          result = result && !!cItem[df._id];
        }
        return result;
      }, isValid);
    }

    return isValid;
  };

  const onDynamicField = (data, item) => {
    setData((d) => {
      d.dynamic_fields = d.dynamic_fields.map((df) => {
        if (item._id in df) {
          df[item._id] = item.type === "text" ? data : data.value;
        }

        return df;
      });
      return { ...d };
    });
  };

  const handleTogle = () => {
    setVisible((v) => !v);
    setPostComment(true);
    setData(supportObj);
    setValue("");
    setTicketDone(false);
  };

  return (
    <Modal
      isOpen={visible}
      toggle={() => handleTogle()}
      style={{
        display: "flex", alignSelf: "center", maxWidth, minWidth,
      }}
    >
      <ModalHeader toggle={() => handleTogle()}>
        <FormattedMessage id="Support Form" defaultMessage="Support Form" />
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="subject">
            <FormattedMessage id="Subject" defaultMessage="Subject" />
            <strong className="text-danger">*</strong>
          </Label>
          {/* <Input
            type="subject"
            id="subject"
            placeholder={context.locale === "en" ? "subject" : "موضوع التذكرة"}
            value={Data.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
          invalid={Data.subject?.trim() === "" && validation ? true : false}
        /> */}
          <CustomInput
            type="subject"
            id="subject"
            placeholder={context.locale === "en" ? "subject" : "موضوع التذكرة"}
            label
            invalid={!!(Data.subject?.trim() === "" && validation)}
            eventOnChangeHandler={(e) => handleChange("subject", e.target.value)}
            value={Data.subject}
          />
          <FormFeedback
            className="ml-1"
            invalid={
              Data.subject?.trim() === "" && validation ? "true" : "false"
            }
          >
            This field is required!
          </FormFeedback>
        </FormGroup>
        {dynamicFields.map((item, index) => {
          switch (item.type) {
          case "select":
            return (
              <FormGroup className="selector" key={index}>
                <label>
                  <FormattedMessage
                    id={item.name}
                    defaultMessage={item.name}
                  />
                  {item.requiredField && (
                    <strong className="text-danger">*</strong>
                  )}
                </label>
                <CreatableSelect
                  className="React create-field-slect-1"
                  classNamePrefix="select"
                  isValidNewOption={() => false}
                  placeholder={
                    context.locale === "en" ? "Select..." : "إختيار"
                  }
                  options={item.values.map((i) => ({ label: i, value: i }))}
                  onChange={(e) => onDynamicField(e, item)}
                  invalid={!isDynamicFieldValid(item) && validation}
                />
                {item.requiredField && (
                  <>
                    <Input
                      type="text"
                      hidden
                      invalid={!isDynamicFieldValid(item) && validation}
                    />

                    <FormFeedback className="ml-1">
                      <FormattedMessage
                        id="This Option is required!"
                        defaultMessage="This Option is required!"
                      />
                    </FormFeedback>
                  </>
                )}
              </FormGroup>
            );

          case "text":
            return (
              <FormGroup key={index}>
                <Label for={item.name}>
                  <FormattedMessage
                    id={item.name}
                    defaultMessage={item.name}
                  />
                  {item.requiredField && (
                    <strong className="text-danger">*</strong>
                  )}
                </Label>

                <CustomInput
                  type="subject"
                  id="subject"
                  placeholder={item.name}
                  invalid={!isDynamicFieldValid(item) && validation}
                  eventOnChangeHandler={(e) => onDynamicField(e.target.value, item)}
                />
                {item.requiredField && (
                  <FormFeedback
                    className="ml-1"
                    invalid={!isDynamicFieldValid(item) && validation}
                  >
                    This field is required!
                  </FormFeedback>
                )}
              </FormGroup>
            );
          default:
            return <></>;
          }
        })}
        <FormGroup>
          <Label>
            <FormattedMessage id="Description" defaultMessage="Description" />
            <strong className="text-danger">*</strong>
          </Label>

          <Editor setValue={setValue} value={value} />
          <Input
            type="text"
            hidden
            invalid={
              !!(HtmlStringConvert(value).trim()?.length === 0 && validation)
            }
          />
          <FormFeedback
            className="ml-1"
            invalid={
              HtmlStringConvert(value).trim()?.length === 0 && validation
                ? "true"
                : "false"
            }
          >
            This field is required!
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <FileUploader
            fileRef={fileRef}
            handleChange={(e) => setData((d) => ({
              ...d,
              attachment: e,
            }))}
            accept=".jpg, .jpeg, .png, .svg, .pdf, .xlsx, .xls"
            size={5000000}
            onlyUploader
            value={Data.attachment}
            uploaderText="Upload"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        {ticketDone
          ? (
            <LoaderButton title="Creating Ticket..." />
          )
          : (
            <Button
              color="primary"
              onClick={() => handleSubmit(Data)}
              disabled={ticketDone}
            >
              <FormattedMessage id="Submit" defaultMessage="Submit" />
            </Button>
          )}
      </ModalFooter>
    </Modal>
  );
}
export default SupportForm;
