export enum InputType {
  text = "text",
  textarea = "textarea",
  date = "date",
  url = "url",
  email = "email",
  tel = "tel",
}

export const Input = ({
  type,
  id,
  placeholder,
  value,
  required,
  disabled,
  onChange,
}: {
  type: InputType;
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: React.ChangeEvent) => void;
  required?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div className="mb-3 px-5">
      {/* Switch case */}
      {(type === InputType.text ||
        type === InputType.date ||
        type === InputType.url ||
        type === InputType.email ||
        type === InputType.tel) && (
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
        />
      )}
      {type === InputType.textarea && (
        <textarea
          className="form-control"
          id={id}
          rows={3}
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
  value: any;
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
