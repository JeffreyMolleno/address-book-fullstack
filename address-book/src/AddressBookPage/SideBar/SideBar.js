import React, { useState, useEffect, useRef } from "react";
import "./SideBar.css";
import ContactForm from "../ContactForm";
import GroupContacts from "../GroupContacts/GroupContacts";

export default function SideBar(highprops) {
  const [state, setState] = useState({
    addContact_tab: false,
    contactGroups_tab: true
  });

  const [dataPass, setDataPass] = useState(null);
  const [dataFromGroups, setdataFromGroups] = useState(false);

  const refHook = useRef(false);

  useEffect(() => {
    console.log(refHook);
    if (refHook.current) {
      setDataPass(highprops.contactData);
      // change("open_add");
    } else refHook.current = true;
  });

  useEffect(() => {
    console.log("highprops");
    if (highprops.contactData) {
      setDataPass(highprops.contactData);
      change("open_add");
    }

    if (highprops.prepareNewData) {
      setDataPass(null);
      change("open_add");
    }
  }, [highprops.contactData, highprops.prepareNewData]);

  const change = control => {
    if (control === "open_groups") {
      setState(prevState => {
        return { addContact_tab: false, contactGroups_tab: true };
      });
      setDataPass(null);
    }
    if (control === "open_add") {
      setState(prevState => {
        return { addContact_tab: true, contactGroups_tab: false };
      });
    }
  };

  const close = () => {
    // console.log(dataPass);
    // setDataPass(1)
    setState(prevState => {
      return { addContact_tab: false, contactGroups_tab: false };
    });
  };

  const DataFromGroups = data => {
    setdataFromGroups(true);
    // setDataPass(data);
    close();
    highprops.setTableData(data);
  };

  const passGroupRef = (e) => {
    highprops.passGroupRef(e);
  };

  return (
    <>
      <div className="main-container-tabs">
        <div className="header-menu-container">
          <div
            className={
              state.contactGroups_tab
                ? "tabs-container active-tab"
                : "tabs-container"
            }
            onClick={() => {
              change("open_groups");
            }}
          >
            <p> Contact Groups </p>
          </div>
          <div
            className={
              state.addContact_tab
                ? "tabs-container active-tab"
                : "tabs-container"
            }
            onClick={() => {
              change("open_add");
            }}
          >
            <p>
              {" "}
              Contact Form / {dataPass ? dataPass.first_name : "Add"}{" "}
              {dataPass ? dataPass.last_name : "New"}
            </p>
          </div>
        </div>

        <div className="tabs-body-container">
          {state.contactGroups_tab ? (
            <div className="form-contact-container">
              <div className="container-close" onClick={() => close()}>
                X
              </div>
              <GroupContacts
                setDataGroup={DataFromGroups}
                passGroupRef={passGroupRef}
              />
            </div>
          ) : (
            ""
          )}

          {state.addContact_tab ? (
            <div className="form-contact-container">
              <div className="container-close" onClick={() => close()}>
                X
              </div>
              <ContactForm contactData={dataPass} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        onClick={() => close()}
        className={
          !state.contactGroups_tab && !state.addContact_tab
            ? ""
            : "black-overlay"
        }
      />
    </>
  );
}
