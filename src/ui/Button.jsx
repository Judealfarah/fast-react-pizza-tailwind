function Button({ children, disabled, onClick }) {
  return (
    <button
      className="inline-block tracking-wide p-3 bg-sky-300 hover:text-slate-200 rounded-full uppercase hover:bg-sky-500 transition-colors"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
