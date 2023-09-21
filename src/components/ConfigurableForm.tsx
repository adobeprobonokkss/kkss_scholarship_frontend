import React, { FC, createElement, useContext } from "react";
import { FieldLabel } from "@swc-react/field-label";

import classes from "../styles/ConfigurableForm.module.css";
import { ScholarshipFormContext } from "../context/ScholarshipFormContext";
import {
  renderPickerChildren,
  validationMap,
} from "../services/ScholarshipFormService";

interface IConfigurableFormProps {
  config: any;
}

const ConfigurableForm: FC<IConfigurableFormProps> = (
  props: IConfigurableFormProps
) => {
  const { config } = props;
  const formDataCtx = useContext<any>(ScholarshipFormContext);
  console.log("In ConfigurableForm.tsx");

  const renderTextfield = (input: any) => {
    return createElement(input.component, {
      ...input.props,
      quiet: true,
      style: {
        width: "100%",
      },
      value: formDataCtx[input.key],
      change: (e: any) => {
        e.preventDefault();
        const value = e.target.value
          .trim()
          ?.slice(0, validationMap[input.key]?.maxLength)
          .trim();
        formDataCtx.onFormDataChange(input.key, value?.trim());
        if (input.props.change) input.props.change(e);
      },
    });
  };

  const renderPicker = (input: any) => {
    return createElement(input.component, {
      ...input.props,
      value: formDataCtx[input.key].trim(),
      change: (e: any) => {
        e.preventDefault();
        formDataCtx.onFormDataChange(input.key, e.target.value?.trim());
        if (input.props.change) input.props.change(e);
      },
      children: renderPickerChildren(input.key, formDataCtx),
    });
  };

  const renderDatePicker = (input: any) => {
    const props = {
      ...input.props,
      value: formDataCtx[input.key],
      onChange: (e: any) => {
        e.preventDefault();
        formDataCtx.onFormDataChange(input.key, e.target.value?.trim());
      },
      className: classes.datePicker,
    };
    return (
      <input
        {...props}
        max={new Date().toISOString().split("T")[0]}
        type="date"
      />
    );
  };

  const switchComponent = (input: any) => {
    switch (input.type) {
      case "dropdown":
        return renderPicker(input);
      case "text":
        return renderTextfield(input);
      case "date":
        return renderDatePicker(input);
      default:
        return null;
    }
  };

  const renderInputFields = () => {
    const inputFields: any = config.map((el: any) => {
      if (el.displayField && !el.displayField(formDataCtx)) {
        return null;
      }
      return (
        <div key={el.key} className={classes.card}>
          {createElement(FieldLabel, {
            children: el.label,
            style: {
              fontSize: "16pt",
              fontFamily: `'docs-Roboto', Helvetica, Arial, sans-serif`,
              letterSpacing: 0,
              color: "#000000",
              fontWeight: 510,
            },
            required: el.props.required,
          })}
          {switchComponent(el)}
        </div>
      );
    });
    return inputFields;
  };

  return (
    <div>
      <form className={classes.form}>{renderInputFields()}</form>
    </div>
  );
};

export default ConfigurableForm;
