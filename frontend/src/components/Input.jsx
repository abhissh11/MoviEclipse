export default function Input({ type = "text", value, onChange, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input border m-1 rounded-lg px-3 py-2 border-gray-400"
    />
  );
}
