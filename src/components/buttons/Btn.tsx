type BtnProps = {
    btnName?: string;
    w?: string;
     type?: "submit" | "button" | "reset";
    bgCol?: string;
    textCol?: string;
    hovBgCol?: string;
    hovTextCol?: string;
    fontStyle?: string;
    classname?: any,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

};

export const Btn = ({
    btnName = "btn",
    w = "30",
    type =  "button",
    bgCol = "black",
    textCol = "white",
    hovBgCol = "white",
    hovTextCol = "black",
    fontStyle = "roboto",
    classname = "",
    onClick
}: BtnProps) => {


    return (
        <button
            type={type}
            onClick={onClick}
            className={` w-${w} bg-${bgCol} text-${textCol}  hover:bg-${hovBgCol} hover:text-${hovTextCol} flex items-center justify-center border rounded-4xl cursor-pointer transition-all duration-300 ease-in-out font-semibold font-${fontStyle}  ${classname} `}
        >
            {btnName}
        </button>
    );
};
