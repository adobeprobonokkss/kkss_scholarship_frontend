import React, { FC, useContext, useEffect } from "react";
import { FieldLabel } from "@swc-react/field-label";
import { Textfield } from "@swc-react/textfield";
import { Picker } from "@swc-react/picker";
import { MenuItem } from "@swc-react/menu";

import classes from "../styles/ConfigurableForm.module.css";
import { getUsersInfo } from "../utils/shared";
import { ApplicationStatusKeys, RoleType } from "../utils/types";
import {
  ScholarshipFormContext,
  ScholarshipFormContextProps,
} from "../context/ScholarshipFormContext";
import { ScholarshipData } from "../services/ScholarshipFormService";

const ReviewProcess: FC = () => {
  const userInfo = getUsersInfo().decoded;
  const isUser = userInfo?.role == RoleType.USER;
  const isPM = userInfo?.role == RoleType.PROGRAM_MANAGER;
  const isAdmin = userInfo?.role == RoleType.ADMIN;
  const isReviewer = userInfo?.role == RoleType.REVIEWER;
  const hidePMReview = isUser || isReviewer;
  const formDataCtx = useContext<ScholarshipData & ScholarshipFormContextProps>(
    ScholarshipFormContext
  );
  const hideAfterBGReview =
    formDataCtx?.status == ApplicationStatusKeys.submitted ||
    formDataCtx?.status == ApplicationStatusKeys.initial_review_completed;
  const hideBGReview =
    isUser || formDataCtx?.status == ApplicationStatusKeys.submitted;
  const hideAdminReview =
    isUser ||
    isPM ||
    isReviewer ||
    formDataCtx?.status == ApplicationStatusKeys.submitted ||
    formDataCtx?.status == ApplicationStatusKeys.initial_review_completed ||
    formDataCtx?.status ==
      ApplicationStatusKeys.background_verification_completed;
  const disableAssignPMReviewer =
    !!formDataCtx?.programManagerEmail && !isAdmin;
  const disableAssignBGReviewer = isUser || isReviewer || hideAfterBGReview;
  const headingLabelStyle = {
    fontSize: "16pt",
    fontFamily: `'docs-Roboto', Helvetica, Arial, sans-serif`,
    letterSpacing: 0,
    color: "#010101",
    fontWeight: 600,
  };
  const fieldLabelStyle = {
    fontSize: "14pt",
    fontFamily: `'docs-Roboto', Helvetica, Arial, sans-serif`,
    letterSpacing: 0,
    color: "#000000",
    fontWeight: 510,
  };
  const enableBeforeBGReview =
    formDataCtx?.status === ApplicationStatusKeys.submitted;
  const enableAfterBGReview =
    formDataCtx?.status ===
    ApplicationStatusKeys.background_verification_completed;
  const enableBGReview =
    formDataCtx?.status === ApplicationStatusKeys.initial_review_completed ||
    formDataCtx?.status === ApplicationStatusKeys.submitted;

  if (isUser) return <></>;

  useEffect(() => {
    console.log("ReviewProcess: useEffect");
    if (
      isPM &&
      formDataCtx?.status === ApplicationStatusKeys.submitted &&
      (!formDataCtx?.programManagerEmail ||
        formDataCtx?.programManagerEmail?.length === 0)
    ) {
      console.log("ReviewProcess: useEffect - setting PM email and name");

      formDataCtx?.onFormDataChange(
        "programManagerEmail",
        (userInfo?.email ?? "").trim()
      );
      formDataCtx?.onFormDataChange(
        "programManagerName",
        (userInfo?.name ?? "").trim()
      );
    }
  }, []);

  return (
    <div>
      <form className={classes.form}>
        {!hidePMReview && (
          <>
            <div key={"pmReview1Heading"} className={classes.card}>
              <FieldLabel
                disabled={!enableBeforeBGReview}
                style={headingLabelStyle}
              >
                {"Program Manager Review - Before background verification"}
              </FieldLabel>
            </div>
            <div key={"pmReview1"} className={classes.card}>
              <FieldLabel
                disabled={!enableBeforeBGReview}
                required={true}
                style={fieldLabelStyle}
              >
                {"Assign Program Manager"}
              </FieldLabel>
              <div className={classes.pmDetails}>
                <Textfield
                  disabled={!enableBeforeBGReview || disableAssignPMReviewer}
                  placeholder="Enter valid Email"
                  id="pmEmail"
                  value={
                    formDataCtx?.programManagerEmail &&
                    formDataCtx?.programManagerEmail.length > 0
                      ? formDataCtx?.programManagerEmail
                      : ""
                  }
                  required={true}
                  type="email"
                  quiet={true}
                  style={{
                    width: "100%",
                  }}
                  change={(e: any) => {
                    e.preventDefault();
                    const value = e.target?.value.trim() ?? "";
                    formDataCtx?.onFormDataChange(
                      "programManagerEmail",
                      value?.trim()
                    );
                  }}
                />
                <Textfield
                  disabled={!enableBeforeBGReview || disableAssignPMReviewer}
                  placeholder="Enter valid Name"
                  id="pmName"
                  value={
                    formDataCtx?.programManagerName &&
                    formDataCtx?.programManagerName.length > 0
                      ? formDataCtx?.programManagerName
                      : ""
                  }
                  required={true}
                  type="text"
                  quiet={true}
                  style={{
                    width: "100%",
                  }}
                  change={(e: any) => {
                    e.preventDefault();
                    const value = e.target?.value.trim() ?? "";
                    formDataCtx?.onFormDataChange(
                      "programManagerName",
                      value?.trim()
                    );
                  }}
                />
              </div>
            </div>
            <div key={"pmReviewcomment1"} className={classes.card}>
              <FieldLabel
                disabled={!enableBeforeBGReview}
                required={true}
                style={fieldLabelStyle}
              >
                {"Program Manager Comment"}
              </FieldLabel>
              <Textfield
                disabled={!enableBeforeBGReview}
                placeholder="Enter Comment"
                id="pmComment"
                value={formDataCtx?.programManagerComment1 ?? ""}
                required={true}
                type="text"
                multiline={true}
                style={{
                  width: "100%",
                }}
                change={(e: any) => {
                  e.preventDefault();
                  const value = e.target?.value.trim() ?? "";
                  formDataCtx?.onFormDataChange(
                    "programManagerComment1",
                    value?.trim()
                  );
                }}
              />
            </div>
          </>
        )}
        {/* Background Verification Heading and review */}
        <div key={"bgReviewHeading"} className={classes.card}>
          <FieldLabel style={headingLabelStyle}>
            {"Background Verification"}
          </FieldLabel>
        </div>
        <div key={"bgReview"} className={classes.card}>
          <FieldLabel
            disabled={!enableBGReview}
            required={true}
            style={fieldLabelStyle}
          >
            {"Assign Background Verification Volunteer"}
          </FieldLabel>
          <div className={classes.pmDetails}>
            <Textfield
              placeholder="Enter valid Email"
              id="bgEmail"
              value={
                formDataCtx?.backgroundVerifierEmail &&
                formDataCtx?.backgroundVerifierEmail.length > 0
                  ? formDataCtx?.backgroundVerifierEmail
                  : ""
              }
              required={true}
              type="email"
              quiet={true}
              style={{ width: "100%" }}
              change={(e: any) => {
                e.preventDefault();
                const value = e.target?.value.trim() ?? "";
                formDataCtx?.onFormDataChange(
                  "backgroundVerifierEmail",
                  value?.trim()
                );
              }}
              disabled={disableAssignBGReviewer || !enableBGReview}
            />
            <Textfield
              placeholder="Enter valid Name"
              id="bgName"
              value={
                formDataCtx?.backgroundVerifierName &&
                formDataCtx?.backgroundVerifierName.length > 0
                  ? formDataCtx?.backgroundVerifierName
                  : ""
              }
              required={true}
              type="text"
              quiet={true}
              style={{ width: "100%" }}
              change={(e: any) => {
                e.preventDefault();
                const value = e.target?.value.trim() ?? "";
                formDataCtx?.onFormDataChange(
                  "backgroundVerifierName",
                  value?.trim()
                );
              }}
              disabled={disableAssignBGReviewer || !enableBGReview}
            />
          </div>
        </div>
        {!hideBGReview && (
          <div key={"bgReviewcomment"} className={classes.card}>
            <FieldLabel
              disabled={!enableBGReview}
              required={true}
              style={fieldLabelStyle}
            >
              {"Background Verification Comment"}
            </FieldLabel>
            <Textfield
              disabled={!enableBGReview}
              placeholder="Enter Comment"
              id="bgComment"
              value={formDataCtx?.backgroundVerifierComment ?? ""}
              required={true}
              type="text"
              multiline={true}
              style={{
                width: "100%",
              }}
              change={(e: any) => {
                e.preventDefault();
                const value = e.target?.value.trim() ?? "";
                formDataCtx?.onFormDataChange(
                  "backgroundVerifierComment",
                  value?.trim()
                );
              }}
            />
          </div>
        )}
        {!hidePMReview && !hideAfterBGReview && (
          <>
            <div key={"pmReview2Heading"} className={classes.card}>
              <FieldLabel
                disabled={!enableAfterBGReview}
                style={headingLabelStyle}
              >
                {"Program Manager Review - After background verification"}
              </FieldLabel>
            </div>

            <div key={"pmReview2"} className={classes.card}>
              <FieldLabel
                disabled={!enableAfterBGReview}
                required={true}
                style={fieldLabelStyle}
              >
                {"Program Manager Comment"}
              </FieldLabel>
              <Textfield
                disabled={!enableAfterBGReview}
                placeholder="Enter Comment"
                id="pmComment2"
                value={formDataCtx?.programManagerComment2 ?? ""}
                required={true}
                type="text"
                multiline={true}
                style={{
                  width: "100%",
                }}
                change={(e: any) => {
                  e.preventDefault();
                  const value = e.target?.value.trim() ?? "";
                  formDataCtx?.onFormDataChange(
                    "programManagerComment2",
                    value?.trim()
                  );
                }}
              />
            </div>
          </>
        )}
        {!hideAdminReview && (
          <>
            <div key={"adminReviewHeading"} className={classes.card}>
              <FieldLabel style={headingLabelStyle}>
                {"Admin Review"}
              </FieldLabel>
            </div>
            <div key={"adminReview"} className={classes.card}>
              <FieldLabel required={true} style={fieldLabelStyle}>
                {"Admin Comment"}
              </FieldLabel>
              <Textfield
                placeholder="Enter Comment"
                id="adminComment"
                value={formDataCtx?.adminComment ?? ""}
                required={true}
                type="text"
                multiline={true}
                style={{
                  width: "100%",
                }}
                change={(e: any) => {
                  e.preventDefault();
                  const value = e.target?.value.trim() ?? "";
                  formDataCtx?.onFormDataChange("adminComment", value?.trim());
                }}
              />
            </div>
            <div key={"adminDecision"} className={classes.card}>
              <FieldLabel required={true} style={fieldLabelStyle}>
                {"Decision"}
              </FieldLabel>
              <Picker
                value={
                  formDataCtx?.status == ApplicationStatusKeys.approved ||
                  formDataCtx?.status == ApplicationStatusKeys.rejected
                    ? formDataCtx?.status
                    : ""
                }
                change={(e: any) => {
                  e.preventDefault();
                  if (isAdmin) {
                    formDataCtx?.onFormDataChange(
                      "status",
                      e.target.value?.trim()
                    );
                  }
                }}
                label="Approve/Reject"
                style={{ width: "200px" }}
              >
                <MenuItem value="approved">Approve</MenuItem>
                <MenuItem value="rejected">Reject</MenuItem>
              </Picker>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ReviewProcess;
