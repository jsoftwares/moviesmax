import { useEffect, useState } from "react";

export default function Pagination(props: paginationProps){
    const [linkModels, setLinkModels] = useState<linkModel[]>([]);

    function selectPage(link: linkModel){
        if(link.page === props.currentPage) return; // if user is clicking on same page

        if(!link.enabled) return;

        props.onChange(link.page);
    }

    function getClass(link: linkModel){
        if(link.active) return "active pointer";

        if(!link.enabled) return "disabled";

        return "pointer";
    }

    useEffect( () => {
        // Previous Button
        const previousPageBtnEnabled = props.currentPage !== 1;
        const previousPage = props.currentPage - 1;
        const links: linkModel[] = [];

        links.push({
            text: 'Previous',
            enabled: previousPageBtnEnabled,
            page: previousPage,
            active: false
        });

        // Buttons after Previous button (1, 2, 3...)
        for (let i = 1; i <= props.totalAmountOfPages; i++) {
            if (i >= props.currentPage - props.radio && i <= props.currentPage + props.radio) {
                links.push({
                    text: `${i}`,
                    active: props.currentPage === i,
                    enabled: true,
                    page: i
                })
            }  
        }

        // Next Button
        const nextPageBtnEnabled = props.currentPage !== props.totalAmountOfPages && props.totalAmountOfPages > 0;
        const nextPage = props.currentPage + 1;

        links.push({
            text: 'Next',
            page: nextPage,
            enabled: nextPageBtnEnabled,
            active: false
        });

        setLinkModels(links);
    }, [props.currentPage, props.totalAmountOfPages, props.radio])

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination pagination-sm justify-content-center">
                {linkModels.map( link => <li key={link.text} 
                    onClick={() => selectPage(link)}
                    className={`page-item cursor ${getClass(link)}`}>
                        <span className="page-link">{link.text}</span>
                </li> )}
            </ul>
        </nav>
    );
}

// representation of the data in each of the pagination buttons
interface linkModel {
    page: number;
    enabled: boolean;
    text: string;
    active: boolean;
}

interface paginationProps{
    currentPage: number;
    totalAmountOfPages: number;
    radio: number;  //number of pages btn after the active btn
    onChange(page: number): void;
}

Pagination.defaultProps = {
    radio: 3
}