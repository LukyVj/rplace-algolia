import styles from "./button.module.css";
import cx from "classnames";

interface ButtonProps {
  style?: any;
  onClick?: (e: any) => void;
  className?: string;
  square?: boolean;
}

const nebula = "";
const Button: React.FC<ButtonProps> = ({
  children,
  style,
  onClick,
  className,
  square,
}) => {
  const other = { style, onClick };
  return (
    <button
      {...other}
      className={cx(
        "app-none bdw-0 bgc-nebula-500 color-white hover:bgc-nebula-600 cursor-pointer ff-mono p-16 d-block",
        className,
        styles.pixel,
        square ? styles.square : null
      )}
    >
      {children}
    </button>
  );
};

export default Button;
