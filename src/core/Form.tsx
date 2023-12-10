export enum InputType {
  text = "text",
  number = "number",
  textarea = "textarea",
  date = "date",
  datetime = "datetime-local",
  url = "url",
  email = "email",
  tel = "tel",
  password = "password",
}

export const Input = ({
  type,
  id,
  placeholder,
  value,
  required,
  disabled,
  onChange,
  textAreaRows = 3,
}: {
  type: InputType;
  id: string;
  placeholder: string;
  value?: string;
  onChange: (value: React.ChangeEvent) => void;
  required?: boolean;
  disabled?: boolean;
  textAreaRows?: number;
}) => {
  return (
    <div className="mb-3 px-5">
      {/* Switch case */}
      {(type === InputType.text ||
        type === InputType.date ||
        type === InputType.url ||
        type === InputType.email ||
        type === InputType.tel ||
        type === InputType.datetime ||
        type === InputType.number ||
        type === InputType.password) && (
        <input
          type={type}
          className="form-control"
          id={id}
          aria-describedby={id}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          min={type === InputType.number ? 0 : undefined}
        />
      )}
      {type === InputType.textarea && (
        <textarea
          className="form-control"
          id={id}
          rows={textAreaRows}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
        ></textarea>
      )}
    </div>
  );
};

export const Select = ({
  label,
  value,
  values,
  required,
  disabled,
  onChange,
  id,
}: {
  label: string;
  value: string | number;
  values: Map<string, string>;
  id: string;
  onChange: (value: React.ChangeEvent) => void;
  required?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div className="mb-3 px-5">
      <select
        className="form-control"
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        id={id}
      >
        <optgroup label={label}>
          {Array.from(values, ([key, value]) => {
            return (
              <option value={value} key={key}>
                {value}
              </option>
            );
          })}
        </optgroup>
      </select>
    </div>
  );
};
