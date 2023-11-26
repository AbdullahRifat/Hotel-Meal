

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-8 border-solid border-2 border-sky-500  ">
            <p className="text-primary-600 mb-2">--- {subHeading} ---</p>
            <h3 className="text-3xl uppercase font-bold border-y-4 py-4 border-sky-500 ">{heading}</h3>
        </div>
    );
};

export default SectionTitle;