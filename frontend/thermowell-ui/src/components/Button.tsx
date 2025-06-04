import React from "react";
import { Link } from "react-router-dom";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  as?: "button" | "link";
  to?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center font-semibold rounded-lg px-5 py-2 transition shadow focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
const variants = {
  primary:
    "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500",
  secondary:
    "bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
  danger:
    "bg-danger hover:bg-danger-dark text-white focus:ring-danger",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  as = "button",
  to,
  children,
  className = "",
  ...props
}) => {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (as === "link" && to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
