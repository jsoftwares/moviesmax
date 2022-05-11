import { ReactNode } from "react";

export default function Button(props: buttonProps) {
    return <button type={props.type} disabled={props.disabled} onClick={props.onClick} className='btn btn-primary'>
        {props.children}
    </button>
}

interface buttonProps {
    children: ReactNode;
    onClick?(): void;
    type: 'button' | 'submit';
    disabled: boolean;
}

Button.defaultProps = {
    type: 'button',
    disabled: false
}