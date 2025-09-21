export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
