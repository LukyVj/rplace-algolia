import styles from "./button.module.css";
import cx from "classnames";

interface ButtonProps {
  style?: any;
  onClick?: (e: any) => void;
  className?: string;
  square?: boolean;
  tag?: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  onClick,
  className,
  square,
  tag,
}) => {
  const other = { style, onClick };
  const ButtonTag: any = tag ? tag : "button";
  return (
    <ButtonTag
      {...other}
      className={cx(
        "app-none bdw-0 bgc-nebula-500 color-white hover:bgc-nebula-600 cursor-pointer ff-mono p-16 d-block",
        className,
        styles.pixel,
        square ? styles.square : null
      )}
    >
      {children}
    </ButtonTag>
  );
};

export default Button;
