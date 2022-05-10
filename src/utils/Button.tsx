import { ReactNode } from "react";

export default function Button(props: buttonProps) {
    return <button onClick={props.onClick} className='btn btn-primary'>{props.children}</button>
}

interface buttonProps {
    children: ReactNode;
    onClick(): void;
}