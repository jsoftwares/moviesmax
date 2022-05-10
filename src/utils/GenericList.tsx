import { ReactElement } from "react";
import Loading from "./Loading";

export default function GenericList(props: GenericListProps) {
    if (!props.list) {
        if (props.loadingUI) {
            return props.loadingUI;
        }
        return <Loading />
    }
    else if (props.list.length === 0) {
        if (props.emptyListUI) {
            return props.emptyListUI;
        }
        return <>Sorry, there are no items to display at this time.</>;
    }
    else {
        return props.children;
    }
}

interface GenericListProps {
    list: any;
    loadingUI?: ReactElement;
    emptyListUI? : ReactElement;
    children: ReactElement
}