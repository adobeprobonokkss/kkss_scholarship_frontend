import React from "react";
import { MenuItem } from "@swc-react/menu";
import { FieldLabel } from "@swc-react/field-label";

import classes from "../styles/ConfigurableForm.module.css";

interface IConfigurableFormProps {
  config: any;
}

const ConfigurableForm: React.FC<IConfigurableFormProps> = (
  props: IConfigurableFormProps
) => {
  const initForm: any = {};
  const { config } = props;
  config.forEach((el: any) => {
    initForm[el.key] = "";
  });
  console.log(initForm);
  const [formData, setFormData] = React.useState(initForm);

  const renderMenuItem = (item: string) => {
    return React.createElement(MenuItem, {
      value: item,
      children: item,
      key: item,
    });
  };

  const renderTextfield = (input: any) => {
    return React.createElement(input.component, {
      ...input.props,
      quiet: true,
      style: {
        width: "100%",
      },
      value: input.props.value ?? formData[input.key],
      change: (e: any) => {
        e.preventDefault();
        setFormData({ ...formData, [input.key]: e.target.value });
        if (input.props.change) input.props.change(e);
      },
    });
  };

  const renderPicker = (input: any) => {
    return React.createElement(input.component, {
      ...input.props,
      value: formData[input.key],
      change: (e: any) => {
        e.preventDefault();
        setFormData({ ...formData, [input.key]: e.target.value });
        if (input.props.change) input.props.change(e);
      },
      children: input.props.children.map((item: string) =>
        renderMenuItem(item)
      ),
    });
  };

  const switchComponent = (input: any) => {
    switch (input.type) {
      case "dropdown":
        return renderPicker(input);
      case "text":
        return renderTextfield(input);
      default:
        return null;
    }
  };

  const renderInputFields = () => {
    const inputFields: any = config.map((el: any) => {
      return (
        <div key={el.key} className={classes.card}>
          {React.createElement(FieldLabel, {
            children: el.label,
            style: {
              fontSize: "16pt",
              fontFamily: `'docs-Roboto', Helvetica, Arial, sans-serif`,
              letterSpacing: 0,
              color: "#000000",
              fontWeight: 510,
            },
          })}
          {switchComponent(el)}
        </div>
      );
    });
    return inputFields;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        {renderInputFields()}
      </form>
    </div>
  );
};

export default ConfigurableForm;
